import assert from 'node:assert/strict';
const log = console.log()
const a = 142;
const b = 12;
const obja = {"name":"r","email":"r@gmail.com"}
const objb = {"name":"r","email":"c@gmail.com"}

function assertStrictEqual(){
    try {
        assert.strictEqual(a, b);
    } catch (error) {
        if (error instanceof assert.AssertionError) console.log(error.message)
        else console.log('An unexpected error occurred:', error);
        
    }
}

function assertEqual(){
    try {
        assert.equal(a, b);
    } catch (error) {
        if (error instanceof assert.AssertionError) console.log(error.message)
        else console.log('An unexpected error occurred:', error);
        
    }
}

function deepStrictEqual(){
    try{
        assert.deepStrictEqual(obja,objb)
    }catch(error){
        if(error instanceof assert.AssertionError){
            console.log(`Error Message: ${error.message}`)
        }
    }
}
/** if the objects are same */
function notDeepEqual(){
    const errorMessage = 'objects are same'
    try{
        const objx = {a:1,b:{c:2}}
        const objy = {a:1,b:{c:2}}
        assert.notDeepEqual(objx,objy,errorMessage)
    }catch(error){
        if(error instanceof assert.AssertionError)console.log(`Error ${error.message}`)
        else console.log(error)
    }
}

function assertNotEqual(){
    try{
        const p = 2,q = 3
        assert.notEqual(p,q,'the variables are same')
    }catch(error){
        if(error instanceof assert.AssertionError){
            console.log(`Error Message: ${error.message}`)
        }
        else console.log(error)
    }
}



assertNotEqual()
notDeepEqual()
deepStrictEqual()
assertStrictEqual()
assertEqual()
