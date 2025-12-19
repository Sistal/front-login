import React from "react";

export default function PasswordField({
                                          name = "password",
                                          placeholder = "Ingresa tu contraseña",
                                          autoComplete = "current-password",
                                          required,
                                          disabled,
                                          className = "",
                                      }) {
    const [show, setShow] = React.useState(false);

    return (
        <div className="relative">
            <input
                name={name}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                className={[
                    "placeholder:text-[14px] text-[14px]",
                    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pr-12 text-sm text-zinc-900",
                    "outline-none placeholder:text-zinc-400",
                    "focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-600/10",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                    className,
                ].join(" ")}
            />

            <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 cursor-pointer"
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                tabIndex={-1}
            >
                {show ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    );
}

function EyeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M3 3l18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M10.6 10.6A2.8 2.8 0 0 0 12 15a3 3 0 0 0 3-3c0-.5-.1-1-.4-1.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M7.2 7.2C4.6 9 3 12 3 12s3.5 7 9 7c1.5 0 2.9-.3 4.2-.8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M9.9 5.2C10.6 5.1 11.3 5 12 5c6 0 9.5 7 9.5 7s-1.2 2.4-3.5 4.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
