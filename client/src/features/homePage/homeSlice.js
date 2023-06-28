import { createSlice } from "@reduxjs/toolkit";

const localProducts = localStorage.getItem('products') !== null ? JSON.parse(localStorage.getItem('products')) : null

const productsSlice = createSlice({
    name: 'products',
    initialState:{
        products: localProducts
    },
    reducers:{
        getAllProducts: (state, action) => {
            state.products = action.payload
            localStorage.setItem('products', JSON.stringify(state.products))
        }
    }
})

export const { getAllProducts } = productsSlice.actions

export default productsSlice.reducer