
const process1 = (customer,callback)=>{
    console.log(`process 1 execution for ${customer}`)
    callback(customer)
}

const process2 = (customer,callback)=>{
    console.log(`process 2 execution for ${customer}`)
    callback()
}

const process3 = (customer)=>{
    console.log(`process 3 execution for ${customer}`)
}

/** callback hell */
process1('customer 1',(customer)=>{
    process2(customer,()=>{
        process3(customer)
    })
})