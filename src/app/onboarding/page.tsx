'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GenderStep } from './components/GenderStep'
import { WorkoutsStep } from './components/WorkoutsStep'
import { HeardFromStep } from './components/HeardFromStep'
import { TriedAppsStep } from './components/TriedAppsStep'
import { MotivationalStep } from './components/MotivationalStep'
import { HeightWeightStep } from './components/HeightWeightStep'
import { BirthDateStep } from './components/BirthDateStep'
import { TrainerStep } from './components/TrainerStep'
import { GoalStep } from './components/GoalStep'
import { TargetWeightStep } from './components/TargetWeightStep'
import { PersonalizedMessageStep } from './components/PersonalizedMessageStep'
import { GoalSpeedStep } from './components/GoalSpeedStep'
import { AppBenefitsStep } from './components/AppBenefitsStep'
import { ObstaclesStep } from './components/ObstaclesStep'
import { DietTypeStep } from './components/DietTypeStep'
import { AchievementsStep } from './components/AchievementsStep'
import { PotentialStep } from './components/PotentialStep'
import { ThankYouStep } from './components/ThankYouStep'
import { TestimonialsStep } from './components/TestimonialsStep'
import { OnboardingData } from '@/lib/types'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({})

  const handleGender = (gender: 'masculino' | 'feminino' | 'outro') => {
    setData({ ...data, gender })
    setStep(2)
  }

  const handleWorkouts = (workoutsPerWeek: '0-2' | '3-5' | '6+') => {
    setData({ ...data, workoutsPerWeek })
    setStep(3)
  }

  const handleHeardFrom = (heardFrom: string) => {
    setData({ ...data, heardFrom: heardFrom as any })
    setStep(4)
  }

  const handleTriedApps = (triedOtherApps: boolean) => {
    setData({ ...data, triedOtherApps })
    setStep(5)
  }

  const handleMotivational = () => {
    setStep(6)
  }

  const handleHeightWeight = (height: number, weight: number) => {
    setData({ ...data, height, weight })
    setStep(7)
  }

  const handleBirthDate = (birthDate: string) => {
    setData({ ...data, birthDate })
    setStep(8)
  }

  const handleTrainer = (hasTrainer: boolean) => {
    setData({ ...data, hasTrainer })
    setStep(9)
  }

  const handleGoal = (goal: 'perder' | 'manter' | 'ganhar') => {
    setData({ ...data, goal })
    setStep(10)
  }

  const handleTargetWeight = (targetWeight: number) => {
    setData({ ...data, targetWeight })
    setStep(11)
  }

  const handlePersonalizedMessage = () => {
    setStep(12)
  }

  const handleGoalSpeed = (goalSpeed: 'lento' | 'moderado' | 'rapido', weeklyWeightGoal: number) => {
    setData({ ...data, goalSpeed, weeklyWeightGoal })
    setStep(13)
  }

  const handleAppBenefits = () => {
    setStep(14)
  }

  const handleObstacles = (obstacles: string[]) => {
    setData({ ...data, obstacles })
    setStep(15)
  }

  const handleDietType = (dietType: 'classico' | 'pescetariano' | 'vegetariano' | 'vegano') => {
    setData({ ...data, dietType })
    setStep(16)
  }

  const handleAchievements = (achievements: string[]) => {
    setData({ ...data, achievements })
    setStep(17)
  }

  const handlePotential = () => {
    setStep(18)
  }

  const handleThankYou = () => {
    setStep(19)
  }

  const handleTestimonials = () => {
    // Salvar dados no Supabase aqui (em produção)
    router.push('/dashboard')
  }

  return (
    <>
      {step === 1 && <GenderStep onNext={handleGender} />}
      {step === 2 && <WorkoutsStep onNext={handleWorkouts} />}
      {step === 3 && <HeardFromStep onNext={handleHeardFrom} />}
      {step === 4 && <TriedAppsStep onNext={handleTriedApps} />}
      {step === 5 && <MotivationalStep onNext={handleMotivational} />}
      {step === 6 && <HeightWeightStep onNext={handleHeightWeight} />}
      {step === 7 && <BirthDateStep onNext={handleBirthDate} />}
      {step === 8 && <TrainerStep onNext={handleTrainer} />}
      {step === 9 && <GoalStep onNext={handleGoal} />}
      {step === 10 && data.weight && data.goal && (
        <TargetWeightStep 
          currentWeight={data.weight} 
          goal={data.goal} 
          onNext={handleTargetWeight} 
        />
      )}
      {step === 11 && <PersonalizedMessageStep data={data} onNext={handlePersonalizedMessage} />}
      {step === 12 && data.goal && <GoalSpeedStep goal={data.goal} onNext={handleGoalSpeed} />}
      {step === 13 && <AppBenefitsStep onNext={handleAppBenefits} />}
      {step === 14 && <ObstaclesStep onNext={handleObstacles} />}
      {step === 15 && <DietTypeStep onNext={handleDietType} />}
      {step === 16 && <AchievementsStep onNext={handleAchievements} />}
      {step === 17 && <PotentialStep data={data} onNext={handlePotential} />}
      {step === 18 && <ThankYouStep onNext={handleThankYou} />}
      {step === 19 && <TestimonialsStep onNext={handleTestimonials} />}
    </>
  )
}
