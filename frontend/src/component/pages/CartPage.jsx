import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { useCart } from '../context/CartContext';
import "../../style/cart.css"


const CartPage = ()=>{
    const {cart,dispatch } = useCart()
    const [message , setMessage] = useState(null);
    const navigate = useNavigate();


    const incrementItem = (product) =>{
        dispatch({type: 'INCREMENT_ITEM', payload:product})
    }
    const decrementItem = (product) =>{
        const cartItem = cart.find(item =>item.id === product.id)
        if(cartItem && cartItem.quantity > 1){
            dispatch({type: 'DECREMENT_ITEM', payload:product})
        }else{
            dispatch({type: 'REMOVE_ITEM', payload:product})
        }
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity,0)

    const handleCheckOut = async()=>{
        if(!ApiService.isAuthenticated()){
            setMessage("You need to be Logged In First")
            setTimeout(() => {
                setMessage("")
                navigate("/login")
            }, 3000);
            return ;

        }

        const orderItems = cart.map(item => ({
            productId : item.id,
            quantity : item.quantity
        }));

        const orderRequest = {
            totalPrice,
            items: orderItems
        }

        try {
            const response = await ApiService.placeOrder(orderRequest);
            setMessage(response.message)
            setTimeout(()=>{
                setMessage('')
            },5000);

            if(response.message === 200){
                dispatch({type: 'CLEAR_CART'})
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
            setTimeout(()=>{
                setMessage('')
            },3000);

        }

    }

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            {message && <p className='response-message'>{message}</p>}

            {cart.length === 0 ? (
                <p>Your Cart is empty</p>
            ):(
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} />
                                <div>
                                    <h1>{item.name}</h1>
                                    <p>{item.description}</p>
                                    <div>
                                        <button onClick={()=> decrementItem(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={()=> incrementItem(item)}>+</button>
                                    </div>
                                    <span>
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'KES'
                                        }).format(item.price)} * {item.quantity} = {item.price * item.quantity}
                                        </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h2>
                        Total: {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'KES'}).format(totalPrice)}
                    </h2>
                    <button className='checkout-button' onClick={handleCheckOut}>Checkout </button>

                </div>
            )}
        </div>
    )
}

export default CartPage