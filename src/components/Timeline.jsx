import React, { useEffect, useState, useRef } from 'react';
import '../styles/Timeline.css';
import iSymbol from '../assets/images/icon_info.png';

/* ─── Event Data ─────────────────────────────────────────── */
const EVENTS = [
    { step: '01', date: 'March 17, 2026 00:00:00', displayDate: '17 MAR 2026', title: 'Registration Opens', desc: 'Team registration begins. Form your squad and secure your spot in the competition.' },
    { step: '02', date: 'March 24, 2026 23:59:59', displayDate: '24 MAR 2026', title: 'Registration Closes', desc: 'Final deadline to register your team. Late entries will not be accepted.' },
    { step: '03', date: 'March 30, 2026 00:00:00', displayDate: '30 MAR 2026', title: 'Proposal Submissions Open', desc: 'Submit your innovative proposals and pitching videos following the official template and guidelines.' },
    { step: '04', date: 'April 24, 2026 23:59:59', displayDate: '24 APR 2026', title: 'Proposal Submissions Close', desc: 'All proposals and pitching videos must be finalized by this deadline. Evaluation begins immediately after.' },
    { step: '05', date: 'March 12, 2026 00:00:00', endDate: 'May 27, 2026 23:59:59', displayDate: '12 MAR — 27 MAY 2026', title: 'Workshop Series', desc: 'A series of workshops designed to help participants transform early ideas into well-developed, impactful solutions.' },
    { step: '06', date: 'May 29, 2026 00:00:00', displayDate: '29 MAY 2026', title: 'Finalists Announced', desc: 'The top 15 teams are revealed. Finalists advance to the live presentation round.' },
    { step: '07', date: 'June 01, 2026 00:00:00', endDate: 'June 20, 2026 23:59:59', displayDate: '01 JUN — 20 JUN 2026', title: 'Industrial Mentorship', desc: 'Shortlisted finalist teams receive industry mentorship to refine their ideas, strengthen their solutions, and elevate their final pitches.' },
    { step: '08', date: 'June 20, 2026 00:00:00', displayDate: '20 JUN 2026', title: 'Grand Finale', desc: 'Live presentations, prototype demos, and Q&A with the judging panel. The Top 5 teams advance to the Semi-Final stage of hackX 11.0.', venue: 'DIM | Multimedia Room' },
];

/**
 * Determine the status of an event based on the current date.
 * @returns {'completed' | 'ongoing' | 'upcoming'}
 */
function getEventStatus(ev, now) {
    if (ev.endDate) {
        const start = new Date(ev.date);
        const end = new Date(ev.endDate);
        if (now > end) return 'completed';
        if (now >= start && now <= end) return 'ongoing';
        return 'upcoming';
    } else {
        const evDate = new Date(ev.date);
        const nextDay = new Date(evDate);
        nextDay.setDate(evDate.getDate() + 1);

        if (now > nextDay) return 'completed';
        if (now >= evDate && now < nextDay) return 'ongoing';
        return 'upcoming';
    }
}

function Timeline() {
    const now = new Date(); // Simulates real-time

    /* ─── Tour & Animation States ─── */
    const [isPlaying, setIsPlaying] = useState(false);
    const [tourIndex, setTourIndex] = useState(-1);
    const tourTimerRef = useRef(null);
    const autoScrollRef = useRef(false);

    /* ─── Scroll Progress Variables ─── */
    const [scrollTourProgress, setScrollTourProgress] = useState(0);
    const [scrollTourIndex, setScrollTourIndex] = useState(-1);

    const wrapRef = useRef(null);
    const lastMarkerRef = useRef(null);
    const [lineHeightPx, setLineHeightPx] = useState(null);

    const stopTour = () => {
        setIsPlaying(false);
        setTourIndex(-1);
        document.body.removeAttribute('data-tour-active');
        if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    };

    // Calculate absolute line height iteratively strictly using React bounds
    useEffect(() => {
        const updateLineHeight = () => {
            if (wrapRef.current && lastMarkerRef.current) {
                const wrapTop = wrapRef.current.getBoundingClientRect().top;
                const endRect = lastMarkerRef.current.getBoundingClientRect();
                const dist = (endRect.top + (endRect.height / 2)) - wrapTop;
                if (dist > 0) setLineHeightPx(dist);
            }
        };

        let resizeObs = null;
        if (typeof ResizeObserver !== 'undefined' && wrapRef.current) {
            resizeObs = new ResizeObserver(() => updateLineHeight());
            resizeObs.observe(wrapRef.current);
            resizeObs.observe(document.body);
        }

        window.addEventListener('resize', updateLineHeight);
        updateLineHeight(); // Initial calculaton
        setTimeout(updateLineHeight, 300); // Re-fire after potential image load reflows

        return () => {
            window.removeEventListener('resize', updateLineHeight);
            if (resizeObs) resizeObs.disconnect();
        };
    }, []);

    // Manual Scroll Progress Tracking
    useEffect(() => {
        const handleScrollProgress = () => {
            if (isPlaying || !wrapRef.current) return;

            const viewportHeight = window.innerHeight;
            const midPoint = viewportHeight / 2;
            const rows = wrapRef.current.querySelectorAll('.tl-row');
            const startMarker = wrapRef.current.querySelector('.tl-endpoint-start');

            if (startMarker && rows.length > 0) {
                const endMarkerWrap = rows[rows.length - 1].querySelector('.tl-marker-wrap');
                if (endMarkerWrap) {
                    const sTop = startMarker.getBoundingClientRect().top;
                    const eTop = endMarkerWrap.getBoundingClientRect().top;
                    const totalDist = eTop - sTop;

                    let progress = (midPoint - sTop) / totalDist;
                    progress = Math.max(0, Math.min(1, progress));
                    setScrollTourProgress(progress);

                    // Find active nodes for highlighting
                    let lastActiveIndex = -1;
                    rows.forEach((row, idx) => {
                        const rTop = row.getBoundingClientRect().top;
                        if (rTop < midPoint + 50) {
                            lastActiveIndex = idx;
                        }
                    });
                    setScrollTourIndex(lastActiveIndex);
                }
            }
        };

        window.addEventListener('scroll', handleScrollProgress, { passive: true });
        handleScrollProgress();

        return () => {
            window.removeEventListener('scroll', handleScrollProgress);
        };
    }, [isPlaying]);

    // User manual scroll interrupt during tour
    useEffect(() => {
        const handleManualInteraction = () => {
            if (isPlaying && !autoScrollRef.current) {
                stopTour();
            }
        };
        window.addEventListener('wheel', handleManualInteraction, { passive: true });
        window.addEventListener('touchmove', handleManualInteraction, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleManualInteraction);
            window.removeEventListener('touchmove', handleManualInteraction);
        };
    }, [isPlaying]);

    // Tour automated playback logic
    useEffect(() => {
        if (!isPlaying) {
            stopTour();
            return;
        }

        // Initialize first step
        setTourIndex(0);
        scrollToStep(0);

        tourTimerRef.current = setInterval(() => {
            setTourIndex((prev) => {
                const next = prev + 1;
                if (next >= EVENTS.length) {
                    stopTour();
                    return -1;
                }
                scrollToStep(next);
                return next;
            });
        }, 1500);

        return () => stopTour();
    }, [isPlaying]);

    const scrollToStep = (index) => {
        autoScrollRef.current = true;
        const el = document.getElementById(`tl-step-${index}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
            autoScrollRef.current = false;
        }, 800);
    };

    const handlePlayClick = () => {
        if (isPlaying) {
            stopTour();
        } else {
            setIsPlaying(true);
            document.body.setAttribute('data-tour-active', 'true');
        }
    };

    return (
        <section id="timeline" className="scroll-section tl-vertical-section">
            <div className="tl-container">
                <div className="tl-heading">
                    <p className="tl-eyebrow">Competition Journey</p>
                    <h2 className="section-title tl-title">
                        EVENT <span className="accent">TIMELINE</span>
                    </h2>
                </div>

                <div className={`tl-vertical-wrap ${isPlaying ? 'is-playing' : ''}`} data-playing={isPlaying} ref={wrapRef}>
                    <div className="tl-center-line" style={lineHeightPx ? { height: `${lineHeightPx}px`, bottom: 'auto' } : {}}>
                        <div
                            className="tl-center-line-progress"
                            style={{
                                transform: `scaleY(${isPlaying
                                    ? (tourIndex >= 0 ? (tourIndex / (EVENTS.length - 1)) : 0)
                                    : scrollTourProgress
                                    })`,
                                opacity: isPlaying || scrollTourProgress > 0 ? 1 : 0,
                                transition: isPlaying
                                    ? 'transform 1.5s ease-in-out, opacity 0.3s ease'
                                    : 'transform 0.3s ease-out, opacity 0.3s ease'
                            }}
                        ></div>
                    </div>

                    {/* Timeline Start Marker / Glowing Pill */}
                    <div className="tl-endpoint tl-endpoint-start">
                        <div className={`tl-start-pill ${isPlaying ? 'tour-active' : 'tour-interactive'}`} onClick={handlePlayClick} title="Play Timeline Journey">
                            <img src={iSymbol} alt="Start" className="tl-start-pill-icon" />
                        </div>
                    </div>

                    {EVENTS.map((ev, i) => {
                        const status = getEventStatus(ev, now);
                        const isLeft = i % 2 === 0;
                        const isCompleted = status === 'completed';
                        const isOngoing = status === 'ongoing';

                        const isTourActive = isPlaying ? (tourIndex === i) : (scrollTourIndex === i);
                        const isTourPast = isPlaying ? (i <= tourIndex) : (i <= scrollTourIndex);

                        return (
                            <div key={ev.step} id={`tl-step-${i}`} className={`tl-row ${isLeft ? 'tl-row-left' : 'tl-row-right'}`}>
                                <div className="tl-empty-space" />

                                <div className={`tl-marker-wrap ${isCompleted ? 'completed' : isOngoing ? 'ongoing' : ''} ${isTourActive ? 'tour-active' : ''} ${isTourPast ? 'tour-past' : ''}`} ref={i === EVENTS.length - 1 ? lastMarkerRef : null}>
                                    <div className="tl-marker">{ev.step}</div>
                                </div>

                                <div className={`tl-card-wrap ${isTourActive ? 'tour-active' : ''}`}>
                                    <div className="tl-card">
                                        <div className="tl-card-date">{ev.displayDate}</div>
                                        <h3 className="tl-card-title">{ev.title}</h3>
                                        <p className="tl-card-desc">{ev.desc}</p>
                                        {ev.venue && (
                                            <div className="tl-card-venue">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2.5"
                                                    strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {ev.venue}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Timeline;
