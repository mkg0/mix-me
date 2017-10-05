import React from 'react'
import { Link } from 'react-router-dom'

import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import registerUser from './api/service'
import logo from './logo.jpg'

const hintStyle = {
  color: '#fff',
  margin: '0 24%',
}

const inputStyle = {
  color: '#ad0f5b',
}

function Register({ onChange, onSubmit, registered, username }) {
  return (
    <div className="register-wrapper">
      <div className="row">
        <div className="flex2">
          <img src={logo} alt="Mix-Me logo" />
        </div>
      </div>
      {registered ? (
        <div className="row">
          <div className="flex">
            <h3 className="signavio-color">You are signed up!</h3>
            <p>We'll find a match for you as quick as possible!</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="flex">
              <TextField
                hintStyle={hintStyle}
                id="register-input"
                className="register-input"
                onChange={onChange}
                inputStyle={inputStyle}
                hintText="firstname.lastname"
              />
              <span className="signavio-color">@signavio.com</span>
            </div>
          </div>
          <div className="row">
            <div className="flex">
              <RaisedButton
                disabled={!username.match(/^[a-z]+\.[a-z]+$/)}
                label="Mix Me!"
                primary
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="flex tutorial-link">
          <span>New here? </span>
          <Link to="/tutorial">Take the tutorial</Link>
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
