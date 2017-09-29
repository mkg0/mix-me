import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ad0f5b',
    accent1Color: 'rgb(24, 170, 177)',
  },
})

export default function MixMe() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
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
