import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

export function addToCart(productId, userId, quantity, batchId) {
    return axios.post(`${API_BASE_URL}/add-cart`, {
        productId,
        userId,
        quantity,
        batchId
    });
}

export function updateQuantityCart(userId, productId, quantity) {
    return axios.put(`${API_BASE_URL}/update-quantity-cart`, {
        userId,
        productId,
        quantity
    });
}