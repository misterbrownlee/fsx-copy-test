import fsx from 'fs-extra';
import path from 'path';

const dest = path.resolve('output');
const fooSrc = path.resolve('source', 'foo');
const barSrc = path.resolve('source', 'bar');

// must first figure out what the full output paths will be
// which is an extra step and might not always be this easy
const fooDest = path.join(dest, path.parse(fooSrc).base);
const barDest = path.join(dest, path.parse(barSrc).base);

// must ensure output dirs before copy
// even if overwrite should handle creating
// a common parent directory
const copyFoo = fsx.ensureDir(fooDest).then(fsx.copy(fooSrc, dest));
const copyBar = fsx.ensureDir(barDest).then(fsx.copy(barSrc, dest));

const tasks = [
  copyFoo,
  copyBar
];

Promise.all(tasks)
  .then(() => {
    // because all the paths are there already
    // there is no drama from the copy
    // even with a common parent directory
    console.log('Done all the copying');
  })
  .catch(error => {
    console.log('uh oh...');
    console.error(error);
    process.exit(1);
  });
