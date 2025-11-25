
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Client, ManagedVendor } from './types';
import { generateCopilotResponse, getProactiveCopilotSuggestion } from './geminiService';

const CopilotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2L12 9.5 4.5 12 2 14.5 9.5 12 12 4.5 14.5 2zM12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"></path>
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

// Simple markdown parser
const MarkdownRenderer = ({ text }: { text: string }) => {
    const listRegex = new RegExp('((?:<li.*?>.*?</li>\\s*)+)', 'g');
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>') // List items
      .replace(listRegex, '<ul>$1</ul>') // Wrap consecutive LIs in a UL
      .replace(/\n/g, '<br />'); // Handle newlines

    return <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
};

interface AgencyCopilotProps {
    clients: Client[];
    managedVendors: ManagedVendor[];
    activeClient: Client | null;
}

export const AgencyCopilot: React.FC<AgencyCopilotProps> = ({ clients, managedVendors, activeClient }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (isOpen) {
            const fetchInitialMessage = async () => {
                let baseMessage = "Hello! I'm your Agency Copilot. How can I help you today?";
                let proactiveSuggestion = null;

                if (activeClient) {
                    baseMessage = `Hi! I see you're viewing ${activeClient.name}'s details. How can I help with their account or onboarding?`;
                    proactiveSuggestion = await getProactiveCopilotSuggestion(activeClient);
                }

                const fullMessage = proactiveSuggestion ? `${baseMessage}\n\n${proactiveSuggestion}` : baseMessage;
                setMessages([{ role: 'model', content: fullMessage }]);
            };
            fetchInitialMessage();
        } else {
            setMessages([]);
        }
    }, [isOpen, activeClient]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const query = inputValue.trim();
        if (!query || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: query }];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const context = { clients, managedVendors, activeClient };
            const conversationHistory = newMessages.slice(0, -1);
            const response = await generateCopilotResponse(query, conversationHistory, context);
            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Sorry, something went wrong.";
            setMessages(prev => [...prev, { role: 'model', content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePromptStarter = (prompt: string) => {
        setInputValue(prompt);
    }
    
    const getPromptStarters = () => {
        if (activeClient) {
            return [
                { text: `Draft follow-up for ${activeClient.name}`, prompt: `Draft a follow-up email for ${activeClient.name} regarding their onboarding.` },
                { text: 'Next task for this client?', prompt: `What is the next uncompleted task in the playbook for ${activeClient.name}?` },
                { text: 'Summarize client\'s services', prompt: `Summarize the services provided to ${activeClient.name}.` },
            ];
        }
        return [
            { text: "Brainstorm brand names", prompt: "Brainstorm 5 brand names for a new scheduling service I'm reselling to yoga studios." },
            { text: "Write marketing post", prompt: "Write a short social media post announcing the launch of my new white-label SEO reporting service." },
            { text: "What are Cal.com's features?", prompt: "What are the key features of Cal.com?" },
        ];
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Open Agency Copilot"
            >
                <CopilotIcon />
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 flex flex-col h-[70vh] animate-scale-in">
                    <header className="p-4 flex justify-between items-center border-b border-slate-700 flex-shrink-0">
                        <h2 className="text-lg font-bold text-white">✨ Agency Copilot</h2>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-700">
                            <XIcon />
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-sm ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                    <MarkdownRenderer text={msg.content} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="px-4 py-2 rounded-2xl bg-slate-700 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    {messages.length <= 1 && (
                        <div className="p-4 border-t border-slate-700 text-sm">
                            <p className="font-semibold text-slate-300 mb-2">Try asking:</p>
                            <div className="flex flex-wrap gap-2">
                                {getPromptStarters().map(({text, prompt}) => (
                                    <button key={text} onClick={() => handlePromptStarter(prompt)} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 text-left">{text}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 flex items-center gap-2 flex-shrink-0">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask Copilot anything..."
                            className="w-full border border-slate-600 bg-slate-900 text-white rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !inputValue} className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 flex-shrink-0">
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};
