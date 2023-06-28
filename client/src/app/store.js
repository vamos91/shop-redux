import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/cart/cartSlice'
import userReducer from '../features/signin/signinSlice'
import productsReducer from '../features/homePage/homeSlice'

export default configureStore({
    reducer: {
        cart: counterReducer,
        user: userReducer,
        products: productsReducer
    }
})