import client from "./client";

const ORDERS_PATH = "/api/orders";

// Si el usuario logueado es admin devuelve todos los pedidos, si no, solo los
// suyos (esa logica ya la resuelve el back).
export const getOrders = async () => {
  const { data } = await client.get(ORDERS_PATH);
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await client.get(`${ORDERS_PATH}/${id}`);
  return data;
};

// request: { startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD", items: [{ productId, quantity }] }
export const createOrder = async (request) => {
  const { data } = await client.post(ORDERS_PATH, request);
  return data;
};

export const cancelOrder = async (id) => {
  const { data } = await client.put(`${ORDERS_PATH}/${id}/cancel`);
  return data;
};

export const deleteOrder = async (id) => {
  await client.delete(`${ORDERS_PATH}/${id}`);
};
