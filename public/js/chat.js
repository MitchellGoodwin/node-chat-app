const socket = io()

const $messageForm = document.querySelector('#chatForm')
const $messageFormButton = $messageForm.querySelector('#submit')
const $locationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.message.value
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
    e.target.reset() 
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    $locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        socket.emit('sendLocation', { latitude, longitude }, () => {
            console.log('Location shared!')
            $locationButton.removeAttribute('disabled')
        })
    })
})