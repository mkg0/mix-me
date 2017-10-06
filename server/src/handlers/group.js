import { Location, Group } from '../models'
import mixRandom from '../mixRandom'
import { getAllPeople } from './person'

export const createGroups = async () => {
    await Group.deleteMany()
    const people = await getAllPeople({ active: true })
    const locations = await Location.find()
    return Promise.all([
        ...mixRandom(people, locations).map(group => new Group(group).save()),
        ...people.map(person => person.update({ active: false })),
    ])
}

export const getAllGroups = () =>
    Group.find()
        .populate('names', 'name')
        .populate('location', 'name')
        .exec()

export const getGroupForName = async name => {
    const groups = await getAllGroups()
    return (
        groups
            .map(({ location, names }) => ({
                location: location.name,
                names,
            }))
            .find(({ names }) =>
                names.map(({ name: n }) => n).includes(name)
            ) || {}
    )
}
