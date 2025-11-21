"use client"

import { useState, useEffect, useRef } from "react"

interface TextScrambleProps {
  text: string
  className?: string
  speed?: number
  scrambleSpeed?: number
  pauseDuration?: number
}

export function TextScramble({
  text,
  className = "",
  speed = 0.1,
  scrambleSpeed = 20,
  pauseDuration = 2000,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const [isScrambling, setIsScrambling] = useState(false)
  const chars = "!<>-_\\/[]{}—=+*^?#________"
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    let currentText = ""
    let iteration = 0

    const scramble = () => {
      if (iteration >= text.length) {
        setDisplayText(text)
        setIsScrambling(false)

        // Set timeout to restart scrambling
        timeoutRef.current = setTimeout(() => {
          setIsScrambling(true)
          iteration = 0
          currentText = ""
          frameRef.current = requestAnimationFrame(scramble)
        }, pauseDuration)

        return
      }

      // Build up the display text character by character
      if (iteration < text.length) {
        currentText = text.substring(0, iteration + 1)
      }

      // Add scrambled characters at the end
      let scrambledText = currentText
      if (iteration < text.length - 1) {
        scrambledText += chars[Math.floor(Math.random() * chars.length)]
      }

      setDisplayText(scrambledText)
      iteration += speed

      frameRef.current = requestAnimationFrame(scramble)
    }

    setIsScrambling(true)
    frameRef.current = requestAnimationFrame(scramble)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, pauseDuration, chars])

  return <span className={className}>{displayText}</span>
}
