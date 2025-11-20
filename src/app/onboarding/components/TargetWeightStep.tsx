'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Target } from 'lucide-react'

type TargetWeightStepProps = {
  currentWeight: number
  goal: 'perder' | 'manter' | 'ganhar'
  onNext: (targetWeight: number) => void
}

export function TargetWeightStep({ currentWeight, goal, onNext }: TargetWeightStepProps) {
  const [targetWeight, setTargetWeight] = useState('')

  const handleSubmit = () => {
    const weight = parseFloat(targetWeight)
    if (weight > 0) {
      onNext(weight)
    }
  }

  const getRecommendation = () => {
    if (goal === 'perder') {
      return Math.max(currentWeight - 15, 50)
    } else if (goal === 'ganhar') {
      return currentWeight + 10
    }
    return currentWeight
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Target className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">Qual é seu peso desejado?</h1>
          <p className="text-gray-400 text-lg">
            Peso atual: <span className="text-white font-semibold">{currentWeight} kg</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Peso desejado (kg)</label>
            <Input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="Ex: 70"
              className="bg-gray-900 border-gray-700 text-white text-2xl text-center h-16"
            />
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400 mb-2">Recomendação baseada no seu objetivo:</p>
            <p className="text-2xl font-bold text-white">{getRecommendation()} kg</p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!targetWeight || parseFloat(targetWeight) <= 0}
            className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg font-semibold"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
