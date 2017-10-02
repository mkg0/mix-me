/**
 * Created by iyadas on 29.09.17.
 */

// const names = ['iyad.al', 'julius.b', 'jonas.h', 'alexander', 'hermann', 'phil.g', 'newGuy', 'another.one']
const names = ['iyad.al', 'julius.b', 'jonas.h', 'alexander', 'hermann', 'phil.g', 'newGuy', 'another.one', 'q', 'w', 'l', 'a']
//const names = ['iyad.al', 'julius.b', 'jonas.h', 'alexander', 'hermann', 'phil.g', 'newGuy']
console.log('name length ', names.length)

const locations = ['Lounge', 'Amphi', 'Main Kitchen', 'Backyard']

console.log('before', names)

var shuffledNames = shuffle(names)
var groups = shuffledNames.reduce((groupedNames, name, index) => {
    //const pos = index%5+1
    const pos = Math.floor(index/5)
        if(!groupedNames[pos]) {
            groupedNames[pos] = []
    }
    groupedNames[pos].push(name)
    return groupedNames
}, [])

console.log('after', names)
console.log('group', groups)

// if last group has less than 3 persons get 2 people from the secondlast group
if(names.length > 5) {
    let lastGroup = groups[groups.length - 1]
    if (lastGroup.length < 3) {
        console.log(lastGroup.length + ' is small than 3')
        let secondLastGroup = groups[groups.length - 2]

        let shifted = secondLastGroup.splice(0, 2)
        console.log('shifted', shifted)

        groups[groups.length - 1] = lastGroup.concat(shifted)
    }
}

const jsonGroups = groups.map((namesForGroup) => ({ names: namesForGroup }))
console.log('as array', jsonGroups)


const finalJson = jsonGroups.map((group, index) => {
    return Object.assign({},group, {location: locations[index%locations.length]})
})

console.log('finalJson', finalJson)
// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*names: [
 {name: xyz},
 {name: xyz},
 {name: xyz},
 {name: xyz},
 ],


 groups: [
 {
 names: [{name},{name},{name}],
 location: loc,
 },
 {
 names: [{name},{name},{name}],
 location: loc,
 },
 {
 names: [{name},{name},{name}],
 location: loc,
 },
 ]*/