'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Dumbbell } from 'lucide-react'

type WorkoutsStepProps = {
  onNext: (workouts: '0-2' | '3-5' | '6+') => void
}

export function WorkoutsStep({ onNext }: WorkoutsStepProps) {
  const [selected, setSelected] = useState<'0-2' | '3-5' | '6+' | null>(null)

  const handleSelect = (workouts: '0-2' | '3-5' | '6+') => {
    setSelected(workouts)
    setTimeout(() => onNext(workouts), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Quantos treinos por semana?</h1>
          <p className="text-gray-400 text-lg">Isso nos ajuda a calcular suas necessidades</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => handleSelect('0-2')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === '0-2'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <Dumbbell className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">0-2 treinos</div>
                <div className={`text-sm ${selected === '0-2' ? 'text-gray-700' : 'text-gray-400'}`}>
                  Iniciante ou sedentário
                </div>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('3-5')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === '3-5'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <Dumbbell className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">3-5 treinos</div>
                <div className={`text-sm ${selected === '3-5' ? 'text-gray-700' : 'text-gray-400'}`}>
                  Moderadamente ativo
                </div>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('6+')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === '6+'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <Dumbbell className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">6+ treinos</div>
                <div className={`text-sm ${selected === '6+' ? 'text-gray-700' : 'text-gray-400'}`}>
                  Muito ativo ou atleta
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
