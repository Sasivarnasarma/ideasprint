import React, { useState, useCallback } from 'react';
import StatueCanvas from './StatueCanvas.jsx';
import ProposalPopup, { isSubmissionsOpen } from './ProposalPopup.jsx';
import heroLogo from '../assets/images/logos/ideasprint-2026-logo.webp';
import '../styles/Hero.css';

export default function Hero({ visible }) {
    const [popupOpen, setPopupOpen] = useState(false);
    const handleClosePopup = useCallback(() => setPopupOpen(false), []);

    const handleProposalClick = (e) => {
        if (!isSubmissionsOpen()) {
            e.preventDefault();
            setPopupOpen(true);
        }
        // After March 30: default <a> behavior navigates to portal
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
                                <a
                                    href="https://isportal.hackx.lk/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hero__btn hero__btn--primary"
                                    onClick={handleProposalClick}
                                >
                                    Submit Proposal
                                </a>
                                <a
                                    href="/assets/ideasprint-proposal-template.docx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hero__btn hero__btn--secondary"
                                >
                                    Proposal Template
                                </a>
                                <a
                                    href="/assets/ideasprint-delegate-booklet.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hero__btn hero__btn--secondary"
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

            {/* Proposal Popup */}
            <ProposalPopup isOpen={popupOpen} onClose={handleClosePopup} />
        </section>
    );
}
