import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const getShippingInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipping-info/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { getShippingInfo };
