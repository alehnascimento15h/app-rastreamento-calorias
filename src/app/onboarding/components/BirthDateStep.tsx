'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

type BirthDateStepProps = {
  onNext: (birthDate: string) => void
}

export function BirthDateStep({ onNext }: BirthDateStepProps) {
  const [birthDate, setBirthDate] = useState('')

  const handleSubmit = () => {
    if (birthDate) {
      onNext(birthDate)
    }
  }

  const isValid = birthDate !== ''

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Data de nascimento</h1>
          <p className="text-gray-400 text-lg">Para calcular suas necessidades calóricas</p>
        </div>

        <Card className="p-6 bg-black border-2 border-gray-700">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-white" />
              <Label htmlFor="birthDate" className="text-lg font-semibold text-white">
                Sua data de nascimento
              </Label>
            </div>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-black border-gray-600 text-white text-lg py-6"
            />
          </div>
        </Card>

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
