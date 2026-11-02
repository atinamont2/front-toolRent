import { useState, useEffect } from "react";
import { getCategoryById } from "../api/categories";
import { getErrorMessage } from "../api/categoryErrors";

export const useCategory = (id) => {
  const [state, setState] = useState({
    category: null, loading: true, error: null,
  });

  useEffect(() => {
    let active = true;

    const fetchCategory = async () => {
      setState({ category: null, loading: true, error: null });
      try {
        const category = await getCategoryById(id);
        if (active) setState({ category, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            category: null, loading: false,
            error: getErrorMessage(error, "No se pudo cargar la categoría."),
          });
        }
      }
    };

    fetchCategory();
    return () => { active = false; };
  }, [id]);

  return state;
};
