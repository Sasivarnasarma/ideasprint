export default function LiquidGradientBG() {
    return (
        <div 
            style={{ 
                position: 'fixed', 
                inset: 0, 
                zIndex: 0, 
                pointerEvents: 'none',
                backgroundColor: '#02110e',
                overflow: 'hidden'
            }}
        >

            <div 
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(3, 199, 179, 0.08) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    animation: 'floatGlow 20s ease-in-out infinite alternate',
                    opacity: 0.6
                }}
            />
            <div 
                style={{
                    position: 'absolute',
                    bottom: '-30%',
                    right: '-20%',
                    width: '70vw',
                    height: '70vw',
                    background: 'radial-gradient(circle, rgba(18, 140, 125, 0.06) 0%, transparent 60%)',
                    filter: 'blur(120px)',
                    animation: 'floatGlow 30s ease-in-out infinite alternate-reverse',
                    opacity: 0.5
                }}
            />
            

            <div 
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.02,
                    mixBlendMode: 'overlay',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <style>
                {`
                    @keyframes floatGlow {
                        0% { transform: translate(0, 0) scale(1); }
                        100% { transform: translate(10vw, 5vh) scale(1.1); }
                    }
                `}
            </style>
        </div>
    );
}
