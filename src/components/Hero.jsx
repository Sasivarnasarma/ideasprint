import { useState, useCallback, useEffect } from 'react';
import StatueCanvas from './StatueCanvas.jsx';
import PhasePopup from './PhasePopup.jsx';
import heroLogo from '../assets/images/logos/ideasprint-2026-logo.webp';
import {
    getPhase,
    isWithinWarningWindow,
    REGISTRATION_CLOSE,
    PROPOSAL_CLOSE,
    PRESENTATION_OPEN,
    PRESENTATION_CLOSE,
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

    // Show presentation button only 3 days before it opens or during open period
    const now = new Date();
    const presWarningStart = new Date(PRESENTATION_OPEN);
    presWarningStart.setDate(presWarningStart.getDate() - 3);
    const showPresentation = now >= presWarningStart && phase <= 7;

    useEffect(() => {
        if (phase === 2 && isWithinWarningWindow(REGISTRATION_CLOSE)) {
            const key = 'ideasprint_reg_closing_shown';
            if (!sessionStorage.getItem(key)) {
                setPopupMode('registration-closing');
                setPopupOpen(true);
                sessionStorage.setItem(key, 'true');
            }
        } else if (phase === 5 && isWithinWarningWindow(PROPOSAL_CLOSE)) {
            const key = 'ideasprint_prop_closing_shown';
            if (!sessionStorage.getItem(key)) {
                setPopupMode('proposal-closing');
                setPopupOpen(true);
                sessionStorage.setItem(key, 'true');
            }
        } else if (phase === 7 && isWithinWarningWindow(PRESENTATION_CLOSE)) {
            const key = 'ideasprint_pres_closing_shown';
            if (!sessionStorage.getItem(key)) {
                setPopupMode('presentation-closing');
                setPopupOpen(true);
                sessionStorage.setItem(key, 'true');
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

    const handlePresentationClick = (e) => {
        if (phase === 6) {
            e.preventDefault();
            setPopupMode('presentation-soon');
            setPopupOpen(true);
        }
    };

    const handleTemplateClick = (e) => {
        if (phase === 3) {
            e.preventDefault();
            setPopupMode('template-releasing');
            setPopupOpen(true);
        } else if (phase >= 4 && phase <= 5) {
            setTimeout(() => {
                setPopupMode('pitching-reminder');
                setPopupOpen(true);
            }, 500);
        }
    };

    const handleTemplateDownload = () => {
        setPopupMode('pitching-reminder');
        setPopupOpen(true);
    };

    return (
        <section
            id="home"
            className={`scroll-section hero-section${visible ? ' hero-section--visible' : ''}`}
        >
            <div className="hero__glow" />

            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="hero__panel">
                    <span className="hero__corner hero__corner--tl" />
                    <span className="hero__corner hero__corner--tr" />
                    <span className="hero__corner hero__corner--bl" />
                    <span className="hero__corner hero__corner--br" />

                    <div className="hero__content">
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
                                The Intra-Departmental Ideathon organized by the Industrial
                                Management Science Students' Association. Collaborate, explore
                                real-world challenges, and develop innovative technology-driven
                                solutions.
                            </p>

                            <div className="hero__buttons">
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

                                {phase >= 3 && phase <= 5 && (
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

                                {phase >= 3 && phase <= 5 && (
                                    <a
                                        href={TEMPLATE_URL}
                                        className="hero__btn hero__btn--secondary"
                                        onClick={handleTemplateClick}
                                        download={phase >= 4 ? true : undefined}
                                    >
                                        Proposal Template
                                    </a>
                                )}

                                {showPresentation && (phase === 6 || phase === 7) && (
                                    <a
                                        href={PORTAL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hero__btn hero__btn--primary"
                                        onClick={handlePresentationClick}
                                    >
                                        Submit Presentation
                                    </a>
                                )}

                                <a
                                    href={BOOKLET_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hero__btn ${(phase === 8 || (phase === 6 && !showPresentation)) ? 'hero__btn--primary' : 'hero__btn--secondary'}`}
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

                        <div className="hero__right">
                            <StatueCanvas />
                        </div>
                    </div>
                </div>
            </div>

            {popupMode && (
                <PhasePopup
                    isOpen={popupOpen}
                    onClose={handleClosePopup}
                    mode={popupMode}
                    onTemplateDownload={handleTemplateDownload}
                />
            )}
        </section>
    );
}
