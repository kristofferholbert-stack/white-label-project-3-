import { GoogleGenAI } from "@google/genai";
import type { JourneyData, Filters, Solution, LaunchPlaybook, Client, ManagedVendor, ChatMessage, MarketingCopy, PricingTier, ProfitabilityEstimates, SearchResult, SolutionStack, WebsiteTemplateContent, OnboardingCourseOutline, KnowledgeBaseArticle, IrresistibleOffer, IntegrationGuide, SystemAssetsPreview } from '../types';
import { filterOptionsData, categoryStructure, ALL_SOLUTIONS, CURATED_STACKS } from '../constants';
import { supabase } from '../lib/supabase';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. App will not function correctly.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY || 'placeholder-key' });

function cleanAndParseJson<T>(responseText: string): T {
    let jsonString = responseText.trim();

    const markdownMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (markdownMatch && markdownMatch[1]) {
        jsonString = markdownMatch[1];
    } else {
        const firstBracket = jsonString.indexOf('{');
        const firstSquare = jsonString.indexOf('[');
        
        let startIndex = -1;
        if (firstBracket === -1) {
            startIndex = firstSquare;
        } else if (firstSquare === -1) {
            startIndex = firstBracket;
        } else {
            startIndex = Math.min(firstBracket, firstSquare);
        }

        const lastBracket = jsonString.lastIndexOf('}');
        const lastSquare = jsonString.lastIndexOf(']');
        const endIndex = Math.max(lastBracket, lastSquare);
        
        if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
            jsonString = jsonString.substring(startIndex, endIndex + 1);
        }
    }

    try {
        return JSON.parse(jsonString) as T;
    } catch (e) {
        console.error("Failed to parse JSON even after cleaning:", jsonString);
        throw new Error(`JSON Parsing Error: ${e instanceof Error ? e.message : String(e)} on string: ${jsonString}`);
    }
}


const getFilterOptionsString = () => {
    let optionsString = "Available Filter Categories and Options:\n";
    optionsString += `Solution Category: ${categoryStructure.map(c => c.name).join(', ')}\n`;
    optionsString += `Sub-categories: ${categoryStructure.flatMap(c => c.subCategories).join(', ')}\n`;
    optionsString += `White Label Type: ${filterOptionsData.whitelabelType.join(', ')}\n`;
    optionsString += `Pricing Model: ${filterOptionsData.pricingModel.join(', ')}\n`;
    optionsString += `Ideal Client Size: ${filterOptionsData.idealClientSize.join(', ')}\n`;
    optionsString += `Implementation Time: ${filterOptionsData.implementationTime.join(', ')}\n`;
    optionsString += `Integration Methods: ${filterOptionsData.integrationMethods.join(', ')}\n`;
    return optionsString;
};

export const getFiltersFromQuery = async (goal: string): Promise<Filters> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `An agency's goal is: "${goal}". Based on this goal, which of the following filters categories and specific options are most relevant? Select only from the provided options. Focus on the most impactful filters. For categories, select sub-categories.

${getFilterOptionsString()}

Return ONLY a valid JSON object with keys matching the filter categories ('categories', 'whitelabelType', etc.) and values as an array of strings of the selected options. Do not include any other text or markdown formatting. For example: { "categories": ["Booking & Scheduling"], "idealClientSize": ["Small Business (1-50 employees)"] }.`,
        });
        return cleanAndParseJson<Filters>(response.text);
    } catch (error) {
        console.error("Error generating filters from query:", error);
        return {};
    }
};

export const getMatchingSolutions = async (journeyData: JourneyData): Promise<SearchResult[]> => {
    const solutionsToEvaluate = ALL_SOLUTIONS.map(({ id, name, shortDescription, primaryCategory, subCategory, tags, features, agencyMargin, implementationTime, whitelabelType, partnerSupportModel, valueAddons, vendorTrust }) => ({
        id, name, shortDescription, primaryCategory, subCategory, tags, features, agencyMargin, implementationTime, whitelabelType, partnerSupportModel, valueAddons, vendorTrust
    }));

    const stacksToEvaluate = CURATED_STACKS.map(({ id, name, targetNiche, description, tags, solutionIds }) => ({
        id, name, targetNiche, description, tags, solutionIds
    }));

    const filtersString = Object.entries(journeyData.filters)
        .filter((entry): entry is [string, string[]] => Array.isArray(entry[1]) && entry[1].length > 0)
        .map(([key, value]) => `- ${key}: ${value.join(', ')}`)
        .join('\n');

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are an expert consultant advising an agency. Your goal is to help them find a white-label partner that maximizes PROFIT and minimizes OPERATIONAL PAIN. Prioritize recommending a pre-configured SYSTEM (a stack) if it's a strong fit.
If recommending a multi-tool stack, the "matchReasoning" MUST mention the synergy.
Example: "Combines [Tool A] for text with [Tool B] for voice to cover 100% of inbound leads."
An agency has provided their requirements:
- Goal: ${journeyData.goal}
- Priorities: these sliders indicate their business model.
  - Client Cost (0) vs. Agency Margin (100): ${journeyData.priorities.marginVsCost} -> High score = strongly prefers high 'agencyMargin'.
  - Fast Setup (0) vs. Customization (100): ${journeyData.priorities.speedVsCustomization} -> Low score = demands short 'implementationTime'. High score = they want to AVOID a "clone" solution and need differentiation, so prioritize solutions with rich 'valueAddons'.
  - Easy Integration (0) vs. Powerful API (100): ${journeyData.priorities.easeVsPower} -> Low score = MINIMIZE SUPPORT OVERHEAD. Prioritize 'partnerSupportModel' of 'Direct to Vendor' or 'Hybrid'.
${filtersString ? `- Active Filters:\n${filtersString}` : ''}
- Pain Points: They are concerned about common white-label pitfalls: the support burden, becoming a commodity, and vendor risk (lock-in). Give extra weight to solutions with strong 'vendorTrust' signals (e.g., hasPublicRoadmap: true, hasSLA: true).

Evaluate BOTH these individual solutions AND these pre-configured solution stacks:
- Individual Solutions: ${JSON.stringify(solutionsToEvaluate, null, 2)}
- Solution Stacks (SYSTEMS): ${JSON.stringify(stacksToEvaluate, null, 2)}

Return ONLY a valid JSON array where each object represents a match and contains:
1. "id": the id of the solution or stack.
2. "type": either "solution" or "stack".
3. "matchScore": a score from 0-100 (100 is a perfect match).
4. "matchReasoning": a concise (under 25 words) explanation. Your reasoning MUST reflect the profit-oriented priorities AND the pain points. Mention vendor-led support, unique value-adds, or vendor stability where applicable. (e.g., 'A high-margin system where the vendor handles support, reducing your workload.')
Do not include markdown formatting or any other text.`,
        });
        
        const aiResults = cleanAndParseJson<{ id: string; type: 'solution' | 'stack'; matchScore: number; matchReasoning: string }[]>(response.text);

        const mergedResults: SearchResult[] = aiResults.map((result): SearchResult | null => {
            if (result.type === 'solution') {
                const solution = ALL_SOLUTIONS.find(s => s.id === result.id);
                if (solution) {
                    return {
                        ...solution,
                        matchScore: result.matchScore,
                        matchReasoning: result.matchReasoning,
                        type: 'solution'
                    };
                }
            } else if (result.type === 'stack') {
                const stack = CURATED_STACKS.find(s => s.id === result.id);
                 if (stack) {
                    return {
                        ...stack,
                        matchScore: result.matchScore,
                        matchReasoning: result.matchReasoning,
                        type: 'stack'
                    };
                }
            }
            return null;
        }).filter((item): item is SearchResult => item !== null);

        return mergedResults;
    } catch (error) {
        console.error("Error generating matching solutions:", error);
        throw new Error("Failed to get matches from AI. Please try again later.");
    }
};

export const getNicheProfitabilityEstimates = async (nicheTitle: string): Promise<ProfitabilityEstimates> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a SaaS business consultant. An agency wants to resell software for "${nicheTitle}".
            
            Based on this niche, provide realistic estimates for the following, considering typical market rates for SMBs:
            1.  **averageClientPrice**: A reasonable monthly price (as a number) an agency could charge a single client.
            2.  **typicalAgencyMargin**: A typical profit margin (as a number from 0-100) an agency can expect after paying the white-label provider.

            Return ONLY a valid JSON object with these two keys. Do not include markdown formatting or other text. For example: { "averageClientPrice": 149, "typicalAgencyMargin": 45 }.`,
        });
        return cleanAndParseJson<ProfitabilityEstimates>(response.text);
    } catch (error) {
        console.error("Error generating profitability estimates:", error);
        return { averageClientPrice: 99, typicalAgencyMargin: 40 };
    }
};

export const generateSystemAssetsPreview = async (stack: SolutionStack): Promise<SystemAssetsPreview> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert marketing copywriter for a digital agency. You need to create preview assets for a new service offering based on this system:
            - System Name: "${stack.name}"
            - Target Niche: "${stack.targetNiche}"
            - Description: "${stack.description}"

            Generate ONLY a valid JSON object with the following keys. Do not include markdown or other text.
            1. "valueProposition": A single, compelling sentence summarizing the core benefit for the end-client.
            2. "suggestedPricing": A short string for a compelling starting price point (e.g., "Starts at $199/month").
            3. "marketingHeadline": An attention-grabbing headline for a website or ad.
            
            Example: { "valueProposition": "An all-in-one system to automate bookings and generate 5-star reviews.", "suggestedPricing": "Starts at $199/month per client.", "marketingHeadline": "The #1 Growth System for Local Service Businesses" }.`,
        });
        return cleanAndParseJson<SystemAssetsPreview>(response.text);
    } catch (error) {
        console.error("Error generating system assets preview:", error);
        return {
            valueProposition: "A powerful, all-in-one solution for your business needs.",
            suggestedPricing: "Contact for pricing",
            marketingHeadline: "Elevate Your Business Today"
        };
    }
};

// Updated generateLaunchPlaybook to handle DB persistence
export const generateLaunchPlaybook = async (clientName: string, solutionIds: string[], nicheContext?: string): Promise<LaunchPlaybook> => {
    // NOTE: In a real implementation with access to clientId, we would check DB here first.
    // However, the current architecture calls this function BEFORE creating the client record fully,
    // often to preview or during the creation flow.
    // So we will generate it, and the caller is responsible for saving it to the DB.
    // To fully meet the requirement "Check DB for existing data first", we'd need the client ID passed in.
    // But let's assume we are generating a NEW one here.
    // If we want to update an existing client's playbook, we'd fetch, check, and if missing, call this.

    const selectedSolutions = ALL_SOLUTIONS.filter(s => solutionIds.includes(s.id));
    const solutionDetails = selectedSolutions.map(s => ({ name: s.name, features: s.features, shortDescription: s.shortDescription, primaryCategory: s.primaryCategory, subCategory: s.subCategory, logo: s.logo })).join(', ');
    const isMultiToolSystem = selectedSolutions.length > 1;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are an expert "Irresistible Offer Specialist" and "agency-in-a-box" setup specialist. Your goal is to structure an offer for an agency that is "stupid to say no to".
The agency is onboarding a new client named "${clientName}" and will be providing them with these white-label solutions: ${solutionDetails}.

The agency targets the "${nicheContext || 'General'}" industry. Tailor the sales scripts and email copy specifically for ${nicheContext} pain points.

Based on the solutions and the likely target client (e.g., a local service business for a scheduling tool), create a complete launch playbook by generating ONLY a valid JSON object with the following keys. Do not use markdown.

- "irresistibleOffer": An object with:
    - "costVsResultStatement": A single, powerful sentence framing the offer around the high cost of the client's problem vs. the low cost of the solution. (e.g., "Stop losing $1000/mo in missed calls for less than the cost of a daily coffee.").
    - "netNegativeBonuses": An array of 2-3 common services the end-client is likely already paying for that can be replaced by the provided solutions. For each, provide the 'service' (e.g., 'Website Hosting', 'Separate CRM Subscription') and an 'estimatedCost' (e.g., '$30/mo').
- "clientPainPoints": An array of 3-4 specific, painful problems this system solves for the end-client.
- "tasks": An array of 3-5 crucial onboarding tasks. For each task, provide an "id", "title", "description", and "isCompleted" (always false).
- "emails": An array of 1-2 essential onboarding emails. For each email, provide a "purpose", "subject", and a concise "body".
- "snippets": An array of 1-2 useful code/text snippets (e.g., a CNAME record, an email signature). For each, provide a "title" and the "code" itself.
- "suggestedPricingTiers": An array of 2-3 pricing tiers. For each tier, provide a "name", "price" (e.g., "$99/mo"), and an array of key "features".
- "marketingCopy": An object containing a "headline", "body" paragraph, and a "callToAction" text for a website section.
- "leadMagnets": An array of 2-3 creative lead magnet ideas to attract customers for this service. Include a "title", "description", and "cta" for each.
- "salesFunnelSteps": An array of 3-4 steps for a value ladder sales funnel. Include a "stepName" and a "description" for each.
- "websiteTemplateContent": An object with "headline", "subheadline", an array of "featuresSection" objects (each with "title" and "description"), and a "ctaSection" object (with "headline" and "ctaButtonText").
- "onboardingCourseOutline": An array of 2-3 modules for a client onboarding course. Each object should have a "moduleTitle" and an array of "lessons".
- "knowledgeBaseArticles": An array of 2-3 sample help desk articles. Each object should have a "title" and "content".
${isMultiToolSystem ? `- "systemOverview": A concise paragraph explaining how these different tools work together as a single, powerful system. This is the "coloring book" explanation. Frame it as the RESULT the client gets. Explain specifically how Tool A hands off to Tool B. Example: "Stammer handles the initial website chat. Once a phone number is captured, use Zapier to trigger a Synthflow outbound call."
- "integrationGuide": Generate a practical guide for connecting the two primary tools in the system. For example, using Zapier or webhooks. The guide should have a title, identify the two tools with their names and logos, state the outcome, and list 3-5 specific steps with actions, details, and optional code snippets.
` : ''}
`,
        });

        const playbook = cleanAndParseJson<LaunchPlaybook>(response.text);
        return playbook;

    } catch (error) {
        console.error("Error generating launch playbook:", error);
        throw new Error("Failed to generate AI playbook. The model may be unavailable. Please try again later.");
    }
};

// New function to handle persistence safely if we have a client ID
export const generateAndSavePlaybook = async (clientId: string, clientName: string, solutionIds: string[], nicheContext?: string): Promise<LaunchPlaybook | null> => {
    // 1. Check if playbook exists
    const { data: existing } = await supabase
        .from('playbooks')
        .select('data')
        .eq('client_id', clientId)
        .single();

    if (existing) {
        return existing.data as LaunchPlaybook;
    }

    // 2. Generate if not exists
    try {
        const playbook = await generateLaunchPlaybook(clientName, solutionIds, nicheContext);

        // 3. Save to DB
        const { error } = await supabase
            .from('playbooks')
            .insert({
                client_id: clientId,
                data: playbook
            });

        if (error) {
            console.error("Error saving playbook to DB:", error);
        }

        return playbook;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getProactiveCopilotSuggestion = async (client: Client): Promise<string | null> => {
    const firstIncompleteTask = client.playbook?.tasks.find(t => !t.isCompleted);
    if (!firstIncompleteTask) {
        return null;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an AI assistant for a digital agency owner. The user is looking at a client named "${client.name}".
            The client's next onboarding task is: "${firstIncompleteTask.title}: ${firstIncompleteTask.description}".

            Your goal is to be proactively helpful. In one short sentence, offer to assist with this specific task. Frame it as a question.
            For example, if the task is "Setup CNAME record", you could say: "I see the next task is setting up the CNAME record. Would you like me to draft an email with the instructions for ${client.name}'s technical contact?"
            If the task is "Customize booking page", you could say: "It looks like the next step is customizing the booking page. Need some ideas for branding it effectively for ${client.name}?"
            
            Return just a single string with your proactive suggestion.`,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating proactive suggestion:", error);
        return null;
    }
};

export const generateCopilotResponse = async (
    query: string,
    conversationHistory: ChatMessage[],
    context: { clients: Client[]; managedVendors: ManagedVendor[], activeClient: Client | null }
): Promise<string> => {

    const contextString = `
        AVAILABLE DATA:
        - All Clients: ${JSON.stringify(context.clients.map(c => ({id: c.id, name: c.name, status: c.status})), null, 2)}
        - All Managed Vendors: ${JSON.stringify(context.managedVendors.map(v => ({id: v.id, name: v.name, monthlyCost: v.monthlyCost, status: v.status})), null, 2)}
        - Currently Active Client in UI: ${context.activeClient ? JSON.stringify(context.activeClient, null, 2) : 'None'}
        - All Available Solutions for Resale: ${JSON.stringify(ALL_SOLUTIONS.map(s => ({name: s.name, shortDescription: s.shortDescription, features: s.features.slice(0,2)})), null, 2)}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an AI assistant for a digital agency owner called "Agency Copilot". Be helpful, concise, and use the provided data to answer questions. Use markdown for lists and bolding.
            
            ${contextString}

            CONVERSATION HISTORY:
            ${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

            LATEST USER QUERY:
            user: ${query}
            
            model:`,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating copilot response:", error);
        return "I'm sorry, I encountered an issue trying to process that. Please try again.";
    }
};

export const generateBrandNames = async (systemDescription: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a creative branding expert. Brainstorm 5 creative, catchy, and professional brand names for a new agency service based on the following description: "${systemDescription}". The names should be suitable for a SaaS product.
            Return ONLY a valid JSON object with a single key "brandNames" which is an array of 5 strings. Do not use markdown.
            Example: { "brandNames": ["LeadFlow", "LocalBoost", "ReputationHQ", "ClientConnect", "Growth Engine"] }`,
        });
        const result = cleanAndParseJson<{ brandNames: string[] }>(response.text);
        return result.brandNames;
    } catch (error) {
        console.error("Error generating brand names:", error);
        return ["ServiceSpark", "AgencyFlow", "ClientKit", "GrowthPad", "Niche Launcher"];
    }
};
