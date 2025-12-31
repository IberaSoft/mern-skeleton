import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found')
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
