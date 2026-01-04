export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      choke_points: {
        Row: {
          active: boolean
          country_code: string
          created_at: string
          description: string
          id: string
          last_updated: string
          metal_id: string
          severity: number
          source_url: string | null
          type: string
        }
        Insert: {
          active?: boolean
          country_code: string
          created_at?: string
          description: string
          id?: string
          last_updated?: string
          metal_id: string
          severity: number
          source_url?: string | null
          type: string
        }
        Update: {
          active?: boolean
          country_code?: string
          created_at?: string
          description?: string
          id?: string
          last_updated?: string
          metal_id?: string
          severity?: number
          source_url?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "choke_points_metal_id_fkey"
            columns: ["metal_id"]
            isOneToOne: false
            referencedRelation: "metals"
            referencedColumns: ["id"]
          },
        ]
      }
      country_supply: {
        Row: {
          country_code: string
          country_name: string
          created_at: string
          id: string
          metal_id: string
          percent_control: number
          source_url: string | null
          updated_at: string
          year: number
        }
        Insert: {
          country_code: string
          country_name: string
          created_at?: string
          id?: string
          metal_id: string
          percent_control: number
          source_url?: string | null
          updated_at?: string
          year?: number
        }
        Update: {
          country_code?: string
          country_name?: string
          created_at?: string
          id?: string
          metal_id?: string
          percent_control?: number
          source_url?: string | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "country_supply_metal_id_fkey"
            columns: ["metal_id"]
            isOneToOne: false
            referencedRelation: "metals"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_dependency: {
        Row: {
          created_at: string
          dependency_score: number
          id: string
          industry: string
          metal_id: string
          rationale: string | null
        }
        Insert: {
          created_at?: string
          dependency_score: number
          id?: string
          industry: string
          metal_id: string
          rationale?: string | null
        }
        Update: {
          created_at?: string
          dependency_score?: number
          id?: string
          industry?: string
          metal_id?: string
          rationale?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industry_dependency_metal_id_fkey"
            columns: ["metal_id"]
            isOneToOne: false
            referencedRelation: "metals"
            referencedColumns: ["id"]
          },
        ]
      }
      metals: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          symbol: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          symbol: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          symbol?: string
        }
        Relationships: []
      }
      news_updates: {
        Row: {
          headline: string
          id: string
          metal_id: string | null
          published_date: string | null
          scraped_at: string
          source_name: string
          source_url: string
          summary: string | null
        }
        Insert: {
          headline: string
          id?: string
          metal_id?: string | null
          published_date?: string | null
          scraped_at?: string
          source_name: string
          source_url: string
          summary?: string | null
        }
        Update: {
          headline?: string
          id?: string
          metal_id?: string | null
          published_date?: string | null
          scraped_at?: string
          source_name?: string
          source_url?: string
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_updates_metal_id_fkey"
            columns: ["metal_id"]
            isOneToOne: false
            referencedRelation: "metals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
