import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom"
import { useCart } from "../context/CartContext"
import ApiService from "../../service/ApiService"


const ProductDetailsPage = () => {
    const {productId} = useParams();
    const {cart, dispatch} = useCart();
    const {product, setProduct} = useState(null);

    useEffect(()=>{
        fetchProduct();

    },[productId])

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId)
            setProduct(response.product);
        } catch (error) {
            console.log(error.message || error)

        }
    }

    
}