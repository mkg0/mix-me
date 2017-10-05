export default async function registerUser(name) {
  return await fetch('/api/matchme', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
}
