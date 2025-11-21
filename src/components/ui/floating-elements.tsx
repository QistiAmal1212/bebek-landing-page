"use client"
import { motion } from "framer-motion"

interface FloatingElementsProps {
  count?: number
  className?: string
  elementSize?: number
  elementColor?: string
  elementType?: "circle" | "square" | "triangle" | "leaf"
  speed?: number
}

export function FloatingElements({
  count = 10,
  className = "",
  elementSize = 10,
  elementColor = "#22c55e",
  elementType = "circle",
  speed = 20,
}: FloatingElementsProps) {
  const elements = Array.from({ length: count }).map((_, index) => {
    const xPos = Math.random() * 100
    const yPos = Math.random() * 100
    const size = (Math.random() * 0.5 + 0.5) * elementSize
    const duration = (Math.random() * 0.5 + 0.75) * speed
    const delay = Math.random() * 5

    const renderElement = () => {
      switch (elementType) {
        case "circle":
          return (
            <div
              className="rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: elementColor,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          )
        case "square":
          return (
            <div
              className="rotate-45"
              style={{
                width: size,
                height: size,
                backgroundColor: elementColor,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          )
        case "triangle":
          return (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${elementColor}`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          )
        case "leaf":
          return (
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: Math.random() * 0.5 + 0.2 }}
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                fill={elementColor}
              />
            </svg>
          )
        default:
          return (
            <div
              className="rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: elementColor,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          )
      }
    }

    return (
      <motion.div
        key={index}
        className="absolute"
        style={{
          left: `${xPos}%`,
          top: `${yPos}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          rotate: [0, Math.random() * 360, 0],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
          delay,
        }}
      >
        {renderElement()}
      </motion.div>
    )
  })

  return <div className={`relative overflow-hidden ${className}`}>{elements}</div>
}
