import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Register from './Register'
import Matches from './Matches'
import Tutorial from './Tutorial'

const jonas = { name: 'jonas.hartweg' }
const oleks = { name: 'oleks.g' }
const phil = { name: 'philipp.giese' }

const matches = {
  names: [jonas, oleks, phil],
  location: 'The Signavio Lounge',
}

export default function MixMe() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/register" component={Register} />
        <Route path="/matches" render={() => <Matches matches={matches} />} />
        <Route path="/tutorial" component={Tutorial} />
      </div>
    </BrowserRouter>
  )
}
