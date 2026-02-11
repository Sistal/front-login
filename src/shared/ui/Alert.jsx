import React from 'react';

export default function Alert({ children, className = '' }) {
  return (
    <div
      role="alert"
      className={
        'rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 ' +
        className
      }
    >
      {children}
    </div>
  );
}
