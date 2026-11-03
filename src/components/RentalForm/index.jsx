import { useState } from "react";
import { calculateRentalDays, getTodayString } from "../../utils/dateHelpers";
import "./styles.css";

export const RentalForm = ({ price, isAvailable, onSubmit, submitting }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isAvailable) {
    return (
      <section className="rental-section">
        <h2>Alquilar esta herramienta</h2>
        <p className="rental-unavailable-msg">
          Esta herramienta se encuentra actualmente alquilada o fuera de
          servicio.
        </p>
      </section>
    );
  }

  const todayStr = getTodayString();
  const totalDays = calculateRentalDays(startDate, endDate);
  const totalPrice = totalDays * price;
  const canRent = totalDays > 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (!canRent || submitting) return;
    onSubmit({ startDate, endDate, totalDays, totalPrice });
  };

  return (
    <section className="rental-section">
      <h2>Alquilar esta herramienta</h2>
      <form className="rental-form" onSubmit={handleSubmit}>
        <div className="rental-dates">
          <div className="rental-field">
            <label htmlFor="start-date">Fecha de inicio</label>
            <input
              id="start-date"
              type="date"
              min={todayStr}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="rental-field">
            <label htmlFor="end-date">Fecha de fin</label>
            <input
              id="end-date"
              type="date"
              min={startDate || todayStr}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {totalDays > 0 && (
          <div className="rental-summary">
            <p>
              Días seleccionados: <strong>{totalDays}</strong>
            </p>
            <p className="total-price">
              Total estimado: ${totalPrice.toLocaleString("es-AR")}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="btn-rent"
          disabled={!canRent || submitting}
        >
          {submitting
            ? "Confirmando alquiler..."
            : canRent
              ? "Confirmar alquiler"
              : "Seleccioná las fechas"}
        </button>
      </form>
    </section>
  );
};
