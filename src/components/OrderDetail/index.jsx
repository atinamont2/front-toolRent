import { useOrder } from "../../hooks/useOrder";

const STATUS_LABEL = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  CANCELLED: "Cancelado",
};

export const OrderDetail = ({ id, onBack, onCancel, onDelete, cancellingId, deletingId }) => {
  const { order, loading, error } = useOrder(id);
  const busy = cancellingId !== null || deletingId !== null;

  if (loading) return <p className="orders-status" role="status">Cargando pedido...</p>;
  if (error) {
    return (
      <section>
        <p className="orders-error" role="alert">{error}</p>
        <button onClick={onBack}>Volver a pedidos</button>
      </section>
    );
  }

  return (
    <section className="orders-card">
      <div className="orders-card-header">
        <h2>Detalle del pedido #{order.id}</h2>
        <span className={`orders-badge orders-badge-${order.status.toLowerCase()}`}>
          {STATUS_LABEL[order.status] || order.status}
        </span>
      </div>
      <dl className="orders-details">
        <dt>Usuario</dt><dd>#{order.userId}</dd>
        <dt>Fecha del pedido</dt><dd>{new Date(order.orderDate).toLocaleString("es-AR")}</dd>
        <dt>Inicio del alquiler</dt><dd>{order.startDate}</dd>
        <dt>Fin del alquiler</dt><dd>{order.endDate}</dd>
      </dl>
      <h3>Productos</h3>
      <ul className="orders-items">
        {order.items.map((item) => (
          <li key={item.id}>
            Producto #{item.productId} — Cantidad: {item.quantity} — Precio unitario: ${item.unitPrice} — Subtotal: ${item.subtotal}
          </li>
        ))}
      </ul>
      <p className="orders-total">Total: ${order.totalAmount}</p>
      <div className="orders-actions">
        {order.status === "CONFIRMED" && (
          <button className="orders-danger" onClick={() => onCancel(order)} disabled={busy}>
            {cancellingId === order.id ? "Cancelando..." : "Cancelar pedido"}
          </button>
        )}
        <button className="orders-danger" onClick={() => onDelete(order)} disabled={busy}>
          {deletingId === order.id ? "Eliminando..." : "Eliminar"}
        </button>
        <button onClick={onBack} disabled={busy}>Volver a pedidos</button>
      </div>
    </section>
  );
};
