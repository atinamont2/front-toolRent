import { Link } from "react-router-dom";
import "./styles.css";

export const ProductCard = ({ product }) => {
  const isAvailable = Boolean(product.isAvailable ?? product.disponible);
  const name = product.name || product.nombre;
  const description = product.description || product.descripcion;
  const price = product.price || product.precio || 0;

  return (
    <article className="product-card">
      <div>
        <header className="product-card-header">
          <h2 className="product-card-title">{name}</h2>
          <span
            className={`product-badge ${isAvailable ? "available" : "unavailable"}`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </span>
        </header>

        <p className="product-card-description">{description}</p>
      </div>

      <footer className="product-card-footer">
        <p className="product-card-price">
          ${Number(price).toLocaleString("es-AR")}
        </p>
        <Link to={`/products/${product.id}`} className="product-card-link">
          Ver detalle
        </Link>
      </footer>
    </article>
  );
};
