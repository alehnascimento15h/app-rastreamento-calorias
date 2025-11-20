'use client'

import { Button } from '@/components/ui/button'
import { TrendingUp, Target } from 'lucide-react'
import { OnboardingData } from '@/lib/types'

type PotentialStepProps = {
  data: OnboardingData
  onNext: () => void
}

export function PotentialStep({ data, onNext }: PotentialStepProps) {
  const getWeeksToGoal = () => {
    if (!data.weight || !data.targetWeight || !data.weeklyWeightGoal) return 12
    const diff = Math.abs(data.weight - data.targetWeight)
    return Math.ceil(diff / data.weeklyWeightGoal)
  }

  const weeks = getWeeksToGoal()
  const months = Math.ceil(weeks / 4)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <TrendingUp className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">Você tem grande potencial!</h1>
          <p className="text-gray-400 text-lg">Baseado no seu perfil e objetivos</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">Tempo estimado para sua meta</p>
            <p className="text-5xl font-bold text-white">{months}</p>
            <p className="text-xl text-gray-300">meses</p>
            <p className="text-sm text-gray-500">({weeks} semanas)</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
              <span className="text-sm text-gray-400">Peso atual</span>
              <span className="text-lg font-semibold">{data.weight} kg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
              <span className="text-sm text-gray-400">Meta semanal</span>
              <span className="text-lg font-semibold">{data.weeklyWeightGoal} kg/semana</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
              <span className="text-sm text-gray-300 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Peso desejado
              </span>
              <span className="text-lg font-bold text-white">{data.targetWeight} kg</span>
            </div>
          </div>

          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-1000"
              style={{ width: '15%' }}
            />
          </div>
          <p className="text-center text-sm text-gray-400">Você está começando sua jornada!</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 text-center">
          <p className="text-sm text-gray-400 mb-1">💪 Frase motivacional</p>
          <p className="text-lg font-semibold text-white">
            "O sucesso é a soma de pequenos esforços repetidos dia após dia."
          </p>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
