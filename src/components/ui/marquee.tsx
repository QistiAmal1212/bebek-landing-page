"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MarqueeProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
  pauseOnHover?: boolean
  className?: string
  fontSize?: string
}

export function Marquee({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
  fontSize = "text-lg",
}: MarqueeProps) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [duration, setDuration] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
      setContentWidth(contentRef.current.offsetWidth)
    }
  }, [children])

  useEffect(() => {
    if (containerWidth && contentWidth) {
      // Calculate duration based on content width and speed
      // The larger the content, the longer the duration
      setDuration((contentWidth / speed) * 2)
    }
  }, [containerWidth, contentWidth, speed])

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        ref={contentRef}
        className={`inline-block ${fontSize}`}
        animate={{
          x:
            direction === "left"
              ? [-contentWidth / 2, -contentWidth - contentWidth / 2]
              : [-contentWidth - contentWidth / 2, -contentWidth / 2],
        }}
        transition={{
          ease: "linear",
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {children}
        <span className="inline-block">{children}</span>
      </motion.div>
    </div>
  )
}
