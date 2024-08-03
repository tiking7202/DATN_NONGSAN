import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

// Lấy tất cả farm
export function getFarms() {
    return axios.get(`${API_BASE_URL}/farm`);
}

// Lấy farm theo productid
export function getFarmByProductId(productid) {
    return axios.get(`${API_BASE_URL}/farm/product/${productid}`);
}