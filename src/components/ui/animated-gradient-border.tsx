"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  borderRadius?: string
  gradientColors?: string[]
  animationDuration?: number
}

export function AnimatedGradientBorder({
  children,
  className = "",
  borderWidth = 2,
  borderRadius = "0.5rem",
  gradientColors = ["#22c55e", "#16a34a", "#15803d", "#166534"],
  animationDuration = 8,
}: AnimatedGradientBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        padding: borderWidth,
        borderRadius,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit] z-0"
        style={{
          background: `linear-gradient(45deg, ${gradientColors.join(", ")})`,
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
      <div
        className="relative z-10 h-full w-full bg-white rounded-[inherit]"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
