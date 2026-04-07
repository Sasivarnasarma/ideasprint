import { useRef, useEffect, useCallback } from 'react';
import '../styles/Contact.css';
import tharinduImg from '../assets/images/contacts/tharindu.jpg';
import thiliniImg from '../assets/images/contacts/thilini.jpg';
import praveenImg from '../assets/images/contacts/praveen.jpg';
import tharushiImg from '../assets/images/contacts/tharushi.jpg';

const contacts = [
    {
        name: 'Tharindu Dhanushka',
        role: 'Chief Coordinator',
        event: 'ideasprint 2026',
        email: 'tharindu.hackx@gmail.com',
        phone: '+94762195995',
        image: tharinduImg,
    },
    {
        name: 'Thilini Bhagya',
        role: 'Chief Coordinator',
        event: 'ideasprint 2026',
        email: 'thilini.hackx@gmail.com',
        phone: '+94769476496',
        image: thiliniImg,
    },
    {
        name: 'Praveen Madawalage',
        role: 'Chief Coordinator',
        event: 'hackX 11.0',
        email: 'praveen.hackx@gmail.com',
        phone: '+94772868600',
        image: praveenImg,
    },
    {
        name: 'Tharushi Kulathunga',
        role: 'Chief Coordinator',
        event: 'hackX 11.0',
        email: 'tharushi.hackx@gmail.com',
        phone: '+94707253446',
        image: tharushiImg,
    },
];

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

function ContactCard({ contact }) {
    return (
        <div className="contact-card">
            <div className="contact-card__img-wrap">
                <img src={contact.image} alt={contact.name} className="contact-card__img" draggable="false" />
                <div className="contact-card__img-overlay" />
            </div>
            <div className="contact-card__body">
                <p className="contact-card__name">{contact.name}</p>
                <p className="contact-card__role">{contact.role}</p>
                <p className="contact-card__event">{contact.event}</p>
                <div className="contact-card__actions">
                    <a href={`mailto:${contact.email}`} className="contact-card__btn" title={contact.email} aria-label="Email">
                        <EmailIcon />
                        <span>Email</span>
                    </a>
                    <a href={`tel:${contact.phone}`} className="contact-card__btn" title={contact.phone} aria-label="Call">
                        <PhoneIcon />
                        <span>Call</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

const AUTO_SPEED = 0.6; // px per frame

export default function Contact() {
    const marqueeContacts = [...contacts, ...contacts, ...contacts];
    const carouselRef = useRef(null);
    const trackRef = useRef(null);

    const posX = useRef(0);
    const rafId = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartPos = useRef(0);

    const animate = useCallback(() => {
        if (!trackRef.current) return;

        if (!isDragging.current) {
            posX.current -= AUTO_SPEED;

            const trackWidth = trackRef.current.scrollWidth;
            const cycleWidth = trackWidth / 3;
            if (Math.abs(posX.current) >= cycleWidth) {
                posX.current += cycleWidth;
            }
        }

        trackRef.current.style.transform = `translateX(${posX.current}px)`;
        rafId.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        rafId.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId.current);
    }, [animate]);

    const startDrag = useCallback((clientX) => {
        isDragging.current = true;
        dragStartX.current = clientX;
        dragStartPos.current = posX.current;
        if (carouselRef.current) carouselRef.current.style.cursor = 'grabbing';
    }, []);

    const moveDrag = useCallback((clientX) => {
        if (!isDragging.current) return;
        const delta = clientX - dragStartX.current;
        posX.current = dragStartPos.current + delta;
    }, []);

    const endDrag = useCallback(() => {
        isDragging.current = false;
        if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        let startY = 0;

        const onTouchStart = (e) => {
            startY = e.touches[0].clientY;
            startDrag(e.touches[0].clientX);
        };

        const onTouchMove = (e) => {
            if (!isDragging.current) return;
            const dx = Math.abs(e.touches[0].clientX - dragStartX.current);
            const dy = Math.abs(e.touches[0].clientY - startY);
            if (dx > dy) e.preventDefault();
            moveDrag(e.touches[0].clientX);
        };

        const onTouchEnd = () => endDrag();

        el.addEventListener('touchstart', onTouchStart, { passive: false });
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchend', onTouchEnd);
        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchend', onTouchEnd);
        };
    }, [startDrag, moveDrag, endDrag]);

    useEffect(() => {
        const onMouseMove = (e) => moveDrag(e.clientX);
        const onMouseUp = () => endDrag();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [moveDrag, endDrag]);

    return (
        <section id="contact" className="scroll-section contact-section">
            <div className="container" style={{ position: 'relative' }}>
                <div className="contact-section__header">
                    <h2 className="section-title">
                        CONTACT <span className="accent">OUR TEAM</span>
                    </h2>
                    <p className="contact-section__desc">
                        Reach out directly to the ideasprint 2026 organizing team for any questions or support.
                    </p>
                </div>

                <div
                    className="contact-carousel"
                    ref={carouselRef}
                    style={{ paddingBottom: '2rem' }}
                    onMouseDown={(e) => startDrag(e.clientX)}
                >
                    <div
                        className="contact-carousel__track"
                        ref={trackRef}
                        style={{ willChange: 'transform' }}
                    >
                        {marqueeContacts.map((contact, i) => (
                            <div
                                key={`${contact.name}-${i}`}
                                className="contact-carousel__slide"
                                style={{
                                    flex: '0 0 auto',
                                    width: 'clamp(220px, 70vw, 280px)',
                                    marginRight: '2rem'
                                }}
                            >
                                <ContactCard contact={contact} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
