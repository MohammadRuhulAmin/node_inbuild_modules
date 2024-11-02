const takeOrder = (customer)=>{
    return new Promise((resolve,reject)=>{
        console.log(`Take order for ${customer}`)
        resolve(customer)
    })
}

const processOrder = (customer)=>{
    return new Promise((resolve,reject)=>{
        console.log(`Process order for ${customer}`)
        setTimeout(()=>{
            console.log(`Cooking done`)
            resolve(customer)
        },3000)
    })
}

const completeOrder = (customer)=>{
    return new Promise((resolve,reject)=>{
        console.log(`completed order for ${customer}`)
    })
}

takeOrder('customer 1')
    .then((customer) => {
        return processOrder(customer);
    })
    .then((customer) => {
        return completeOrder(customer);
    })
    .catch((error) => {
        console.error('Error processing order:', error);
    });