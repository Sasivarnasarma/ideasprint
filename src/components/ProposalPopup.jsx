import React, { useEffect, useState, useCallback } from 'react';
import '../styles/ProposalPopup.css';

const SUBMISSION_DATE = new Date('March 30, 2026 00:00:00');
const PORTAL_URL = 'https://isportal.hackx.lk/';
const TEMPLATE_URL = '/assets/ideasprint-proposal-template.docx';

function getTimeRemaining() {
    const now = new Date();
    const diff = SUBMISSION_DATE - now;
    if (diff <= 0) return null;

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export function isSubmissionsOpen() {
    return new Date() >= SUBMISSION_DATE;
}

export default function ProposalPopup({ isOpen, onClose }) {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

    useEffect(() => {
        if (!isOpen) return;
        const timer = setInterval(() => {
            const remaining = getTimeRemaining();
            if (!remaining) {
                clearInterval(timer);
                // Submissions just opened — redirect
                window.open(PORTAL_URL, '_blank', 'noopener,noreferrer');
                onClose();
            }
            setTimeLeft(remaining);
        }, 1000);
        return () => clearInterval(timer);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !timeLeft) return null;

    return (
        <div className="proposal-popup-overlay" onClick={onClose}>
            <div className="proposal-popup" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="proposal-popup__close" onClick={onClose} aria-label="Close">
                    ×
                </button>

                {/* Glow accent */}
                <div className="proposal-popup__glow" />

                {/* Content */}
                <div className="proposal-popup__content">
                    <div className="proposal-popup__badge">
                        <span className="proposal-popup__badge-dot" />
                        OPENING SOON
                    </div>

                    <h2 className="proposal-popup__title">
                        Proposal Submissions
                    </h2>

                    <p className="proposal-popup__message">
                        Submissions open on <strong>30th March 2026</strong>. Prepare your proposal using the official template and be ready to submit!
                    </p>

                    {/* Countdown */}
                    <div className="proposal-popup__countdown">
                        <div className="proposal-popup__time-block">
                            <span className="proposal-popup__time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="proposal-popup__time-label">Days</span>
                        </div>
                        <span className="proposal-popup__time-sep">:</span>
                        <div className="proposal-popup__time-block">
                            <span className="proposal-popup__time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="proposal-popup__time-label">Hours</span>
                        </div>
                        <span className="proposal-popup__time-sep">:</span>
                        <div className="proposal-popup__time-block">
                            <span className="proposal-popup__time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="proposal-popup__time-label">Min</span>
                        </div>
                        <span className="proposal-popup__time-sep">:</span>
                        <div className="proposal-popup__time-block">
                            <span className="proposal-popup__time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="proposal-popup__time-label">Sec</span>
                        </div>
                    </div>

                    {/* Download Template Button */}
                    <a
                        href={TEMPLATE_URL}
                        className="proposal-popup__btn"
                        download
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Proposal Template
                    </a>
                </div>
            </div>
        </div>
    );
}
