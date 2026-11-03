import { useState } from "react";
import "./styles.css";

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
  price: "",
  address: "",
};

export const ProductForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.price || !formData.address.trim()) {
      setError(
        "Completá los campos obligatorios (nombre, precio y dirección).",
      );
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      address: formData.address.trim(),
      isAvailable: true,
    };

    onSubmit(payload, () => setFormData(INITIAL_FORM_STATE));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>Publicar herramienta para alquiler</h3>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="name">Nombre de la herramienta *</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Taladro Percutor Bosch 650W"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Condiciones, accesorios incluidos, potencia, etc."
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Precio por día ($) *</label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            step="any"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Zona / Dirección de retiro *</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej: Villa Crespo, CABA"
            required
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? "Publicando..." : "Publicar herramienta"}
      </button>
    </form>
  );
};
