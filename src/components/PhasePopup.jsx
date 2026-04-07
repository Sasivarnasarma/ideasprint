import { useEffect, useState } from 'react';
import {
    REGISTRATION_OPEN,
    REGISTRATION_CLOSE,
    TEMPLATE_RELEASE,
    PROPOSAL_OPEN,
    PROPOSAL_CLOSE,
    PORTAL_URL,
    TEMPLATE_URL,
    EVENTS,
    getTimeRemaining,
} from '../constants/eventDates.js';
import '../styles/PhasePopup.css';

const formatDate = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const MODE_CONFIG = {
    'registration-soon': {
        badge: 'OPENING SOON',
        title: 'Team Registration',
        message: <>Registration opens on <strong>{EVENTS[0].displayDate}</strong>. Get your team ready and be first to secure your spot!</>,
        targetDate: REGISTRATION_OPEN,
        showTemplateBtn: false,
        showPortalBtn: false,
    },
    'registration-closing': {
        badge: 'CLOSING SOON',
        title: 'Registration Closing',
        message: <>Registration closes on <strong>{EVENTS[1].displayDate}</strong>. Don't miss your chance — register now!</>,
        targetDate: REGISTRATION_CLOSE,
        showTemplateBtn: false,
        showPortalBtn: true,
        portalBtnText: 'Register Now',
    },
    'template-releasing': {
        badge: 'COMING SOON',
        title: 'Proposal Template',
        message: <>The official proposal template will be released on <strong>{formatDate(TEMPLATE_RELEASE)}</strong>. Stay tuned and get ready to prepare your submission!</>,
        targetDate: TEMPLATE_RELEASE,
        showTemplateBtn: false,
        showPortalBtn: false,
    },
    'proposal-soon': {
        badge: 'OPENING SOON',
        title: 'Proposal Submissions',
        message: <>Submissions open on <strong>{EVENTS[2].displayDate}</strong>. Prepare your proposal using the official template and be ready to submit!</>,
        targetDate: PROPOSAL_OPEN,
        showTemplateBtn: true,
        showPortalBtn: false,
    },
    'proposal-closing': {
        badge: 'CLOSING SOON',
        title: 'Submissions Closing',
        message: <>Proposal submissions close on <strong>{EVENTS[3].displayDate}</strong>. Submit your proposal before the deadline!</>,
        targetDate: PROPOSAL_CLOSE,
        showTemplateBtn: true,
        showPortalBtn: true,
        portalBtnText: 'Submit Now',
    },
};

export default function PhasePopup({ isOpen, onClose, mode }) {
    const config = MODE_CONFIG[mode];
    const [timeLeft, setTimeLeft] = useState(() => config ? getTimeRemaining(config.targetDate) : null);

    useEffect(() => {
        if (!isOpen || !config) return;
        setTimeLeft(getTimeRemaining(config.targetDate));

        const timer = setInterval(() => {
            const remaining = getTimeRemaining(config.targetDate);
            if (!remaining) {
                clearInterval(timer);
                onClose();
            }
            setTimeLeft(remaining);
        }, 1000);
        return () => clearInterval(timer);
    }, [isOpen, config, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !config || !timeLeft) return null;

    const isClosing = mode.includes('closing');

    return (
        <div className="phase-popup-overlay" onClick={onClose}>
            <div className={`phase-popup ${isClosing ? 'phase-popup--warning' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="phase-popup__close" onClick={onClose} aria-label="Close">
                    ×
                </button>

                <div className="phase-popup__glow" />

                <div className="phase-popup__content">
                    <div className={`phase-popup__badge ${isClosing ? 'phase-popup__badge--warning' : ''}`}>
                        <span className="phase-popup__badge-dot" />
                        {config.badge}
                    </div>

                    <h2 className="phase-popup__title">
                        {config.title}
                    </h2>

                    <p className="phase-popup__message">
                        {config.message}
                    </p>

                    <div className="phase-popup__countdown">
                        <div className="phase-popup__time-block">
                            <span className="phase-popup__time-value">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="phase-popup__time-label">Days</span>
                        </div>
                        <span className="phase-popup__time-sep">:</span>
                        <div className="phase-popup__time-block">
                            <span className="phase-popup__time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="phase-popup__time-label">Hours</span>
                        </div>
                        <span className="phase-popup__time-sep">:</span>
                        <div className="phase-popup__time-block">
                            <span className="phase-popup__time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="phase-popup__time-label">Min</span>
                        </div>
                        <span className="phase-popup__time-sep">:</span>
                        <div className="phase-popup__time-block">
                            <span className="phase-popup__time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="phase-popup__time-label">Sec</span>
                        </div>
                    </div>

                    <div className="phase-popup__actions">
                        {config.showPortalBtn && (
                            <a
                                href={PORTAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="phase-popup__btn phase-popup__btn--primary"
                            >
                                {config.portalBtnText}
                            </a>
                        )}
                        {config.showTemplateBtn && (
                            <a
                                href={TEMPLATE_URL}
                                className="phase-popup__btn phase-popup__btn--secondary"
                                download
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Template
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
