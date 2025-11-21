"use client"

import type React from "react"
import { motion } from "framer-motion"

interface SimpleMarqueeProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
  className?: string
  fontSize?: string
}

export function SimpleMarquee({
  children,
  direction = "left",
  speed = 20,
  className = "",
  fontSize = "text-lg",
}: SimpleMarqueeProps) {
  // Calculate duration based on speed (lower speed = longer duration = slower movement)
  const duration = 100 / speed

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-block whitespace-nowrap">
        <motion.div
          className={`inline-block ${fontSize} font-avenir-heavy tracking-tight`}
          animate={{
            x: direction === "left" ? [0, -1000] : [-1000, 0],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: duration,
              ease: "linear",
            },
          }}
        >
          {children}
          {children}
          {children}
        </motion.div>
      </div>
    </div>
  )
}
