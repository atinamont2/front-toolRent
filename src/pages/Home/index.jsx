import { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { useProducts } from "../../hooks/useProducts";
import { useSearchProducts } from "../../hooks/useSearchProducts";
import "./styles.css";

export const Home = () => {
  const [activeQuery, setActiveQuery] = useState("");

  // Hook para el catálogo completo
  const {
    products: allProducts,
    loading: loadingAll,
    error: errorAll,
  } = useProducts();

  // Hook para la búsqueda por texto
  const {
    results: searchResults,
    loading: loadingSearch,
    error: errorSearch,
  } = useSearchProducts(activeQuery);

  // Determina si estamos viendo resultados de búsqueda o el catálogo general
  const isSearching = Boolean(activeQuery.trim());
  const productsToDisplay = isSearching ? searchResults : allProducts;
  const isLoading = isSearching ? loadingSearch : loadingAll;
  const currentError = isSearching ? errorSearch : errorAll;

  const handleSearch = text => {
    setActiveQuery(text);
  };

  return (
    <main className="home-container">
      <header className="home-header">
        <h1 className="home-title">Herramientas en Alquiler</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* Renderizado condicional de Error */}
      {currentError && (
        <div className="home-status-error">
          <p>{currentError}</p>
        </div>
      )}

      {/* Renderizado condicional de Loading */}
      {isLoading && (
        <div className="home-status">
          <p>Cargando herramientas...</p>
        </div>
      )}

      {/* Renderizado de la lista o mensaje de vacío */}
      {!isLoading && !currentError && (
        <>
          {productsToDisplay.length === 0 ? (
            <div className="home-empty">
              <p>No se encontraron productos disponibles.</p>
            </div>
          ) : (
            <div>
              {/* grilla de productos o las cards */}
              <p style={{ color: "#666", marginBottom: "1rem" }}>
                Mostrando {productsToDisplay.length} producto(s)
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
};
