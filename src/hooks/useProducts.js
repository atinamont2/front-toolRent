import { useState, useEffect } from "react";
import { getProducts } from "../api/products";

export const useProducts = () => {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAll = async () => {
      setState({ products: [], loading: true, error: null });

      try {
        const data = await getProducts();
        setState({ products: data, loading: false, error: null });
      } catch (err) {
        setState({
          products: [],
          loading: false,
          error: err.response?.data?.message || err.message || "Error al cargar los productos",
        });
      }
    };

    fetchAll();
  }, []);

  return state;
};