<img src="http://rawgit.com/caiogondim/jquery-first-event/master/img/logo.svg">

# jQuery First event

Execute your event handler before others.

## Example

```js
$('p')
  .on('click', function () {
    console.log('foo')
  })
  .on('click', function () {
    console.log('bar')
  })
  .firstOn('click', function () {
    console.log('quz')
  })

// After a click on `<p>` it will print:
//   quz
//   foo
//   bar
```

## Use cases

### Preventing stop propagation

It is not unusual to get, on a large code base, an event listener that is stopping propagation. With first-event you can run you event handler before the one that stops the event propagation.

```js
$('p').on('click', function (event) {
  event.stopPropagation()
  console.log('foo')
})

$('p').on('click', function (event) {
  // Will never be executed since the event propagation was stopped
  // on the handler above.
  console.log('bar')
})

$('p').trigger('click')
// Will print:
//  foo

// Work-around with `first-event`
// ------------------------------

$('p').on('click', function (event) {
  event.stopPropagation()
  console.log('foo')
})

$('p').firstOn('click', function (event) {
  console.log('bar')
})

$('p').trigger('click')
// Will print:
//  bar
//  foo

```

### Delay event

On Safari iOS, the browser needs some time to render CSS animations.
So, if you want to show a CSS animation between pages, you need to give the browser that time to, only then, change the URL.

```js
$('a').firstOn('click', function (event, data) {
  if (data && data.synthetic) {
    return true
  }

  event.preventDefault()
  event.stopPropagation()

  var url = $(this).attr('href')

  // Safe to show a loading spinner on Safari iOS
  spinner.show()

  setTimeout(function () {
    // Execute all previously attached event handlers
    $('a').triggerHandler('click', {synthetic: true})

    // Now change URL
    document.location.href = url
  })
})
```

## Methods

- `firstOn` (available on jQuery >= 1.7)
- `firstLive` (available on jQuery < 1.9)
- `firstBind`
- `firstDelegate`
- `firstOne`

All methods implements the same jQuery counterparts [API](http://api.jquery.com/category/events/event-handler-attachment/).

## Support

All the below jQuery versions:
- 1.4
- 1.5
- 1.6
- 1.7
- 1.8
- 1.9
- 1.10
- 1.11
- 2.0
- 2.1

## Contributing

1. Fork this repository
2. Run `npm install`
3. Create a new branch for each feature or improvement
4. Ensure that your code is accompanied with tests
5. Run `npm test` to ensure that your new tests and the old ones are all passing
6. Send a pull request from each feature branch

## Donating

If you found this library useful and are willing to donate, transfer some
bitcoins to `1BqqKiZA8Tq43CdukdBEwCdDD42jxuX9UY` or through the
[URL](https://www.coinbase.com/caiogondim) https://www.coinbase.com/caiogondim

## Credits

- Icon created by 0gust1 from the Noun Project
