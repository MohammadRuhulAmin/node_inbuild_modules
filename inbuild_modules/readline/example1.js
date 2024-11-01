import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const r1 = readline.createInterface({ input, output });

async function askName() {
    try {
        const name = await r1.question('What is your Name? ');
        console.log(`Name: ${name}`);
    } catch (error) {
        console.error('Error reading input:', error);
    } finally {
        r1.close();
    }
}

askName();

r1.on('close', () => {
    console.log('xxx'); 
});
