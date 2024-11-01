import readline from "node:readline"

const rl = readline.createInterface(process.stdin,process.stdout)

rl.question('What is 4+4 ?',(input)=>{
    if(input == 8){
        rl.question('what is 4-4? ',(input)=>{
            if(input == 0){
                rl.question('Enter your Name: ',(name)=>{
                    console.log(`${name} has obtained 2/2`)
                    rl.close()
                })
            }
        })
    }
})


rl.on('close',()=>{
    console.log('Conversation is closed!')
})