import React from 'react'
import Cookie from 'js-cookie'
import { branch } from 'recompose'
import { Redirect } from 'react-router-dom'

function redirectToRegister() {
  return () => <Redirect to="/register" />
}

export default branch(() => !Cookie.get('name'), redirectToRegister)
