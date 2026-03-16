import React, { useState, useEffect, useRef } from 'react';

import Intro from './components/Intro.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Timeline from './components/Timeline.jsx';
import Contact from './components/Contact.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import LiquidGradientBG from './components/LiquidGradientBG.jsx';
import DotGrid from './components/DotGrid.jsx';
import Particles from './components/Particles.jsx';

// ─── TOGGLE: Set to true when contact images are ready ───
const SHOW_CONTACT_SECTION = true;

export default function App() {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        if (!introComplete) return;

        // Intro is complete, allow scrolling
        // Removed intersection observer animations to fix layout gap issues
        
        return () => {

        };
    }, [introComplete]);

    return (
        <>
            {/* Background layers (fixed, always visible) */}
            <div id="global-site-bg"></div>
            <LiquidGradientBG />
            
            <Particles
                particleColors={['#03C7B3', '#1B5B4D', '#D1DBD8']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={true}
                disableRotation={false}
            />

            <div className="global-dotgrid-wrapper">
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#1B5B4D"
                    activeColor="#03C7B3"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            {/* Cinematic intro */}
            {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

            {/* Main site */}
            <main id="app">
                <Navbar />
                <Hero visible={introComplete} />
                <About />
                <Timeline />
                {SHOW_CONTACT_SECTION && <Contact />}
                <FAQ />
                <Footer />
            </main>
        </>
    );
}
