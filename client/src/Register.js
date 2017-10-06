import React from 'react'
import { Link } from 'react-router-dom'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import Cookies from 'js-cookie'
import { TextField, RaisedButton } from 'material-ui'

import { matchIfRegistered } from './higher-order'
import { registerUser } from './api'
import logo from './logo.jpg'
import './Register.css'

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

function Register({ onChange, onSubmit, username }) {
  return (
    <div className="register-wrapper">
      <div className="row">
        <div className="flex2">
          <img src={logo} alt="Mix-Me logo" />
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
  )
}

export default compose(
  matchIfRegistered,
  withStateHandlers(() => ({ username: '' }), {
    onChange: ({ username }) => event => ({
      username: event.target.value.toLowerCase(),
    }),
  }),
  withHandlers({
    onSubmit: ({ username, history }) => () => {
      registerUser(username).then(() => {
        Cookies.set('name', username)
        history.push('/match')

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
    },
  })
)(Register)
