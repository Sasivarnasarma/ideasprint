export const REGISTRATION_OPEN = new Date('March 17, 2026 00:00:00');
export const REGISTRATION_CLOSE = new Date('March 24, 2026 06:00:00');
export const TEMPLATE_RELEASE = new Date('March 25, 2026 00:00:00');
export const PROPOSAL_OPEN = new Date('March 30, 2026 00:00:00');
export const PROPOSAL_CLOSE = new Date('April 24, 2026 23:59:59');

export const PORTAL_URL = 'https://isportal.hackx.lk/';
export const TEMPLATE_URL = '/assets/ideasprint-proposal-template.docx';
export const BOOKLET_URL = '/assets/ideasprint-delegate-booklet.pdf';

const WARNING_DAYS = 3;

export function getPhase(now = new Date()) {
    if (now < REGISTRATION_OPEN) return 1;
    if (now <= REGISTRATION_CLOSE) return 2;
    if (now < TEMPLATE_RELEASE) return 3;
    if (now < PROPOSAL_OPEN) return 4;
    if (now <= PROPOSAL_CLOSE) return 5;
    return 6;
}

export function getTimeRemaining(targetDate, now = new Date()) {
    const diff = targetDate - now;
    if (diff <= 0) return null;

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export function isWithinWarningWindow(closeDate, now = new Date(), days = WARNING_DAYS) {
    const warningStart = new Date(closeDate);
    warningStart.setDate(warningStart.getDate() - days);
    return now >= warningStart && now <= closeDate;
}

export const EVENTS = [
    { step: '01', date: REGISTRATION_OPEN.toISOString(), displayDate: '17th March 2026', title: 'Registration Opens', desc: 'Team registration begins. Form your squad and secure your spot in the competition.' },
    { step: '02', date: REGISTRATION_CLOSE.toISOString(), displayDate: '23rd March 2026', title: 'Registration Closes', desc: 'Final deadline to register your team. Late entries will not be accepted.' },
    { step: '03', date: PROPOSAL_OPEN.toISOString(), displayDate: '30th March 2026', title: 'Proposal Submissions Open', desc: 'Submit your innovative proposals and pitching videos following the official template and guidelines.' },
    { step: '04', date: PROPOSAL_CLOSE.toISOString(), displayDate: '23rd April 2026', title: 'Proposal Submissions Close', desc: 'All proposals and pitching videos must be finalized by this deadline. Evaluation begins immediately after.' },
    { step: '05', date: 'March 12, 2026 00:00:00', endDate: 'May 27, 2026 23:59:59', displayDate: '12th March — 27th May 2026', title: 'Workshop Series', desc: 'A series of workshops designed to help participants transform early ideas into well-developed, impactful solutions.' },
    { step: '06', date: 'May 29, 2026 00:00:00', displayDate: '29th May 2026', title: 'Finalists Announced', desc: 'The top 15 teams are revealed. Finalists advance to the live presentation round.' },
    { step: '07', date: 'June 01, 2026 00:00:00', endDate: 'June 20, 2026 23:59:59', displayDate: '01st June — 20th June 2026', title: 'Industrial Mentorship', desc: 'Shortlisted finalist teams receive industry mentorship to refine their ideas, strengthen their solutions, and elevate their final pitches.' },
    { step: '08', date: 'June 20, 2026 00:00:00', displayDate: '20th June 2026', title: 'Grand Finale', desc: 'Live presentations, prototype demos, and Q&A with the judging panel. The Top 5 teams advance to the Semi-Final stage of hackX 11.0.', venue: 'DIM | Multimedia Room' },
];
