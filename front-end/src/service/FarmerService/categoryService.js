import axios from "axios";
import { API_BASE_URL } from "../../config/config";

// Lấy tất cả các category theo categoryid
export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}