/**
 * Created by iyadas on 29.09.17.
 */

import { shuffle } from 'lodash'

export default (names, locations) => {
    const shuffledNames = shuffle(names)

    const groups = shuffledNames.reduce((groupedNames, name, index) => {
        const pos = Math.floor(index / 5)
        if (!groupedNames[pos]) {
            groupedNames[pos] = []
        }
        groupedNames[pos].push(name)
        return groupedNames
    }, [])

    // if last group has less than 3 persons get
    // 2 people from the secondlast group
    if (names.length > 5) {
        const lastGroup = groups[groups.length - 1]
        if (lastGroup.length < 3) {
            const secondLastGroup = groups[groups.length - 2]

            const shifted = secondLastGroup.splice(0, 2)

            groups[groups.length - 1] = lastGroup.concat(shifted)
        }
    }

    const jsonGroups = groups.map(namesForGroup => ({
        names: namesForGroup,
    }))

    const listOfGroups = jsonGroups.map((group, index) => ({
        ...group,
        location: locations[index % locations.length],
    }))

    return listOfGroups
}
