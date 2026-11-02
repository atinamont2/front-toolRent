import client from "./client";

const USERS_PATH = "/api/users";

export const getUsers = async () => {
  const { data } = await client.get(USERS_PATH);
  return data;
};

export const getUserById = async (id) => {
  const { data } = await client.get(`${USERS_PATH}/${id}`);
  return data;
};

export const createUser = async (user) => {
  const { data } = await client.post(USERS_PATH, user);
  return data;
};

export const updateUser = async (id, user) => {
  const { data } = await client.put(`${USERS_PATH}/${id}`, user);
  return data;
};

export const deleteUser = async (id) => {
  await client.delete(`${USERS_PATH}/${id}`);
};
