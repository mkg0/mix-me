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

export default function MixMe({ match }) {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/tutorial" component={Tutorial} />
          <Route path="/register" component={Register} />
          <Route
            path="/match"
            render={() =>
              Cookies.get('name') && match.location ? (
                <Match match={match} />
              ) : (
                <Redirect to="/register" />
              )}
          />
          <Route
            path="/"
            render={() => {
              if (Cookies.get('name') || match.location) {
                return <Redirect to="/match" />
              } else {
                return <Redirect to="/register" />
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
