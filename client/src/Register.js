import React from 'react'
import { Link } from 'react-router-dom'

import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Help from 'material-ui/svg-icons/action/help'

const styles = {
  mediumIcon: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
}

function Register({ onChange, onSubmit, registered }) {
  return (
    <div className="register-page">
      <h1 className="register-logo">🍔 MixMe</h1>
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
              hintText="Your mail"
            />
            <span className="register-signavio">@signavio.com</span>
            <RaisedButton
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
  withState('registered', 'setRegistered', false),
  withState('username', 'setUsername', null),
  withHandlers({
    onChange: ({ setUsername }) => event => {
      setUsername(event.target.value)
    },
    onSubmit: ({ username, setRegistered }) => event => {
      setRegistered(true)
      console.log(username)
    },
  })
)(Register)
