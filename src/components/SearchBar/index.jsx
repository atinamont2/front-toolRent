import { useState } from "react";
import "./styles.css";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      className="search-bar-container"
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="search-bar-controls">
        <input
          id="search-input"
          type="text"
          className="search-bar-input"
          placeholder="Nombre o descripción..."
          aria-label="Buscar herramientas"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="btn-search">
          Buscar
        </button>
      </div>
    </form>
  );
};
