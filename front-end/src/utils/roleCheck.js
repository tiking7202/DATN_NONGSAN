import { jwtDecode } from "jwt-decode";

export const isCustomer = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.role === "customer";
}
export const isFarmer = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.role === "farmer";
}