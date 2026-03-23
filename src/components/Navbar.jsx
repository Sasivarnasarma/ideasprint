import React, { useEffect, useRef, useState, useCallback } from 'react';
import StarBorder from './StarBorder.jsx';
import PhasePopup from './PhasePopup.jsx';
import logoSrc from '../assets/images/logos/ideasprint-2026-logo.webp';
import { getPhase, PORTAL_URL, BOOKLET_URL } from '../constants/eventDates.js';

export default function Navbar() {
    const isHidden = useRef(false);
    let isScrolled = useRef(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState(null);
    const handleClosePopup = useCallback(() => setPopupOpen(false), []);

    const phase = getPhase();

    const handleCtaClick = (e) => {
        if (phase === 1) {
            e.preventDefault();
            setPopupMode('registration-soon');
            setPopupOpen(true);
            closeMobileMenu();
        } else if (phase === 3) {
            e.preventDefault();
            setPopupMode('template-releasing');
            setPopupOpen(true);
            closeMobileMenu();
        } else if (phase === 4) {
            e.preventDefault();
            setPopupMode('proposal-soon');
            setPopupOpen(true);
            closeMobileMenu();
        }
    };

    const getCtaText = () => {
        if (phase <= 2) return 'REGISTER';
        if (phase <= 5) return 'SUBMIT PROPOSAL';
        return 'DELEGATE BOOKLET';
    };

    const ctaText = getCtaText();
    const ctaHref = phase === 6 ? BOOKLET_URL : PORTAL_URL;

    useEffect(() => {
        const nav = document.querySelector('.system-nav');
        const sectionIds = ['home', 'about', 'timeline', 'contact'];
        let sectionOffsets = [];
        let linkElements = [];

        const updateOffsets = () => {
            sectionOffsets = sectionIds.map(id => {
                const el = document.getElementById(id);
                return el ? { id, top: el.offsetTop } : null;
            }).filter(Boolean);
            linkElements = Array.from(document.querySelectorAll('.nav-links a, .mobile-menu-links a'));
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                if (!isScrolled.current) {
                    nav?.classList.add('scrolled');
                    isScrolled.current = true;
                }
            } else {
                if (isScrolled.current) {
                    nav?.classList.remove('scrolled');
                    isScrolled.current = false;
                }
            }

            let current = '';
            for (let i = sectionOffsets.length - 1; i >= 0; i--) {
                if (scrollY >= sectionOffsets[i].top - 250) {
                    current = sectionOffsets[i].id;
                    break;
                }
            }

            linkElements.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) link.classList.add('active');
            });
        };

        updateOffsets();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateOffsets);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateOffsets);
        };
    }, []);

    useEffect(() => {
        const nav = document.querySelector('.system-nav');
        let isMobileSize = window.innerWidth <= 768;
        let isScrolling = false;
        let scrollTimeout = null;

        const handleResize = () => {
            isMobileSize = window.innerWidth <= 768;
            updateNavbarVisibility();
        };

        let mouseInTopArea = false;
        const handleMouseMove = (e) => {
            if (isMobileSize) return;
            mouseInTopArea = e.clientY <= 120;
            updateNavbarVisibility();
        };

        const updateNavbarVisibility = () => {
            const isTourActive = document.body.dataset.tourActive === 'true';

            if (isTourActive) {
                nav?.classList.add('navbar-hidden');
                return;
            }

            if (isMobileMenuOpen) {
                nav?.classList.remove('navbar-hidden');
                return;
            }

            if (isMobileSize) {
                if (window.scrollY < window.innerHeight * 0.8 || isScrolling) {
                    nav?.classList.remove('navbar-hidden');
                } else {
                    nav?.classList.add('navbar-hidden');
                }
            } else {
                if (window.scrollY < window.innerHeight * 0.8 || window.scrollY <= 50 || mouseInTopArea || isHovered || isScrolling) {
                    nav?.classList.remove('navbar-hidden');
                } else {
                    nav?.classList.add('navbar-hidden');
                }
            }
        };

        let lastUpdateTime = 0;
        const handleScrollTrigger = () => {
            isScrolling = true;

            const now = Date.now();
            if (now - lastUpdateTime > 100) {
                updateNavbarVisibility();
                lastUpdateTime = now;
            } else {
                if (nav?.classList.contains('navbar-hidden')) {
                    updateNavbarVisibility();
                }
            }

            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                updateNavbarVisibility();
            }, 1000);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScrollTrigger, { passive: true });

        updateNavbarVisibility();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScrollTrigger);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [isHovered, isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`system-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                style={{ zIndex: 1001 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="nav-inner-content">
                    <div className="logo">
                        <img src={logoSrc} alt="ideasprint 2026" className="nav-logo-img" />
                    </div>


                    <div className="nav-links">
                        <a href="#about" className="nav-btn glow-hover">About</a>
                        <a href="#timeline" className="nav-btn glow-hover">Timeline</a>
                        <a href="#contact" className="nav-btn glow-hover">Contact</a>
                    </div>
                    <div className="nav-cta">
                        <StarBorder as="a" href={ctaHref} target="_blank" rel="noopener noreferrer" className="star-border-primary" color="#03C7B3" speed="5s" onClick={handleCtaClick}>
                            {ctaText}
                        </StarBorder>
                    </div>


                    <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                    </div>
                </div>


                <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-links">
                        <a href="#about" className="mobile-nav-btn" onClick={closeMobileMenu}>About</a>
                        <a href="#timeline" className="mobile-nav-btn" onClick={closeMobileMenu}>Timeline</a>
                        <a href="#contact" className="mobile-nav-btn" onClick={closeMobileMenu}>Contact</a>
                        <StarBorder as="a" href={ctaHref} target="_blank" rel="noopener noreferrer" className="star-border-primary mobile-nav-register" color="#03C7B3" speed="5s" onClick={handleCtaClick}>
                            {ctaText}
                        </StarBorder>
                    </div>
                </div>
            </nav>

            {/* Phase Popup */}
            {popupMode && (
                <PhasePopup isOpen={popupOpen} onClose={handleClosePopup} mode={popupMode} />
            )}
        </>
    );
}
