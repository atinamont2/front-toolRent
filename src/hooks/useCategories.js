import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import { getErrorMessage } from "../api/categoryErrors";

export const useCategories = (refresh) => {
  const [state, setState] = useState({
    categories: [], loading: true, error: null,
  });

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      setState({ categories: [], loading: true, error: null });
      try {
        const categories = await getCategories();
        if (active) setState({ categories, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            categories: [], loading: false,
            error: getErrorMessage(error, "No se pudieron cargar las categorías."),
          });
        }
      }
    };

    fetchCategories();
    return () => { active = false; };
  }, [refresh]);

  return state;
};
