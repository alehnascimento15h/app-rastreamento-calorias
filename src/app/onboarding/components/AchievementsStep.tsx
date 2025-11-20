'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Check } from 'lucide-react'

type AchievementsStepProps = {
  onNext: (achievements: string[]) => void
}

const achievementOptions = [
  { id: 'saudavel', label: 'Comer e viver de forma saudável' },
  { id: 'energia', label: 'Aumentar minha energia e meu humor' },
  { id: 'motivado', label: 'Manter-se motivado e consistente' },
  { id: 'corpo', label: 'Sentir-me melhor com meu corpo' },
]

export function AchievementsStep({ onNext }: AchievementsStepProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleAchievement = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    if (selected.length > 0) {
      onNext(selected)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Heart className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">O que você gostaria de alcançar?</h1>
          <p className="text-gray-400 text-lg">Selecione todos que se aplicam</p>
        </div>

        <div className="space-y-3">
          {achievementOptions.map((option) => (
            <Card
              key={option.id}
              onClick={() => toggleAchievement(option.id)}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selected.includes(option.id)
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option.label}</span>
                {selected.includes(option.id) && (
                  <Check className="w-6 h-6" />
                )}
              </div>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg font-semibold disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
