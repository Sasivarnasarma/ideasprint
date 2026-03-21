import React, { useEffect, useRef, useState } from 'react';
import StarBorder from './StarBorder.jsx';
import logoSrc from '../assets/images/logos/ideasprint-2026-logo.webp';

export default function Navbar() {
    let scrollTimeout = useRef(null);
    let isHidden = useRef(false);
    let isScrolled = useRef(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

            // Update scrolled appearance
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

            // Highlighting active section - optimized
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

        // Initial update and listeners
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
        // MOBILE BEHAVIOR BREAKPOINT: 768px
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
            // Check if cursor is in top 120px
            mouseInTopArea = e.clientY <= 120;
            updateNavbarVisibility();
        };

        const updateNavbarVisibility = () => {
            const isTourActive = document.body.dataset.tourActive === 'true';

            // High priority: Tours always hide the navbar
            if (isTourActive) {
                nav?.classList.add('navbar-hidden');
                return;
            }

            // High priority: Mobile menu open always shows the navbar
            if (isMobileMenuOpen) {
                nav?.classList.remove('navbar-hidden');
                return;
            }

            if (isMobileSize) {
                // MOBILE LOGIC: Always visible at top of hero, else appear on scroll
                if (window.scrollY < window.innerHeight * 0.8 || isScrolling) {
                    nav?.classList.remove('navbar-hidden');
                } else {
                    nav?.classList.add('navbar-hidden');
                }
            } else {
                // DESKTOP/TABLET LOGIC: Always visible at top of hero, top hover, OR while scrolling
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

            // Performance optimization: limit class updates during heavy scroll
            const now = Date.now();
            if (now - lastUpdateTime > 100) {
                updateNavbarVisibility();
                lastUpdateTime = now;
            } else {
                // Ensure it's at least shown if it was hidden
                if (nav?.classList.contains('navbar-hidden')) {
                    updateNavbarVisibility();
                }
            }

            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                updateNavbarVisibility();
            }, 1000); // 1s auto-hide timer
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScrollTrigger, { passive: true });

        // Initial state update
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

                {/* Desktop Links */}
                <div className="nav-links">
                    <a href="#about" className="nav-btn glow-hover">About</a>
                    <a href="#timeline" className="nav-btn glow-hover">Timeline</a>
                    <a href="#contact" className="nav-btn glow-hover">Contact</a>
                </div>
                <div className="nav-cta">
                    <StarBorder as="a" href="https://isportal.hackx.lk/" target="_blank" rel="noopener noreferrer" className="star-border-primary" color="#03C7B3" speed="5s">
                        SUBMIT PROPOSAL
                    </StarBorder>
                </div>

                {/* Mobile Hamburger Toggle */}
                <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-links">
                    <a href="#about" className="mobile-nav-btn" onClick={closeMobileMenu}>About</a>
                    <a href="#timeline" className="mobile-nav-btn" onClick={closeMobileMenu}>Timeline</a>
                    <a href="#contact" className="mobile-nav-btn" onClick={closeMobileMenu}>Contact</a>
                    <StarBorder as="a" href="https://isportal.hackx.lk/" target="_blank" rel="noopener noreferrer" className="star-border-primary mobile-nav-register" color="#03C7B3" speed="5s" onClick={closeMobileMenu}>
                        SUBMIT PROPOSAL
                    </StarBorder>
                </div>
            </div>
        </nav>
    );
}
