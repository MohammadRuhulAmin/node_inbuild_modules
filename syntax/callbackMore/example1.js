
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