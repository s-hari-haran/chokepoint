export interface Metal {
  id: string;
  name: string;
  symbol: string;
  description: string | null;
  created_at: string;
}

export interface CountrySupply {
  id: string;
  metal_id: string;
  country_code: string;
  country_name: string;
  percent_control: number;
  year: number;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface IndustryDependency {
  id: string;
  metal_id: string;
  industry: 'semiconductors' | 'evs' | 'defense' | 'renewables';
  dependency_score: number;
  rationale: string | null;
  created_at: string;
}

export interface ChokePoint {
  id: string;
  metal_id: string;
  type: 'export_control' | 'refining' | 'logistics';
  country_code: string;
  severity: number;
  active: boolean;
  description: string;
  source_url: string | null;
  last_updated: string;
  created_at: string;
}

export interface NewsUpdate {
  id: string;
  metal_id: string | null;
  headline: string;
  summary: string | null;
  source_name: string;
  source_url: string;
  published_date: string | null;
  scraped_at: string;
}

export type RiskLevel = 'low' | 'moderate' | 'high';

export interface ComputedRiskScore {
  metal_id: string;
  metal_name: string;
  industry: string;
  supply_concentration: number;
  dependency_score: number;
  risk_score: number;
  risk_level: RiskLevel;
}

export interface ExposureRanking {
  industry: string;
  metal_name: string;
  risk_score: number;
  risk_level: RiskLevel;
  top_supplier: string;
  top_supplier_percent: number;
}

export const INDUSTRY_LABELS: Record<string, string> = {
  semiconductors: 'Semiconductors',
  evs: 'Electric Vehicles',
  defense: 'Defense',
  renewables: 'Renewables',
};

export const CHOKE_TYPE_LABELS: Record<string, string> = {
  export_control: 'Export Control',
  refining: 'Refining Concentration',
  logistics: 'Logistics Risk',
};
