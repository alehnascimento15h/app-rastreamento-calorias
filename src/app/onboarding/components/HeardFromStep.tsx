'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Search, Instagram, Users, Tv, Twitter, Smartphone, Facebook, Youtube, MoreHorizontal } from 'lucide-react'

type HeardFromStepProps = {
  onNext: (source: string) => void
}

const sources = [
  { id: 'google', label: 'Google', icon: Search },
  { id: 'tiktok', label: 'TikTok', icon: Smartphone },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'amigo', label: 'Amigo ou Família', icon: Users },
  { id: 'tv', label: 'TV', icon: Tv },
  { id: 'x', label: 'X (Twitter)', icon: Twitter },
  { id: 'appstore', label: 'App Store', icon: Smartphone },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'outro', label: 'Outro', icon: MoreHorizontal },
]

export function HeardFromStep({ onNext }: HeardFromStepProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (source: string) => {
    setSelected(source)
    setTimeout(() => onNext(source), 300)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Onde você ouviu falar de nós?</h1>
          <p className="text-gray-400 text-lg">Queremos saber como você nos encontrou</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {sources.map((source) => {
            const Icon = source.icon
            return (
              <Card
                key={source.id}
                onClick={() => handleSelect(source.id)}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selected === source.id
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{source.label}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
