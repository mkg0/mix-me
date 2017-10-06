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
    img:
      'http://www.top10berlin.de/sites/top10berlin.de/files/styles/list_image/public/location/mainimages/2017/02/16/top10berlin_dolores-burritos001.jpg?',
    title: 'Dolores',
    distance: 6,
  },
  {
    img:
      'https://www.online-tischreservierung.de/images/restaurants/Berlin/Berlin/ko8ca6d28q/1.jpg',
    title: 'Evin',
    distance: 3,
  },
  {
    img:
      'https://media-cdn.tripadvisor.com/media/photo-s/07/60/a0/8e/cafe-backerei.jpg',
    title: 'Cafe Bäckerei',
    distance: 3,
  },
  {
    img: 'https://www.kalus-restaurant.de/images/900/1645878/IMG_0912.JPG',
    title: 'Kalus',
    distance: 3,
  },
  {
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/95/94/0b/reva.jpg',
    title: 'Reva',
    distance: 3,
  },
  {
    img: 'https://s3-media4.fl.yelpcdn.com/bphoto/yjckhWlnqPivQtL5GAGt6w/o.jpg',
    title: 'Pucci',
    distance: 4,
  },
  {
    img:
      'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/13240483_255733911482823_1100800166297608233_n.jpg?oh=677d5b0fde4094a82174b97c27a1b1e8&oe=5A8334BF',
    title: 'Kimiko',
    distance: 2,
  },
  {
    img:
      'https://www.falstaff.de/fileadmin/_processed_/csm_01-Chicago-Steakhouse-beigestellt-2048_e0308280f5.jpg',
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
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
)

export default GridListExampleSimple
