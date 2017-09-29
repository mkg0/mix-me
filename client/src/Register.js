import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import './Register.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
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

function Register({ onChange, onSubmit, toggleTutorial, tutorial }) {
  return (
    <div className="register-page">
      <h1 className="register-logo">🍔 MixMe</h1>
      <div className="register-card">
        <p className="register-description">Find buddies to have lunch with.</p>

        <div className="register-signup">
          <TextField
            id="register-input"
            className="register-input"
            onChange={onChange}
          />
          <span className="register-signavio">@signavio.com</span>
        </div>
        <div>
          <RaisedButton label="Sign up!" secondary onClick={onSubmit} />
        </div>
      </div>
      <div className="register-tutorial-wrapper">
        <FloatingActionButton secondary className="register-tutorial-wrapper">
          <span> ?</span>
        </FloatingActionButton>{' '}
      </div>
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
