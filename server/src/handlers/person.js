import { Person } from '../models'

export const createPerson = async ({ name, active = true }) => {
    const dbPerson = await Person.findOne({ name })
    if (dbPerson === null) {
        return new Person({ name, active: true }).save()
    }
    await dbPerson.update({ active })
    const updatedPerson = await Person.findOne({ name })
    return Promise.resolve(updatedPerson)
}

export const getAllPeople = async (query = {}) => Person.find(query)

export const activatePeople = async () => {
    const people = await getAllPeople()
    await Promise.all(people.map(person => person.update({ active: true })))
}
