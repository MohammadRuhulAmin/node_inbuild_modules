function sum1(num1,callback){
    let res = num1+1
    callback(res)
}
function sum2(num2,callback){
    let res = num2+ 1
    callback(res)
}
function sum3(num3,callback){
    let res = num3+1
    callback(res)
}

function sln(){
    sum1(1,(res1)=>{
        console.log("res1: ", res1)
        sum2(res1,(res2)=>{
            console.log("res2: ",res2)
            sum3(res2,(res3)=>{
                console.log("res3: ",res3)
                console.log(res3)
            })
        })
    })
}

sln()