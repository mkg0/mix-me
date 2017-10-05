this.addEventListener('activate', function(event) {
  const title = "It's a match!"
  const options = {
    body: 'We found a Mix & Match group for you',
    icon: 'hamburger.png',
    badge: 'hamburger.png',
  }

  console.log('Scheduled a notification')
  setTimeout(() => {
    this.registration.showNotification(title, options)
  }, 5000)
})
