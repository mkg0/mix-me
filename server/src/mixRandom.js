/**
 * Created by iyadas on 29.09.17.
 */

import { shuffle, last } from 'lodash'

export default (names, locations) => {
    const groups = shuffle(names).reduce((groupedNames, name, index) => {
        const pos = Math.floor(index / 5)
        if (!groupedNames[pos]) {
            // eslint-disable-next-line no-param-reassign
            groupedNames[pos] = []
        }
        groupedNames[pos].push(name)
        return groupedNames
    }, [])

    // if last group has less than 3 persons get
    // 2 people from the secondlast group
    if (names.length > 5) {
        const lastGroup = last(groups)
        if (lastGroup.length < 3) {
            const secondLastGroup = groups[groups.length - 2]
            const shifted = secondLastGroup.splice(0, 2)

            groups[groups.length - 1] = lastGroup.concat(shifted)
        }
    }

    return groups.map((namesForGroup, index) => ({
        names: namesForGroup,
        location: locations[index % locations.length],
    }))
}
