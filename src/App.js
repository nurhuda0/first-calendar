"use client"
import { useTheme } from "./context/ThemeContext"
import FullCalendar from "./components/FullCalendar"

const App = () => {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <div className={darkMode ? "bg-gray-800 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <header className="flex justify-between p-4">
        <h1 className="text-2xl">Dual Calendar System</h1>
        <button onClick={toggleTheme} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Toggle Theme
        </button>
      </header>
      <FullCalendar />
    </div>
  )
}

export default App
