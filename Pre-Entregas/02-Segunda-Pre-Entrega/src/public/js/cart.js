const socketClient = io()

const toStoreButton = () => {
    const containerCart = document.getElementById('container-cart')
    let toStore = '';
    toStore += `
    <a href='/api/products' class="btn btn-lg btn-outline-primary">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/></svg>
    </a>  `
    containerCart.innerHTML = toStore
};

toStoreButton()

function getCartId() {
    const url = window.location.href;
    const pattern = /\/carts\/([a-zA-Z0-9]+)/;
    const matches = url.match(pattern);
    const id = matches ? matches[1] : null;
    return id
}

async function addAProduct(productId) {
    try {
        const cartId = getCartId();
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
        if (response.ok) {
            await response.json()
        } else {
            throw new Error('Error to add product')
        }
    } catch (error) {

    }
}

async function deleteAProduct(productId, quantity) {
    try {
        const cartId = getCartId();
        const newQuantity = { quantity: quantity - 1 }
        // console.log(newQuantity.quantity)
        if (newQuantity.quantity === 0) {
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (response.ok) {
                await response.json()
            } else {
                throw new Error('Error to add product')
            }
        } else {
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newQuantity)
            })
            if (response.ok) {
                await response.json()
            } else {
                throw new Error('Error to add product')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
