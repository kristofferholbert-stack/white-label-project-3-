import { supabase } from '../lib/supabase';
import type { Solution, SolutionStack } from '../types';

export interface ResellKit {
  id: string;
  title: string;
  price: number;
  value: string;
  description: string;
  tags: string[];
  features: string[];
  category: string;
  is_featured: boolean;
  assets: any[];
  required_tier: string;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  features: string[];
  max_clients: number;
  max_downloads: number;
  support_level: string;
  is_active: boolean;
  sort_order: number;
}

export interface Purchase {
  id: string;
  user_id: string;
  item_type: 'solution' | 'stack' | 'resell_kit';
  item_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  created_at: string;
}

export const marketplaceService = {
  async getAllSolutions(): Promise<Solution[]> {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getSolutionById(id: string): Promise<Solution | null> {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getFeaturedSolutions(): Promise<Solution[]> {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data || [];
  },

  async searchSolutions(query: string, filters?: any): Promise<Solution[]> {
    let queryBuilder = supabase
      .from('solutions')
      .select('*');

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,short_description.ilike.%${query}%,tags.cs.["${query}"]`);
    }

    if (filters?.category) {
      queryBuilder = queryBuilder.eq('primary_category', filters.category);
    }

    if (filters?.whitelabelType) {
      queryBuilder = queryBuilder.eq('whitelabel_type', filters.whitelabelType);
    }

    const { data, error } = await queryBuilder.order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllStacks(): Promise<SolutionStack[]> {
    const { data, error } = await supabase
      .from('solution_stacks')
      .select('*')
      .order('is_featured', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getStackById(id: string): Promise<SolutionStack | null> {
    const { data, error } = await supabase
      .from('solution_stacks')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getFeaturedStacks(): Promise<SolutionStack[]> {
    const { data, error } = await supabase
      .from('solution_stacks')
      .select('*')
      .eq('is_featured', true)
      .limit(6);

    if (error) throw error;
    return data || [];
  },

  async getAllResellKits(): Promise<ResellKit[]> {
    const { data, error } = await supabase
      .from('resell_kits')
      .select('*')
      .order('is_featured', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getResellKitById(id: string): Promise<ResellKit | null> {
    const { data, error } = await supabase
      .from('resell_kits')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getMembershipTiers(): Promise<MembershipTier[]> {
    const { data, error } = await supabase
      .from('membership_tiers')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getUserMembership(userId: string) {
    const { data, error } = await supabase
      .from('user_memberships')
      .select('*, tier:membership_tiers(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createPurchase(userId: string, itemType: string, itemId: string, amount: number): Promise<Purchase> {
    const { data, error } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId,
        amount: amount,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addToFavorites(userId: string, itemType: string, itemId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromFavorites(userId: string, itemType: string, itemId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId);

    if (error) throw error;
  },

  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async createSolutionReview(solutionId: string, userId: string, rating: number, title: string, comment: string) {
    const { data, error } = await supabase
      .from('solution_reviews')
      .insert({
        solution_id: solutionId,
        user_id: userId,
        rating: rating,
        title: title,
        comment: comment,
        is_verified_purchase: false
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getSolutionReviews(solutionId: string) {
    const { data, error } = await supabase
      .from('solution_reviews')
      .select('*, user:profiles(full_name, company_name)')
      .eq('solution_id', solutionId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getManagedVendors(agencyId: string) {
    const { data, error } = await supabase
      .from('managed_vendors')
      .select('*, solution:solutions(*)')
      .eq('agency_id', agencyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createManagedVendor(agencyId: string, vendorData: any) {
    const { data, error } = await supabase
      .from('managed_vendors')
      .insert({
        agency_id: agencyId,
        ...vendorData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateManagedVendor(vendorId: string, updates: any) {
    const { data, error } = await supabase
      .from('managed_vendors')
      .update(updates)
      .eq('id', vendorId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteManagedVendor(vendorId: string) {
    const { error } = await supabase
      .from('managed_vendors')
      .delete()
      .eq('id', vendorId);

    if (error) throw error;
  }
};
