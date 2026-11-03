import { useState, useEffect } from "react";
import { getProductById } from "../api/products";
import { getErrorMessage } from "../api/errors";

export const useProduct = (id) => {
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setState({ product: null, loading: true, error: null });
      try {
        const data = await getProductById(id);
        setState({ product: data, loading: false, error: null });
      } catch (err) {
        setState({
          product: null,
          loading: false,
          error: getErrorMessage(err, "Error al cargar el detalle del producto."),
        });
      }
    };

    fetchProduct();
  }, [id]);

  return state;
};