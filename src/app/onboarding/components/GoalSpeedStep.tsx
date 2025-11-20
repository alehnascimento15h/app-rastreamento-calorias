'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Gauge, TrendingUp } from 'lucide-react'

type GoalSpeedStepProps = {
  goal: 'perder' | 'manter' | 'ganhar'
  onNext: (speed: 'lento' | 'moderado' | 'rapido', weeklyGoal: number) => void
}

export function GoalSpeedStep({ goal, onNext }: GoalSpeedStepProps) {
  const [selected, setSelected] = useState<'lento' | 'moderado' | 'rapido' | null>(null)

  const handleSelect = (speed: 'lento' | 'moderado' | 'rapido') => {
    setSelected(speed)
    const weeklyGoal = speed === 'lento' ? 0.25 : speed === 'moderado' ? 0.5 : 0.75
    setTimeout(() => onNext(speed, weeklyGoal), 300)
  }

  const getTitle = () => {
    if (goal === 'perder') return 'Quão rápido você quer perder peso?'
    if (goal === 'ganhar') return 'Quão rápido você quer ganhar peso?'
    return 'Qual seu ritmo ideal?'
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Gauge className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">{getTitle()}</h1>
          <p className="text-gray-400 text-lg">Escolha o ritmo que funciona para você</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => handleSelect('lento')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'lento'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Lento e Sustentável</div>
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className={`text-sm ${selected === 'lento' ? 'text-gray-700' : 'text-gray-400'}`}>
                0,25 kg por semana
              </div>
              <div className={`text-xs ${selected === 'lento' ? 'text-gray-600' : 'text-gray-500'}`}>
                Recomendado para resultados duradouros
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('moderado')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'moderado'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Moderado</div>
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className={`text-sm ${selected === 'moderado' ? 'text-gray-700' : 'text-gray-400'}`}>
                0,5 kg por semana
              </div>
              <div className={`text-xs ${selected === 'moderado' ? 'text-gray-600' : 'text-gray-500'}`}>
                Equilíbrio entre velocidade e sustentabilidade
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('rapido')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'rapido'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Rápido</div>
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className={`text-sm ${selected === 'rapido' ? 'text-gray-700' : 'text-gray-400'}`}>
                0,75 kg por semana
              </div>
              <div className={`text-xs ${selected === 'rapido' ? 'text-gray-600' : 'text-gray-500'}`}>
                Resultados mais rápidos, requer mais disciplina
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
