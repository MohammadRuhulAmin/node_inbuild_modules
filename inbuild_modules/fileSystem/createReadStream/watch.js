// Node.js program to demonstrate
// the fs.watchFile() method

// Importing the filesystem module
import { watchFile, readFileSync, writeFileSync } from 'fs';

watchFile("example.txt", {

// Passing the options parameter
bigint: false,
persistent: true,
interval: 1000,
}, (curr, prev) => {
console.log("\nThe file was edited");

// Time when file was updated
console.log("File was modified at: ", prev.mtime);
console.log("File was again modified at: ", curr.mtime);
console.log(
	"File Content Updated: ",
	readFileSync("example.txt", "utf8")
);
});

// Make Changes to the file for the first time
writeFileSync("example.txt",
"Welcome to Geeks for Geeks");

// Make Changes to the file for the second time
setTimeout(
() => writeFileSync("example.txt",
	"File is Edited Again!!!"),
3000
);
