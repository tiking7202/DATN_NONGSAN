import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

// Lấy tất cả farm
export function getFarms() {
    try {
        return axios.get(`${API_BASE_URL}/farm`);
    } catch (error) {     
        console.error(error);
    }
}

// Lấy farm theo productid
export function getFarmByProductId(productid) {
    try {
        return axios.get(`${API_BASE_URL}/farm/product/${productid}`);
    } catch (error) {           
        console.error(error);
    }
}