this.addEventListener('activate', () => {
  setTimeout(() => {
    this.registration.showNotification("It's a match!", {
      body: 'We found a Mix & Match group for you',
      icon: 'hamburger.png',
      badge: 'hamburger.png',
    })
  }, 5000)
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
