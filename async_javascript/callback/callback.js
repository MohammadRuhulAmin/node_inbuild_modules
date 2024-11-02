const takeOrder = (customer,callback)=>{
    console.log((`Take order for ${customer}`))
    callback(customer)
}


const processOrder = (customer,callback)=>{
    console.log(`procesing order for ${customer}`)
    setTimeout(()=>{
        console.log(`cooking complete for ${customer}`)
    },3000)
    callback(customer)
}

const completOrder = (customer)=>{
    console.log(`Completed order for ${customer}`)
}


takeOrder('customer 1',(customer)=>{
    processOrder(customer,(customer)=>{
        completOrder(customer)
    })
})
