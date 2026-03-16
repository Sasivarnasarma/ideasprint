import React, { useState } from 'react';

const faqData = [
    {
        id: 'rules',
        question: "What are the team composition requirements?",
        answer: "Each team must consist of 3–5 members from the Department of Industrial Management. Teams should collaborate to identify a real-world problem and present an innovative solution."
    },
    {
        id: 'video',
        question: "Is a pitching video compulsory?",
        answer: "Yes. A 1-2 minute pitching video is compulsory for all teams. It must be uploaded to YouTube as an Unlisted video and submitted alongside the proposal. This video is crucial for the initial screening process."
    },
    {
        id: 'finals',
        question: "What is required at the ideasprint 2026 finals?",
        answer: "Teams advancing to the ideasprint 2026 finals must prepare a working prototype. The final evaluation involves a live presentation (7 minutes) followed by a 3-minute Q&A session with the judges."
    },
    {
        id: 'language',
        question: "What language must be used?",
        answer: "All competition materials, including proposals, presentations, pitching videos, and prototypes, must be prepared and delivered entirely in English."
    },
    {
        id: 'guidelines',
        question: "Are there submission guidelines or templates?",
        answer: "Yes. A formal proposal template and detailed submission guidelines will be provided to all registered teams. Adhering to the provided template is mandatory for a valid submission."
    }
];

export default function FAQ() {
    const [activeId, setActiveId] = useState(faqData[0].id);

    const activeFaq = faqData.find(faq => faq.id === activeId);

    return (
        <section id="faq" className="scroll-section faq-section-v2">
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>

                {/* Header */}
                <div className="text-center mb-5">
                    <h2 className="section-title">F A <span className="accent">Q</span></h2>
                    <p className="faq-subtitle mx-auto mt-3">
                        Everything you need to know before competing in ideasprint 2026.
                    </p>
                </div>

                {/* Dashboard-style Grid */}
                <div className="faq-dashboard-grid">

                    {/* Left Column: Question List (Tabs & Mobile Accordion) */}
                    <div className="faq-questions-list">
                        {faqData.map((faq) => (
                            <div key={faq.id} className="faq-accordion-container">
                                <div
                                    className={`faq-tab-item ${activeId === faq.id ? 'active' : ''}`}
                                    onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                                >
                                    <span className="faq-tab-text">{faq.question}</span>
                                    <span className={`faq-tab-icon ${activeId === faq.id ? 'open' : ''}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </span>
                                </div>
                                <div className={`faq-mobile-answer ${activeId === faq.id ? 'expanded' : ''}`}>
                                    <div className="faq-mobile-answer-inner">
                                        <p className="faq-answer-text">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Answer Panel (Desktop Only) */}
                    <div className="faq-answer-panel">
                        {activeFaq ? (
                            <>
                                <h3 className="faq-answer-title">{activeFaq.question}</h3>
                                <p className="faq-answer-text">
                                    {activeFaq.answer}
                                </p>
                            </>
                        ) : (
                            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <p className="faq-answer-text" style={{ opacity: 0.5 }}>Select a question to view its detailed answer.</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}
