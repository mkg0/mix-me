import React from 'react'
import { capitalize, get } from 'lodash'
import Cookies from 'js-cookie'
import { compose, withState, lifecycle } from 'recompose'

import { Room } from 'material-ui-icons'
import { Subheader, List, ListItem, Avatar, AppBar, Divider } from 'material-ui'
import { pink500 } from 'material-ui/styles/colors'

import { registerIfNeeded } from './higher-order'

function Match({ group, loading }) {
  if (loading) {
    return <div>Looking for your peers...</div>
  }

  return (
    <div style={{ color: 'black' }}>
      {group.location ? (
        <div>
          <AppBar showMenuIconButton={false} title="There is a match!" />
          <Subheader>Your group for today</Subheader>
        </div>
      ) : (
        <AppBar showMenuIconButton={false} title="You dont have a match yet" />
      )}

      {get(group, 'names') ? (
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
        </div>
      ) : (
        <div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 200,
            textAlign: 'center',
          }}
        >
          We haven't found a group, yet.<br /> Please check again later.
        </div>
      )}

      {get(group, 'location') && (
        <List>
          <Subheader inset>We will meet at...</Subheader>

          <ListItem
            disabled
            leftAvatar={<Avatar icon={<Room />} backgroundColor={pink500} />}
            primaryText={group.location}
          />
        </List>
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
  registerIfNeeded,
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
