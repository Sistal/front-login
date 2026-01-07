import React from "react";

export function QuestionIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 18h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path
                d="M9.5 9a2.5 2.5 0 1 1 4 2c-.8.6-1.5 1.1-1.5 2v.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

export function MailIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-zinc-500" aria-hidden="true">
            <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    );
}

export function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-zinc-500" aria-hidden="true">
            <path
                d="M6 3h4l2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2v4c0 1-1 2-2 2-10 0-18-8-18-18 0-1 1-2 2-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ShieldIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}