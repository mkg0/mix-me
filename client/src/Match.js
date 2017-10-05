import React from 'react'
import { capitalize } from 'lodash'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import { compose, branch, withState, lifecycle } from 'recompose'

import { Room } from 'material-ui-icons'
import { Subheader, List, ListItem, Avatar, AppBar, Divider } from 'material-ui'
import { pink500 } from 'material-ui/styles/colors'

function Match({ group, loading }) {
  return (
    <div>
      <AppBar showMenuIconButton={false} title="There is a match!" />

      <Subheader>Your group for today</Subheader>

      {loading && <div>Looking for your peers...</div>}

      {group && (
        <div>
          <List>
            {group.names.map(({ name }) => (
              <ListItem
                disabled
                key={name}
                leftAvatar={<Avatar>{initials(name)}</Avatar>}
                primaryText={fullName(name)}
              />
            ))}
          </List>

          <Divider />

          <List>
            <Subheader inset>We will meet at...</Subheader>

            <ListItem
              disabled
              leftAvatar={<Avatar icon={<Room />} backgroundColor={pink500} />}
              primaryText={group.location}
            />
          </List>
        </div>
      )}
    </div>
  )
}

const fullName = name => {
  const [firstName, lastName] = name.split('.')

  return `${capitalize(firstName)} ${capitalize(lastName)}`
}

const initials = name => {
  const [lastName] = name.split('.')

  return lastName.slice(0, 1).toUpperCase()
}

export default compose(
  branch(() => !Cookies.get('name'), () => () => <Redirect to="/register" />),
  withState('loading', 'toggleLoading', true),
  withState('group', 'setGroup', null),
  lifecycle({
    componentWillMount() {
      const { toggleLoading, setGroup } = this.props

      fetch(`/api/match?name=${Cookies.get('name')}`)
        .then(response => response.json())
        .then(group => {
          setGroup(group)
          toggleLoading(false)
        })
    },
  })
)(Match)
