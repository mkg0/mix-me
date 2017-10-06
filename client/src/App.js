import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Tutorial from './Tutorial'
import Main from './Main'

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
          <Route path="/" exact component={Main} />
          <Route path="/tutorial" component={Tutorial} />

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}
