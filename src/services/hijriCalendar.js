/**
 * Service to handle Hijri calendar conversions and data fetching
 */

// Function to convert a Gregorian date to Hijri using the Aladhan API
export const convertToHijri = async (gregorianDate) => {
    try {
      const day = gregorianDate.getDate()
      const month = gregorianDate.getMonth() + 1 // JavaScript months are 0-indexed
      const year = gregorianDate.getFullYear()
  
      const formattedDate = `${day}-${month}-${year}`
      const response = await fetch(`https://api.aladhan.com/v1/gToH/${formattedDate}`)
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error converting to Hijri:", error)
      return null
    }
  }
  
  // Function to convert a Hijri date to Gregorian using the Aladhan API
  export const convertToGregorian = async (hijriDay, hijriMonth, hijriYear) => {
    try {
      const formattedDate = `${hijriDay}-${hijriMonth}-${hijriYear}`
      const response = await fetch(`https://api.aladhan.com/v1/hToG/${formattedDate}`)
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error converting to Gregorian:", error)
      return null
    }
  }
  
  // Function to get Hijri dates for a month view
  export const getHijriMonth = async (gregorianYear, gregorianMonth) => {
    try {
      // Aladhan API uses 1-indexed months
      const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${gregorianMonth}/${gregorianYear}`)
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error fetching Hijri month:", error)
      return []
    }
  }
  
  // Function to get Islamic holidays
  export const getIslamicHolidays = async (hijriYear) => {
    // This would typically call an API that provides Islamic holidays
    // For now, we'll return a static list of major Islamic holidays
    return [
      {
        id: "ramadan-start",
        name: "Beginning of Ramadan",
        date: { hijri: { day: "1", month: { en: "Ramadan" }, year: hijriYear } },
      },
      {
        id: "eid-al-fitr",
        name: "Eid al-Fitr",
        date: { hijri: { day: "1", month: { en: "Shawwal" }, year: hijriYear } },
      },
      {
        id: "eid-al-adha",
        name: "Eid al-Adha",
        date: { hijri: { day: "10", month: { en: "Dhu al-Hijjah" }, year: hijriYear } },
      },
      {
        id: "islamic-new-year",
        name: "Islamic New Year",
        date: { hijri: { day: "1", month: { en: "Muharram" }, year: (Number.parseInt(hijriYear) + 1).toString() } },
      },
    ]
  }
  