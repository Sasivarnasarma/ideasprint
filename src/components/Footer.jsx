import React, { useRef } from 'react';
import '../styles/Footer.css';
import logoSrc from '../assets/images/logos/ideasprint-2026-logo.webp';
import deptLogos from '../assets/images/logos/department-logos.webp';
import hackxLogo from '../assets/images/logos/hackx-logo.webp';

export default function Footer() {
    const footerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        footerRef.current.style.setProperty('--mouse-x', `${x}px`);
        footerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="site-footer" ref={footerRef} onMouseMove={handleMouseMove}>
            {/* Spotlight glow effect reacting to cursor */}
            <div className="footer-spotlight"></div>

            <div className="container">
                <div className="footer-grid">
                    {/* Column 1: Brand & Logos */}
                    <div className="footer-col brand-col">
                        <img src={logoSrc} alt="ideasprint 2026" className="footer-main-logo" />
                        <p className="footer-desc">
                            The Intra-Departmental Ideathon organised by the Industrial Management Science Students' Association.
                            Collaborate, explore real-world challenges, and develop innovative technology-driven solutions.
                            Premier event of the Department of Industrial Management, University of Kelaniya.
                        </p>
                        <img src={deptLogos} alt="Department Logos" className="footer-dept-logos" />
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col links-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-heading-underline"></div>
                        <ul className="footer-links">
                            <li><a href="#home"><span className="link-arrow">&gt;</span> Home</a></li>
                            <li><a href="#about"><span className="link-arrow">&gt;</span> About</a></li>
                            <li><a href="#timeline"><span className="link-arrow">&gt;</span> Timeline</a></li>
                            <li><a href="#contact"><span className="link-arrow">&gt;</span> Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: hackX 11.0 & Connect With Us */}
                    <div className="footer-col social-col">
                        <div className="hackx-footer-wrap">
                            <img src={hackxLogo} alt="hackX 11.0 Logo" className="footer-hackx-logo" />
                        </div>

                        <h4 className="footer-heading">Connect With Us</h4>
                        <div className="footer-heading-underline"></div>
                        <div className="social-icons">
                            <a href="https://facebook.com/imhackx" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="https://instagram.com/hackx_uok" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://youtube.com/@hackX_UoK" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container footer-bottom-flex">
                    <p className="footer-copyright-left">
                        Organized by the Industrial Management Science Students' Association
                    </p>
                    <p className="footer-copyright-right">
                        &copy; ideasprint 2026. All rights reserved.
                    </p>
                </div>

                {/* Scroll to top button */}
                <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </button>
            </div>
        </footer>
    );
}
