import { AppShell } from "../../../app/layout/AppShell";
import { Button } from "../../../shared/ui/Button";
import { formatDateTime, formatMetric } from "../../../shared/utils/format";
import { useMedicStatusHistory } from "./hooks/useMedicStatusHistory";

export function HistoryPage() {
  const {
    history,
    media,
    historyPage,
    mediaPage,
    historyTotalPages,
    mediaTotalPages,
    fromDate,
    toDate,
    isLoading,
    isAggregating,
    error,
    aggregateMessage,
    setFromDate,
    setToDate,
    setHistoryPage,
    setMediaPage,
    aggregate,
  } = useMedicStatusHistory();

  return (
    <AppShell title="Historial" showBack>
      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Filtros</h2>
            <p className="panel__subtitle">Filtra por rango de fechas (opcional).</p>
          </div>
        </header>
        <div className="filters-row">
          <label className="field">
            <span className="field__label">Desde</span>
            <input
              className="field__input"
              type="datetime-local"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Hasta</span>
            <input
              className="field__input"
              type="datetime-local"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Histórico</h2>
            <p className="panel__subtitle">Registros crudos de signos vitales.</p>
          </div>
        </header>

        {isLoading ? (
          <p className="panel__empty">Cargando...</p>
        ) : history.length === 0 ? (
          <p className="panel__empty">No hay registros en el historial.</p>
        ) : (
          <>
            <div className="data-table-wrap">
              <table className="data-table data-table--stack">
                <thead>
                  <tr>
                    <th>BPM</th>
                    <th>Estado BPM</th>
                    <th>SpO₂</th>
                    <th>Estado SpO₂</th>
                    <th>Temperatura</th>
                    <th>Estado Temp</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td data-label="BPM">{formatMetric(item.bpm)}</td>
                      <td data-label="Estado BPM">{item.estadoBpm}</td>
                      <td data-label="SpO₂">{formatMetric(item.spo2)} %</td>
                      <td data-label="Estado SpO₂">{item.estadoSpo2}</td>
                      <td data-label="Temperatura">{formatMetric(item.temperature)} °C</td>
                      <td data-label="Estado Temp">{item.estadoTemperature}</td>
                      <td data-label="Fecha">{formatDateTime(item.created)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button
                type="button"
                className="button button--outline"
                disabled={historyPage <= 1}
                onClick={() => setHistoryPage(historyPage - 1)}
              >
                Anterior
              </button>
              <span>
                Página {historyPage} de {historyTotalPages}
              </span>
              <button
                type="button"
                className="button button--outline"
                disabled={historyPage >= historyTotalPages}
                onClick={() => setHistoryPage(historyPage + 1)}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </section>

      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Promedios</h2>
            <p className="panel__subtitle">Promedios diarios almacenados.</p>
          </div>
          <Button type="button" isLoading={isAggregating} onClick={() => void aggregate()}>
            Crear promedio
          </Button>
        </header>

        {aggregateMessage && <p className="panel__success">{aggregateMessage}</p>}
        {error && <p className="login-form__error">{error}</p>}

        {isLoading ? (
          <p className="panel__empty">Cargando...</p>
        ) : media.length === 0 ? (
          <p className="panel__empty">No hay promedios registrados.</p>
        ) : (
          <>
            <div className="data-table-wrap">
              <table className="data-table data-table--stack">
                <thead>
                  <tr>
                    <th>BPM</th>
                    <th>Estado BPM</th>
                    <th>SpO₂</th>
                    <th>Estado SpO₂</th>
                    <th>Temperatura</th>
                    <th>Estado Temp</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {media.map((item) => (
                    <tr key={item.id}>
                      <td data-label="BPM">{formatMetric(item.bpm)}</td>
                      <td data-label="Estado BPM">{item.estadoBpm}</td>
                      <td data-label="SpO₂">{formatMetric(item.spo2)} %</td>
                      <td data-label="Estado SpO₂">{item.estadoSpo2}</td>
                      <td data-label="Temperatura">{formatMetric(item.temperature)} °C</td>
                      <td data-label="Estado Temp">{item.estadoTemperature}</td>
                      <td data-label="Fecha">{formatDateTime(item.created)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button
                type="button"
                className="button button--outline"
                disabled={mediaPage <= 1}
                onClick={() => setMediaPage(mediaPage - 1)}
              >
                Anterior
              </button>
              <span>
                Página {mediaPage} de {mediaTotalPages}
              </span>
              <button
                type="button"
                className="button button--outline"
                disabled={mediaPage >= mediaTotalPages}
                onClick={() => setMediaPage(mediaPage + 1)}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </section>
    </AppShell>
  );
}
