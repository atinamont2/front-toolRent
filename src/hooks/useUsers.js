import { useState, useEffect } from "react";
import { getUsers } from "../api/users";
import { getErrorMessage } from "../api/errors";

export const useUsers = (refresh) => {
  const [state, setState] = useState({
    users: [], loading: true, error: null,
  });

  useEffect(() => {
    let active = true;

    const fetchUsers = async () => {
      setState({ users: [], loading: true, error: null });
      try {
        const users = await getUsers();
        if (active) setState({ users, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            users: [], loading: false,
            error: getErrorMessage(error, "No se pudieron cargar los usuarios."),
          });
        }
      }
    };

    fetchUsers();
    return () => { active = false; };
  }, [refresh]);

  return state;
};
