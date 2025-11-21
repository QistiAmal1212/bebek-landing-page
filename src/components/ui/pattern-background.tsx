"use client"

import type React from "react"
import { motion } from "framer-motion"

interface PatternBackgroundProps {
  children: React.ReactNode
  className?: string
  patternType?: "dots" | "lines" | "circles" | "waves"
  patternColor?: string
  patternOpacity?: number
  animate?: boolean
}

export function PatternBackground({
  children,
  className = "",
  patternType = "dots",
  patternColor = "currentColor",
  patternOpacity = 0.05,
  animate = true,
}: PatternBackgroundProps) {
  // Create SVG pattern strings directly instead of using JSX
  const getPatternSvgString = () => {
    switch (patternType) {
      case "dots":
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="${patternColor}"/></svg>`
      case "lines":
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="10" x2="20" y2="10" stroke="${patternColor}" strokeWidth="0.5"/></svg>`
      case "circles":
        return `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="10" fill="none" stroke="${patternColor}" strokeWidth="0.5"/></svg>`
      case "waves":
        return `<svg width="40" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10 Q10 5, 20 10 Q30 15, 40 10" fill="none" stroke="${patternColor}" strokeWidth="0.5"/></svg>`
      default:
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="${patternColor}"/></svg>`
    }
  }

  // Get the SVG string and encode it for use in a background image URL
  const svgString = encodeURIComponent(getPatternSvgString())
  const backgroundImageUrl = `url("data:image/svg+xml,${svgString}")`

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundRepeat: "repeat",
          opacity: patternOpacity,
        }}
        animate={
          animate
            ? {
                backgroundPosition: ["0px 0px", "20px 20px"],
              }
            : undefined
        }
        transition={
          animate
            ? {
                duration: 20,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }
            : undefined
        }
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
