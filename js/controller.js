import ProductPageComponent from "./components/ProductPageComponent.js";
import ErrorComponent from "./components/ErrorComponent.js";
import Spinner from "./components/Spinner.js";
import CartItemComponent from "./components/CartItemComponent.js";
import CartComponent from "./components/CartComponent.js";
import * as model from './model.js'
import * as constants from "./constants.js";
import OrderPageComponent from "./components/OrderPageComponent.js";
import ConfirmationPageComponent from "./components/ConfirmationPageComponent.js";

const app = document.querySelector('#app')
const overlay = document.querySelector('#overlay')
const backdrop = document.querySelector('#backdrop')
const dropdown = document.querySelector('.dropdown')

const allBtn = document.querySelector('#show-all-btn')
const trendingBtn = document.querySelector('#show-trending-btn')
const categoriesBtn = document.querySelector('#show-category-btn')
const electronicsBtn = document.querySelector('#show-electronics-btn')
const jeweleryBtn = document.querySelector('#show-jewelery-btn')
const mensClothingButton = document.querySelector('#show-mens-clothing-btn')
const womensClothingButton = document.querySelector('#show-womens-clothing-btn')
const searchForm = document.querySelector('#search-form')
const searchField = document.querySelector('#search-field')
const showCartBtn = document.querySelector('#show-cart-btn')
const hamburgerBtn = document.querySelector('#hamburger-btn')

let cartIsVisible = false

export const showCategories = () => {
    console.log('show categories')
    dropdown.classList.toggle('open-dropdown')
    document.addEventListener('click', hideCategories)
}

const hideCategories = (e) => {
    if (e.target !== dropdown && e.target !== categoriesBtn) {
        dropdown.classList.remove('open-dropdown')
        document.removeEventListener('click', hideCategories)
    }
}


const displayProductPage = async (data, title) => {
    app.innerHTML = new Spinner().render()
    const products = await data
    const productPage = new ProductPageComponent({items: products, title: title})
    app.innerHTML = productPage.render()
    
    document.querySelectorAll('.btn--add').forEach((button) => {
        button.addEventListener('click', addToCartHandler)
    })
}

const displayOrderPage = () => {
    overlay.innerHTML = ''
    cartIsVisible = false
    app.innerHTML = new Spinner().render()
    const state = model.getState()
    const orderPage = new OrderPageComponent(
        {
            cart: state.cart, 
            total: state.total, 
            title: constants.ORDER_PAGE
        })
    app.innerHTML = orderPage.render()
    document.querySelector('#order-form').addEventListener('submit', submitOrder)
}

const displayOrderConfirmation = (data) => {
    app.innerHTML = new Spinner().render()
    const orderPage = new ConfirmationPageComponent(
        {
            data: data,
        })
    app.innerHTML = orderPage.render()
}

const submitOrder = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data)
    document.querySelectorAll('.order__error').forEach(el => el.setAttribute('style', 'visibility: hidden'))
    const invalidField = validateOrder(data)
    if (invalidField) {
        displayError(invalidField)
    } else {
        displayOrderConfirmation(data)
        model.clearCart()
        updateCartIcon()
    }
}

const displayError = (field) => {
    document.querySelector(`#${field}-error`).setAttribute('style', 'visibility: visible')
}

const validateOrder = (data) => {

    const validation = {
        firstname: constants.FIRSTNAME_REGEX,
        lastname: constants.LASTNAME_REGEX,
        email: constants.EMAIL_REGEX,
        street: constants.STREET_REGEX,
        phone: constants.PHONE_REGEX,
        zip: constants.ZIP_REGEX,
        city: constants.CITY_REGEX,

    }

    const keys = Object.keys(data)
    const values = Object.values(data)
    return keys.find((key, index) => {
        return !values[index].match(validation[key])
    })
    /*for (let key in data) {
        if (!data[key].match(validation[key])) {
            return key
        }
    }*/
}

const search = (result) => {
    app.innerHTML = new Spinner().render()

    if (result.length === 0) {
        app.innerHTML = new ErrorComponent(constants.ERROR_SEARCH).render()
        return
    }
    
    const productPage = new ProductPageComponent({items: result, title: constants.SEARCH_RESULTS})
    app.innerHTML = productPage.render()

}

const showCart = () => {
    overlay.innerHTML = new CartComponent(model.getState()).render()
    cartIsVisible = true
    backdrop.addEventListener('click', hideCart)
    showCartBtn.addEventListener('click', hideCart)
    document.querySelector('.btn--checkout').addEventListener('click', displayOrderPage)
    document.querySelector('.btn--clear').addEventListener('click', clearCart)
    setupCartItemListeners()
}

const removeCartItem = (e) => {
    const id = +e.target.closest('.cart-item').dataset.id
    model.removeProductFromCart(id)
    updateCart()
    updateCartIcon()
}

const removeCartItemsByType = (e) => {
    const id = +e.target.closest('.cart-item').dataset.id
    model.removeAllProductsByType(id)
    updateCart()
    updateCartIcon()
}

const clearCart = () => {
    model.clearCart()
    updateCart()
    updateCartIcon()
}

const hideCart = (e) => {
    if (e.target === backdrop || e.target === showCartBtn || e.target.parentElement === showCartBtn) {
        overlay.innerHTML = ''
        cartIsVisible = false
        backdrop.removeEventListener('click', hideCart)
        showCartBtn.removeEventListener('click', hideCart)
    }
}

const addToCartHandler = async (e) => {
    const id = +e.target.closest('[data-id]').dataset.id
    await model.addProductToCart(id)
    updateCartIcon()
    if (cartIsVisible) {
        updateCart()
    }
}

const updateCart = () => {
    document.querySelector('#cart-items').innerHTML = model.getState().cart.map((product) => new CartItemComponent(product).render()).join('')
    document.querySelector('#cart-sum').innerHTML = "$" + model.getState().total.toFixed(2)
    setupCartItemListeners()
}

const updateCartIcon = () => {
    const cartIcon = document.querySelector('#cart-icon')
    const cartItems = model.getState().cart.reduce((acc, item) => acc + item.quantity, 0)
    console.log(cartItems)
    cartIcon.innerHTML = cartItems + ''
}


const setupCartItemListeners = () => {
    
    document.querySelectorAll('.btn--minus').forEach((button) => {
        button.addEventListener('click', removeCartItem)
    })
    document.querySelectorAll('.btn--plus').forEach((button) => {
        button.addEventListener('click', addToCartHandler)
    })
    document.querySelectorAll('.btn--remove').forEach((button) => {
        button.addEventListener('click', removeCartItemsByType)
    })
    
}

const showMenu = () => {
    document.querySelector('.nav__menu').classList.toggle('nav__menu--visible')
}

const init = async () => {
    model.loadStorage()
    
    await displayProductPage(model.getAllProducts(), constants.ALL)

    allBtn.addEventListener('click', () => displayProductPage(model.getAllProducts(), constants.ALL))
    trendingBtn.addEventListener('click', () => displayProductPage(model.getProductByQuery(constants.QUERY_TRENDING), constants.TRENDING))
    electronicsBtn.addEventListener('click', () => displayProductPage(model.getProductByQuery(constants.QUERY_ELECTRONICS), constants.ELECTRONICS))
    jeweleryBtn.addEventListener('click', () => displayProductPage(model.getProductByQuery(constants.QUERY_JEWELERY), constants.JEWELERY))
    mensClothingButton.addEventListener('click', () => displayProductPage(model.getProductByQuery(constants.QUERY_MENS_CLOTHING), constants.MENS_CLOTHING))
    womensClothingButton.addEventListener('click', () => displayProductPage(model.getProductByQuery(constants.QUERY_WOMENS_CLOTHING), constants.WOMENS_CLOTHING))
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const res = await model.getProductsBySearch(searchField.value)
        search(res)
        searchField.value = ''
    })
    showCartBtn.addEventListener('click', showCart)
    hamburgerBtn.addEventListener('click', showMenu)

    categoriesBtn.addEventListener('click', showCategories)
    updateCartIcon()

}

init()




