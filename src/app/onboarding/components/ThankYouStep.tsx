'use client'

import { Button } from '@/components/ui/button'
import { Heart, Sparkles } from 'lucide-react'
import { OnboardingData } from '@/lib/types'
import { saveUserProfile } from '@/lib/supabase-actions'
import { useState } from 'react'

type ThankYouStepProps = {
  onNext: () => void
  data: OnboardingData
}

export function ThankYouStep({ onNext, data }: ThankYouStepProps) {
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSaveAndContinue = async () => {
    if (!email) {
      alert('Por favor, insira seu email para continuar')
      return
    }

    setSaving(true)
    try {
      await saveUserProfile(email, data)
      localStorage.setItem('userEmail', email)
      alert('Perfil salvo com sucesso!')
      onNext()
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
      alert('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full animate-pulse" />
            </div>
            <Heart className="w-20 h-20 mx-auto text-white relative z-10" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">Obrigado por confiar em nós!</h1>
            <p className="text-xl text-gray-300">
              Sua jornada de transformação começa agora
            </p>
          </div>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-gray-700">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
              alt="Motivacional"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <p className="text-white text-lg font-semibold">
                "A única pessoa que você está destinado a se tornar é a pessoa que você decide ser."
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-white" />
              <p className="text-lg font-semibold">Próximos passos</p>
            </div>
            <ul className="space-y-2 text-left text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">✓</span>
                <span>Seu plano personalizado está sendo preparado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">✓</span>
                <span>Você terá acesso a ferramentas de IA para rastreamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-1">✓</span>
                <span>Acompanhe seu progresso com gráficos em tempo real</span>
              </li>
            </ul>
          </div>

          {/* Campo de Email */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Insira seu email para salvar seu progresso
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
                required
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSaveAndContinue}
          className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg font-semibold"
          disabled={saving}
        >
          {saving ? 'Salvando...' : 'Salvar e Ver Depoimentos'}
        </Button>
      </div>
    </div>
  )
}
