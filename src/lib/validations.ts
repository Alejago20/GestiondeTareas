import type { UserErrors } from "../context/types";

export function validateRegister(
  username: string,
  email: string,
  password: string
): UserErrors {
  const errors: UserErrors = {};

  if (!username.trim()) errors.username = "El nombre es obligatorio";

  if (!email.trim()) {
    errors.email = "El correo es obligatorio";
  } else if (
    !/^[\w._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/i.test(email)
  ) {
    errors.email = "Solo se permiten correos @gmail.com, @hotmail.com, @outlook.com o @yahoo.com";
  }

  if (!password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < 6) {
    errors.password = "Mínimo 6 caracteres";
  }

  return errors;
}
