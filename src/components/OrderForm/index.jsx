import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

// No existe un Cart en el back: armamos los items del pedido aca mismo
// (productId + quantity) y recien se confirman al mandar el POST /api/orders.
export const OrderForm = ({ onSubmit, onCancel, saving }) => {
  const { products, loading: loadingProducts, error: productsError } = useProducts();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);

  const availableProducts = products.filter((product) => product.isAvailable);

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(0, Number(value) || 0);
    setQuantities((previous) => ({ ...previous, [productId]: quantity }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (saving) return;

    if (!startDate || !endDate) {
      setError("Elegí fecha de inicio y de fin.");
      return;
    }
    if (endDate < startDate) {
      setError("La fecha de fin no puede ser anterior a la de inicio.");
      return;
    }

    const items = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId: Number(productId), quantity }));

    if (items.length === 0) {
      setError("Elegí al menos un producto y una cantidad.");
      return;
    }

    setError(null);
    onSubmit({ startDate, endDate, items });
  };

  return (
    <form className="orders-form" onSubmit={handleSubmit} aria-busy={saving}>
      <h2>Nuevo pedido</h2>
      {error && <p className="orders-error" role="alert">{error}</p>}
      <fieldset disabled={saving}>
        <label htmlFor="order-start-date">Desde</label>
        <input id="order-start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <label htmlFor="order-end-date">Hasta</label>
        <input id="order-end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

        <p className="orders-form-section-title">Productos disponibles</p>
        {loadingProducts && <p className="orders-status" role="status">Cargando productos...</p>}
        {!loadingProducts && productsError && <p className="orders-error" role="alert">{productsError}</p>}
        {!loadingProducts && !productsError && availableProducts.length === 0 && (
          <p className="orders-status">No hay productos disponibles para alquilar.</p>
        )}
        {!loadingProducts && !productsError && availableProducts.length > 0 && (
          <ul className="orders-product-picker">
            {availableProducts.map((product) => (
              <li key={product.id} className="orders-product-picker-item">
                <span className="orders-product-picker-name">{product.name}</span>
                <span className="orders-product-picker-price">${product.price}</span>
                <input
                  type="number"
                  min={0}
                  aria-label={`Cantidad de ${product.name}`}
                  value={quantities[product.id] || 0}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="orders-actions">
          <button type="submit" className="orders-primary">{saving ? "Confirmando..." : "Confirmar pedido"}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </fieldset>
    </form>
  );
};
