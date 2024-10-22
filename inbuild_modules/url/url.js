import url from 'node:url'

const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string&user=ruhul&pass=233#hash');

console.log(myURL)


const newUrl = new URL('/foo','https://example.org/')
console.log(newUrl.href)