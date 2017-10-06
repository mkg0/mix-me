import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import Cookies from 'js-cookie'
import { TextField, RaisedButton } from 'material-ui'

import { registerUser } from './api'
import logo from './logo.jpg'
import './Register.css'

const hintStyle = {
  color: 'rgba(255, 255, 255, 0.6)',
  margin: '0 24%',
}

const inputStyle = {
  color: 'white',
  backgroundColor: '#030f21',
}

function RegistrationForm({ onChange, onSubmit, registered, username }) {
  return (
    <div className="register-form">
      <div className="row">
        <div className="flex">
          <span>
            Feeling social?<br />
            Mix and Match today!
          </span>
        </div>
      </div>
      <div className="row">
        <div className="flex">
          <TextField
            hintStyle={hintStyle}
            id="register-input"
            className="register-input"
            value={username}
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
            disabled={!username.toLowerCase().match(/^[a-z]+\.[a-z]+$/)}
            label="Mix Me!"
            primary
            onClick={onSubmit}
          />
        </div>
      </div>
      <div className="row">
        <div className="flex tutorial-link">
          <span>New here? </span>
          <Link to="/tutorial">Take the tutorial</Link>
        </div>
      </div>
    </div>
  )
}

function Registered() {
  return (
    <div className="row">
      <div className="flex">
        <h1>
          <span role="img" aria-label="success">
            🎉
          </span>
        </h1>
        <h3 className="signavio-color">You are registered!</h3>
        <p>
          You are part of today's Mix and Match.<br />
          We'll contact you before lunch with information about your group.
        </p>

        <Link to="/match">Show me my mates</Link>
      </div>
    </div>
  )
}

function Register(props) {
  return (
    <div className="register-wrapper">
      <div className="row">
        <div className="flex2">
          <img src={logo} alt="Mix-Me logo" />
        </div>
      </div>
      {props.registered ? <Registered /> : <RegistrationForm {...props} />}
    </div>
  )
}

export default compose(
  withStateHandlers(() => ({ username: '' }), {
    onChange: ({ username }) => event => ({
      username: event.target.value.toLowerCase(),
    }),
    setRegistered: () => registered => ({ registered }),
  }),
  withRouter,
  withHandlers({
    onSubmit: ({ username, history, setRegistered }) => () => {
      registerUser(username).then(() => {
        Cookies.set('name', username)
        history.push('/match')

        if (
          'Notification' in window &&
          Notification.permission !== 'granted' &&
          Notification.permission !== 'denied'
        ) {
          // Otherwise, we need to ask the user for permission
          Notification.requestPermission(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              console.log('Notification access granted')
            }
          })
        }
      })
    },
  })
)(Register)
