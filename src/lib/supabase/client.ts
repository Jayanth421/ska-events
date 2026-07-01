import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Supports both the new publishable key format and the legacy anon JWT key
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      languages: {
        Row: {
          id: string;
          code: string;
          name: string;
          native_name: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          native_name: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          native_name?: string;
          active?: boolean;
          updated_at?: string;
        };
      };
      translations: {
        Row: {
          id: string;
          language_code: string;
          translation_key: string;
          translated_value: string;
          module: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          language_code: string;
          translation_key: string;
          translated_value: string;
          module?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          language_code?: string;
          translation_key?: string;
          translated_value?: string;
          module?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          preferred_language: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          preferred_language?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          preferred_language?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};
