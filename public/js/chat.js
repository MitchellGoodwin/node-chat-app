const socket = io()


// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated! ', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     socket.emit('increment')
// })

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#chatForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.message.value
    socket.emit('sendMessage', message)
    e.target.reset() 
})