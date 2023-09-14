'use client'
import { ComponentProps, useState } from 'react'
import Image from 'next/image'
import placeholder from '@/assets/placeholder.jpg'

export const ImageWithFallback = ({
  src,
  ...props
}: Omit<ComponentProps<typeof Image>, 'onError'>) => {
  const [isError, setIsError] = useState(false)

  return (
    <Image
      src={isError ? placeholder : src}
      {...props}
      onError={() => setIsError(true)}
    />
  )
}
