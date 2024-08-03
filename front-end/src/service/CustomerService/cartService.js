import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

export function addToCart(productId, userId, quantity) {
    return axios.post(`${API_BASE_URL}/add-cart`, {
        productId,
        userId,
        quantity
    });
}