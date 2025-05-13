"use client"

import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "./HijriCalendar.css" // We'll create this file for custom styling

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date())
  const [holidays, setHolidays] = useState([])
  const [showHolidays, setShowHolidays] = useState(false)
  const [isHijri, setIsHijri] = useState(false)
  const [hijriDate, setHijriDate] = useState(null)

  // Fetch holidays based on Gregorian date
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=gVKjanJQyilwNbaU01KmHcC78rn9lNMi&country=US&year=${date.getFullYear()}`,
        )
        const data = await response.json()
        setHolidays(data.response.holidays)
      } catch (error) {
        console.error("Error fetching holidays:", error)
        setHolidays([])
      }
    }

    fetchHolidays()
  }, [date])

  // Fetch Hijri date information when the selected date changes
  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        // Using the Aladhan API to convert Gregorian to Hijri
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        const response = await fetch(`https://api.aladhan.com/v1/gToH/${formattedDate}`)
        const data = await response.json()
        setHijriDate(data.data)
      } catch (error) {
        console.error("Error fetching Hijri date:", error)
        setHijriDate(null)
      }
    }

    fetchHijriDate()
  }, [date])

  const toggleHolidays = () => {
    setShowHolidays(!showHolidays)
  }

  const toggleCalendarType = () => {
    setIsHijri(!isHijri)
  }

  // Format date for display based on calendar type
  const formatDate = () => {
    if (isHijri && hijriDate) {
      return `${hijriDate.hijri.day} ${hijriDate.hijri.month.en} ${hijriDate.hijri.year} AH`
    } else {
      return date.toDateString()
    }
  }

  // Custom tile content to show Hijri dates
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null

    // Only fetch for the visible month to avoid excessive API calls
    return (
      <div className="hijri-date-tile">
        {isHijri && (
          <div className="text-xs text-gray-500 mt-1">
            {/* We'll display the Hijri date here in the actual implementation */}
            {/* This would require fetching Hijri dates for all visible dates */}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{isHijri ? "Hijri Calendar" : "Gregorian Calendar"}</h2>
        <button
          onClick={toggleCalendarType}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          Switch to {isHijri ? "Gregorian" : "Hijri"}
        </button>
      </div>

      <div className={`calendar-container ${isHijri ? "hijri-theme" : ""}`}>
        <Calendar onChange={setDate} value={date} tileContent={tileContent} />
      </div>

      <p className="mt-4">Selected Date: {formatDate()}</p>

      {hijriDate && !isHijri && (
        <p className="mt-2 text-sm text-gray-600">
          Hijri Date: {hijriDate.hijri.day} {hijriDate.hijri.month.en} {hijriDate.hijri.year} AH
        </p>
      )}

      {hijriDate && isHijri && (
        <p className="mt-2 text-sm text-gray-600">
          Gregorian Date: {hijriDate.gregorian.day} {hijriDate.gregorian.month.en} {hijriDate.gregorian.year}
        </p>
      )}

      <div className="mt-6">
        <button
          onClick={toggleHolidays}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          {showHolidays ? "Hide Holidays" : "Show Holidays"}
        </button>

        {showHolidays && (
          <div className="mt-4 transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-bold">Holidays:</h2>
            {holidays.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {holidays.map((holiday) => (
                  <li key={holiday.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <span className="font-medium">{holiday.name}</span> - {holiday.date.iso}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 italic">Loading holidays...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarComponent
