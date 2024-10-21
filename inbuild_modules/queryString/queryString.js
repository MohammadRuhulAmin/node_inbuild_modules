import querystring from "node:querystring"
let string = "https://google.com&year=2017&month=July&name=RuhulAmin"
let q = querystring.parse(string)

console.log("year:",`${q.year}`)
console.log("month:",`${q.month}`)
console.log("name:",`${q.name}`)

console.log("The Decoded Query String: \n")
console.log(querystring.decode(string))
console.log(querystring.decode(string).year)

console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));

const tempJson ={
    "name":"RuhulAmin",
    "email":"ruhul@ba-systems.com"
}

let queryData = querystring.stringify(tempJson)
console.log(querystring.stringify(tempJson))


console.log(querystring.parse(queryData))

console.log("unescape: ")
console.log(querystring.unescape(tempJson))

