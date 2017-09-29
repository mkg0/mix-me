/**
 * Created by iyadas on 29.09.17.
 */


//Cache
var alreadyMatchedNames = []

var names = ['iyad.al', 'julius.b', 'jonas.h', 'alexander', 'hermann', 'phil.g', 'newGuy', 'another.one']

console.log('before', names)

var groups = shuffle(names).map((name, index)=> {
    return ({name, group: index%5+1})
})

console.log('after', names)
console.log('group', groups)

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