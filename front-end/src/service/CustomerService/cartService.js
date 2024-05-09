import axios from 'axios';

export function addToCart(productId, userId) {
    return axios.post('http://localhost:3000/api/add-cart', {
        productId,
        userId
    });
}