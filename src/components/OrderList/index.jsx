const STATUS_LABEL = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  CANCELLED: "Cancelado",
};

export const OrderList = ({ orders, onView, onCancel, onDelete, cancellingId, deletingId }) => {
  const busy = cancellingId !== null || deletingId !== null;

  if (orders.length === 0) {
    return <p className="orders-status">No tenés pedidos todavía.</p>;
  }

  return (
    <ul className="orders-list">
      {orders.map((order) => (
        <li key={order.id} className="orders-card">
          <div className="orders-card-header">
            <h2>Pedido #{order.id}</h2>
            <span className={`orders-badge orders-badge-${order.status.toLowerCase()}`}>
              {STATUS_LABEL[order.status] || order.status}
            </span>
          </div>
          <p>{order.startDate} a {order.endDate}</p>
          <ul className="orders-items">
            {order.items.map((item) => (
              <li key={item.id}>
                Producto #{item.productId} x{item.quantity} — ${item.subtotal}
              </li>
            ))}
          </ul>
          <p className="orders-total">Total: ${order.totalAmount}</p>
          <div className="orders-actions">
            <button onClick={() => onView(order.id)} disabled={busy}>Ver detalle</button>
            {order.status === "CONFIRMED" && (
              <button
                className="orders-danger"
                disabled={busy}
                onClick={() => onCancel(order)}
              >
                {cancellingId === order.id ? "Cancelando..." : "Cancelar pedido"}
              </button>
            )}
            <button className="orders-danger" onClick={() => onDelete(order)} disabled={busy}>
              {deletingId === order.id ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
