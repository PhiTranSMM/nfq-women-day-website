'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePerson } from '@/context/nameContext'
import { getFirstGrapheme, getRandomElement, removeEmojiAtIndex } from '@/lib/utils'
import { FLOWER_WISHES } from '@/lib/mockup'

const FLOWER = getRandomElement(FLOWER_WISHES);

const OverlappingImages: React.FC = () => {
  const { name } = usePerson()
  const [activeImage, setActiveImage] = useState<1 | 2>(1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-full">
      <div className="flex flex-col md:flex-row items-center gap-8 p-4 max-w-5xl mx-auto">
        <div className="relative w-full md:w-1/2 h-96 md:h-[450px]">
          {/* Container with perspective for 3D effect */}
          <div className="relative w-full h-full perspective-1000">
            {/* Image 1 */}
            <div
              className={`absolute w-5/6 h-5/6 p-2 shadow-md rounded-xl bg-white overflow-hidden cursor-pointer transition-all duration-500 transform ${
                activeImage === 1
                  ? 'z-20 scale-105 rotate-0 opacity-100'
                  : 'z-10 scale-95 -rotate-3 opacity-70'
              }`}
              style={{
                top: '0',
                left: '0',
              }}
              onClick={() => setActiveImage(1)}
              onMouseEnter={() => setActiveImage(1)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={FLOWER.images[0]}
                  alt={FLOWER.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Image 2 */}
            <div
              className={`absolute w-5/6 h-5/6 p-2 shadow-md rounded-xl bg-white overflow-hidden cursor-pointer transition-all duration-500 transform ${
                activeImage === 2
                  ? 'z-20 scale-105 rotate-0 opacity-100'
                  : 'z-10 scale-95 rotate-3 opacity-70'
              }`}
              style={{
                bottom: '0',
                right: '0',
              }}
              onClick={() => setActiveImage(2)}
              onMouseEnter={() => setActiveImage(2)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={FLOWER.images[1]}
                  alt={FLOWER.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6 px-4">
          <div className="flex w-full items-start justify-center">
            <p className="text-2xl">
              Hi<span className="font-bold">{' '}{name}</span>
            </p>
          </div>
          <p className="text-xl !mt-2 text-center">You are a <strong><i>{FLOWER.name}</i></strong>
          </p>
          <div className="flex items-start gap-3">
            <span className="text-[20px] leading-none">{getFirstGrapheme(FLOWER.wish_1)}️</span>
            <p className="leading-relaxed">{removeEmojiAtIndex(FLOWER.wish_1, 0)}</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[20px] leading-none">{getFirstGrapheme(FLOWER.wish_2)}</span>
            <p className="leading-relaxed">{removeEmojiAtIndex(FLOWER.wish_2, 0)}</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[20px] leading-none">{getFirstGrapheme(FLOWER.wish_3)}</span>
            <p className="leading-relaxed">{removeEmojiAtIndex(FLOWER.wish_3, 0)}</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[20px] leading-none">{getFirstGrapheme(FLOWER.wish_4)}</span>
            <p className="leading-relaxed">{removeEmojiAtIndex(FLOWER.wish_4, 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlappingImages;