import React from 'react';
import { useTheme } from './context/ThemeContext';
import CalendarComponent from './components/Calendar';

const App = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
      <header className="flex justify-between p-4">
        <h1 className="text-2xl">First Calendar</h1>
        <button onClick={toggleTheme} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Toggle Theme
        </button>
      </header>
      <CalendarComponent />
    </div>
  );
};

// const App = () => {
//   return <h1>Hello, World!</h1>;
// };

export default App;