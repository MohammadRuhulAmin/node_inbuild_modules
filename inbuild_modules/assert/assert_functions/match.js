import assert from 'node:assert/strict';

assert.match('I will fail', /pass/);

assert.match(123, /pass/);

assert.match('I will pass', /pass/);
