import client from "./client";

const PRODUCTS_PATH = "/api/products";

export const getProducts = async () => {
  const { data } = await client.get(PRODUCTS_PATH);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await client.get(`${PRODUCTS_PATH}/${id}`);
  return data;
};

export const searchProducts = async (text) => {
  const { data } = await client.get(`${PRODUCTS_PATH}/search`, {
    params: { text },
  });
  return data;
};

export const createProduct = async (product) => {
  const { data } = await client.post(PRODUCTS_PATH, product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await client.put(`${PRODUCTS_PATH}/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  await client.delete(`${PRODUCTS_PATH}/${id}`);
};