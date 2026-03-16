import React, { useRef } from 'react';
import gsap from 'gsap';
import '../styles/DotExpandButton.css';

export default function DotExpandButton({ text, href, type = "primary" }) {
    const btnRef = useRef(null);
    const bgRef = useRef(null);

    return (
        <a 
            href={href} 
            className={`dot-expand-btn ${type === 'primary' ? 'primary' : 'secondary'}`}
            ref={btnRef}
            onMouseEnter={() => {
                gsap.to(bgRef.current, { scale: 50, duration: 0.5, ease: 'power2.out' });
            }}
            onMouseLeave={() => {
                gsap.to(bgRef.current, { scale: 1, duration: 0.4, ease: 'power2.inOut' });
            }}
        >
            <span className="dot-expand-text">{text}</span>
            <div className="dot-container">
                <span className="dot-expand-bg" ref={bgRef}></span>
                <span className="dot-expand-indicator"></span>
            </div>
        </a>
    );
}
