import { Person, Location, Group } from '../models'
import mixRandom from '../mixRandom'

export const createGroups = () =>
    Group.deleteMany().then(() =>
        Person.find()
            .exec()
            .then(people =>
                Location.find()
                    .exec()
                    .then(locations =>
                        Promise.all(
                            mixRandom(people, locations).map(group =>
                                new Group(group).save()
                            )
                        )
                    )
            )
    )

export const getAllGroups = () =>
    Group.find()
        .populate('names', 'name')
        .populate('location', 'name')
        .exec()

export const getGroupForName = name =>
    getAllGroups().then(
        groups =>
            groups
                .map(({ location, names }) => ({
                    location: location.name,
                    names,
                }))
                .find(({ names }) =>
                    names.map(({ name: n }) => n).includes(name)
                ) || {}
    )
