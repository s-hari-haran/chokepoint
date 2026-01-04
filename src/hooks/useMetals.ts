import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Metal, CountrySupply, IndustryDependency, ChokePoint, NewsUpdate } from '@/types/chokepoint';

export function useMetals() {
  return useQuery({
    queryKey: ['metals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metals')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Metal[];
    },
  });
}

export function useCountrySupply(metalId: string | null) {
  return useQuery({
    queryKey: ['country_supply', metalId],
    queryFn: async () => {
      if (!metalId) return [];
      
      const { data, error } = await supabase
        .from('country_supply')
        .select('*')
        .eq('metal_id', metalId)
        .order('percent_control', { ascending: false });
      
      if (error) throw error;
      return data as CountrySupply[];
    },
    enabled: !!metalId,
  });
}

export function useIndustryDependency(metalId: string | null) {
  return useQuery({
    queryKey: ['industry_dependency', metalId],
    queryFn: async () => {
      if (!metalId) return [];
      
      const { data, error } = await supabase
        .from('industry_dependency')
        .select('*')
        .eq('metal_id', metalId)
        .order('dependency_score', { ascending: false });
      
      if (error) throw error;
      return data as IndustryDependency[];
    },
    enabled: !!metalId,
  });
}

export function useAllIndustryDependencies() {
  return useQuery({
    queryKey: ['all_industry_dependencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_dependency')
        .select('*, metals(name)')
        .order('dependency_score', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useAllCountrySupplies() {
  return useQuery({
    queryKey: ['all_country_supplies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('country_supply')
        .select('*, metals(name)')
        .order('percent_control', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useChokePoints(metalId: string | null, activeOnly = true) {
  return useQuery({
    queryKey: ['choke_points', metalId, activeOnly],
    queryFn: async () => {
      let query = supabase
        .from('choke_points')
        .select('*')
        .order('severity', { ascending: false });
      
      if (metalId) {
        query = query.eq('metal_id', metalId);
      }
      
      if (activeOnly) {
        query = query.eq('active', true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ChokePoint[];
    },
    enabled: metalId === null || !!metalId,
  });
}

export function useNewsUpdates(metalId: string | null, limit = 15) {
  return useQuery({
    queryKey: ['news_updates', metalId, limit],
    queryFn: async () => {
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
      
      let query = supabase
        .from('news_updates')
        .select('*, metals(name)')
        .gte('scraped_at', sixtyDaysAgo.toISOString())
        .order('scraped_at', { ascending: false })
        .limit(limit);
      
      if (metalId) {
        query = query.eq('metal_id', metalId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
}
