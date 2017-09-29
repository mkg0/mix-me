import React from 'react'
import { capitalize } from 'lodash'

import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'

import { pink500 } from 'material-ui/styles/colors'

import { Room } from 'material-ui-icons'

export default function Matches({ matches }) {
  return (
    <div>
      <AppBar showMenuIconButton={false} title="There is a match!" />

      <Subheader>Your group for today</Subheader>

      <List>
        {matches.names.map(({ name }) => (
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
          primaryText={matches.location}
        />
      </List>
    </div>
  )
}

const fullName = name => {
  const [firstName, lastName] = name.split('.')

  return `${capitalize(firstName)} ${capitalize(lastName)}`
}

const initials = name => {
  const [firstName, lastName] = name.split('.')

  return lastName.slice(0, 1).toUpperCase()
}
