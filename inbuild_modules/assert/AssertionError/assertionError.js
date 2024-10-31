import assert from 'node:assert';

const {message} = new assert.AssertionError({
    message:'Data is not equal'
});

try{
    assert.strictEqual(1,2,message);
}catch(error){
    if (error instanceof assert.AssertionError){
        console.log(`Error ${error.message}`)
    }
}




