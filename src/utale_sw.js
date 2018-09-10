/* eslint no-restricted-globals: 0 */  // --> OFF

self.addEventListener('fetch', event => {
    debugger
    console.log('window.self: fetch called--', event)
})

