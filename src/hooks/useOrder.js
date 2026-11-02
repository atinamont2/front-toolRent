import { useState, useEffect } from "react";
import { getOrderById } from "../api/orders";
import { getErrorMessage } from "../api/errors";

export const useOrder = (id) => {
  const [state, setState] = useState({
    order: null, loading: true, error: null,
  });

  useEffect(() => {
    let active = true;

    const fetchOrder = async () => {
      setState({ order: null, loading: true, error: null });
      try {
        const order = await getOrderById(id);
        if (active) setState({ order, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            order: null, loading: false,
            error: getErrorMessage(error, "No se pudo cargar el pedido."),
          });
        }
      }
    };

    fetchOrder();
    return () => { active = false; };
  }, [id]);

  return state;
};
