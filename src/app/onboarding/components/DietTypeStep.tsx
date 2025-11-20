'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Utensils } from 'lucide-react'

type DietTypeStepProps = {
  onNext: (dietType: 'classico' | 'pescetariano' | 'vegetariano' | 'vegano') => void
}

export function DietTypeStep({ onNext }: DietTypeStepProps) {
  const [selected, setSelected] = useState<'classico' | 'pescetariano' | 'vegetariano' | 'vegano' | null>(null)

  const handleSelect = (dietType: 'classico' | 'pescetariano' | 'vegetariano' | 'vegano') => {
    setSelected(dietType)
    setTimeout(() => onNext(dietType), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Utensils className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">Você segue alguma dieta específica?</h1>
          <p className="text-gray-400 text-lg">Vamos personalizar suas recomendações</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => handleSelect('classico')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'classico'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xl font-semibold">Clássico</div>
              <div className={`text-sm ${selected === 'classico' ? 'text-gray-700' : 'text-gray-400'}`}>
                Sem restrições alimentares
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('pescetariano')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'pescetariano'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xl font-semibold">Pescetariano</div>
              <div className={`text-sm ${selected === 'pescetariano' ? 'text-gray-700' : 'text-gray-400'}`}>
                Vegetais, peixes e frutos do mar
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('vegetariano')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'vegetariano'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xl font-semibold">Vegetariano</div>
              <div className={`text-sm ${selected === 'vegetariano' ? 'text-gray-700' : 'text-gray-400'}`}>
                Sem carne, mas com laticínios e ovos
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect('vegano')}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === 'vegano'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="space-y-1">
              <div className="text-xl font-semibold">Vegano</div>
              <div className={`text-sm ${selected === 'vegano' ? 'text-gray-700' : 'text-gray-400'}`}>
                100% baseado em plantas
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
