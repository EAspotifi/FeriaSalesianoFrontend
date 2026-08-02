import { useState, type FormEvent } from "react";
import { Button } from "../../../../shared/ui/Button";
import { TextField } from "../../../../shared/ui/TextField";
import { useRegister } from "../hooks/useRegister";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { submit, isLoading, error, fieldErrors } = useRegister();
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = await submit({
      nombre,
      username,
      correo,
      password,
      birth: birth || null,
    });
    if (ok) onSuccess?.();
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Nombre"
        name="nombre"
        autoComplete="name"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        errors={fieldErrors.Nombre ?? fieldErrors.nombre}
        placeholder="Tu nombre"
        required
      />
      <TextField
        label="Usuario"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        errors={fieldErrors.Username ?? fieldErrors.username}
        placeholder="Elige un usuario"
        required
      />
      <TextField
        label="Correo"
        name="correo"
        type="email"
        autoComplete="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        errors={fieldErrors.Correo ?? fieldErrors.correo}
        placeholder="tucorreo@ejemplo.com"
        required
      />
      <TextField
        label="Fecha de nacimiento"
        name="birth"
        type="date"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        errors={fieldErrors.Birth ?? fieldErrors.birth}
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errors={fieldErrors.Password ?? fieldErrors.password}
        placeholder="Mínimo 6 caracteres"
        required
      />

      {error && <p className="login-form__error">{error}</p>}

      <Button type="submit" isLoading={isLoading}>
        Crear cuenta
      </Button>
    </form>
  );
}
