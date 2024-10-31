import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');

/***
 * 
 * the sqlite module in Node.js to create an in-memory SQLite database. Here’s a detailed breakdown of each component:
Breakdown of the Code

    import { DatabaseSync } from 'node:sqlite';:
        This statement uses ES6 module syntax to import the DatabaseSync class from the sqlite module.
        The node: prefix indicates that this is a built-in module provided by Node.js. This can help distinguish it from user-defined modules or packages installed from npm.

    const database = new DatabaseSync(':memory:');:
        This line creates a new instance of the DatabaseSync class.
        The argument ':memory:' specifies that the SQLite database should be created in memory rather than on disk.
        In-memory databases are temporary and will be lost once the Node.js process that created them exits or when the database connection is closed. 
        They are useful for testing or when you need a lightweight database for the duration of the application runtime.

Explanation of SQLite and Its Usage

SQLite is a lightweight, serverless, self-contained SQL database engine that is often used for applications that require a simple,
embedded database. Here’s how the provided code fits into the context of using SQLite:

    In-memory Database: Using :memory: creates a database that exists only in RAM, which makes operations on it faster since there’s no disk I/O involved. This is particularly useful for unit tests, temporary data storage, or quick prototyping.

    Synchronous API: The DatabaseSync class likely provides a synchronous API for interacting with the SQLite database, 
    meaning that database operations block the execution of further code until they are completed. This is in contrast to asynchronous operations, which allow other code to run while waiting for the database operations to finish.

 * 
 */



database.exec(`create table users(key integer primary key, value text )strict`);
console.log("After Insert: ")
const insert = database.prepare('insert into  users(key,value) values(?,?)');
insert.run(1,'ruhul amin');
insert.run(2,'Sakib Hasan');

const query = database.prepare('Select * from users order by key');
console.log(query.all());

console.log("After Update :")
const update = database.prepare('update users set value = ? where key = ?');
update.run('Sajid Hasan',1);
console.log(query.all())

console.log("After Delete :")
const del = database.prepare('Delete from users where key = ?')
del.run(1)
console.log(query.all())

/**
 * Execute the script using: node --experimental-sqlite sqlite.js
 */
database.close()