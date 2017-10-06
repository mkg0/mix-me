import React from 'react'
import Cookies from 'js-cookie'

import Register from './Register'
import Match from './Match'

const Main = () => !!Cookies.get('name') ? <Match /> : <Register />
export default Main
