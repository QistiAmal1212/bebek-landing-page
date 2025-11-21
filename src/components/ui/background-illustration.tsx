"use client"

import { motion } from "framer-motion"

interface BackgroundIllustrationProps {
  className?: string
  patternType?: "leaves" | "circles" | "dots" | "lines"
  patternColor?: string
  patternOpacity?: number
}

export function BackgroundIllustration({
  className = "",
  patternType = "leaves",
  patternColor = "#22c55e",
  patternOpacity = 0.03,
}: BackgroundIllustrationProps) {
  // Create SVG pattern strings
  const getPatternSvgString = () => {
    switch (patternType) {
      case "leaves":
        return `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M30 10c-2.5-2.5-5-3-7.5-3A5.5 5.5 0 0 0 17 12.5c0 2.5.5 5 3 7.5L30 30l10-10c2.5-2.5 3-5 3-7.5A5.5 5.5 0 0 0 37.5 7c-2.5 0-5 .5-7.5 3z" stroke="${patternColor}" strokeWidth="1"/>
          <path d="M30 30c-2.5-2.5-5-3-7.5-3A5.5 5.5 0 0 0 17 32.5c0 2.5.5 5 3 7.5L30 50l10-10c2.5-2.5 3-5 3-7.5A5.5 5.5 0 0 0 37.5 27c-2.5 0-5 .5-7.5 3z" stroke="${patternColor}" strokeWidth="1"/>
        </svg>`
      case "circles":
        return `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle cx="30" cy="30" r="20" stroke="${patternColor}" strokeWidth="1"/>
          <circle cx="30" cy="30" r="10" stroke="${patternColor}" strokeWidth="1"/>
        </svg>`
      case "dots":
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="1" fill="${patternColor}"/>
        </svg>`
      case "lines":
        return `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10" x2="20" y2="10" stroke="${patternColor}" strokeWidth="0.5"/>
        </svg>`
      default:
        return `<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M30 10c-2.5-2.5-5-3-7.5-3A5.5 5.5 0 0 0 17 12.5c0 2.5.5 5 3 7.5L30 30l10-10c2.5-2.5 3-5 3-7.5A5.5 5.5 0 0 0 37.5 7c-2.5 0-5 .5-7.5 3z" stroke="${patternColor}" strokeWidth="1"/>
          <path d="M30 30c-2.5-2.5-5-3-7.5-3A5.5 5.5 0 0 0 17 32.5c0 2.5.5 5 3 7.5L30 50l10-10c2.5-2.5 3-5 3-7.5A5.5 5.5 0 0 0 37.5 27c-2.5 0-5 .5-7.5 3z" stroke="${patternColor}" strokeWidth="1"/>
        </svg>`
    }
  }

  // Get the SVG string and encode it for use in a background image URL
  const svgString = encodeURIComponent(getPatternSvgString())
  const backgroundImageUrl = `url("data:image/svg+xml,${svgString}")`

  return (
    <motion.div
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundRepeat: "repeat",
        opacity: patternOpacity,
      }}
      animate={{
        backgroundPosition: ["0px 0px", "60px 60px"],
      }}
      transition={{
        duration: 60,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
    />
  )
}
