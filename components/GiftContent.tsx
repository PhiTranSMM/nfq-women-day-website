import OverlappingImages from '@/components/OverlappingImages'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import GiftBox from '@/components/GiftBox'
import React from 'react'

export default function GiftContent() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-full">
      <OverlappingImages />
      <Card className="border-none bg-white rounded-xl shadow-lg w-[600px] max-w-full !mt-10">
        <CardHeader className="p-6 font-bold text-[#5d4c73] text-xl text-center">We have a surprise for you!!!</CardHeader>
        <div className="w-full flex justify-center items-center">
          <CardContent className="flex flex-col text-[#5d4c73] items-center justify-center space-y-4 px-6 pb-6 bg-white rounded-xl">
            <GiftBox />
          </CardContent>
        </div>
      </Card>
    </div>
  )
}