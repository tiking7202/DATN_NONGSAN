import axios from 'axios';

// Lấy tất cả farm
export function getFarms() {
    return axios.get('http://localhost:3000/api/farm');
}

// Lấy farm theo productid
export function getFarmByProductId(productid) {
    return axios.get(`http://localhost:3000/api/farm/product/${productid}`);
}