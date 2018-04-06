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

What happens?  when starting with no directory to overwrite, the second attempt to copy will crash with `Error: EEXIST: file already exists`, even though the docs say `overwrite` defaults to `true`.

The workaround is to explictly set `{ overwrite: true }` when running concurrent copy directory tasks, which makes it behave as expected.

# Solution
I guess just documenting the workaround, for starters.  I sent a pull request for that.  Better might be to have it work as expected without having to send an option that is supposedly the default?  I won't have time to look into that right now, but maybe someday...

Thanks, btw, for the great library.  I use it a lot. 

Best - Aaron
