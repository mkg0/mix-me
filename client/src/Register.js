import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

function Register({ onChange, onSubmit }) {
  return (
    <div className="register-page">
      <h1 className="register-logo">🍔 MixMe</h1>
      <div className="register-card">
        <p className="register-description">Find buddies to have lunch with.</p>
        <div className="register-signup">
          <TextField style={{ width: 200 }} onChange={onChange} />
          <span className="register-signavio">@signavio.com</span>
        </div>
        <div>
          <RaisedButton label="Sign up!" secondary onClick={onSubmit} />
        </div>
      </div>
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
