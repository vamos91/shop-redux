import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row } from 'reactstrap'
import { Input, InputGroup} from 'reactstrap'
import { getAllProducts } from './homeSlice'
import ArticleCard from '../../components/ArticleCard'
import {getAllArticle} from './getAllArticles'

function Homepage() {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const [searchByLetter, setSearchByLetter] = useState('')
   
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        // if(!localStorage.getItem('products')){
        if(!localStorage.getItem('products')){
            const getArticle = async () => {
                const articles = await getAllArticle()
                dispatch(getAllProducts(articles))
                setProducts(articles)
            }
            getArticle()
        }else{
            console.log('Get data from localStorage')
            const productsFromLocalStorage = JSON.parse(localStorage.getItem('products'))
            setProducts(productsFromLocalStorage)
        }

        if(searchByLetter){
            const result = []
            products.forEach((item) => {
                if(item.title.toLowerCase().includes(searchByLetter)){
                    result.push(item)
                }
            })
            setProducts(result)
        }
        
       return () => controller.abort()
    }, [searchByLetter])

  return (
    <Container>
        <InputGroup style={{width: '500px', 
                margin: 'auto',
                }}>
            <Input autoFocus
                onChange={(e) => setSearchByLetter(e.target.value)}
                value={searchByLetter}
            />
        </InputGroup>
        <Row>
            {
                products.map((product) => (
                    <ArticleCard key={product.id} product={product} />
                   
                ))
            }
        </Row>
       
    </Container>
  )
}

export default Homepage