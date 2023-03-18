


const state = {
    cart: [],
    total: 0,
}

export const getState = () => Object.assign(state)

export const addProductToCart = async (id) => {
    const inCart = state.cart.find((item) => item.id === id)
    if (inCart) {
        inCart.quantity++
    } else {
        const item = await getSingleProduct(id)
        state.cart.push({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            description: item.description,
            quantity: 1,
        })
    }
    state.total = calcTotal()
    saveStorage()
}

export const removeProductFromCart = (id) => {
    const inCart = state.cart.find((item) => item.id === id)
    if (inCart) {
        if (inCart.quantity > 1) {
            inCart.quantity--
        } else {
            state.cart = state.cart.filter((item) => item.id !== id)
        }
        state.total = calcTotal()
    }
    saveStorage()
}

export const removeAllProductsByType = (id) => {
    state.cart = state.cart.filter((item) => item.id !== id)
    state.total = calcTotal()
    saveStorage()
}

export const clearCart = () => {
    state.cart = []
    state.total = 0
    saveStorage()
}

const calcTotal = () => {
    return state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0.00)
}

export const getAllProducts = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`)
    return await res.json()
}

export const getProductByQuery = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/${category}`)
    return await res.json()
}

export const getProductsBySearch = async (term) => {
    const products = await getAllProducts()
    
    return products.filter((product) => {
        return product.title.toLowerCase().includes(term.toLowerCase())
    })
}

export const getSingleProduct = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    return await res.json()
}

export const loadStorage = () => {
    const storage = localStorage.getItem('cart')
    if (storage) {
        state.cart = JSON.parse(storage)
        state.total = calcTotal()
    }
}

const saveStorage = () => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
}
