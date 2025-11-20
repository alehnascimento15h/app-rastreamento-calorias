'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Ruler, Weight } from 'lucide-react'

type HeightWeightStepProps = {
  onNext: (height: number, weight: number) => void
}

export function HeightWeightStep({ onNext }: HeightWeightStepProps) {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const handleSubmit = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    
    if (h > 0 && w > 0) {
      onNext(h, w)
    }
  }

  const isValid = parseFloat(height) > 0 && parseFloat(weight) > 0

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Suas medidas</h1>
          <p className="text-gray-400 text-lg">Precisamos calcular suas necessidades</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-black border-2 border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Ruler className="w-6 h-6 text-white" />
                <Label htmlFor="height" className="text-lg font-semibold text-white">
                  Altura (cm)
                </Label>
              </div>
              <Input
                id="height"
                type="number"
                placeholder="Ex: 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bg-black border-gray-600 text-white text-lg py-6"
              />
            </div>
          </Card>

          <Card className="p-6 bg-black border-2 border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Weight className="w-6 h-6 text-white" />
                <Label htmlFor="weight" className="text-lg font-semibold text-white">
                  Peso (kg)
                </Label>
              </div>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-black border-gray-600 text-white text-lg py-6"
              />
            </div>
          </Card>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6 disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
