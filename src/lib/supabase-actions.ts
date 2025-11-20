'use server'

import { supabase } from './supabase'
import { OnboardingData, calculateCalories } from './types'

export async function saveUserProfile(email: string, data: OnboardingData) {
  const calories = calculateCalories(data)
  
  // Calcular idade a partir da data de nascimento
  const birthDate = data.birthDate ? new Date(data.birthDate) : new Date('1990-01-01')
  const age = new Date().getFullYear() - birthDate.getFullYear()
  
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .insert({
      name: email.split('@')[0],
      age: age,
      weight: data.weight || 70,
      height: data.height || 170,
      gender: data.gender || 'outro',
      goal: data.goal || 'manter',
      target_weight: data.targetWeight || 70,
      activity_level: data.workoutsPerWeek || '0-2',
      daily_calorie_goal: calories.dailyCalories,
      workouts_per_week: data.workoutsPerWeek || '0-2',
      weight_goal: data.goalSpeed || 'moderado',
      has_used_calorie_apps: data.triedOtherApps || false,
      barriers: data.obstacles || [],
      aspirations: data.achievements || [],
    })
    .select()
    .single()

  if (error) throw error
  return profile
}

export async function getUserProfile(email: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('name', email.split('@')[0])
    .single()

  if (error) throw error
  
  // Mapear para o formato esperado pelo dashboard
  return {
    id: data.id,
    user_email: email,
    weight: data.weight,
    target_weight: data.target_weight,
    weekly_weight_goal: 0.5, // valor padrão
    daily_calories: data.daily_calorie_goal,
    daily_protein: Math.round(data.daily_calorie_goal * 0.3 / 4), // 30% das calorias
    daily_carbs: Math.round(data.daily_calorie_goal * 0.4 / 4), // 40% das calorias
    daily_fat: Math.round(data.daily_calorie_goal * 0.3 / 9), // 30% das calorias
  }
}

export async function addMeal(
  userId: string,
  meal: {
    meal_name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    image_url?: string
  }
) {
  const { data, error } = await supabase
    .from('meals')
    .insert({
      user_id: userId,
      timestamp: new Date().toISOString(),
      total_calories: meal.calories,
      total_protein: meal.protein,
      total_carbs: meal.carbs,
      total_fat: meal.fat,
      image_url: meal.image_url || null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getMealsToday(userId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', today.toISOString())
    .lt('timestamp', tomorrow.toISOString())
    .order('timestamp', { ascending: false })

  if (error) throw error
  
  // Mapear para o formato esperado
  return (data || []).map(meal => ({
    id: meal.id,
    meal_name: 'Refeição', // A tabela não tem meal_name
    calories: meal.total_calories,
    protein: meal.total_protein,
    carbs: meal.total_carbs,
    fat: meal.total_fat,
    image_url: meal.image_url,
    created_at: meal.timestamp || meal.created_at,
  }))
}

export async function getDailyLog(userId: string, date?: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { data, error } = await supabase
    .from('meals')
    .select('total_calories, total_protein, total_carbs, total_fat')
    .eq('user_id', userId)
    .gte('timestamp', today.toISOString())
    .lt('timestamp', tomorrow.toISOString())

  if (error && error.code !== 'PGRST116') throw error
  
  // Somar todos os valores
  const totals = (data || []).reduce(
    (acc, meal) => ({
      total_calories: acc.total_calories + (meal.total_calories || 0),
      total_protein: acc.total_protein + (meal.total_protein || 0),
      total_carbs: acc.total_carbs + (meal.total_carbs || 0),
      total_fat: acc.total_fat + (meal.total_fat || 0),
    }),
    {
      total_calories: 0,
      total_protein: 0,
      total_carbs: 0,
      total_fat: 0,
    }
  )
  
  return totals
}

export async function getWeeklyProgress(userId: string) {
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .gte('timestamp', weekAgo.toISOString())
    .lte('timestamp', today.toISOString())
    .order('timestamp', { ascending: true })

  if (error) throw error
  return data || []
}

export async function updateWeight(userId: string, weight: number) {
  const { error } = await supabase
    .from('user_profiles')
    .update({ weight: weight })
    .eq('id', userId)

  if (error) throw error
}
