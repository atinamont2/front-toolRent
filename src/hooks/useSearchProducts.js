import { useState, useEffect } from "react";
import { searchProducts } from "../api/products";

export const useSearchProducts = (query) => {
  const [state, setState] = useState({
    results: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const text = query?.trim();

    if (!text) {
      return;
    }

    const fetchSearch = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await searchProducts(text);
        setState({ results: data, loading: false, error: null });
      } catch (err) {
        setState({
          results: [],
          loading: false,
          error: err.response?.data?.message || err.message || "Error al buscar productos",
        });
      }
    };

    fetchSearch();
  }, [query]);

  // Si no hay texto buscado, devolvemos results vacío de forma predecible
  const hasQuery = Boolean(query?.trim());

  return {
    results: hasQuery ? state.results : [],
    loading: hasQuery ? state.loading : false,
    error: hasQuery ? state.error : null,
  };
};