import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Cookies from 'js-cookie'

import Register from './Register'
import Match from './Match'
import Tutorial from './Tutorial'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ad0f5b',
    accent1Color: 'rgb(24, 170, 177)',
  },
})

export default function MixMe({ group }) {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/tutorial" component={Tutorial} />

          {Cookies.get('name') ? (
            <Match />
          ) : (
            <Register />
          )}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
