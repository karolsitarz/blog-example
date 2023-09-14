'use client'
import ProgressiveImage from 'react-progressive-graceful-image'
import { SETTINGS } from '@/utils/settings'
import Image from 'next/image'

export const ProgressiveTileImage = ({ src }: { src: string }) => (
  <ProgressiveImage src={src} placeholder={`${SETTINGS.root}/placeholder.jpg`}>
    {(src) => (
      <Image
        src={src}
        alt="Post thumbnail"
        fill
        className="absolute w-full h-full left-0 top-0 object-cover"
      />
    )}
  </ProgressiveImage>
)
