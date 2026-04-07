import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '../styles/StatueCanvas.css';

function BottomMist() {
    const meshRef = useRef();

    const { uniforms, vertexShader, fragmentShader } = useMemo(
        () => ({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0x03c7b3) },
            },
            vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
            fragmentShader: `
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;

            // Simple 2D noise for organic movement
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }

            void main() {
                // Vertical fade — strong at bottom, vanishes toward top
                float vertFade = smoothstep(1.0, 0.15, vUv.y);

                // Horizontal fade — fades at left/right edges
                float hFade = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);

                // Animated noise layers for organic mist movement
                float n1 = noise(vec2(vUv.x * 4.0 + uTime * 0.15, vUv.y * 3.0 - uTime * 0.08));
                float n2 = noise(vec2(vUv.x * 7.0 - uTime * 0.12, vUv.y * 5.0 + uTime * 0.06));
                float nMix = (n1 * 0.6 + n2 * 0.4);

                // Combine: vertical fade × horizontal fade × noise
                float alpha = vertFade * hFade * nMix * 0.65;

                // Teal tinted mist with subtle white highlights
                vec3 col = mix(uColor * 0.3, uColor, nMix * 0.5);
                col = mix(col, vec3(0.02, 0.06, 0.05), 0.7); // Darken toward bg color

                gl_FragColor = vec4(col, alpha);
            }
        `,
        }),
        [],
    );

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, -0.85, 0.02]}>
            <planeGeometry args={[3.6, 1.2, 1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

export default function StatueCanvas() {
    const floatRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    useEffect(() => {
        let animId;
        let t = 0;
        const tick = () => {
            t += 0.008;
            if (floatRef.current) {
                const y = Math.sin(t * 0.9) * 10;
                floatRef.current.style.transform = `translateY(${y}px)`;
            }
            animId = requestAnimationFrame(tick);
        };
        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="statue__outer">
            <div className="statue__env-glow" />

            <div className="statue__float-wrap" ref={floatRef}>
                <img
                    src="/assets/statue.png"
                    alt="ideasprint 2026 Poseidon Statue"
                    className={`statue__img${loaded ? ' statue__img--loaded' : ''}`}
                    onLoad={() => setLoaded(true)}
                    draggable={false}
                />
            </div>

            {!isMobile && (
                <div className="statue__mist-canvas">
                    <Canvas
                        camera={{ position: [0, 0, 2], fov: 50 }}
                        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
                        style={{ background: 'transparent' }}
                        dpr={[1, 1.5]}
                    >
                        <BottomMist />
                    </Canvas>
                </div>
            )}

            <div className="statue__fog" />
        </div>
    );
}
