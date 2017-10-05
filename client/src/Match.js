import React from 'react'
import { capitalize } from 'lodash'

import { Room } from 'material-ui-icons'
import { Subheader, List, ListItem, Avatar, AppBar, Divider } from 'material-ui'
import { pink500 } from 'material-ui/styles/colors'

export default function Match({ match }) {
  return (
    <div>
      <AppBar showMenuIconButton={false} title="There is a match!" />

      <Subheader>Your group for today</Subheader>

      <List>
        {match.names.map(({ name }) => (
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
          primaryText={match.location}
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
  const [lastName] = name.split('.')

  return lastName.slice(0, 1).toUpperCase()
}
