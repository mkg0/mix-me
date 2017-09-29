import React from 'react'
import './Register.css'

export default function Register() {
  return (
    <div className="register-page">
      <h1 className="register-logo">🍔 Mix Me! 🍔</h1>
      <p className="register-description">Find buddies to have lunch with.</p>
      <div className="register-signup">
        <input
          className="register-input"
          type="text"
          placeholder="firstname.lastname"
        />
        <span>@signavio.com</span>
      </div>
      <button className="register-button">Sign me up!</button>
    </div>
  )
}
