import fsx from 'fs-extra';
import path from 'path';

const dest = path.resolve('output');
const fooSrc = path.resolve('source', 'foo');
const barSrc = path.resolve('source', 'bar');

// the two tasks should write different directories
// into a common parent, and overwrite would not be
// a consideration except for the common parent dir
const copyFoo = fsx.copy(fooSrc, dest);
const copyBar = fsx.copy(barSrc, dest);

const tasks = [
  copyFoo,
  copyBar
];

Promise.all(tasks)
  .then(() => {
    // no luck getting here because of file already exits
    // because of the common parent directory
    console.log('Done all the copying');
  })
  .catch(error => {
    // you end up here... one of the two tasks will fail
    console.log('uh oh...');
    console.error(error);
    process.exit(1);
  });
