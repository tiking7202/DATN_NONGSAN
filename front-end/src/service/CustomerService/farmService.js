import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

// Lấy tất cả farm
export const getFarms = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/farm`);
        return response.data;
    } catch (error) {     
        console.error(error);
    }
}

// Lấy farm theo productid
export const getFarmByProductId = async (productid) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/farm/product/${productid}`);
        return response.data;
    } catch (error) {           
        console.error(error);
    }
}

// Lấy farm theo farmid
export const getFarmByFarmId = async (farmid) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/farm/${farmid}`);
        return response.data;
    } catch (error) {           
        console.error(error);
    }
}