import React, { createContext, useEffect } from 'react';

const CartContext = createContext()

const intialState = {
    cart : JSON.parse(localStorage.getItem('card')) || [],
}
