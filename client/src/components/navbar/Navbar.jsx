import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineClose, AiFillCloseCircle } from "react-icons/ai";
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Table,
  Button,
  Alert

} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, deleteOneProduct, addProductToCart } from '../../features/cart/cartSlice';
import { logout } from '../../features/signin/signinSlice';
function Example(args) {
  const dispatch = useDispatch()
  const productFromStore = useSelector((state) => state.cart.cart)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [translate, setTranslate] = useState(500)
  const [isStoreInDB, setIsStoreInDB] = useState(false)
  const user = useSelector((state) => state.user.user)

  let sum = 0
  if(productFromStore){
    for (let index = 0; index < productFromStore.length; index++) {
      sum += productFromStore[index].price
    }
  }
  

  useEffect(() => {
    if(productFromStore.length <= 0){
      setTranslate(500)
    }
  }, [productFromStore])


  const getSavedCart = async () => {
    const cart = await fetch('/cart')
    const cartJson = await cart.json()
    dispatch(deleteCart())

    const getId = async (id) => {
      const products = await fetch('https://fakestoreapi.com/products/' + id)
      const productsJson = await products.json()
      dispatch(addProductToCart(productsJson))
    }

    cartJson[0].product_id.forEach((itemId) => {
      getId(itemId)
    });  
    
  }

  const handleOpenSidebar = () => {
    if(productFromStore.length <= 0){
      setTranslate(500)
    }else{
      setTranslate(0)
    }
  }

  const saveInDB = async () => {
    const userId = user.user[0].id
    const arrayId = await productFromStore.map((e) => e.id)
    console.log(arrayId)
    const cart = await fetch(`/users/${userId}/cart`, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({productsId: arrayId})
    })

    if(cart.status === 200){
      setIsStoreInDB(true)
      setTimeout(() => {
        setIsStoreInDB(false)
      }, 3000)
      
      setTranslate(500)
    }

  }


  const [width, setWidth] = useState(500)

  return (
    <div>
      <Navbar expand='md'>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {
            isStoreInDB && (
              <Alert color="primary">
              Cart saved
            </Alert>
            )
          }
          
            {
             user ? (
              <div style={{ display: 'flex' }}>
                <NavbarText>
                  {user.user[0].firstName}
                </NavbarText>
                <NavbarText>
                  <NavLink onClick={() => dispatch(logout())}>Logout</NavLink>
                </NavbarText>
              </div>
             ):(
              <NavbarText>
                  <NavLink tag={Link} to='/signin'>Signin</NavLink>
              </NavbarText>
             )
            }
          
          <NavbarText><AiOutlineShoppingCart onClick={() => handleOpenSidebar()} style={{ fontSize: '30px' }} />({productFromStore.length})</NavbarText>
        </Collapse>
      </Navbar>
      <div className="sidebar" style={{ 
        overflowY: 'scroll',
        transform: `translateX(${translate}px)`, 
        zIndex: '10', height: '100vh', 
        borderLeft: '1px solid rgba(0, 0, 0, 0.3)', 
        transition: 'ease-in-out .4s', 
        width: `${width}px`, 
        backgroundColor: 'white', 
        position: 'fixed', 
        right: '0px', 
        top: '0px' }}>
            <AiOutlineClose onClick={() => setTranslate(500)} />
            {
              productFromStore.length > 0 && (
                <div>
                  <Table style={{ padding: '20px' }}>
                        <thead>
                          <tr>
                            <th>
                              Titre
                            </th>
                            <th>
                              Prix
                            </th>
                            <th>
                              catégorie
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          productFromStore.map((item) => (
                            <tr key={item.id}>
                            <td>
                              {item.title}
                            </td>
                            <td>
                              {item.category}
                            </td>
                            <td>
                              {item.price} €
                            </td>
                            <td>
                              <AiFillCloseCircle onClick={() => dispatch(deleteOneProduct(item.id))}/>
                            </td>
                          </tr>
                          ))
                        }
                        </tbody>
                        
                      </Table>
                      <p>total:</p> {sum} €
                      <div>
                        <Button color="primary" onClick={() => dispatch(deleteCart())}>Delete cart</Button>
                        <Button disabled={!user} onClick={() => saveInDB()}>Save cart</Button>
                        <Button disabled={!user} onClick={() => getSavedCart()}>Get Saved cart</Button>
                      </div>
                    </div>
              ) 
            }   
      </div>
    </div>
  );
}

export default Example;