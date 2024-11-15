
function task1(callback){
    console.log("task1")
    callback()
}
function task2(callback){
    setTimeout(()=>{
        console.log("task2")
        callback()
    },3000)
}

function task3(){
    console.log("task3")
}

function tasks(){
    task1(()=>{
        task2(()=>task3())
    })
}

tasks()