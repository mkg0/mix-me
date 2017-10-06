const getNextExecution = () => {
  const now = new Date()
  let next

  if (now.getHours() < 11) {
    return new Date().setHours(11, 0, 0, 0) - now
  }
  return new Date().setDate(now.getDate() + 1).setHours(11, 0, 0, 0) - now
}

this.addEventListener('activate', () => {
  console.log(getNextExecution() / 1000 / 60)

  setTimeout(() => {
    this.registration.showNotification("It's a match!", {
      body: 'We found a Mix & Match group for you',
      icon: 'hamburger.png',
      badge: 'hamburger.png',
    })
  }, getNextExecution())
})

this.addEventListener('notificationclick', event => {
  event.waitUntil(
    this.clients
      .matchAll({
        type: 'window',
      })
      .then(clients => {
        clients.forEach(client => {
          if (client.url == '/' && 'focus' in client) return client.focus()
        })

        if (this.clients.openWindow) return this.clients.openWindow('/')
      })
  )
})
