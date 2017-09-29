import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import './Register.css'

function Register({ onChange }) {
  return (
    <div className="register-page">
      <h1 className="register-logo">🍔 Mix Me! 🍔</h1>
      <p className="register-description">Find buddies to have lunch with.</p>
      <div className="register-signup">
        <input
          onChange={onChange}
          className="register-input"
          type="text"
          placeholder="firstname.lastname"
        />
        <span>@signavio.com</span>
      </div>
      <button className="register-button">Sign me up!</button>
    </div>
  )
}

export default compose(
  withState('username', 'setUsername', null),
  withHandlers({
    onChange: ({ setUsername }) => event => {
      setUsername(event.target.value)
    },
  })
)(Register)
