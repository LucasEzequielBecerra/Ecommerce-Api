const socketClient = io()

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
        console.log(newQuantity.quantity)
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
