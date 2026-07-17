import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-layout">
      <section className="auth-card">
        <header className="auth-card__header">
          <div className="auth-card__logo">FS</div>
          <h1 className="auth-card__title">Feria Salesiano</h1>
          <p className="auth-card__subtitle">
            Monitoreo médico · Ingresa para continuar
          </p>
        </header>

        <LoginForm onSuccess={() => navigate("/", { replace: true })} />

        <p className="auth-card__footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </div>
  );
}
