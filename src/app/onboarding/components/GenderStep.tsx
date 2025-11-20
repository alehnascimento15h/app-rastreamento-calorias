'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User, Users } from 'lucide-react'

type GenderStepProps = {
  onNext: (gender: 'masculino' | 'feminino' | 'outro') => void
}

export function GenderStep({ onNext }: GenderStepProps) {
  const [selected, setSelected] = useState<'masculino' | 'feminino' | 'outro' | null>(null)

  const handleSelect = (gender: 'masculino' | 'feminino' | 'outro') => {
    setSelected(gender)
    setTimeout(() => onNext(gender), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">BR Rastreamento Ai Cal</h1>
          <p className="text-gray-400 text-lg">Escolha seu gênero</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => handleSelect('masculino')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'masculino'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <User className="w-8 h-8" />
              <span className="text-xl font-semibold">Masculino</span>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('feminino')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'feminino'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <User className="w-8 h-8" />
              <span className="text-xl font-semibold">Feminino</span>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('outro')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'outro'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8" />
              <span className="text-xl font-semibold">Outro</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
