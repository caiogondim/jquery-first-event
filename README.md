<img src="http://rawgit.com/caiogondim/jquery-first-event/master/img/logo.svg">

# jQuery First event

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur facere ab suscipit officiis, nihil dolores nulla ex voluptatibus numquam mollitia aliquam accusamus, voluptate ipsum, reiciendis amet! Explicabo aliquam exercitationem minima.

## Example

```js
$('p')
  .on('click', function() {
    console.log('foo')
  })
  .on('click', function() {
    console.log('bar')
  })
  .firstOn('click', function() {
    console.log('quz')
  })
// After a click on `<p>` it will print:
// quz
// foo
// bar
```

## Credits

- Icon created by 0gust1 from the Noun Project
