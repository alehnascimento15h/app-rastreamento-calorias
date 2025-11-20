'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Plus, TrendingUp, Target, Flame, Apple, Trash2 } from 'lucide-react'
import { getUserProfile, addMeal, getMealsToday, getDailyLog, getWeeklyProgress } from '@/lib/supabase-actions'

type UserProfile = {
  id: string
  user_email: string
  weight: number
  target_weight: number
  weekly_weight_goal: number
  daily_calories: number
  daily_protein: number
  daily_carbs: number
  daily_fat: number
}

type Meal = {
  id: string
  meal_name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image_url: string | null
  created_at: string
}

type DailyLog = {
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  current_weight?: number
}

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
  })
  const [meals, setMeals] = useState<Meal[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [foodData, setFoodData] = useState<{
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Verificar se há email salvo no localStorage
    const savedEmail = localStorage.getItem('userEmail')
    if (savedEmail) {
      setUserEmail(savedEmail)
      loadUserData(savedEmail)
    }
  }, [])

  const loadUserData = async (email: string) => {
    setLoading(true)
    try {
      const profile = await getUserProfile(email)
      setUserProfile(profile)
      
      const log = await getDailyLog(profile.id)
      setDailyLog(log)
      
      const todayMeals = await getMealsToday(profile.id)
      setMeals(todayMeals)
      
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      alert('Usuário não encontrado. Complete o onboarding primeiro.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail)
      loadUserData(userEmail)
    }
  }

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        analyzeFood()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFood = () => {
    setAnalyzing(true)
    // Simulação de análise de IA (em produção usaria OpenAI Vision API)
    setTimeout(() => {
      const foods = [
        { name: 'Prato de Frango com Arroz e Salada', calories: 450, protein: 35, carbs: 48, fat: 12 },
        { name: 'Sanduíche Natural', calories: 320, protein: 18, carbs: 42, fat: 8 },
        { name: 'Salada Caesar com Frango', calories: 380, protein: 28, carbs: 22, fat: 18 },
        { name: 'Macarrão com Molho de Tomate', calories: 420, protein: 12, carbs: 68, fat: 10 },
        { name: 'Omelete com Legumes', calories: 280, protein: 22, carbs: 8, fat: 18 },
      ]
      const randomFood = foods[Math.floor(Math.random() * foods.length)]
      setFoodData(randomFood)
      setAnalyzing(false)
    }, 2000)
  }

  const addToDaily = async () => {
    if (foodData && userProfile) {
      try {
        await addMeal(userProfile.id, {
          meal_name: foodData.name,
          calories: foodData.calories,
          protein: foodData.protein,
          carbs: foodData.carbs,
          fat: foodData.fat,
          image_url: selectedImage || undefined,
        })

        // Atualizar estado local
        setDailyLog({
          total_calories: dailyLog.total_calories + foodData.calories,
          total_protein: dailyLog.total_protein + foodData.protein,
          total_carbs: dailyLog.total_carbs + foodData.carbs,
          total_fat: dailyLog.total_fat + foodData.fat,
        })

        // Recarregar refeições
        const todayMeals = await getMealsToday(userProfile.id)
        setMeals(todayMeals)

        setSelectedImage(null)
        setFoodData(null)
        alert('Refeição adicionada com sucesso!')
      } catch (error) {
        console.error('Erro ao adicionar refeição:', error)
        alert('Erro ao adicionar refeição. Tente novamente.')
      }
    }
  }

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-800 p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">BR Rastreamento Ai Cal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 h-12 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>
            <p className="text-sm text-gray-400 text-center">
              Não tem conta? Complete o onboarding primeiro.
            </p>
          </form>
        </Card>
      </div>
    )
  }

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando seus dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">BR Rastreamento Ai Cal</h1>
          <p className="text-gray-400">Olá, {userProfile.user_email}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Resumo de Calorias */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Calorias Restantes</p>
              <p className="text-5xl font-bold text-white">
                {userProfile.daily_calories - dailyLog.total_calories}
              </p>
              <p className="text-gray-400">
                {dailyLog.total_calories} / {userProfile.daily_calories} kcal
              </p>
            </div>

            <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500"
                style={{ width: `${getPercentage(dailyLog.total_calories, userProfile.daily_calories)}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="text-center space-y-2">
              <Flame className="w-6 h-6 mx-auto text-white" />
              <p className="text-xs text-gray-400">Proteína</p>
              <p className="text-xl font-bold">{Math.round(dailyLog.total_protein)}g</p>
              <p className="text-xs text-gray-500">de {userProfile.daily_protein}g</p>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${getPercentage(dailyLog.total_protein, userProfile.daily_protein)}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="text-center space-y-2">
              <Apple className="w-6 h-6 mx-auto text-white" />
              <p className="text-xs text-gray-400">Carboidratos</p>
              <p className="text-xl font-bold">{Math.round(dailyLog.total_carbs)}g</p>
              <p className="text-xs text-gray-500">de {userProfile.daily_carbs}g</p>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${getPercentage(dailyLog.total_carbs, userProfile.daily_carbs)}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="text-center space-y-2">
              <Target className="w-6 h-6 mx-auto text-white" />
              <p className="text-xs text-gray-400">Gordura</p>
              <p className="text-xl font-bold">{Math.round(dailyLog.total_fat)}g</p>
              <p className="text-xs text-gray-500">de {userProfile.daily_fat}g</p>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${getPercentage(dailyLog.total_fat, userProfile.daily_fat)}%` }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Botão de Câmera */}
        <div className="text-center space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageCapture}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-white text-black hover:bg-gray-200 h-16 text-lg font-semibold"
          >
            <Camera className="w-6 h-6 mr-2" />
            Tirar Foto da Comida
          </Button>
        </div>

        {/* Análise de Imagem */}
        {selectedImage && (
          <Card className="bg-gray-900 border-gray-700 p-6 space-y-4">
            <img
              src={selectedImage}
              alt="Comida capturada"
              className="w-full h-48 object-cover rounded-lg"
            />
            
            {analyzing ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Analisando com IA...</p>
              </div>
            ) : foodData ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{foodData.name}</h3>
                  <p className="text-3xl font-bold text-white">{foodData.calories} kcal</p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-sm text-gray-400">Proteína</p>
                    <p className="text-lg font-semibold">{foodData.protein}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Carboidratos</p>
                    <p className="text-lg font-semibold">{foodData.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Gordura</p>
                    <p className="text-lg font-semibold">{foodData.fat}g</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={addToDaily}
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedImage(null)
                      setFoodData(null)
                    }}
                    variant="outline"
                    className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        )}

        {/* Refeições de Hoje */}
        {meals.length > 0 && (
          <Card className="bg-gray-900 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Refeições de Hoje</h3>
            <div className="space-y-3">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{meal.meal_name}</p>
                    <p className="text-sm text-gray-400">
                      {meal.calories} kcal • P: {Math.round(meal.protein)}g • C: {Math.round(meal.carbs)}g • G: {Math.round(meal.fat)}g
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(meal.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Meta Semanal */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Meta Semanal</h3>
              <p className="text-sm text-gray-400">Progresso desta semana</p>
            </div>
            <TrendingUp className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Peso inicial</span>
              <span className="font-semibold">{userProfile.weight} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Peso meta</span>
              <span className="font-semibold">{userProfile.target_weight} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Meta semanal</span>
              <span className="font-semibold">-{userProfile.weekly_weight_goal} kg</span>
            </div>
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-all"
                style={{ width: '70%' }}
              />
            </div>
            <p className="text-xs text-gray-400 text-center">Continue assim! Você está no caminho certo.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
