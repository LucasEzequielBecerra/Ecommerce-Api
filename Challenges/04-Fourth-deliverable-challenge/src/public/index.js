const socket = io()

const containerSocket = document.getElementById('container-socket')
const formSocket = document.getElementById('form-socket')
const inputTilte = document.getElementById('input-title')
const inputDescription = document.getElementById('input-description')
const inputPrice = document.getElementById('input-price')
const buttonSocket = document.getElementById('button-socket')
// const buttonRemove = document.getElementById('btn-remove')
// const listOfProducts = document.getElementById('list-of-products')

socket.on('products', (data) => {
    // console.log(containerSocket)
    console.log(data)
    const productsRenders = data.map((product) => {
        return `<div id='card-socket${product.id}'>
                <p class='title-socket'>${product.title}</p>
                <p class='description-socket'>${product.description}</p>
                <p class='price-socket'>$${product.price}</p>
                <button id='btn-remove${product.id}'>remove product</button>
                </div>`
    }).join(' ')
    containerSocket.innerHTML = productsRenders
})

buttonSocket.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(inputTilte.value)
    socket.emit('add products', {
        title: inputTilte.value,
        description: inputDescription.value,
        price: inputPrice.value
    })
})

socket.on('products', (data) => {
    data.map(product => {
        const btnRemove = document.getElementById(`btn-remove${product.id}`)
        console.log(btnRemove)

        btnRemove.addEventListener('click', (e) => {
            socket.emit('remove products', (product.id))
        })
    })
})