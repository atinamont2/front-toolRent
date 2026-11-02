import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <nav className="categories-nav" aria-label="Navegación principal">
        <span>ToolRent</span>
        <NavLink to={ROUTES.HOME} end>Productos</NavLink>
        <NavLink to={ROUTES.CATEGORIES}>Categorías</NavLink>
      </nav>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CATEGORIES} element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
