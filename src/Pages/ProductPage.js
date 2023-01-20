// Product detailed Page Layout.

import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card,Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProductDetails } from '../actions/productActions'
//import axios from 'axios'


function ProductPage() {
  // routeParams Var Contains the id of the Product From the Link.
  const routeParams = useParams();
  const navigate = useNavigate()
  // Finds the Product we want to show 
  //const product = products.find((p) => p._id == routeParams.id) 
  //const [product, setProduct] = useState([])
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  useEffect(() =>{

    //async function fetchProduct(){
    //
    //  const {data} = await axios.get(`/api/products/${routeParams.id}`)
    //  setProduct(data)
    //}
    //fetchProduct()
    dispatch(listProductDetails(routeParams.id))
    console.log(qty)
  }, [dispatch])

  const addToCartHandler = () => {
    //console.log('Add To Cart:',routeParams.id)
    navigate(`/cart/${routeParams.id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : (
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
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <div className="d-grid gap-2" >
                <Button onClick={addToCartHandler} className='btn-black' disabled={product.countInStock == 0} type='button' >Add to Cart</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
                )
      }
      
    </div>
  )
}

export default ProductPage