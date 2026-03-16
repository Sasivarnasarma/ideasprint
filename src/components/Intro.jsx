import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ShinyText from './ShinyText.jsx';

export default function Intro({ onComplete }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }
        });

        tl.fromTo(textRef.current, {
            opacity: 0,
            scale: 1.5 // Start massively zoomed IN
        }, {
            opacity: 1,
            scale: 1.0, // Zoom out to normal size smoothly
            duration: 1.2, // Faster entry
            ease: 'expo.out' // Clean, no-jiggle deceleration
        })
        .to(textRef.current, {
            opacity: 0,
            scale: 1.5, // Zoom aggressively back IN to exit
            duration: 0.8, // Faster exit
            ease: 'expo.inOut' // Cinematic exit
        }, "+=0.8") // hold slightly shorter before exiting
        .to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut'
        }, "<0.1");

        return () => {
            document.body.style.overflow = '';
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="intro-container-new">
            <div ref={textRef} style={{ opacity: 0 }}>
                <ShinyText
                  text="INSPIRE INNOVATION"
                  speed={3}
                  delay={0}
                  color="#FBFFFE"
                  shineColor="#03C7B3"
                  spread={100}
                  direction="left"
                  yoyo={true}
                  pauseOnHover={false}
                  disabled={false}
                  className="intro-shiny-text"
                />
            </div>
        </div>
    );
}
