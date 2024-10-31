import path from "node:path"


/**
 * POSIX = PORTABLE OPERATING SYSTEM INTERFACE
 */
console.log(path.basename('C:\\temp\\myfile.html'))

console.log(path.win32.basename('C:\\temp\\myfile.html'))

console.log(path.basename('C:\\temp\\myfile.html'))

console.log(path.delimiter)

const path_list = process.env.PATH.split(path.delimiter)
console.log(path_list)

console.log(path.dirname('inbuild_modules/assert'))
console.log(path.extname('inbuild_modules/assert/assert_functions/assert.js'))

const mypath = path.format({
    root:'/myfolder',
    dir:'/home/myx',
    base:'file.txt'
})

console.log(mypath)

const xpath = 'c://myfirst/xx////dss/..'

console.log(path.normalize(xpath))

console.log(path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'))

console.log(path.parse('/home/user/dir/file.txt'))

path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');



console.log(path.relative('C:\\orandea\\test\\aaa', '\\orandea\\impl\\bbb'));

/**The path.sep property in Node.js provides the platform-specific path segment separator: */
console.log(path.sep)