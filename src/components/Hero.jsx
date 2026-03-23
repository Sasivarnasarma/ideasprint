import React, { useState, useCallback, useEffect } from 'react';
import StatueCanvas from './StatueCanvas.jsx';
import PhasePopup from './PhasePopup.jsx';
import heroLogo from '../assets/images/logos/ideasprint-2026-logo.webp';
import {
    getPhase,
    isWithinWarningWindow,
    REGISTRATION_CLOSE,
    PROPOSAL_CLOSE,
    PORTAL_URL,
    TEMPLATE_URL,
    BOOKLET_URL,
} from '../constants/eventDates.js';
import '../styles/Hero.css';

export default function Hero({ visible }) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState(null);
    const handleClosePopup = useCallback(() => setPopupOpen(false), []);

    const phase = getPhase();

    useEffect(() => {
        const sessionKey = phase === 2
            ? 'ideasprint_reg_closing_shown'
            : 'ideasprint_prop_closing_shown';

        if (phase === 2 && isWithinWarningWindow(REGISTRATION_CLOSE)) {
            if (!sessionStorage.getItem(sessionKey)) {
                setPopupMode('registration-closing');
                setPopupOpen(true);
                sessionStorage.setItem(sessionKey, 'true');
            }
        } else if (phase === 5 && isWithinWarningWindow(PROPOSAL_CLOSE)) {
            if (!sessionStorage.getItem(sessionKey)) {
                setPopupMode('proposal-closing');
                setPopupOpen(true);
                sessionStorage.setItem(sessionKey, 'true');
            }
        }
    }, [phase]);

    const handlePrimaryClick = (e) => {
        if (phase === 1) {
            e.preventDefault();
            setPopupMode('registration-soon');
            setPopupOpen(true);
        } else if (phase === 3) {
            e.preventDefault();
            setPopupMode('template-releasing');
            setPopupOpen(true);
        } else if (phase === 4) {
            e.preventDefault();
            setPopupMode('proposal-soon');
            setPopupOpen(true);
        }
    };

    const handleTemplateClick = (e) => {
        if (phase === 3) {
            e.preventDefault();
            setPopupMode('template-releasing');
            setPopupOpen(true);
        }
    };

    return (
        <section
            id="home"
            className={`scroll-section hero-section${visible ? ' hero-section--visible' : ''}`}
        >
            {/* Radial glow behind panel */}
            <div className="hero__glow" />

            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* ═══ Hero Glass Panel ═══ */}
                <div className="hero__panel">
                    {/* HUD Corner Accents */}
                    <span className="hero__corner hero__corner--tl" />
                    <span className="hero__corner hero__corner--tr" />
                    <span className="hero__corner hero__corner--bl" />
                    <span className="hero__corner hero__corner--br" />

                    {/* Two-column layout */}
                    <div className="hero__content">

                        {/* ── LEFT: Text stack ── */}
                        <div className="hero__left">
                            <div className="hero__badge">
                                <span className="hero__badge-dot" />
                                INSPIRE INNOVATION
                            </div>

                            <h1 className="sr-only">ideasprint 2026</h1>
                            <div className="hero__logo-wrapper">
                                <img
                                    src={heroLogo}
                                    alt="ideasprint 2026 Logo"
                                    className="hero__logo"
                                    draggable={false}
                                />
                            </div>

                            <p className="hero__desc">
                                The Intra-Departmental Ideathon organized by the Industrial Management
                                Science Students' Association. Collaborate, explore real-world challenges,
                                and develop innovative technology-driven solutions.
                            </p>

                            <div className="hero__buttons">
                                {/* Phase 1 & 2: Register button */}
                                {(phase === 1 || phase === 2) && (
                                    <a
                                        href={PORTAL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hero__btn hero__btn--primary"
                                        onClick={handlePrimaryClick}
                                    >
                                        Register
                                    </a>
                                )}

                                {/* Phase 3, 4 & 5: Submit Proposal button */}
                                {(phase >= 3 && phase <= 5) && (
                                    <a
                                        href={PORTAL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hero__btn hero__btn--primary"
                                        onClick={handlePrimaryClick}
                                    >
                                        Submit Proposal
                                    </a>
                                )}

                                {/* Phase 3, 4 & 5: Proposal Template button */}
                                {(phase >= 3 && phase <= 5) && (
                                    <a
                                        href={TEMPLATE_URL}
                                        className="hero__btn hero__btn--secondary"
                                        onClick={handleTemplateClick}
                                        download={phase >= 4 ? true : undefined}
                                    >
                                        Proposal Template
                                    </a>
                                )}

                                {/* Delegate Booklet */}
                                <a
                                    href={BOOKLET_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hero__btn ${phase === 6 ? 'hero__btn--primary' : 'hero__btn--secondary'}`}
                                >
                                    Delegate Booklet
                                </a>
                            </div>

                            <div className="hero-scroll-indicator">
                                <span className="hero-scroll-arrow"></span>
                                <span className="hero-scroll-arrow"></span>
                                <span className="hero-scroll-arrow"></span>
                            </div>
                        </div>

                        {/* ── RIGHT: Statue ── */}
                        <div className="hero__right">
                            <StatueCanvas />
                        </div>
                    </div>
                </div>
            </div>

            {/* Phase Popup */}
            {popupMode && (
                <PhasePopup isOpen={popupOpen} onClose={handleClosePopup} mode={popupMode} />
            )}
        </section>
    );
}
