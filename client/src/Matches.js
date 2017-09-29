import React from 'react'

export default function Matches({ matches }) {
  return (
    <div>
      <p>There is a match!</p>
      <h1>Your group for today</h1>
      <ul>{matches.names.map(({ name }) => <li key={name}>{name}</li>)}</ul>
      You'll meet here:
      <br />
      <strong>{matches.location}</strong>
    </div>
  )
}
