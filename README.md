# fsx-copy-test
Where I test a thing that is wonky in fs-extra

## why
A weird behavior or mild contraction in the fs-extra docs for copy.

The user case is is having two directories, with distinct subdirectories, and
wanting copy to merge them when copying into a single directorty with the
correct subdirectories.  Makes sense?  Like this:

```
source
  |
  o-- foo
  |    |
  |    o-- fooFiles
  |           ... many foo files ...
  |       
  |
  o-- bar
  |    |
  |    o-- barFiles
  |           ... many bar files ...
  |       
```    

I would expect this to work:  

```
const tasks = [
  fsx.copy('source/foo/', 'output/'),
  fsx.copy('source/bar/', 'output/')
]

Promise.all(tasks)
  .then(()=> {
    console.log('Winner winner chicken dinner');
  });

```

With this result:

```
output
  |
  o-- fooFiles
  |     ... many foo files ...
  |       
  |
  o-- barFiles
  |     ... many bar files ...
  | 

```  

What happens?  When starting the second attempt to copy, even though the first copy has created the needed parent folders, the second will crash with `Error: EEXIST: file already exists`.  There technically isn't a need to overwrite in the traditonal sense (it's just re-using the existing parent directory structure), and the docs say `overwrite` defaults to `true` anyway.  Regardless, it crashes.  

FAKE OVERWRITE.  SAD.

The workaround is to call `.ensureDir(pathToCopy)` when running concurrent copy directory tasks, which makes it behave as expected.  The code for that isn't terribly cumbersom:
```js
  const fooSrc = path.resolve('source', 'foo');
  const fooDest = path.join(dest, path.parse(fooSrc).base);
  fsx.ensureDir(fooDest).then(fsx.copy(fooSrc, dest));
```

# Solution
I guess just documenting the workaround, for starters.  I sent a pull request for that.  Better might be to have it work as expected without having to send an option that is supposedly the default?  I won't have time to look into that right now, but maybe someday...

Thanks, btw, for the great library.  I use it a lot. 

Best - Aaron
