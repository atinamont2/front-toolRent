import { useState } from "react";
import { createOrder, cancelOrder, deleteOrder } from "../../api/orders";
import { getErrorMessage } from "../../api/errors";
import { useOrders } from "../../hooks/useOrders";
import { OrderList } from "../../components/OrderList";
import { OrderForm } from "../../components/OrderForm";
import { OrderDetail } from "../../components/OrderDetail";
import "./styles.css";

export const Orders = () => {
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [saving, setSaving] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [message, setMessage] = useState(null);
  const { orders, loading, error } = useOrders(refresh);

  const busy = cancellingId !== null || deletingId !== null;

  const openView = (nextView, id = null) => {
    setSelectedId(id);
    setView(nextView);
    setActionError(null);
    setMessage(null);
  };

  const finishAction = (text) => {
    openView("list");
    setMessage(text);
    setRefresh((previous) => previous + 1);
  };

  const handleCreate = async (request) => {
    setSaving(true);
    setActionError(null);
    try {
      await createOrder(request);
      finishAction("Pedido confirmado correctamente.");
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo confirmar el pedido."));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async (order) => {
    if (busy) return;
    if (!window.confirm(`¿Cancelar el pedido #${order.id}? Esta acción no se puede deshacer.`)) return;
    setCancellingId(order.id);
    setActionError(null);
    setMessage(null);
    try {
      await cancelOrder(order.id);
      finishAction("Pedido cancelado correctamente.");
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo cancelar el pedido."));
    } finally {
      setCancellingId(null);
    }
  };

  const handleDelete = async (order) => {
    if (busy) return;
    if (!window.confirm(`¿Eliminar el pedido #${order.id}? Esta acción no se puede deshacer.`)) return;
    setDeletingId(order.id);
    setActionError(null);
    setMessage(null);
    try {
      await deleteOrder(order.id);
      finishAction("Pedido eliminado correctamente.");
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo eliminar el pedido."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="orders-container">
      <header className="orders-header">
        <h1>Pedidos</h1>
        {view === "list" && <button className="orders-primary" onClick={() => openView("new")} disabled={busy}>Nuevo pedido</button>}
      </header>
      {message && <p className="orders-success" role="status">{message}</p>}
      {actionError && <p className="orders-error" role="alert">{actionError}</p>}
      {view === "list" && (
        <>
          {loading && <p className="orders-status" role="status">Cargando pedidos...</p>}
          {!loading && error && (
            <div className="orders-error" role="alert">
              <p>{error}</p>
              <button onClick={() => setRefresh((previous) => previous + 1)}>Reintentar</button>
            </div>
          )}
          {!loading && !error && <OrderList orders={orders} onView={(id) => openView("detail", id)} onCancel={handleCancel} onDelete={handleDelete} cancellingId={cancellingId} deletingId={deletingId} />}
        </>
      )}
      {view === "new" && <OrderForm onSubmit={handleCreate} onCancel={() => openView("list")} saving={saving} />}
      {view === "detail" && (
        <OrderDetail key={selectedId} id={selectedId} onBack={() => openView("list")} onCancel={handleCancel} onDelete={handleDelete} cancellingId={cancellingId} deletingId={deletingId} />
      )}
    </main>
  );
};
