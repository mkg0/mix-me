/**
 * Created by iyadas on 29.09.17.
 */


const names = ['iyad.al', 'julius.b', 'jonas.h', 'alexander', 'hermann', 'phil.g', 'newGuy', 'another.one']
//const names = ['iyad.al', 'julius.b', 'jonas.h', 'alexander', 'hermann', 'phil.g', 'newGuy']
console.log('name length ', names.length)


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
}, {})

console.log('after', names)
console.log('group', groups)

if(names.length > 5) {
    const lastGroup = groups[Object.keys(groups).length - 1]
    if (lastGroup.length < 3) {
        console.log(lastGroup.length + ' is small than 3')
        const secondLastGroup = groups[Object.keys(groups).length - 2]
        let lastFromNames = secondLastGroup[secondLastGroup.length - 1]
        let secondLastFromNames = secondLastGroup[secondLastGroup.length - 2]
        console.log(lastFromNames + ' is last guy')
        console.log(secondLastFromNames + ' is secondLast guy')
        secondLastGroup.pop(lastFromNames)
        secondLastGroup.pop(secondLastFromNames)
        lastGroup.push(lastFromNames)
        lastGroup.push(secondLastFromNames)
    }
}

console.log('as array', Object.keys(groups).map(key => groups[key]).map((namesForGroup) => ({ names: namesForGroup })))


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