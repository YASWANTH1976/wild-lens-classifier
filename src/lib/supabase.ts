import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      classifications: {
        Row: {
          id: string
          user_id: string
          image_url: string
          result: any
          confidence: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          result: any
          confidence: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          result?: any
          confidence?: number
          created_at?: string
        }
      }
    }
  }
}