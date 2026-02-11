import React from 'react';

export default function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={
        'placeholder:text-[14px] text-[14px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 ' +
        className
      }
    />
  );
}
