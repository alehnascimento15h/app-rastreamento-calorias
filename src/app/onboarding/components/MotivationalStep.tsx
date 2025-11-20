'use client'

import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp } from 'lucide-react'

type MotivationalStepProps = {
  onNext: () => void
}

export function MotivationalStep({ onNext }: MotivationalStepProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-white to-gray-400 rounded-full flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-black" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            BR Rastreamento Ai Cal
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl font-semibold text-white">
              Cria resultados a longo prazo
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              "O sucesso é a soma de pequenos esforços repetidos dia após dia. 
              Com dedicação e as ferramentas certas, você alcançará seus objetivos!"
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Sparkles className="w-5 h-5" />
            <span>Vamos começar sua jornada</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
