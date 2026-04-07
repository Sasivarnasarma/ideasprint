import { useState } from 'react';

const phases = [
    {
        tag: 'PHASE 01',
        title: 'Proposal Submission',
        items: [
            {
                label: 'Objective',
                text: 'Teams identify a practical real-world problem and present an innovative technology-driven solution.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Submission Format',
                text: 'Proposals must be submitted as a PDF following the provided template and guidelines.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Pitching Video',
                text: 'Each team must submit a 1–2 minute pitching video uploaded to YouTube as unlisted.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Originality',
                text: 'All ideas must be original and developed entirely by the participating team.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        tag: 'PHASE 02',
        title: 'ideasprint 2026 Finals',
        items: [
            {
                label: 'Selection',
                text: 'The top teams from the proposal evaluation stage are selected for the final round.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Venue',
                text: 'The finals are conducted physically at the University of Kelaniya.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Presentation',
                text: 'Teams deliver a 7-minute presentation followed by a 3-minute Q&A session.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                ),
            },
            {
                label: 'Language',
                text: 'All submissions and presentations must be conducted in English.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                    </svg>
                ),
            },
            {
                label: 'Progression',
                text: 'The best performing teams advance to the semi-final stage of hackX 11.0.',
                icon: (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="phase-card-icon"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                ),
            },
        ],
    },
];

export default function About() {
    const [activePhase, setActivePhase] = useState(0);

    return (
        <section id="about" className="scroll-section about-section">
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="about-split-layout">
                    <div className="about-split-title-col">
                        <h2 className="split-title">
                            What is
                            <br />
                            <span className="accent">ideasprint</span>
                            <br />
                            2026?
                        </h2>

                        <div className="about-stat-row">
                            <div className="about-stat-pill">
                                <span className="about-stat-pill__num accent">15</span>
                                <span className="about-stat-pill__lbl">Finalist Teams</span>
                            </div>
                            <div className="about-stat-pill">
                                <span className="about-stat-pill__num accent">5</span>
                                <span className="about-stat-pill__lbl">Winners</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-card">
                        <span className="about-card__corner about-card__corner--tl" />
                        <span className="about-card__corner about-card__corner--br" />

                        <span className="about-card__watermark">IS</span>

                        <div className="about-card__body">
                            <p className="about-card__tag">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                About the Event
                            </p>

                            <p className="about-card__desc">
                                ideasprint 2026 marks the opening stage of{' '}
                                <strong>hackX 11.0</strong> organized by the Industrial Management
                                Science Students' Association.
                            </p>
                            <p className="about-card__desc">
                                The competition gives undergraduates of the Department of Industrial
                                Management a platform to collaborate, explore real-world challenges,
                                and develop innovative technology-driven solutions.
                            </p>
                            <p className="about-card__desc last">
                                Through a structured journey of awareness programs and mentorship,
                                participants develop entrepreneurial thinking, problem-solving
                                abilities, and pitching skills.
                            </p>

                            <div className="about-card__footer">
                                <span className="about-card__footer-pill">hackX 11.0</span>
                                <span className="about-card__footer-pill">
                                    University of Kelaniya
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modern-event-structure">
                    <div className="text-center mb-4 section-title-glow">
                        <h2 className="section-title">
                            EVENT <span className="accent">STRUCTURE</span>
                        </h2>
                    </div>

                    <div className="feature-grid-controls mx-auto mb-5">
                        {phases.map((phase, idx) => (
                            <button
                                key={idx}
                                className={`feature-pill-btn ${activePhase === idx ? 'active' : ''}`}
                                onClick={() => setActivePhase(idx)}
                            >
                                PHASE 0{idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="feature-grid-window mx-auto">
                        <div
                            className="feature-grid-track"
                            style={{ transform: `translateX(-${activePhase * 100}%)` }}
                        >
                            {phases.map((phase, idx) => (
                                <div
                                    key={idx}
                                    className={`feature-grid-slide ${activePhase === idx ? 'active' : 'inactive'}`}
                                >
                                    <div className="text-center mb-5 feature-phase-header">
                                        <div className="feature-phase-tag">{phase.tag}</div>
                                        <h3 className="feature-phase-title">{phase.title}</h3>
                                    </div>

                                    <div
                                        className={`feature-cards-grid grid-cols-${phase.items.length}`}
                                    >
                                        {phase.items.map((item, i) => (
                                            <div key={i} className="modern-feature-card">
                                                <div className="feature-card-icon-wrapper">
                                                    {item.icon}
                                                </div>
                                                <h4 className="feature-card-label">{item.label}</h4>
                                                <p className="feature-card-text">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
