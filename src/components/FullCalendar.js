"use client"

import { useState } from "react"
import CalendarComponent from "./Calendar" // Original Gregorian calendar
import HijriCalendarView from "./HijriCalendarView" // New Hijri calendar view

const FullCalendar = () => {
  const [isHijri, setIsHijri] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showHolidays, setShowHolidays] = useState(false)

  const toggleCalendarType = () => {
    setIsHijri(!isHijri)
  }

  const toggleHolidays = () => {
    setShowHolidays(!showHolidays)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="p-4">
      {isHijri ? (
        <HijriCalendarView
          onDateChange={handleDateChange}
          currentDate={selectedDate}
          onSwitchCalendar={toggleCalendarType}
        />
      ) : (
        <div>
          {/* <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gregorian Calendar</h2>
            <button
              onClick={toggleCalendarType}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
            >
              Switch to Hijri
            </button>
          </div> */}
          <CalendarComponent
            isHijriMode={false}
            onDateChange={handleDateChange}
            showHolidays={showHolidays}
            toggleHolidays={toggleHolidays}
          />
        </div>
      )}
    </div>
  )
}

export default FullCalendar
