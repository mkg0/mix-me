import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()

// Let's check if the browser supports notifications
if (!('Notification' in window)) {
  alert('This browser does not support desktop notification')
} else if (Notification.permission === 'granted') {
  // Let's check whether notification permissions have already been granted
  // If it's okay let's create a notification
  console.log('Notification access already granted')
} else if (Notification.permission !== 'denied') {
  // Otherwise, we need to ask the user for permission
  Notification.requestPermission(function(permission) {
    // If the user accepts, let's create a notification
    if (permission === 'granted') {
      console.log('Notification access granted')
    }
  })
}
