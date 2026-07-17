import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-layout">
      <section className="auth-card">
        <header className="auth-card__header">
          <div className="auth-card__logo">FS</div>
          <h1 className="auth-card__title">Crear cuenta</h1>
          <p className="auth-card__subtitle">
            Regístrate para acceder al monitoreo médico
          </p>
        </header>

        <RegisterForm onSuccess={() => navigate("/", { replace: true })} />

        <p className="auth-card__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </div>
  );
}
