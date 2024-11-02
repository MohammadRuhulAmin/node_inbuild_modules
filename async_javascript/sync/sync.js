const processOrder  = ()=>{
    console.log(`process order for customer 1`)
    let curTime = new Date().getTime()
    while(curTime + 3000 >= new Date().getTime());
    console.log(`order processed for customer 1`)
}

console.log(`take order for customer 1`)
processOrder()

console.log(`completed order for customer 1`)