import axios from "axios";
import { API_BASE_URL } from "../../config/config";

export  function getReviewByProductId(productId) {
    try {
        return axios.get(`${API_BASE_URL}/review/${productId}`);
    } catch (error) {
        console.error(error);
    }
}

export function getAmountOfReview(productId) {
    try {
        return axios.get(`${API_BASE_URL}/review/rating/${productId}`);
    } catch (error) {
        console.error(error);
    }
}
