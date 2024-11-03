import { truncate } from 'node:fs';
// Assuming that 'path/file.txt' is a regular file.
truncate('example.txt', (err) => {
  if (err) throw err;
  console.log('example.txt was truncated');
});