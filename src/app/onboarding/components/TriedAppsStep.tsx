'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, X } from 'lucide-react'

type TriedAppsStepProps = {
  onNext: (tried: boolean) => void
}

export function TriedAppsStep({ onNext }: TriedAppsStepProps) {
  const [selected, setSelected] = useState<boolean | null>(null)

  const handleSelect = (tried: boolean) => {
    setSelected(tried)
    setTimeout(() => onNext(tried), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Você já tentou outros apps?</h1>
          <p className="text-gray-400 text-lg">Apps de contagem de calorias</p>
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
              <Check className="w-8 h-8" />
              <span className="text-xl font-semibold">Sim, já tentei outros</span>
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
              <X className="w-8 h-8" />
              <span className="text-xl font-semibold">Não, é minha primeira vez</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
