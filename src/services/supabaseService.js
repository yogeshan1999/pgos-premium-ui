import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseConfigured = Boolean(supabase);

export async function safeSelect(table) {
  if (!supabase) return { data: [], error: null, source: 'mock' };
  const { data, error } = await supabase.from(table).select('*');
  return { data: data ?? [], error, source: 'supabase' };
}
