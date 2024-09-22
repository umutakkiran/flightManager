import React from 'react';
import './TextStyles.css'; // Özel CSS dosyamızı import ediyoruz

function TextDisplay({ children, color }) {
    return (
        <p className="text-display" style={{ color: color || '#000000' }}>
            {children}
        </p>
    );
}

function TextHeadline({ children, color }) {
    return (
        <h1 className="text-headline" style={{ color: color || '#000000' }}>
            {children}
        </h1>
    );
}

function TextTitle({ children, color }) {
    return (
        <h2 className="text-title" style={{ color: color || '#000000' }}>
            {children}
        </h2>
    );
}

function TextBody({ children, color }) {
    return (
        <p className="text-body" style={{ color: color || '#000000' }}>
            {children}
        </p>
    );
}

function TextLabel({ children, color }) {
    return (
        <span className="text-label" style={{ color: color || '#000000', opacity:0.5 }}>
            {children}
        </span>
    );
}

export { TextDisplay, TextHeadline, TextTitle, TextBody, TextLabel };
