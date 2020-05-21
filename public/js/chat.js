const socket = io()


socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#chatForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.message.value
    socket.emit('sendMessage', message)
    e.target.reset() 
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        socket.emit('sendLocation', { latitude, longitude })
    })
})