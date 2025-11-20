'use client'

import { Button } from '@/components/ui/button'
import { Sparkles, Brain, Target, TrendingUp, Heart } from 'lucide-react'

type AppBenefitsStepProps = {
  onNext: () => void
}

export function AppBenefitsStep({ onNext }: AppBenefitsStepProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">Por que BR Rastreamento Ai Cal?</h1>
          <p className="text-gray-400 text-lg">A tecnologia que transforma resultados</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-700">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Inteligência Artificial</h3>
                <p className="text-sm text-gray-400">
                  Reconhecimento automático de alimentos e cálculo preciso de calorias
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-700">
            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Plano Personalizado</h3>
                <p className="text-sm text-gray-400">
                  Metas e recomendações baseadas no seu perfil único
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-700">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-8 h-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Acompanhamento em Tempo Real</h3>
                <p className="text-sm text-gray-400">
                  Gráficos e estatísticas para visualizar seu progresso
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl border border-gray-700">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Resultados Sustentáveis</h3>
                <p className="text-sm text-gray-400">
                  Foco em hábitos saudáveis e mudanças duradouras
                </p>
              </div>
            </div>
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
