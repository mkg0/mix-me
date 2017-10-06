import React from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}

const tilesData = [
  {
    img: 'https://tinyurl.com/y998e7ww',
    title: 'Dolores',
    distance: 6,
  },
  {
    img: 'https://tinyurl.com/yb9qor68',
    title: 'Evin',
    distance: 3,
  },
  {
    img: 'https://tinyurl.com/ybtnn6qp',
    title: 'Cafe Bäckerei',
    distance: 3,
  },
  {
    img: 'https://tinyurl.com/yalbh3hw',
    title: 'Kalus',
    distance: 3,
  },
  {
    img: 'https://tinyurl.com/ybjjfs9a',
    title: 'Reva',
    distance: 3,
  },
  {
    img: 'https://tinyurl.com/y83jz4j8',
    title: 'Pucci',
    distance: 4,
  },
  {
    img: 'https://tinyurl.com/yaew2n5p',
    title: 'Kimiko',
    distance: 2,
  },
  {
    img: 'https://tinyurl.com/y8qwt9x7',
    title: 'Chicago Steak House',
    distance: 6,
  },
]

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList cellHeight={180} style={styles.gridList}>
      <Subheader>Here are some suggestions for nearby restaurants</Subheader>
      {tilesData.map(tile => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={
            <span>
              <b>{tile.distance}</b> minutes by foot
            </span>
          }
          actionIcon={
            <IconButton>
              <StarBorder color="white" />
            </IconButton>
          }
        >
          <img src={tile.img} alt={tile.title} />
        </GridTile>
      ))}
    </GridList>
  </div>
)

export default GridListExampleSimple
