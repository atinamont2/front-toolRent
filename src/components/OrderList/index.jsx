const STATUS_LABEL = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  CANCELLED: "Cancelado",
};

export const OrderList = ({ orders, onCancel, cancellingId }) => {
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
          {order.status === "CONFIRMED" && (
            <div className="orders-actions">
              <button
                className="orders-danger"
                disabled={cancellingId !== null}
                onClick={() => onCancel(order)}
              >
                {cancellingId === order.id ? "Cancelando..." : "Cancelar pedido"}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
