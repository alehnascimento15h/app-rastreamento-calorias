'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

type TestimonialsStepProps = {
  onNext: () => void
}

const testimonials = [
  {
    name: 'Maria Silva',
    age: 32,
    result: 'Perdeu 15kg em 4 meses',
    text: 'O BR Rastreamento Ai Cal mudou minha vida! A funcionalidade de tirar foto da comida e ver as calorias instantaneamente é incrível. Nunca foi tão fácil manter o controle.',
    rating: 5,
  },
  {
    name: 'João Santos',
    age: 28,
    result: 'Ganhou 8kg de massa muscular',
    text: 'Finalmente um app que entende minhas necessidades. O plano personalizado e os gráficos me mantêm motivado todos os dias. Recomendo muito!',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    age: 45,
    result: 'Mantém peso ideal há 6 meses',
    text: 'Depois de tentar vários apps, este é o único que realmente funciona. A IA é precisa e o suporte é excelente. Vale cada centavo!',
    rating: 5,
  },
]

export function TestimonialsStep({ onNext }: TestimonialsStepProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Quote className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-3xl md:text-4xl font-bold">O que nossos usuários dizem</h1>
          <p className="text-gray-400 text-lg">Histórias reais de transformação</p>
        </div>

        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="pt-3 border-t border-gray-700">
                  <p className="font-semibold text-white">
                    {testimonial.name}, {testimonial.age} anos
                  </p>
                  <p className="text-sm text-gray-400">{testimonial.result}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 text-center">
          <p className="text-sm text-gray-400 mb-1">⭐ Avaliação média</p>
          <p className="text-3xl font-bold text-white">4.9/5.0</p>
          <p className="text-xs text-gray-500 mt-1">Baseado em 12.847 avaliações</p>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-white text-black hover:bg-gray-200 h-14 text-lg font-semibold"
        >
          Começar Agora
        </Button>
      </div>
    </div>
  )
}
