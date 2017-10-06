import React from 'react'
import { capitalize, get } from 'lodash'
import Cookies from 'js-cookie'
import { compose, withState, lifecycle } from 'recompose'
import Spinner from 'react-spinkit'

import { Room } from 'material-ui-icons'
import { Subheader, List, ListItem, Avatar, AppBar, Divider } from 'material-ui'
import { pink500 } from 'material-ui/styles/colors'

import { registerIfNeeded } from './higher-order'
import RestaurantGrid from './RestaurantGrid'

function Match({ group }) {
  return (
    <div style={{ color: 'black' }}>
      {get(group, 'location') ? (
        <div>
          <AppBar showMenuIconButton={false} title="There is a match!" />
        </div>
      ) : (
        <AppBar showMenuIconButton={false} title="You dont have a match yet" />
      )}

      {get(group, 'names') ? (
        <div>
          <Subheader>Your group for today</Subheader>
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
            paddingTop: 150,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              marginLeft: '50%',
              transform: 'translate(-15%)',
              marginBottom: 50,
              opacity: 0.5,
            }}
          >
            <Spinner name="pacman" />
          </div>
          We haven't found a group, yet but we're busy looking for one.
        </div>
      )}

      {get(group, 'location') && (
        <div>
          <Divider />
          <Subheader>Meet your buddies at...</Subheader>
          <List>
            <ListItem
              disabled
              leftAvatar={
                <img
                  src="SignavioLogo.png"
                  style={{ width: 26, margin: '6px 0 0 6px' }}
                />
              }
              primaryText={group.location}
            />
          </List>
          <RestaurantGrid />
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
  registerIfNeeded,
  withState('group', 'setGroup', null),
  lifecycle({
    componentWillMount() {
      const { setGroup } = this.props

      const fetchGroup = () => {
        fetch(`/api/match?name=${Cookies.get('name')}`)
          .then(response => response.json())
          .then(group => {
            setGroup(group)
          })
      }

      fetchGroup()

      this.timer = setInterval(fetchGroup, 10 * 1000)
    },

    componentWillUnmount() {
      clearImmediate(this.timer)
    },
  })
)(Match)
