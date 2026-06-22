import React from 'react'
import ReactDOM from 'react-dom/client'
// Self-hosted fonts (no external Google Fonts request; inlined into the build)
import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
