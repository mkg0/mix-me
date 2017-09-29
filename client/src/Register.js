import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import './Register.css'

function Register({ onChange, onSubmit, toggleTutorial, tutorial }) {
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
      <div onClick={toggleTutorial}>❓</div>
      {tutorial && (
        <div>
          After signing up, our advanced algorithms will match you with random
          candidates for a nice lunch together.
        </div>
      )}
    </div>
  )
}

export default compose(
  withState('tutorial', 'setTutorial', false),
  withState('username', 'setUsername', null),
  withHandlers({
    onChange: ({ setUsername }) => event => {
      setUsername(event.target.value)
    },
    onSubmit: ({ username }) => event => {
      console.log(username)
    },
    toggleTutorial: ({ setTutorial, tutorial }) => () => {
      setTutorial(!tutorial)
    },
  })
)(Register)
