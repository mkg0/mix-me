import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import './Register.css'

function Register({ onChange, onSubmit }) {
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
      <button className="register-button" onClick={onSubmit}>
        Sign me up!
      </button>
    </div>
  )
}

export default compose(
  withState('username', 'setUsername', null),
  withHandlers({
    onChange: ({ setUsername }) => event => {
      setUsername(event.target.value)
    },
    onSubmit: ({ username }) => event => {
      console.log(username)
    },
  })
)(Register)
