"use client"

import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date())
  const [holidays, setHolidays] = useState([])
  const [showHolidays, setShowHolidays] = useState(false)

  useEffect(() => {
    const fetchHolidays = async () => {
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?api_key=gVKjanJQyilwNbaU01KmHcC78rn9lNMi&country=US&year=${date.getFullYear()}`,
      )
      const data = await response.json()
      setHolidays(data.response.holidays)
    }

    fetchHolidays()
  }, [date])

  const toggleHolidays = () => {
    setShowHolidays(!showHolidays)
  }

  return (
    <div className="p-4">
      <Calendar onChange={setDate} value={date} />
      <p className="mt-4">Selected Date: {date.toDateString()}</p>

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
