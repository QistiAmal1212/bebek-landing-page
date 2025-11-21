"use client"

import { useEffect, useState } from "react"

interface StaticBubbleProps {
  x: number
  y: number
  size: number
  color: string
  opacity: number
}

interface BubbleBackgroundProps {
  count?: number
  className?: string
  colors?: string[]
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
}

export function BubbleBackground({
  count = 30,
  className = "",
  colors = ["#22c55e", "#16a34a", "#15803d", "#bbf7d0"],
  minSize = 20,
  maxSize = 120,
  minOpacity = 0.05,
  maxOpacity = 0.15,
}: BubbleBackgroundProps) {
  const [bubbles, setBubbles] = useState<StaticBubbleProps[]>([])

  // Generate bubbles only once when the component mounts
  useEffect(() => {
    if (typeof window === "undefined") return

    const width = window.innerWidth
    const height = window.innerHeight * 3 // Make it 3x the height to cover scrolling

    // Generate static bubbles
    const staticBubbles = Array.from({ length: count }).map(() => {
      const size = Math.random() * (maxSize - minSize) + minSize
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity,
      }
    })

    setBubbles(staticBubbles)

    // Empty dependency array ensures this only runs once on mount
  }, [])

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}>
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: bubble.color,
            opacity: bubble.opacity,
          }}
        />
      ))}
    </div>
  )
}
