import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { createOrder } from "../../api/orders";
import { getErrorMessage } from "../../api/errors";
import { ROUTES } from "../../constants/routes";
import { RentalForm } from "../../components/RentalForm";
import "./styles.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);

  if (loading) {
    return (
      <main className="product-detail-container">
        <p className="home-status" role="status">
          Cargando herramienta...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail-container">
        <button type="button" className="btn-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="home-status-error" role="alert">
          <p>{error || "No se encontró el producto solicitado."}</p>
        </div>
      </main>
    );
  }

  const isAvailable = Boolean(product.isAvailable ?? product.disponible);
  const name = product.name || product.nombre;
  const description = product.description || product.descripcion;
  const price = Number(product.price || product.precio || 0);
  const address = product.address || product.direccion;

  const handleRentalSubmit = async ({ startDate, endDate }) => {
    setSubmitting(true);
    setActionError(null);

    try {
      await createOrder({
        startDate,
        endDate,
        items: [
          {
            productId: Number(product.id),
            quantity: 1,
          },
        ],
      });
      navigate(ROUTES.ORDERS);
    } catch (err) {
      setActionError(getErrorMessage(err, "No se pudo confirmar el alquiler."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="product-detail-container">
      <button type="button" className="btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {actionError && (
        <div className="home-status-error" role="alert">
          <p>{actionError}</p>
        </div>
      )}

      <article className="product-detail-card">
        <header className="product-detail-header">
          <h1 className="product-detail-title">{name}</h1>
          <span
            className={`product-detail-badge ${isAvailable ? "available" : "unavailable"}`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </span>
        </header>

        <section className="product-detail-info">
          <p className="product-detail-description">{description}</p>
          <div className="product-detail-meta">
            <p className="product-detail-price">
              ${price.toLocaleString("es-AR")}{" "}
              <span className="product-detail-period">/ por día</span>
            </p>
            {address && <p className="product-detail-address">📍 {address}</p>}
          </div>
        </section>

        <RentalForm
          price={price}
          isAvailable={isAvailable}
          onSubmit={handleRentalSubmit}
          submitting={submitting}
        />
      </article>
    </main>
  );
};
