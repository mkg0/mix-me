export default async function registerUser(username) {
  return await fetch('/api/matchme', {
    method: 'POST',
    body: username,
  })
}
