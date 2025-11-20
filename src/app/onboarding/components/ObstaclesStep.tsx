'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, Check } from 'lucide-react'

type ObstaclesStepProps = {
  onNext: (obstacles: string[]) => void
}

const obstacleOptions = [
  { id: 'consistencia', label: 'Falta de consistência' },
  { id: 'habitos', label: 'Hábitos alimentares não saudáveis' },
  { id: 'apoio', label: 'Falta de apoio' },
  { id: 'agenda', label: 'Agenda lotada' },
  { id: 'inspiracao', label: 'Falta de inspiração para refeições' },
]

export function ObstaclesStep({ onNext }: ObstaclesStepProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleObstacle = (id: string) => {
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
          <AlertCircle className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">O que está te impedindo?</h1>
          <p className="text-gray-400 text-lg">Selecione todos que se aplicam</p>
        </div>

        <div className="space-y-3">
          {obstacleOptions.map((option) => (
            <Card
              key={option.id}
              onClick={() => toggleObstacle(option.id)}
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
