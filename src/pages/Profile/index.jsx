import { useState, useEffect } from "react";
import { getUserFromToken } from "../../utils/authHelpers";
import { getProducts, createProduct, deleteProduct } from "../../api/products";
import { ProductForm } from "../../components/ProductForm";
import { ProductCard } from "../../components/ProductCard";
import "./styles.css";

export const Profile = () => {
  const user = getUserFromToken();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentUserId = user?.id || user?.userId;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        if (currentUserId) {
          setProducts(data.filter(p => p.ownerId === currentUserId));
        } else {
          setProducts(data);
        }
      } catch {
        setErrorMessage("No se pudieron cargar tus herramientas publicadas.");
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchData();
  }, [currentUserId, refreshKey]);

  const handleCreateProduct = async (productData, resetForm) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await createProduct(productData);
      setSuccessMessage("¡Herramienta publicada con éxito!");
      resetForm();
      setShowForm(false);
      setLoadingProducts(true);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      setErrorMessage(err.message || "Error al publicar la herramienta.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async id => {
    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar esta herramienta?",
    );
    if (!confirmDelete) return;

    setActionLoadingId(id);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await deleteProduct(id);
      setSuccessMessage("Herramienta eliminada correctamente.");
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      setErrorMessage("Error al eliminar la herramienta.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <main className="profile-container">
      <section className="profile-card">
        <h2>Mis datos</h2>
        <div className="profile-info">
          {user?.name && (
            <p>
              <strong>Nombre:</strong> {user.name} {user.lastName || ""}
            </p>
          )}
          <p>
            <strong>Email / Usuario:</strong> {user?.sub || user?.email}
          </p>
        </div>
      </section>

      <section className="profile-actions">
        <button
          type="button"
          className={`btn-cta ${showForm ? "cancel" : ""}`}
          onClick={() => {
            setShowForm(prev => !prev);
            setSuccessMessage(null);
            setErrorMessage(null);
          }}
        >
          {showForm ? "Cancelar publicación" : "Publicar una herramienta"}
        </button>
      </section>

      {successMessage && (
        <div className="profile-alert success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="profile-alert error">{errorMessage}</div>
      )}

      {showForm && (
        <section className="profile-form-section">
          <ProductForm onSubmit={handleCreateProduct} loading={loading} />
        </section>
      )}

      <section className="profile-tools-section">
        <h2>Mis herramientas en alquiler</h2>

        {loadingProducts ? (
          <p className="loading-text">Cargando tus herramientas...</p>
        ) : products.length === 0 ? (
          <p className="empty-text">Aún no publicaste ninguna herramienta.</p>
        ) : (
          <div className="products-grid">
            {products.map(item => (
              <ProductCard
                key={item.id}
                product={item}
                onDelete={handleDeleteProduct}
                isDeleting={actionLoadingId === item.id}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
