import { useState, type FormEvent } from "react";
import { Button } from "../../../../shared/ui/Button";
import { TextField } from "../../../../shared/ui/TextField";
import { useLogin } from "../hooks/useLogin";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { submit, isLoading, error, fieldErrors } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await submit({ username, password });
    if (ok) onSuccess?.();
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Usuario"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        errors={fieldErrors.Username ?? fieldErrors.username}
        placeholder="Tu usuario"
        required
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errors={fieldErrors.Password ?? fieldErrors.password}
        placeholder="Tu contraseña"
        required
      />

      {error && <p className="login-form__error">{error}</p>}

      <Button type="submit" isLoading={isLoading}>
        Iniciar sesión
      </Button>
    </form>
  );
}
