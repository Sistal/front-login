import React from 'react';

export default function AuthCard({ title, children, className = '' }) {
    return (
        <section
            className={[
                'w-full rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ',
                className,
            ].join(' ')}
        >
            {title ? (
                <header className="mb-4">
                    {typeof title === 'string' ? (
                        <h2 className="m-0 text-lg font-semibold text-slate-900">{title}</h2>
                    ) : (
                        <div>{title}</div>
                    )}
                </header>
            ) : null}

            <div className="grid gap-[4px]">{children}</div>
        </section>
    );
}
