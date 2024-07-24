import { useState } from 'react'
import { reactEnv } from './utils/environmentChecks'
import './App.css'

import ApiMessage from './components/ApiMessage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Express-React Monorepo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          React environment: {reactEnv}
        </p>
      </div>
    <ApiMessage />
    </>
  )
}

export default App
