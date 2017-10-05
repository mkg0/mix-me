import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// const jonas = { name: 'jonas.hartweg' }
// const oleks = { name: 'oleks.hrishchuk' }
// const phil = { name: 'philipp.giese' }

// const match = {
//   names: [jonas, oleks, phil],
//   location: 'The Signavio Lounge',
// }

fetch('/api/match')
  .then(response => response.json())
  .then(match =>
    ReactDOM.render(<App match={match} />, document.getElementById('root'))
  )

registerServiceWorker()
