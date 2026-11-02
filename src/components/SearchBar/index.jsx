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
      <label htmlFor="search-input" className="search-bar-label">
        Buscador
      </label>
      <div className="search-bar-controls">
        <input
          id="search-input"
          type="text"
          className="search-bar-input"
          placeholder="Nombre o descripción"
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
