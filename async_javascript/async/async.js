const processOrder  = ()=>{
    console.log(`process order for customer 1`)
    setTimeout(()=>{
        console.log('cooking complete..')
    },3000)
    console.log(`order processed for customer 1`)
}

console.log(`take order for customer 1`)
processOrder()

console.log(`completed order for customer 1`)