'use client'

import React, { useState } from 'react'
import { usePerson } from '@/context/nameContext'
import { addPerson, getPerson } from '@/database/actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'

type Location = 'Ho Chi Minh' | 'Da Nang' | 'Ha Noi' | 'Can Tho'

const locations: Location[] = ['Ho Chi Minh', 'Da Nang', 'Ha Noi', 'Can Tho']

const LoginForm = () => {
  const { toast } = useToast()
  const { setPerson } = usePerson()

  const [email, setEmail] = useState('')
  const [location, setLocation] = useState<string | Location>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function isValidNfqEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@nfq\.com$/
    return pattern.test(email)
  }

  const submitName = async (email: string, location: string) => {
    if (!isValidNfqEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter your NFQ email',
        variant: 'destructive',
      })
      return
    }

    if (location == '') {
      toast({
        title: 'Location can\'t be empty',
        description: 'Please select your location',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    const { data: person } = await getPerson(email)
    if (person) {
      setPerson({ email: person.email, location: person.location, giftAmount: person.giftAmount })
    } else {
      await addPerson(email, location)
      setPerson({ email, location: location as Location, giftAmount: 0 })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="w-[500px] max-w-full flex flex-col space-y-4 justify-center items-center">
      <p className="text-2xl">Enter your NFQ email: </p>
      <div className="w-full mx-auto bg-white rounded-full">
        <Input
          type="text"
          placeholder="example@nfq.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-none focus:ring-0 md:text-xl p-6 m-0 shadow-none placeholder:text-gray-400"
        />
      </div>
      <p className="text-2xl">Select location:</p>
      <Select onValueChange={(value) => setLocation(value)}>
        <SelectTrigger className="w-full bg-white p-6 rounded-full text-xl shadow-none">
          <SelectValue placeholder={'Select location'}>
            {location}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem
              value={loc}
              key={loc}
              onClick={() => setLocation(loc)}
              className="text-xl cursor-pointer font-[family-name:var(--font-inter)]"
            >
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full flex justify-end items-center !mt-8">
        <Button
          onClick={() => submitName(email.toLowerCase(), location)}
          disabled={isSubmitting}
          className={`w-full text-xl h-[50px] rounded-full shadow-none bg-pink-500 hover:bg-pink-600 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {isSubmitting ? 'Continuing...' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}

export default LoginForm
