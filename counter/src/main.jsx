
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CounterContextProvier } from './components/CounterContext.jsx'

createRoot(document.getElementById('root')).render(
  <CounterContextProvier>
    <App />
  </CounterContextProvier>
)
