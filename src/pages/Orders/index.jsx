import { useState } from "react";
import { cancelOrder } from "../../api/orders";
import { getErrorMessage } from "../../api/errors";
import { useOrders } from "../../hooks/useOrders";
import { OrderList } from "../../components/OrderList";
import "./styles.css";

export const Orders = () => {
  const [refresh, setRefresh] = useState(0);
  const [cancellingId, setCancellingId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [message, setMessage] = useState(null);

  const { orders, loading, error } = useOrders(refresh);

  const handleCancel = async order => {
    if (
      !window.confirm(
        `¿Cancelar el pedido #${order.id}? Esta acción no se puede deshacer.`,
      )
    )
      return;

    setCancellingId(order.id);
    setActionError(null);
    setMessage(null);

    try {
      await cancelOrder(order.id);
      setMessage("Pedido cancelado correctamente.");
      setRefresh(previous => previous + 1);
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo cancelar el pedido."));
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <main className="orders-container">
      <header className="orders-header">
        <h1>Mis Pedidos</h1>
      </header>

      {message && (
        <p className="orders-success" role="status">
          {message}
        </p>
      )}
      {actionError && (
        <p className="orders-error" role="alert">
          {actionError}
        </p>
      )}

      {loading && (
        <p className="orders-status" role="status">
          Cargando pedidos...
        </p>
      )}

      {!loading && error && (
        <div className="orders-error" role="alert">
          <p>{error}</p>
          <button onClick={() => setRefresh(previous => previous + 1)}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <OrderList
          orders={orders}
          onCancel={handleCancel}
          cancellingId={cancellingId}
        />
      )}
    </main>
  );
};
