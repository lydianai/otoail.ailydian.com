"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      max = 100,
      min = 0,
      step = 1,
      disabled = false,
      orientation = "horizontal",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue !== undefined ? controlledValue : internalValue
    const sliderRef = React.useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)
    const [activeThumb, setActiveThumb] = React.useState<number | null>(null)

    const updateValue = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!sliderRef.current || disabled) return

        const rect = sliderRef.current.getBoundingClientRect()
        let percentage: number

        if (orientation === "horizontal") {
          percentage = (clientX - rect.left) / rect.width
        } else {
          percentage = 1 - (clientY - rect.top) / rect.height
        }

        percentage = Math.max(0, Math.min(1, percentage))
        const rawValue = min + percentage * (max - min)
        const steppedValue = Math.round(rawValue / step) * step
        const clampedValue = Math.max(min, Math.min(max, steppedValue))

        const newValue = [...value]
        const thumbIndex = activeThumb !== null ? activeThumb : 0
        newValue[thumbIndex] = clampedValue

        // Sort values for multiple thumbs
        if (newValue.length > 1) {
          newValue.sort((a, b) => a - b)
        }

        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [
        disabled,
        orientation,
        min,
        max,
        step,
        value,
        activeThumb,
        controlledValue,
        onValueChange,
      ]
    )

    const handleMouseDown = React.useCallback(
      (event: React.MouseEvent, thumbIndex: number) => {
        if (disabled) return
        event.preventDefault()
        setIsDragging(true)
        setActiveThumb(thumbIndex)
      },
      [disabled]
    )

    const handleTrackClick = React.useCallback(
      (event: React.MouseEvent) => {
        if (disabled || isDragging) return
        updateValue(event.clientX, event.clientY)
      },
      [disabled, isDragging, updateValue]
    )

    React.useEffect(() => {
      if (!isDragging) return

      const handleMouseMove = (event: MouseEvent) => {
        updateValue(event.clientX, event.clientY)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        setActiveThumb(null)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isDragging, updateValue])

    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex touch-none select-none items-center",
          orientation === "horizontal" ? "w-full" : "h-full flex-col",
          className
        )}
        {...props}
      >
        <div
          ref={sliderRef}
          className={cn(
            "relative grow rounded-full bg-gray-200",
            orientation === "horizontal" ? "h-2 w-full" : "h-full w-2",
            disabled && "opacity-50"
          )}
          onClick={handleTrackClick}
        >
          <div
            className={cn(
              "absolute rounded-full bg-red-600",
              orientation === "horizontal" ? "h-full" : "w-full bottom-0"
            )}
            style={
              orientation === "horizontal"
                ? {
                    left: "0%",
                    right: `${100 - getPercentage(Math.max(...value))}%`,
                  }
                : {
                    bottom: "0%",
                    top: `${100 - getPercentage(Math.max(...value))}%`,
                  }
            }
          />
          {value.map((val, index) => (
            <div
              key={index}
              className={cn(
                "absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                orientation === "horizontal" ? "top-1/2" : "left-1/2"
              )}
              style={
                orientation === "horizontal"
                  ? { left: `${getPercentage(val)}%` }
                  : { top: `${100 - getPercentage(val)}%` }
              }
              onMouseDown={(e) => handleMouseDown(e, index)}
            />
          ))}
        </div>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
