'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { UserCheck, UserX } from 'lucide-react'

type TrainerStepProps = {
  onNext: (hasTrainer: boolean) => void
}

export function TrainerStep({ onNext }: TrainerStepProps) {
  const [selected, setSelected] = useState<boolean | null>(null)

  const handleSelect = (hasTrainer: boolean) => {
    setSelected(hasTrainer)
    setTimeout(() => onNext(hasTrainer), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Você trabalha com profissionais?</h1>
          <p className="text-gray-400 text-lg">Personal trainer ou nutricionista</p>
        </div>

        <div className="space-y-4">
          <Card
            onClick={() => handleSelect(true)}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === true
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <UserCheck className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Sim, trabalho</div>
                <div className={`text-sm ${selected === true ? 'text-gray-700' : 'text-gray-400'}`}>
                  Tenho acompanhamento profissional
                </div>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleSelect(false)}
            className={`p-6 cursor-pointer transition-all border-2 ${
              selected === false
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <UserX className="w-8 h-8" />
              <div>
                <div className="text-xl font-semibold">Não, faço sozinho</div>
                <div className={`text-sm ${selected === false ? 'text-gray-700' : 'text-gray-400'}`}>
                  Treino e me alimento por conta própria
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
