import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import registerUser from './api/service'
import logo from './logo.jpg'

const hintStyle = {
  color: 'rgba(255, 255, 255, 0.6)',
  margin: '0 24%',
}

const inputStyle = {
  color: 'white',
}

const preferences = [{ type: '🍱' }, { type: '🍕' }, { type: '🍖' }]

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
              <select className="food-preferences">
                <option>🍱</option>
                <option>🍕</option>
                <option>🍖</option>
              </select>
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
      setUsername(event.target.value.toLowerCase())
    },
    onSubmit: ({ username, setRegistered, setError }) => () => {
      try {
        registerUser(username).then(() => {
          setRegistered(true)
          Cookies.set('name', username)

          // Let's check if the browser supports notifications
          if (!('Notification' in window)) {
            alert('This browser does not support desktop notification')
          } else if (Notification.permission === 'granted') {
            // Let's check whether notification permissions have already been granted
            // If it's okay let's create a notification
            console.log('Notification access already granted')
          } else if (Notification.permission !== 'denied') {
            // Otherwise, we need to ask the user for permission
            Notification.requestPermission(function(permission) {
              // If the user accepts, let's create a notification
              if (permission === 'granted') {
                console.log('Notification access granted')
              }
            })
          }
        })
      } catch (error) {
        setError(error)
      }
    },
  })
)(Register)
