'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { OnboardingData } from '@/lib/types'

type PersonalizedMessageStepProps = {
  data: OnboardingData
  onNext: () => void
}

export function PersonalizedMessageStep({ data, onNext }: PersonalizedMessageStepProps) {
  const getMessage = () => {
    const { gender, goal, targetWeight, weight, workoutsPerWeek } = data
    
    let message = ''
    
    if (goal === 'perder' && weight && targetWeight) {
      const diff = weight - targetWeight
      message = `Parabéns por dar esse passo! Você está determinad${gender === 'feminino' ? 'a' : 'o'} a perder ${diff.toFixed(1)} kg e transformar sua vida. `
    } else if (goal === 'ganhar' && weight && targetWeight) {
      const diff = targetWeight - weight
      message = `Excelente! Você está focad${gender === 'feminino' ? 'a' : 'o'} em ganhar ${diff.toFixed(1)} kg de forma saudável e consistente. `
    } else {
      message = `Ótimo! Você está no caminho certo para manter seu peso ideal e viver de forma equilibrada. `
    }

    if (workoutsPerWeek === '6+') {
      message += 'Sua dedicação aos treinos é inspiradora! '
    } else if (workoutsPerWeek === '3-5') {
      message += 'Você tem uma rotina de treinos equilibrada! '
    }

    message += 'O BR Rastreamento Ai Cal vai te ajudar a alcançar seus objetivos de forma inteligente e personalizada.'

    return message
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Sparkles className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">Sua Jornada Começa Aqui</h1>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700">
            <p className="text-lg leading-relaxed text-gray-100">
              {getMessage()}
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400 mb-1">Powered by</p>
            <p className="text-xl font-bold text-white">BR Rastreamento Ai Cal</p>
            <p className="text-xs text-gray-500 mt-1">Inteligência Artificial para seus resultados</p>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
