import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/MagicBooklet.css';

function Book({ isHovered, setIsHovered, isClicked, setIsClicked, hasRevealed }) {
    const groupRef = useRef();
    const { scene } = useGLTF('/models/magic_book/scene.gltf');

    const entranceProgress = useRef(0);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        if (groupRef.current) {
            const yBob = Math.sin(t * 0.8 * Math.PI) * 0.1;
            const xRipple = Math.sin(t * 1.7 * Math.PI) * 0.05;
            const zTremor = Math.sin(t * 3.1 * Math.PI) * 0.02;

            const targetScale = isHovered ? 1.08 : 1.0;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            groupRef.current.position.lerp(new THREE.Vector3(xRipple, yBob, zTremor), 0.1);

            if (hasRevealed && entranceProgress.current < 1) {
                entranceProgress.current += delta * 1.5;
                if (entranceProgress.current > 1) entranceProgress.current = 1;
            }

            const easeOutExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            const progress = easeOutExpo(entranceProgress.current);

            const entranceBaseRotX = THREE.MathUtils.lerp(Math.PI / 2, 0, progress);
            const entranceBaseRotY = THREE.MathUtils.lerp(Math.PI, 0, progress);

            if (!isHovered) {
                if (progress === 1) {
                    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.4;
                } else {
                    groupRef.current.rotation.y = entranceBaseRotY;
                }

                groupRef.current.rotation.x = entranceBaseRotX + Math.sin(t * 0.5) * 0.1;
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
            } else {
                const targetRotY = (state.pointer.x * Math.PI) / 8;
                const targetRotX = 0.05 - (state.pointer.y * Math.PI) / 10;
                groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.08);
            }
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
            position={[0, 0, 0]}
        >
            <group rotation={[Math.PI / 2, 0, 0]}>
                <primitive object={scene} scale={[0.35, 0.35, 0.35]} />
            </group>
        </group>
    );
}

function GlowingRings() {
    const ring1Ref = useRef();
    const ring2Ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ring1Ref.current && ring2Ref.current) {
            const scale1 = 1 + Math.sin(t * 2) * 0.1;
            ring1Ref.current.scale.set(scale1, scale1, scale1);
            ring1Ref.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.2;

            const scale2 = 1.3 + Math.sin(t * 1.5 + Math.PI) * 0.15;
            ring2Ref.current.scale.set(scale2, scale2, scale2);
            ring2Ref.current.material.opacity = 0.3 + Math.sin(t * 1.5) * 0.1;
        }
    });

    return (
        <group position={[0, -1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[1.5, 0.05, 16, 100]} />
                <meshBasicMaterial color="#03C7B3" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh ref={ring2Ref}>
                <torusGeometry args={[2.0, 0.02, 16, 100]} />
                <meshBasicMaterial color="#03C7B3" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
}



const MagicBooklet = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [hasRevealed, setHasRevealed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setHasRevealed(true);
                observer.disconnect();
            }
        }, { threshold: 0.3 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="magic-book-section" id="booklet" ref={sectionRef}>

            <div className="magic-book-bg"></div>

            <div className="magic-book-content-wrapper">

                <div className={`glass-ui-container ${hasRevealed ? 'revealed' : ''}`}>
                    <div className={`glass-card ${isHovered ? 'hovered' : ''}`}>
                        <h2 className="ideasprint-title">ideasprint 2026</h2>
                        <p className="ideasprint-tagline">
                            Unlock the secrets of the future. The ultimate hackathon starts here.
                        </p>
                        <div className="glass-card-buttons">
                            <button className="booklet-btn" onClick={() => setModalOpen(true)}>
                                VIEW BOOKLET
                            </button>
                            <a href="#" className="download-btn pulse-glow" download>
                                DOWNLOAD
                            </a>
                        </div>
                    </div>
                </div>


                <div className="magic-book-canvas-container">
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                        <pointLight position={[0, -2, 0]} intensity={2} color="#03C7B3" distance={10} />

                        <Book
                            isHovered={isHovered}
                            setIsHovered={setIsHovered}
                            isClicked={isClicked}
                            setIsClicked={setIsClicked}
                            hasRevealed={hasRevealed}
                        />
                        <GlowingRings />
                        <Environment preset="city" />
                    </Canvas>
                </div>
            </div>


            {modalOpen && (
                <div className="pdf-modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setModalOpen(false)}>×</button>
                        <div className="pdf-viewer-placeholder">
                            <h3>PDF Booklet Viewer</h3>
                            <p>Here you would embed your PDF using an iframe or react-pdf.</p>
                            <a href="#" className="download-btn mt-4 inline-block">Direct Download link</a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MagicBooklet;
