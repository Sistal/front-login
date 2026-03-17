import React, { useEffect, useState } from "react";
import AuthCard from "../components/AuthCard";
import PasswordField from "../components/PasswordField";
import { Button, Input } from "../../../shared/ui";
import { login as loginApi } from "../api/auth.api";
import { saveToken, saveUser } from "../../../shared/lib/storage";
import { ENV } from "../../../config/env";
import { QuestionIcon, MailIcon, PhoneIcon, ShieldIcon } from "../components/Icons";

const initialForm = {
    nombre_usuario: "", // RUT o correo
    password: "",
};

export default function LoginPage() {
    const [form, setForm] = useState(initialForm);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: "idle", message: "" });

    const isLoading = status.type === "loading";

    useEffect(() => {
        setErrors(validateLogin(form));
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

        setTouched({ nombre_usuario: true, password: true });

        const validation = validateLogin(form);
        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            setStatus({ type: "error", message: "Revisa los campos marcados." });
            return;
        }

        try {
            setStatus({ type: "loading", message: "" });

            const response = await loginApi({
                nombre_usuario: form.nombre_usuario.trim(),
                password: form.password,
            });

            // Guardar token y datos del usuario
            saveToken(response.token);
            saveUser(response.user);

            setStatus({ type: "success", message: "Ingreso correcto. Redirigiendo..." });

            // Redirigir al front-funcionario
            const redirectUrl = `${ENV.VITE_FUNCIONARIO_URL}` || 'http://localhost:5174';
            console.log('Redirigiendo a:', redirectUrl);
            
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        } catch (err) {
            setStatus({
                type: "error",
                message: err?.message || "Error al iniciar sesión",
            });
        }
    }

    const showError = (field) => touched[field] && errors[field];
    const errId = (field) => `${field}-error`;

    return (
        <div className="w-full space-y-6 ">
            <AuthCard
                title={
                    <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-xl text-blue-700">
                            <ShieldIcon />
                        </div>
                        <span className="text-sm font-semibold text-zinc-900">Iniciar sesión</span>
                    </div>
                }
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm "
            >
                <p className="mt-4 text-sm text-zinc-600">
                    Accede al sistema para gestionar tus solicitudes de uniforme
                </p>

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

                <form onSubmit={onSubmit} className="mt-5 space-y-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-zinc-700" htmlFor="nombre_usuario">
                            RUT o correo electrónico
                        </label>

                        <Input
                            id="nombre_usuario"
                            name="nombre_usuario"
                            type="text"
                            placeholder="Ingresa tu RUT o correo"
                            autoComplete="username"
                            required
                            disabled={isLoading}
                            value={form.nombre_usuario}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!showError("nombre_usuario")}
                            aria-describedby={showError("nombre_usuario") ? errId("nombre_usuario") : undefined}
                            className={[
                                "mt-2 w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400",
                                "focus:bg-white focus:ring-4 focus:ring-blue-600/10 disabled:opacity-70",
                                showError("nombre_usuario")
                                    ? "border-red-300 focus:border-red-300"
                                    : "border-zinc-200 focus:border-blue-300",
                            ].join(" ")}
                        />

                        {showError("nombre_usuario") ? (
                            <p id={errId("nombre_usuario")} className="text-xs text-red-600">
                                {errors.nombre_usuario}
                            </p>
                        ) : (
                            <p className="mt-2 text-xs text-zinc-500">Ejemplo: 18456789-2 o usuario@empresa.cl</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-zinc-700" htmlFor="password">
                            Contraseña
                        </label>

                        <PasswordField
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            autoComplete="current-password"
                            required
                            disabled={isLoading}
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!showError("password")}
                            aria-describedby={showError("password") ? errId("password") : undefined}
                            className={showError("password") ? "border-red-300 focus:border-red-300" : ""}
                        />

                        {showError("password") && (
                            <p id={errId("password")} className="text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-5">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? "Iniciando sesión…" : "Iniciar sesión"}
                        </Button>

                        <div className="text-center">
                            <a
                                className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer "
                                href={"/forgot-password"}
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>
                </form>

                <div className="flex gap-5 w-full justify-center text-sm">
                    <span>¿No tienes una cuenta?</span>
                    <a className="text-blue-600 font-bold" href={"/register"}>
                        Regístrate Aquí
                    </a>
                </div>
            </AuthCard>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        <QuestionIcon />
                    </div>

                    <div className="min-w-0 flex flex-col gap-2">
                        <h6 className="text-sm font-semibold text-zinc-900">¿Problemas para acceder?</h6>
                        <p className="mt-1 text-xs text-zinc-600">
                            Contacta al área de soporte o recursos humanos para asistencia
                        </p>

                        <div className="mt-3 space-y-2 text-xs text-zinc-700">
                            <div className="flex items-center gap-2">
                                <MailIcon />
                                <span className="truncate">soporte.sistal@empresa.cl</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneIcon />
                                <span>+56 2 2345 6789 (Anexo 4521)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-2 text-center text-xs text-zinc-500">
                <div>© 2025 SISTAL — Sistema de Gestión de Uniformes</div>
                <div className="mt-1 text-zinc-400">Todos los derechos reservados</div>
            </div>
        </div>
    );
}

function validateLogin(form) {
    const e = {};
    const nombre_usuario = (form.nombre_usuario || "").trim();

    if (!nombre_usuario) {
        e.nombre_usuario = "Ingresa tu nombre de usuario.";
    } else {
        if (!isValidEmail(nombre_usuario) && !isValidRut(nombre_usuario)) {
            e.nombre_usuario = "Ingresa un correo o RUT válido.";
        }
    }

    if (!form.password) e.password = "Ingresa tu contraseña.";

    return e;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}


function normalizeRut(rut) {
    return rut.toString().trim().replace(/\./g, "").replace(/-/g, "").toUpperCase();
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
