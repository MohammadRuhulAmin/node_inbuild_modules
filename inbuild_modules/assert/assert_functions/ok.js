import assert from 'node:assert';


function getUserName(id) {
  if (id === 1) {
    return True; /** return has to be truthy value! */
  }
  return null;  // Return null for invalid ID
}

const result = getUserName(1);
assert.ok(result, 'User name should be truthy');  // Passes because 'Alice' is truthy

const result2 = getUserName(2);
assert.ok(result2, 'User name should be truthy');  // Fails because 'null' is falsy

