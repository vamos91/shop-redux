import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart: items
    },
    reducers:{
        getCartFromDB: (state, action) => {
            state.cart = []
            state.cart = action.payload
        },
        addProductToCart: (state, action) => {
            state.cart.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        deleteCart: (state) => {
            state.cart = []
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        deleteOneProduct: (state, action) => {
            state.cart= state.cart.filter((e) => {
                return e.id !== action.payload
            })
            localStorage.removeItem('cart')
        }
    }
})

export const {addProductToCart, deleteCart, deleteOneProduct, getCartFromDB} = cartSlice.actions 

export default cartSlice.reducer