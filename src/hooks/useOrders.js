import { useState, useEffect } from "react";
import { getOrders } from "../api/orders";
import { getErrorMessage } from "../api/errors";

export const useOrders = (refresh) => {
  const [state, setState] = useState({
    orders: [], loading: true, error: null,
  });

  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      setState({ orders: [], loading: true, error: null });
      try {
        const orders = await getOrders();
        if (active) setState({ orders, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            orders: [], loading: false,
            error: getErrorMessage(error, "No se pudieron cargar los pedidos."),
          });
        }
      }
    };

    fetchOrders();
    return () => { active = false; };
  }, [refresh]);

  return state;
};
