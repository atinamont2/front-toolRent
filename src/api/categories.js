import client from "./client";

const CATEGORIES_PATH = "/api/categories";

export const getCategories = async () => {
  const { data } = await client.get(CATEGORIES_PATH);
  return data;
};

export const getCategoryById = async (id) => {
  const { data } = await client.get(`${CATEGORIES_PATH}/${id}`);
  return data;
};

export const createCategory = async (category) => {
  const { data } = await client.post(CATEGORIES_PATH, category);
  return data;
};

export const updateCategory = async (id, category) => {
  const { data } = await client.put(`${CATEGORIES_PATH}/${id}`, category);
  return data;
};

export const deleteCategory = async (id) => {
  await client.delete(`${CATEGORIES_PATH}/${id}`);
};