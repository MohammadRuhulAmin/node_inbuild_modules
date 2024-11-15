function summation(a,b){
    return a + b 
}

function multiplication(a,b){
    return a*b 
}

function substraction(a,b){
    return a-b 
}

function calculation(a,b,method){
    return method(a,b)
}

const op1 = calculation(3,2,substraction)
console.log(op1)
const op2 = calculation(3444,2333,multiplication)
console.log(op2)