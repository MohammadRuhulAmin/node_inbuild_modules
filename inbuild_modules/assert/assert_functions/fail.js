import assert from 'node:assert/strict';


try{
    assert.fail('a',1)
}catch(err){
    if(err instanceof assert.AssertionError){
        console.log(`${err}`)
    }
}


/**
 * 
 * In this case, even though the values 'a' and 'a' are the same, 
 * assert.fail() is specifically designed to always throw an error, regardless of whether the values match or not.
 * 
 */