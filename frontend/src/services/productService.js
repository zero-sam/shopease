import api from "./api";

export const getPublicProducts = () => {
  // If your backend route doesn't require auth, remove the token requirement
  return api.get("/products/public");
};
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};