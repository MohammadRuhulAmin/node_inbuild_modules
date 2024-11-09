
function final(message,callback){
    const modMesg = message + ` message has been modefied in final`
    callback(modMesg)
}

function middleWire(message,callback){
    const modMesg = message + ` message has been modefied in middlewire`
    callback(modMesg)
}

function initial(){
    let myString = "The Message : "
    middleWire(myString,(result1)=>{
        final(result1,(result2)=>{
            console.log("Final Result: ",result2)
        })
    })
}


initial()

function sum(a, b){return a+b}
function sub(a,b){return a-b}
function mul(a,b){return a*b}


function calculation(a,b,operation){
    return operation(a,b)
}


console.log(calculation(1,2,sum))

function task1(messagex,callback){
    messagex = messagex + ` touched by task1 function`
    callback(messagex)
}
function task2(messagex,callback){
    messagex = messagex + ` touched by task2 function`
    callback(messagex)
}

function tasks(){
    task1("This is String",(res1)=>{
        task2(res1,(res2)=>{
            console.log(res2)
        })
    })
}

/** */
tasks()
