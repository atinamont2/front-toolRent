import { useState, useEffect } from "react";
import { getUserById } from "../api/users";
import { getErrorMessage } from "../api/errors";

export const useUser = (id) => {
  const [state, setState] = useState({
    user: null, loading: true, error: null,
  });

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      setState({ user: null, loading: true, error: null });
      try {
        const user = await getUserById(id);
        if (active) setState({ user, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            user: null, loading: false,
            error: getErrorMessage(error, "No se pudo cargar el usuario."),
          });
        }
      }
    };

    fetchUser();
    return () => { active = false; };
  }, [id]);

  return state;
};
