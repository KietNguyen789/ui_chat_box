import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/dashboard/dashboard'
import { Header } from './pages/dashboard/header/header'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-transparent lg:flex-row font-(family-name:--font-mono)">
        <Dashboard />
      </div>
    </>

  )
}

export default App
