import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Cookies from 'js-cookie'

import Register from './Register'
import Match from './Match'
import Tutorial from './Tutorial'
import NotFound from './NotFound'

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
          <Route path="/register" component={Register} />
          <Route path="/match" component={Match} />

          {Cookies.get('name') ? (
            <Redirect to="/match" />
          ) : (
            <Redirect to="/register" />
          )}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
