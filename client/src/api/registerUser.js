export default async function registerUser(name) {
  return await fetch('/api/matchme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
}
