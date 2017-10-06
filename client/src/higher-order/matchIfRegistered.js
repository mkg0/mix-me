import React from 'react'
import { Redirect } from 'react-router-dom'
import { branch } from 'recompose'
import Cookie from 'js-cookie'

function matchIfRegistered() {
  return () => <Redirect to="/match" />
}

export default branch(() => Cookie.get('name'), matchIfRegistered)
