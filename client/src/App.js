import React from 'react'
import Navbar from './components/navbar/Navbar'
import store from './app/store'
import { Provider } from 'react-redux'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './features/homePage/Homepage'
import Signin from './features/signin/Signin'
import Signup from './features/signup/Signup'
import Product from './features/product/Product'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>       
      </BrowserRouter>
    </Provider>
   
  )
}

export default App