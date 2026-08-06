import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Game from './Game.jsx'
import QuestionCard from './components/QuestionCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuestionCard />
  </StrictMode>,
)

// Game settalo al posto di Question
// rimuovi import question