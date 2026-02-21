"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalendarProps = {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | { from: Date; to?: Date }
  onSelect?: (date: Date | Date[] | { from: Date; to?: Date } | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
  classNames?: {
    months?: string
    month?: string
    caption?: string
    caption_label?: string
    nav?: string
    nav_button?: string
    nav_button_previous?: string
    nav_button_next?: string
    table?: string
    head_row?: string
    head_cell?: string
    row?: string
    cell?: string
    day?: string
    day_selected?: string
    day_today?: string
    day_outside?: string
    day_disabled?: string
    day_range_middle?: string
    day_hidden?: string
  }
  showOutsideDays?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isSelected = (date: Date) => {
    if (!selected) return false

    if (mode === "single") {
      return (
        selected instanceof Date &&
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
      )
    }

    if (mode === "multiple") {
      return (
        Array.isArray(selected) &&
        selected.some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )
      )
    }

    if (mode === "range" && selected && typeof selected === "object" && "from" in selected) {
      const { from, to } = selected
      if (!to) {
        return (
          date.getDate() === from.getDate() &&
          date.getMonth() === from.getMonth() &&
          date.getFullYear() === from.getFullYear()
        )
      }
      return date >= from && date <= to
    }

    return false
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day)

    if (disabled && disabled(date)) return

    if (mode === "single") {
      onSelect?.(date)
    } else if (mode === "multiple") {
      const selectedDates = Array.isArray(selected) ? selected : []
      const isAlreadySelected = selectedDates.some(
        (d) =>
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
      )

      if (isAlreadySelected) {
        onSelect?.(selectedDates.filter((d) => d.getTime() !== date.getTime()))
      } else {
        onSelect?.([...selectedDates, date])
      }
    } else if (mode === "range") {
      const rangeSelected = selected as { from: Date; to?: Date } | undefined
      if (!rangeSelected || (rangeSelected.from && rangeSelected.to)) {
        onSelect?.({ from: date })
      } else {
        if (date < rangeSelected.from) {
          onSelect?.({ from: date, to: rangeSelected.from })
        } else {
          onSelect?.({ from: rangeSelected.from, to: date })
        }
      }
    }
  }

  const days: Array<{ day: number | null; isCurrentMonth: boolean; date: Date | null }> = []
  const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7

  for (let i = 0; i < totalCells; i++) {
    if (i < startingDayOfWeek) {
      // Days from previous month
      if (showOutsideDays) {
        const prevMonthDays = new Date(year, month, 0).getDate()
        const day = prevMonthDays - startingDayOfWeek + i + 1
        days.push({ day, isCurrentMonth: false, date: new Date(year, month - 1, day) })
      } else {
        days.push({ day: null, isCurrentMonth: false, date: null })
      }
    } else if (i < daysInMonth + startingDayOfWeek) {
      // Days from current month
      const day = i - startingDayOfWeek + 1
      days.push({ day, isCurrentMonth: true, date: new Date(year, month, day) })
    } else {
      // Days from next month
      if (showOutsideDays) {
        const day = i - daysInMonth - startingDayOfWeek + 1
        days.push({ day, isCurrentMonth: false, date: new Date(year, month + 1, day) })
      } else {
        days.push({ day: null, isCurrentMonth: false, date: null })
      }
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className={cn("p-3", className)}>
      <div className="space-y-4">
        <div className="relative flex items-center justify-center pt-1">
          <div className="text-sm font-medium">
            {monthNames[month]} {year}
          </div>
          <div className="flex items-center space-x-1 absolute right-0">
            <button
              type="button"
              onClick={previousMonth}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                classNames?.nav_button,
                classNames?.nav_button_previous
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                classNames?.nav_button,
                classNames?.nav_button_next
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <table className={cn("w-full border-collapse space-y-1", classNames?.table)}>
          <thead>
            <tr className={cn("flex", classNames?.head_row)}>
              {dayNames.map((dayName) => (
                <th
                  key={dayName}
                  className={cn(
                    "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                    classNames?.head_cell
                  )}
                >
                  {dayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex} className={cn("flex w-full mt-2", classNames?.row)}>
                {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((dayInfo, dayIndex) => {
                  const { day, isCurrentMonth, date } = dayInfo
                  if (!day || !date) {
                    return (
                      <td
                        key={dayIndex}
                        className={cn("h-9 w-9 text-center text-sm p-0 relative", classNames?.cell)}
                      />
                    )
                  }

                  const isDisabled = disabled && disabled(date)
                  const selected = isCurrentMonth && isSelected(date)
                  const today = isCurrentMonth && isToday(date)

                  return (
                    <td
                      key={dayIndex}
                      className={cn("h-9 w-9 text-center text-sm p-0 relative", classNames?.cell)}
                    >
                      <button
                        type="button"
                        onClick={() => isCurrentMonth && handleDayClick(day)}
                        disabled={!isCurrentMonth || isDisabled}
                        className={cn(
                          "inline-flex items-center justify-center rounded-md text-sm font-normal ring-offset-white transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9",
                          !isCurrentMonth && "text-gray-400 opacity-50",
                          selected && "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white",
                          today && !selected && "bg-gray-100 text-gray-900",
                          classNames?.day,
                          !isCurrentMonth && classNames?.day_outside,
                          selected && classNames?.day_selected,
                          today && classNames?.day_today,
                          isDisabled && classNames?.day_disabled
                        )}
                      >
                        {day}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
