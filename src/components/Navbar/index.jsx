import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import "./styles.css";

export const Navbar = ({ isAuthenticated, onLogout }) => (
  <nav className="navbar" aria-label="Navegación principal">
    <span className="navbar-brand">ToolRent</span>
    {isAuthenticated ? (
      <>
        <NavLink to={ROUTES.HOME} end>Productos</NavLink>
        <NavLink to={ROUTES.USERS}>Usuarios</NavLink>
        <NavLink to={ROUTES.CATEGORIES}>Categorías</NavLink>
        <button type="button" onClick={onLogout}>Cerrar sesión</button>
      </>
    ) : (
      <>
        <NavLink to={ROUTES.LOGIN}>Iniciar sesión</NavLink>
        <NavLink to={ROUTES.REGISTER}>Registrarse</NavLink>
      </>
    )}
  </nav>
);
