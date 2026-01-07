import React from 'react';

export default function Button({ className = '', disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={
        'inline-flex items-center justify-center rounded-xl bg-[#155DFC] cursor-pointer px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F4ED6] disabled:cursor-not-allowed disabled:opacity-60 ' +
        className
      }
    />
  );
}
