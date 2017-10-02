import React from 'react'
import { Link } from 'react-router-dom'

import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Help from 'material-ui/svg-icons/action/help'
import registerUser from './api/service'

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

function Register({ onChange, onSubmit }) {
  return (
    <div className="register-page">
      <h1 className="register-logo">🍔 MixMe</h1>
      <div className="register-card">
        <p className="register-description">Find buddies to have lunch with</p>

        <div className="register-signup">
          <TextField
            id="register-input"
            className="register-input"
            onChange={onChange}
            hintText="Your mail"
          />
          <span className="register-signavio">@signavio.com</span>
        </div>
        <div>
          <RaisedButton label="Match me today!" primary onClick={onSubmit} />
          <div
            style={{
              color: 'rgba(0, 0, 0, 0.3)',
              fontSize: 16,
              fontWeight: 300,
              marginTop: 120,
            }}
          >
            <span>New here? </span>
            <Link
              to="/tutorial"
              style={{
                textDecoration: 'underline',
                color: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              Take the tutorial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  withState('error', 'setError', null),
  withState('registered', 'setRegistered', false),
  withState('username', 'setUsername', null),
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
