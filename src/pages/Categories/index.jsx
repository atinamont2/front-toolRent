import { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "../../api/categories";
import { getErrorMessage } from "../../api/categoryErrors";
import { useCategories } from "../../hooks/useCategories";
import { CategoryList } from "../../components/CategoryList";
import { CategoryDetail } from "../../components/CategoryDetail";
import { CategoryForm } from "../../components/CategoryForm";
import "./styles.css";

export const Categories = () => {
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [message, setMessage] = useState(null);
  const { categories, loading, error } = useCategories(refresh);

  const openView = (nextView, id = null) => {
    setView(nextView);
    setSelectedId(id);
    setActionError(null);
    setMessage(null);
  };

  const finishAction = (text) => {
    openView("list");
    setMessage(text);
    setRefresh((previous) => previous + 1);
  };

  const handleSave = async (request) => {
    setSaving(true);
    setActionError(null);
    try {
      if (view === "edit") {
        await updateCategory(selectedId, request);
        finishAction("Categoría actualizada correctamente.");
      } else {
        await createCategory(request);
        finishAction("Categoría creada correctamente.");
      }
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo guardar la categoría."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(category.id);
    setActionError(null);
    setMessage(null);
    try {
      await deleteCategory(category.id);
      finishAction("Categoría eliminada correctamente.");
    } catch (error) {
      setActionError(getErrorMessage(error, "No se pudo eliminar la categoría."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="categories-container">
      <header className="categories-header">
        <h1>Categorías</h1>
        {view === "list" && <button className="categories-primary" onClick={() => openView("new")} disabled={deletingId !== null}>Nueva categoría</button>}
      </header>
      {message && <p className="categories-success" role="status">{message}</p>}
      {actionError && <p className="categories-error" role="alert">{actionError}</p>}
      {view === "list" && (
        <>
          {loading && <p className="categories-status" role="status">Cargando categorías...</p>}
          {!loading && error && (
            <div className="categories-error" role="alert">
              <p>{error}</p>
              <button onClick={() => setRefresh((previous) => previous + 1)}>Reintentar</button>
            </div>
          )}
          {!loading && !error && <CategoryList categories={categories} onView={(id) => openView("detail", id)} onEdit={(id) => openView("edit", id)} onDelete={handleDelete} deletingId={deletingId} />}
        </>
      )}
      {view === "new" && <CategoryForm onSubmit={handleSave} onCancel={() => openView("list")} saving={saving} />}
      {(view === "detail" || view === "edit") && (
        <CategoryDetail key={selectedId} id={selectedId} editing={view === "edit"} onEdit={(id) => openView("edit", id)} onBack={() => openView("list")} onSave={handleSave} onDelete={handleDelete} saving={saving} deletingId={deletingId} />
      )}
    </main>
  );
};
