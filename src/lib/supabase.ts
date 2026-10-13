import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string;
  hasKey: boolean;
  mode: 'cloud' | 'local';
}

export function getSupabaseStatus(): SupabaseConfigStatus {
  return {
    isConfigured: isSupabaseConfigured,
    url: supabaseUrl ? `${supabaseUrl.substring(0, 24)}...` : 'Not provided',
    hasKey: Boolean(supabaseAnonKey),
    mode: isSupabaseConfigured ? 'cloud' : 'local'
  };
}
