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

const preferences = [
  { title: '🤷', value: 'indifferent' },
  { title: '🍕', value: 'pizza' },
  { title: '🍔', value: 'burgers' },
  { title: '🌯', value: 'burritos' },
  { title: '🥕', value: 'vegetarian' },
  { title: '🍱', value: 'sushi' },
  { title: '🍛', value: 'thai' },
  { title: '🍺', value: 'beers' },
]

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
            <h1>🎉</h1>
            <h3 className="signavio-color">You are registered!</h3>
            <p>
              You are part of today's Mix and Match. We'll contact you before
              lunch with information about your group.
            </p>
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
                {preferences.map(({ value, title }) => (
                  <option key={value} value={value}>
                    {title}
                  </option>
                ))}
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
          <div className="row">
            <div className="flex tutorial-link">
              <span>New here? </span>
              <Link to="/tutorial">Take the tutorial</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default compose(
  withState('error', 'setError', null),
  withState('registered', 'setRegistered', !!Cookies.get('name')),
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
