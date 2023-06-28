import React, {useState} from 'react'
import { Col, Container, Row } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import {Card, CardBody, CardTitle, CardSubtitle, Input, Button, InputGroup} from 'reactstrap'
import { addProductToCart } from '../features/cart/cartSlice'
import {AiOutlineHeart}  from "react-icons/ai";

function ArticleCard({product}) {
    const dispatch = useDispatch()
    const [liked, setIsLiked] = useState(false)
    const cartStore = useSelector((state) => state.cart.cart)

  return (
    <Col key={product.id} md="4" style={{marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Card
            style={{
                width: '18rem', padding: '20px', height: '600px'
            }}
            >
            <img
                alt="Sample"
                src={product.image}
                style={{height: '300px'}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {product.title}
                </CardTitle>
                <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
                >
                Price
                </CardSubtitle>
                
                <h3>{product.price} €</h3>
                <Button color="danger" disabled={cartStore.find((e) => e.id === product.id)} onClick={() => dispatch(addProductToCart(product))}>
                    Add To card
                </Button>
                <AiOutlineHeart onClick={() => setIsLiked(!liked)} style={{color: liked ? 'red' : 'black',  position: 'absolute', bottom: '20px', right: '20px', fontSize: '30px' }}/>
            </CardBody>
        </Card>
    </Col>
  )
}

export default ArticleCard