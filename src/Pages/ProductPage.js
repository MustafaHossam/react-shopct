// Product detailed Page Layout.

import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../Components/Rating'
import axios from 'axios'


function ProductPage() {
  // routeParams Var Contains the id of the Product From the Link.
  const routeParams = useParams();
  // Finds the Product we want to show 
  //const product = products.find((p) => p._id == routeParams.id) 
  const [product, setProduct] = useState([])

  useEffect(() =>{

    async function fetchProduct(){

      const {data} = await axios.get(`/api/products/${routeParams.id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating  value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2" >
                <Button className='btn-black' disabled={product.countInStock == 0} type='button' >Add to Cart</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage