import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Vite + React + Tailwind CSS
        </h1>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 mb-6">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
          >
            Count is {count}
          </button>
        </div>
        
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm text-purple-600">src/App.jsx</code> and save to test HMR
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">✅ React</span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">✅ Vite</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">✅ Tailwind CSS</span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">✅ PWA</span>
          </div>
          
          <p className="text-gray-500 text-sm pt-4">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
