import React, {useEffect} from 'react'
import { Link, useParams,useLocation, useSearchParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Message  from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartPage({match, Location, history}) {
    const routeParams = useParams();
    const productId = routeParams.id
    const { search } = useLocation();
    const navigate = useNavigate()
    //const [searchParms] = useSearchParams();
    const qty = search ? Number(search.split('=')[1]) : 1
    //console.log("____________qty_________________",qty)
    //console.log("___________id__________________",productId)
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    //console.log("________CartItems____________",cartItems)

    useEffect(() => {
        if (productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])
    const removeFromCartHandler = (id) =>{
        //console.log('__________remove____________', id)
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () =>{
        navigate('/login?redirect=shipping')
    }
  return (
    <Row>
        <Col md={8}>
            <h1>Shoppig Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your Cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        //<Card border='light'>
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {
                                        [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        //</Card>
                    ))}
                    
                </ListGroup>
                
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                <div className="d-grid gap-2" >
                    <Button
                        type='button'
                        className='btn-black'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed To Checkout
                    </Button>
                    </div>
                </ListGroup.Item>
            </Card>
        </Col> 
    </Row>
  )
}

export default CartPage