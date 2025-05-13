"use client"

import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import { getHijriMonth, getIslamicHolidays } from "../services/hijriCalendar"
import "react-calendar/dist/Calendar.css"

const HijriCalendarView = ({ onDateChange, currentDate, onSwitchCalendar }) => {
  const [hijriDates, setHijriDates] = useState([])
  const [hijriHolidays, setHijriHolidays] = useState([])
  const [activeDate, setActiveDate] = useState(new Date())
  const [currentHijriYear, setCurrentHijriYear] = useState(null)

  useEffect(() => {
    // When the component mounts or the active date changes,
    // fetch the Hijri dates for the current Gregorian month
    const fetchHijriDatesForMonth = async () => {
      const year = activeDate.getFullYear()
      const month = activeDate.getMonth() + 1 // JavaScript months are 0-indexed

      const hijriMonthData = await getHijriMonth(year, month)
      setHijriDates(hijriMonthData)

      // Extract the Hijri year from the first day of the month
      if (hijriMonthData && hijriMonthData.length > 0) {
        setCurrentHijriYear(hijriMonthData[0].hijri.year)
      }
    }

    fetchHijriDatesForMonth()
  }, [activeDate])

  useEffect(() => {
    // Fetch Islamic holidays when the Hijri year changes
    const fetchIslamicHolidays = async () => {
      if (currentHijriYear) {
        const holidays = await getIslamicHolidays(currentHijriYear)
        setHijriHolidays(holidays)
      }
    }

    fetchIslamicHolidays()
  }, [currentHijriYear])

  const handleDateChange = (date) => {
    setActiveDate(date)
    onDateChange(date)
  }

  // Custom tile content to show Hijri dates
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null

    // Find the corresponding Hijri date
    const hijriDate = hijriDates.find((d) => {
      const gDate = new Date(d.gregorian.date)
      return (
        gDate.getDate() === date.getDate() &&
        gDate.getMonth() === date.getMonth() &&
        gDate.getFullYear() === date.getFullYear()
      )
    })

    if (!hijriDate) return null

    return (
      <div className="hijri-date-tile">
        <div className="text-xs text-gray-500 mt-1">{hijriDate.hijri.day}</div>
      </div>
    )
  }

  return (
    <div className="hijri-calendar-view">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Hijri Calendar</h2>
        <button
          onClick={onSwitchCalendar}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          Switch to Gregorian
        </button>
      </div>

      <div className="hijri-theme">
        <Calendar onChange={handleDateChange} value={activeDate} tileContent={tileContent} />
      </div>

      {hijriDates.length > 0 && activeDate && (
        <div className="mt-4">
          <p className="font-medium">
            Selected Hijri Date:{" "}
            {hijriDates.find((d) => {
              const gDate = new Date(d.gregorian.date)
              return (
                gDate.getDate() === activeDate.getDate() &&
                gDate.getMonth() === activeDate.getMonth() &&
                gDate.getFullYear() === activeDate.getFullYear()
              )
            })?.hijri.date || "Loading..."}
          </p>
        </div>
      )}
    </div>
  )
}

export default HijriCalendarView
