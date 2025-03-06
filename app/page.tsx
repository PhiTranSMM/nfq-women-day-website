'use client'

import React, { useEffect } from 'react'
import { usePerson } from '@/context/nameContext'
import LoginForm from '@/components/LoginForm'
import GiftContent from '@/components/GiftContent'
import { getCountSpecialGift } from '@/database/actions'

export default function Home() {
  const { person, setSpecialGiftCount } = usePerson()

  useEffect(() => {
    getCountSpecialGift().then(({ data }) => setSpecialGiftCount(data ?? 10))
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-cover bg-center bg-no-repeat font-[family-name:var(--font-inter)]">
      <div className={`flex w-fit max-w-full px-5 flex-col items-center ${person ? 'justify-start space-y-6 my-6' : 'justify-center space-y-24 h-screen'}`}>
        <div className="flex w-full flex-col items-center justify-start space-y-4">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold font-[family-name:var(--font-sigmar-one)]`}>WOMEN'S DAY{' '}<br />FLOWER - TELLING{' '}</h1>
          <p className="text-2xl font-bold text-center">✨Press & Bloom: Discover Your Flower, Embrace Your Power!✨</p>
        </div>
        <div className="flex w-full flex-col items-center justify-start space-y-4 !mt-[48px]">
          {person ? <GiftContent /> : <LoginForm />}
        </div>
      </div>
    </div>
  )
}
