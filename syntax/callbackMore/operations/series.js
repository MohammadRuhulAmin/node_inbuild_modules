const operation = [
    (a,b)=> a+b,
    (a,b)=> a-b,
    (a,b)=> a*b
]

const fop1 = operation.shift()
console.log(fop1(3,4))
const fop2 = operation.shift()
console.log(fop2(3,2))
const fop3 = operation.shift()
console.log(fop3(4,3))




const myFunction = (firstParam, secondParam) => {
    console.log(`First parameter: ${firstParam}`);
    console.log(`Second parameter: ${secondParam}`);
  };
  
  // Define parameters
  const firstParam = "Hello";
  const secondParam = "World";
  
  // Run myFunction after 2 seconds, passing in the parameters
  setTimeout(myFunction, 2000, firstParam, secondParam);
  