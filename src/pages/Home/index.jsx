import { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { ProductGrid } from "../../components/ProductGrid";
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

      {currentError && (
        <div className="home-status-error" role="alert">
          <p>{currentError}</p>
        </div>
      )}

      {isLoading && (
        <div className="home-status" role="status">
          <p>Cargando herramientas...</p>
        </div>
      )}

      {!isLoading && !currentError && (
        <>
          {productsToDisplay.length === 0 ? (
            <div className="home-empty">
              <p>No se encontraron productos disponibles.</p>
            </div>
          ) : (
            <ProductGrid products={productsToDisplay} />
          )}
        </>
      )}
    </main>
  );
};
