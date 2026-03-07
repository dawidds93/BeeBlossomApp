'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasImages = images.length > 0

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-2xl"
        style={{ backgroundColor: 'var(--cream-dark)' }}
      >
        {hasImages ? (
          <Image
            src={images[activeIndex]}
            alt={`${productName} – zdjęcie ${activeIndex + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-8xl">🕯️</div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative h-16 w-16 overflow-hidden rounded-lg transition-all duration-200"
              style={{
                outline: i === activeIndex ? '2px solid var(--amber)' : '2px solid transparent',
                outlineOffset: '2px',
              }}
              aria-label={`Zdjęcie ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <Image
                src={img}
                alt={`${productName} miniatura ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
