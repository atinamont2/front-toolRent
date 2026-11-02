import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import "./styles.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  // Cálculo de días y monto total estimado
  let totalDays = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Incluye el día inicial
    if (diffDays > 0) {
      totalDays = diffDays;
    }
  }

  const totalPrice = totalDays * price;
  const canRent = isAvailable && totalDays > 0;

  const handleRent = e => {
    e.preventDefault();
    if (!canRent) return;
    // Lógica para avanzar al checkout/alquiler
    console.log("Iniciando alquiler:", {
      productId: product.id,
      startDate,
      endDate,
      totalDays,
      totalPrice,
    });
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <main className="product-detail-container">
      <button type="button" className="btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

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

        <section className="rental-section">
          <h2>Alquilar esta herramienta</h2>
          {isAvailable ? (
            <form className="rental-form" onSubmit={handleRent}>
              <div className="rental-dates">
                <div className="rental-field">
                  <label htmlFor="start-date">Fecha de inicio</label>
                  <input
                    id="start-date"
                    type="date"
                    min={todayStr}
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="rental-field">
                  <label htmlFor="end-date">Fecha de fin</label>
                  <input
                    id="end-date"
                    type="date"
                    min={startDate || todayStr}
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {totalDays > 0 && (
                <div className="rental-summary">
                  <p>
                    Días seleccionados: <strong>{totalDays}</strong>
                  </p>
                  <p className="total-price">
                    Total estimado: ${totalPrice.toLocaleString("es-AR")}
                  </p>
                </div>
              )}

              <button type="submit" className="btn-rent" disabled={!canRent}>
                {canRent
                  ? "Continuar con el alquiler"
                  : "Seleccioná las fechas"}
              </button>
            </form>
          ) : (
            <p className="rental-unavailable-msg">
              Esta herramienta se encuentra actualmente alquilada o fuera de
              servicio.
            </p>
          )}
        </section>
      </article>
    </main>
  );
};
