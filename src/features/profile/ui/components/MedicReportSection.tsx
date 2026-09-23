import { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { useSendMedicReport } from "../hooks/useSendMedicReport";

export function MedicReportSection() {
  const { send, isSending, error, result } = useSendMedicReport();
  const [enviarFamiliares, setEnviarFamiliares] = useState(false);

  async function handleSend() {
    const confirmed = window.confirm(
      enviarFamiliares
        ? "¿Enviar el informe histórico a tus familiares registrados?"
        : "¿Enviar el informe histórico a tu correo?",
    );
    if (!confirmed) return;
    await send(enviarFamiliares);
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2 className="panel__title">Informe médico</h2>
          <p className="panel__subtitle">
            Envía por correo el histórico de promedios mensuales y estados diagnosticados.
          </p>
        </div>
      </header>

      <label className="medic-report__option">
        <input
          type="checkbox"
          checked={enviarFamiliares}
          onChange={(e) => setEnviarFamiliares(e.target.checked)}
        />
        <span>Enviar a mis familiares (si no, se envía a mi correo)</span>
      </label>

      {error && <p className="login-form__error">{error}</p>}
      {result && result.correosEnviados === 0 && (
        <p className="login-form__error">
          No se envió ningún correo. Con el dominio de prueba de Resend solo llega al correo
          de la cuenta Resend. Verifica el dominio o usa ese mismo correo en tu perfil.
        </p>
      )}
      {result && result.correosEnviados > 0 && (
        <p className="panel__success">
          Informe enviado: {result.correosEnviados} correo(s), {result.mesesIncluidos} mes(es)
          {result.correosOmitidos > 0 ? `, ${result.correosOmitidos} omitido(s)` : ""}.
        </p>
      )}

      <Button type="button" isLoading={isSending} onClick={() => void handleSend()}>
        Enviar informe por correo
      </Button>
    </section>
  );
}
