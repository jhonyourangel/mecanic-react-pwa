

export const registerSW = () => {
    if ('serviceWorker' in navigator) {
        console.log('service worker is present')
        window.self.addEventListener('fetch', event => {
            debugger
            console.log('fetch event')
        })
    } else  {
        console.log('service worker not found')
    }
} 

