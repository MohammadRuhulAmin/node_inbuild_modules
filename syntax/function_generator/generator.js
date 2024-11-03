
// function generator

function* greeting(name){
    yield "Hi!"
    yield "How are you?"
    yield name
}


const greet = greeting("Ruhul")

console.log(greet.next().value)
console.log(greet.next().value)
console.log(greet.next().value)

const greet2 = greeting('Ruhul')

for(let text of greet2){
    console.log(text)
}