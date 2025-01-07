import React,{useState} from 'react'
import CountDownTimer from './components/CountDownTimer'
import TaskManagement from './components/TaskManagement'

const App = () => {
  let [theme, setTheme] = useState("light");

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setTheme((PrevTheme) => (PrevTheme === "light" ? "dark" : "light"));
  };
  
  return (
    <>
    <div className={`countdown-timer ${theme==='dark'?'bg-dark text-light':'bg-light text-dark'} p-4 `}>
      <CountDownTimer/>
      {/* Dark and light mode Toggle Button */}
      <div className='my-3'>
        <button
        className={`btn ${theme==='light'?'btn-dark':'btn-light'} mt-4`}
        onClick={toggleTheme}
        >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
      <TaskManagement/>
    </div>
    
    </>
  )
}

export default App
