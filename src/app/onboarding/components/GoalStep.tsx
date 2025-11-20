'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingDown, Minus, TrendingUp } from 'lucide-react'

type GoalStepProps = {
  onNext: (goal: 'perder' | 'manter' | 'ganhar') => void
}

export function GoalStep({ onNext }: GoalStepProps) {
  const [selected, setSelected] = useState<'perder' | 'manter' | 'ganhar' | null>(null)

  const handleSelect = (goal: 'perder' | 'manter' | 'ganhar') => {
    setSelected(goal)
    setTimeout(() => onNext(goal), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Qual é seu objetivo?</h1>
          <p className="text-gray-400 text-lg">Vamos personalizar seu plano</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => handleSelect('perder')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'perder'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <TrendingDown className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Perder peso</div>
                <div className={`text-sm ${selected === 'perder' ? 'text-gray-700' : 'text-gray-400'}`}>
                  Déficit calórico controlado
                </div>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('manter')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'manter'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <Minus className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Manter peso</div>
                <div className={`text-sm ${selected === 'manter' ? 'text-gray-700' : 'text-gray-400'}`}>
                  Equilíbrio calórico
                </div>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('ganhar')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'ganhar'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Ganhar peso</div>
                <div className={`text-sm ${selected === 'ganhar' ? 'text-gray-700' : 'text-gray-400'}`}>
                  Superávit calórico controlado
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
