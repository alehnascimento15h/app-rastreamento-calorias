import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          created_at: string
          gender: string
          workouts_per_week: string
          heard_from: string
          tried_other_apps: boolean
          height: number
          weight: number
          birth_date: string
          has_trainer: boolean
          goal: string
          target_weight: number
          goal_speed: string
          obstacles: string[]
          diet_type: string
          achievements: string[]
          daily_calories: number
          daily_protein: number
          daily_carbs: number
          daily_fat: number
        }
        Insert: {
          id?: string
          created_at?: string
          gender: string
          workouts_per_week: string
          heard_from: string
          tried_other_apps: boolean
          height: number
          weight: number
          birth_date: string
          has_trainer: boolean
          goal: string
          target_weight: number
          goal_speed: string
          obstacles: string[]
          diet_type: string
          achievements: string[]
          daily_calories?: number
          daily_protein?: number
          daily_carbs?: number
          daily_fat?: number
        }
        Update: {
          id?: string
          created_at?: string
          gender?: string
          workouts_per_week?: string
          heard_from?: string
          tried_other_apps?: boolean
          height?: number
          weight?: number
          birth_date?: string
          has_trainer?: boolean
          goal?: string
          target_weight?: number
          goal_speed?: string
          obstacles?: string[]
          diet_type?: string
          achievements?: string[]
          daily_calories?: number
          daily_protein?: number
          daily_carbs?: number
          daily_fat?: number
        }
      }
      meals: {
        Row: {
          id: string
          user_id: string
          created_at: string
          meal_name: string
          calories: number
          protein: number
          carbs: number
          fat: number
          image_url: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          meal_name: string
          calories: number
          protein: number
          carbs: number
          fat: number
          image_url?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          meal_name?: string
          calories?: number
          protein?: number
          carbs?: number
          fat?: number
          image_url?: string | null
        }
      }
    }
  }
}
