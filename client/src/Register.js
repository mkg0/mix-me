import React from 'react'
import { Link } from 'react-router-dom'

import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import registerUser from './api/service'

function Register({ onChange, onSubmit, registered, username }) {
  return (
    <div className="register-page">
      <h1 className="register-logo">
        <span role="img" aria-labelledby="hamburger">
          🍔
        </span>MixMe
      </h1>
      <div className="register-card">
        <p className="register-description">
          Find buddies to have lunch with today
        </p>
        {registered ? (
          <div>
            {' '}
            <p>You are signed up!</p>
            <p>We'll find a match for as quick as possible!</p>
          </div>
        ) : (
          <div className="register-signup">
            <TextField
              id="register-input"
              className="register-input"
              onChange={onChange}
              hintText="firstname.lastname"
            />
            <span className="register-signavio">@signavio.com</span>
            <RaisedButton
              disabled={!username.match(/^[a-z]+\.[a-z]+$/)}
              label="Match me!"
              className="register-button"
              primary
              onClick={onSubmit}
            />
          </div>
        )}
        <div className="register-tutorial">
          <span>New here? </span>
          <Link to="/tutorial" className="register-tutorial-link">
            Take the tutorial
          </Link>
        </div>
      </div>
    </div>
  )
}

export default compose(
  withState('error', 'setError', null),
  withState('registered', 'setRegistered', false),
  withState('username', 'setUsername', ''),
  withHandlers({
    onChange: ({ setUsername }) => event => {
      setUsername(event.target.value)
    },
    onSubmit: ({ username, setRegistered, setError }) => () => {
      try {
        registerUser(username).then(() => setRegistered(true))
      } catch (error) {
        setError(error)
      }
    },
  })
)(Register)
