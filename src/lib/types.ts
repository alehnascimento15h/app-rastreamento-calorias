export type OnboardingData = {
  // Tela 1
  gender?: 'masculino' | 'feminino' | 'outro'
  
  // Tela 2
  workoutsPerWeek?: '0-2' | '3-5' | '6+'
  
  // Tela 3
  heardFrom?: 'google' | 'tiktok' | 'instagram' | 'amigo' | 'tv' | 'x' | 'appstore' | 'facebook' | 'youtube' | 'outro'
  
  // Tela 4
  triedOtherApps?: boolean
  
  // Tela 6
  height?: number
  weight?: number
  
  // Tela 7
  birthDate?: string
  
  // Tela 8
  hasTrainer?: boolean
  
  // Tela 9
  goal?: 'perder' | 'manter' | 'ganhar'
  
  // Tela 10
  targetWeight?: number
  
  // Tela 12
  goalSpeed?: 'lento' | 'moderado' | 'rapido'
  weeklyWeightGoal?: number
  
  // Tela 14
  obstacles?: string[]
  
  // Tela 15
  dietType?: 'classico' | 'pescetariano' | 'vegetariano' | 'vegano'
  
  // Tela 16
  achievements?: string[]
}

export const calculateCalories = (data: OnboardingData): {
  dailyCalories: number
  protein: number
  carbs: number
  fat: number
} => {
  if (!data.weight || !data.height || !data.birthDate || !data.gender) {
    return { dailyCalories: 2000, protein: 150, carbs: 200, fat: 60 }
  }

  // Calcular idade
  const birthYear = new Date(data.birthDate).getFullYear()
  const age = new Date().getFullYear() - birthYear

  // Calcular TMB (Taxa Metabólica Basal) usando fórmula de Harris-Benedict
  let bmr = 0
  if (data.gender === 'masculino') {
    bmr = 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * age)
  } else {
    bmr = 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * age)
  }

  // Fator de atividade baseado em treinos por semana
  let activityFactor = 1.2 // Sedentário
  if (data.workoutsPerWeek === '3-5') activityFactor = 1.55 // Moderado
  if (data.workoutsPerWeek === '6+') activityFactor = 1.725 // Muito ativo

  // Calorias de manutenção
  let maintenanceCalories = bmr * activityFactor

  // Ajustar baseado no objetivo
  let dailyCalories = maintenanceCalories
  if (data.goal === 'perder') {
    dailyCalories = maintenanceCalories - 500 // Déficit de 500 cal
  } else if (data.goal === 'ganhar') {
    dailyCalories = maintenanceCalories + 300 // Superávit de 300 cal
  }

  // Ajustar baseado na velocidade da meta
  if (data.goalSpeed === 'rapido' && data.goal === 'perder') {
    dailyCalories -= 200
  } else if (data.goalSpeed === 'lento' && data.goal === 'perder') {
    dailyCalories += 100
  }

  // Calcular macros
  const protein = Math.round(data.weight * 2) // 2g por kg
  const fat = Math.round((dailyCalories * 0.25) / 9) // 25% das calorias
  const carbs = Math.round((dailyCalories - (protein * 4) - (fat * 9)) / 4)

  return {
    dailyCalories: Math.round(dailyCalories),
    protein,
    carbs,
    fat
  }
}
