import React from "react";
import PasswordField from "../components/PasswordField";
import { Input } from "../../../shared/ui";
import { UserPlus } from "lucide-react";
import AuthCard from "../components/AuthCard";
import Footer from "../components/Footer";
import { register } from "../api/auth.api";

const initialForm = {
  rut: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [form, setForm] = React.useState(initialForm);
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState({ type: "idle", message: "" });

  React.useEffect(() => {
    setErrors(validateAll(form));
  }, [form]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const nextTouched = Object.keys(initialForm).reduce((acc, k) => {
      acc[k] = true;
      return acc;
    }, {});
    setTouched(nextTouched);

    const validation = validateAll(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setStatus({ type: "error", message: "Revisa los campos marcados." });
      return;
    }

    try {
      setStatus({ type: "loading", message: "" });

      // Llamar a la API de registro
      await register({
        rut: normalizeRut(form.rut),
        username: form.email.trim().toLowerCase(), // Email del usuario (se guarda en nombre_usuario)
        fullName: form.fullName.trim(),
        password: form.password,
      });

      setStatus({ type: "success", message: "Cuenta creada correctamente. Ya puedes iniciar sesión." });
      setForm(initialForm);
      setTouched({});
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      let errorMessage = "Ocurrió un error al crear la cuenta.";
      
      // Manejar errores específicos del servidor
      if (err?.response?.data?.error) {
        const serverError = err.response.data.error.toLowerCase();
        if (serverError.includes("email already exists")) {
          errorMessage = "El correo electrónico ya está registrado.";
        } else if (serverError.includes("rut already exists")) {
          errorMessage = "El RUT ya está registrado.";
        } else {
          errorMessage = err.response.data.error;
        }
      }
      
      setStatus({
        type: "error",
        message: errorMessage,
      });
    }
  }

  const isLoading = status.type === "loading";

  const showError = (field) => touched[field] && errors[field];
  const errId = (field) => `${field}-error`;

  return (
      <>
        <AuthCard
            title={
              <div className="flex gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-zinc-900">Crear cuenta</span>
              </div>
            }
        >
          <CardDescription className="text-base">
            Completa tus datos para acceder al sistema de gestión de uniformes
          </CardDescription>

          {status.type !== "idle" && status.type !== "loading" && (
              <div
                  className={[
                    "mt-4 rounded-xl border px-4 py-3 text-sm",
                    status.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-red-200 bg-red-50 text-red-700",
                  ].join(" ")}
              >
                {status.message}
              </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 space-y-4 flex flex-col gap-[1px]">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-700" htmlFor="rut">
                RUT
              </label>
              <Input
                  id="rut"
                  name="rut"
                  type="text"
                  placeholder="12345678-9"
                  autoComplete="off"
                  required
                  disabled={isLoading}
                  value={form.rut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("rut")}
                  aria-describedby={showError("rut") ? errId("rut") : undefined}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-600/10 disabled:opacity-70"
              />
              {showError("rut") && (
                  <p id={errId("rut")} className="text-xs text-red-600">
                    {errors.rut}
                  </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-700" htmlFor="fullName">
                Nombre completo
              </label>
              <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Juan Pérez"
                  autoComplete="name"
                  required
                  disabled={isLoading}
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("fullName")}
                  aria-describedby={showError("fullName") ? errId("fullName") : undefined}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-600/10 disabled:opacity-70"
              />
              {showError("fullName") && (
                  <p id={errId("fullName")} className="text-xs text-red-600">
                    {errors.fullName}
                  </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-700" htmlFor="email">
                Correo electrónico corporativo
              </label>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="usuario@empresa.cl"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("email")}
                  aria-describedby={showError("email") ? errId("email") : undefined}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-600/10 disabled:opacity-70"
              />
              {showError("email") && (
                  <p id={errId("email")} className="text-xs text-red-600">
                    {errors.email}
                  </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-700" htmlFor="password">
                Contraseña
              </label>
              <PasswordField
                  id="password"
                  name="password"
                  placeholder="Crea una contraseña segura"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("password")}
                  aria-describedby={showError("password") ? errId("password") : undefined}
              />
              {showError("password") && (
                  <p id={errId("password")} className="text-xs text-red-600">
                    {errors.password}
                  </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-700" htmlFor="confirmPassword">
                Confirmar contraseña
              </label>
              <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repite la contraseña"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("confirmPassword")}
                  aria-describedby={
                    showError("confirmPassword") ? errId("confirmPassword") : undefined
                  }
              />
              {showError("confirmPassword") && (
                  <p id={errId("confirmPassword")} className="text-xs text-red-600">
                    {errors.confirmPassword}
                  </p>
              )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer mt-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
            <div className={'flex gap-5 w-full justify-center text-sm mt-4'}>
              <span>¿Ya tienes una cuenta?</span>
              <a className={'text-blue-600 font-bold'} href={"/"}>Iniciar sesión</a>
            </div>
        </AuthCard>

        <Footer/>
      </>
  );
}

/* ------------------ Validaciones ------------------ */

function validateAll(form) {
  const e = {};

  if (!form.rut.trim()) e.rut = "El RUT es obligatorio.";
  else if (!isValidRut(form.rut)) e.rut = "El RUT no es válido.";

  const name = form.fullName.trim();
  if (!name) e.fullName = "El nombre es obligatorio.";
  else if (name.length < 4) e.fullName = "Escribe tu nombre completo.";

  const email = form.email.trim().toLowerCase();
  if (!email) e.email = "El correo es obligatorio.";
  else if (!isValidEmail(email)) e.email = "El correo no tiene un formato válido.";

  if (!form.password) e.password = "La contraseña es obligatoria.";
  else {
    const pwErr = passwordRules(form.password);
    if (pwErr) e.password = pwErr;
  }

  if (!form.confirmPassword) e.confirmPassword = "Confirma tu contraseña.";
  else if (form.confirmPassword !== form.password)
    e.confirmPassword = "Las contraseñas no coinciden.";

  return e;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function passwordRules(pw) {
  if (pw.length < 8) return "Debe tener al menos 8 caracteres.";
  if (!/[a-z]/.test(pw)) return "Debe incluir al menos una letra minúscula.";
  if (!/[A-Z]/.test(pw)) return "Debe incluir al menos una letra mayúscula.";
  if (!/[0-9]/.test(pw)) return "Debe incluir al menos un número.";
  return "";
}

function normalizeRut(rut) {
  return rut
      .toString()
      .trim()
      .replace(/\./g, "")
      .replace(/-/g, "")
      .toUpperCase();
}

function isValidRut(rut) {
  const r = normalizeRut(rut);
  if (!/^\d{7,8}[0-9K]$/.test(r)) return false;

  const body = r.slice(0, -1);
  const dv = r.slice(-1);

  let sum = 0;
  let mul = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }

  const mod = 11 - (sum % 11);
  const expected = mod === 11 ? "0" : mod === 10 ? "K" : String(mod);

  return expected === dv;
}

/* ------------------ Demo submit ------------------ */

async function fakeRegister(payload) {
  await new Promise((r) => setTimeout(r, 700));

  if (payload.email.includes("existe")) {
    throw new Error("Ese correo ya está registrado.");
  }
  return true;
}


function CardDescription({
                           ...
                               props
                         }) {
  return (
      <p
          data-slot="card-description"
          className={"text-muted-foreground"}
          {...props}
      />
  );
}

