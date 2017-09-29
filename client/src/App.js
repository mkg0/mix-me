import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Register from './Register'
import Matches from './Matches'
import Tutorial from './Tutorial'
import NotFound from './NotFound'

const jonas = { name: 'jonas.hartweg' }
const oleks = { name: 'oleks.hrishchuk' }
const phil = { name: 'philipp.giese' }

const matches = {
  names: [jonas, oleks, phil],
  location: 'The Signavio Lounge',
}

export default function MixMe() {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Redirect exact path="/" to="/register" />
          <Route path="/register" component={Register} />
          <Route path="/matches" render={() => <Matches matches={matches} />} />
          <Route path="/tutorial" component={Tutorial} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
