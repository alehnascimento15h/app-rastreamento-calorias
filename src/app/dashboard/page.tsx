'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Plus, TrendingUp, Target, Flame, Apple, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type UserProfile = {
  id: string
  daily_calories: number
  daily_protein: number
  daily_carbs: number
  daily_fat: number
  weight: number
  target_weight: number
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

export default function Dashboard() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
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
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/')
        return
      }

      // Carregar perfil do usuário
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error || !profile) {
        // Se não tem perfil, redirecionar para onboarding
        router.push('/onboarding')
        return
      }

      setUserProfile(profile)
      loadMeals(session.user.id)
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const loadMeals = async (userId: string) => {
    try {
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', `${today}T00:00:00`)
        .lte('created_at', `${today}T23:59:59`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMeals(data || [])
    } catch (error) {
      console.error('Erro ao carregar refeições:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
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
    if (!foodData || !userProfile) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { error } = await supabase
        .from('meals')
        .insert({
          user_id: session.user.id,
          meal_name: foodData.name,
          calories: foodData.calories,
          protein: foodData.protein,
          carbs: foodData.carbs,
          fat: foodData.fat,
          image_url: selectedImage,
        })

      if (error) throw error

      // Recarregar refeições
      await loadMeals(session.user.id)

      setSelectedImage(null)
      setFoodData(null)
    } catch (error) {
      console.error('Erro ao adicionar refeição:', error)
      alert('Erro ao adicionar refeição. Tente novamente.')
    }
  }

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const calculateTotals = () => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }

  if (loading || !userProfile || !mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando seus dados...</p>
        </div>
      </div>
    )
  }

  const totals = calculateTotals()
  const caloriesRemaining = userProfile.daily_calories - totals.calories

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">BR Rastreamento Ai Cal</h1>
            <p className="text-gray-400">Seu progresso diário</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Resumo de Calorias */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Calorias Restantes</p>
              <p className="text-5xl font-bold text-white" suppressHydrationWarning>
                {caloriesRemaining}
              </p>
              <p className="text-gray-400">
                {totals.calories} / {userProfile.daily_calories} kcal
              </p>
            </div>

            <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-500"
                style={{ width: `${getPercentage(totals.calories, userProfile.daily_calories)}%` }}
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
              <p className="text-xl font-bold">{Math.round(totals.protein)}g</p>
              <p className="text-xs text-gray-500">de {userProfile.daily_protein}g</p>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${getPercentage(totals.protein, userProfile.daily_protein)}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="text-center space-y-2">
              <Apple className="w-6 h-6 mx-auto text-white" />
              <p className="text-xs text-gray-400">Carboidratos</p>
              <p className="text-xl font-bold">{Math.round(totals.carbs)}g</p>
              <p className="text-xs text-gray-500">de {userProfile.daily_carbs}g</p>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${getPercentage(totals.carbs, userProfile.daily_carbs)}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-4">
            <div className="text-center space-y-2">
              <Target className="w-6 h-6 mx-auto text-white" />
              <p className="text-xs text-gray-400">Gordura</p>
              <p className="text-xl font-bold">{Math.round(totals.fat)}g</p>
              <p className="text-xs text-gray-500">de {userProfile.daily_fat}g</p>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${getPercentage(totals.fat, userProfile.daily_fat)}%` }}
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
