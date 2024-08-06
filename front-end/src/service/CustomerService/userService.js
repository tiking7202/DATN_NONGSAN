import axios from 'axios';
import { API_BASE_URL } from '../../config/config';


export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
