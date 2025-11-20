'use server'

import { supabase } from './supabase'
import { OnboardingData, calculateCalories } from './types'

export async function saveUserProfile(email: string, data: OnboardingData) {
  const calories = calculateCalories(data)
  
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .insert({
      user_email: email,
      gender: data.gender || 'outro',
      workouts_per_week: data.workoutsPerWeek || '0-2',
      heard_from: data.heardFrom || 'outro',
      tried_other_apps: data.triedOtherApps || false,
      height: data.height || 170,
      weight: data.weight || 70,
      birth_date: data.birthDate || '1990-01-01',
      has_trainer: data.hasTrainer || false,
      goal: data.goal || 'manter',
      target_weight: data.targetWeight || 70,
      goal_speed: data.goalSpeed || 'moderado',
      weekly_weight_goal: data.weeklyWeightGoal || 0.5,
      obstacles: data.obstacles || [],
      diet_type: data.dietType || 'classico',
      achievements: data.achievements || [],
      daily_calories: calories.dailyCalories,
      daily_protein: calories.protein,
      daily_carbs: calories.carbs,
      daily_fat: calories.fat,
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
    .eq('user_email', email)
    .single()

  if (error) throw error
  return data
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
      ...meal,
    })
    .select()
    .single()

  if (error) throw error

  // Atualizar log diário
  await updateDailyLog(userId, meal)

  return data
}

export async function getMealsToday(userId: string) {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', `${today}T00:00:00`)
    .lte('created_at', `${today}T23:59:59`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function updateDailyLog(
  userId: string,
  meal: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
) {
  const today = new Date().toISOString().split('T')[0]

  // Buscar log existente
  const { data: existingLog } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('log_date', today)
    .single()

  if (existingLog) {
    // Atualizar log existente
    const { error } = await supabase
      .from('daily_logs')
      .update({
        total_calories: existingLog.total_calories + meal.calories,
        total_protein: existingLog.total_protein + meal.protein,
        total_carbs: existingLog.total_carbs + meal.carbs,
        total_fat: existingLog.total_fat + meal.fat,
      })
      .eq('id', existingLog.id)

    if (error) throw error
  } else {
    // Criar novo log
    const { error } = await supabase
      .from('daily_logs')
      .insert({
        user_id: userId,
        log_date: today,
        total_calories: meal.calories,
        total_protein: meal.protein,
        total_carbs: meal.carbs,
        total_fat: meal.fat,
      })

    if (error) throw error
  }
}

export async function getDailyLog(userId: string, date?: string) {
  const targetDate = date || new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('log_date', targetDate)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  
  return data || {
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
  }
}

export async function getWeeklyProgress(userId: string) {
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('log_date', weekAgo.toISOString().split('T')[0])
    .lte('log_date', today.toISOString().split('T')[0])
    .order('log_date', { ascending: true })

  if (error) throw error
  return data || []
}

export async function updateWeight(userId: string, weight: number) {
  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase
    .from('daily_logs')
    .upsert({
      user_id: userId,
      log_date: today,
      current_weight: weight,
    })

  if (error) throw error
}
