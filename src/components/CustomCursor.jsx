import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const lastMouse = useRef({ x: 0, y: 0 });
    const particles = useRef([]);
    const rafId = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Constants for the effect
    const MAX_PARTICLES = 30; // Slightly more for smoother tail
    const BASE_SIZE = 55; // Slightly smaller to compensate for bloom/goo
    const HOVER_SCALE = 1.4;
    const PARTICLE_LIFETIME = 25;
    const OFFSET_MAGNITUDE = 1.5; // RGB offset magnitude

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const handleResize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches && e.touches[0]) {
                mouse.current.x = e.touches[0].clientX;
                mouse.current.y = e.touches[0].clientY;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        handleResize();

        const render = () => {
            const dpr = window.devicePixelRatio || 1;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(dpr, dpr);

            // Calculate velocity for dynamic chromatic aberration
            const dx = mouse.current.x - lastMouse.current.x;
            const dy = mouse.current.y - lastMouse.current.y;
            const speed = Math.hypot(dx, dy);

            // Dynamic offset based on speed
            const offset = (speed * 0.15) + OFFSET_MAGNITUDE;

            if (speed > 1.5) {
                particles.current.push({
                    x: mouse.current.x,
                    y: mouse.current.y,
                    vx: dx * 0.15,
                    vy: dy * 0.15,
                    age: 0,
                    maxAge: PARTICLE_LIFETIME,
                    baseSize: BASE_SIZE * (isHovered ? HOVER_SCALE : 1)
                });
                lastMouse.current = { ...mouse.current };
            }

            const headSize = BASE_SIZE * (isHovered ? HOVER_SCALE : 1);

            // Chromatic Aberration Logic: Draw Red, Green, Blue layers with offsets
            ctx.globalCompositeOperation = 'screen';

            const drawLayer = (color, offsetX, offsetY) => {
                ctx.fillStyle = color;

                // Draw lead cursor
                ctx.beginPath();
                ctx.arc(mouse.current.x + offsetX, mouse.current.y + offsetY, headSize, 0, Math.PI * 2);
                ctx.fill();

                // Draw particles
                for (let i = particles.current.length - 1; i >= 0; i--) {
                    const p = particles.current[i];
                    p.age += 1 / 3; // Age slower since we call this 3 times per frame (once per layer)

                    if (color === '#FF0000') { // Only update physics on the first layer
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vx *= 0.88;
                        p.vy *= 0.88;
                    }

                    const lifePercent = 1 - (p.age / p.maxAge);
                    const size = p.baseSize * lifePercent;

                    if (p.age > p.maxAge || size <= 0.1) {
                        if (color === '#FF0000') particles.current.splice(i, 1);
                        continue;
                    }

                    ctx.beginPath();
                    ctx.arc(p.x + offsetX, p.y + offsetY, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            };

            // Calculate offset direction based on movement or default to subtle shift
            const angle = speed > 0.1 ? Math.atan2(dy, dx) : 0;
            const offX = Math.cos(angle) * offset;
            const offY = Math.sin(angle) * offset;

            // Red layer (offset back)
            drawLayer('#FF0000', -offX, -offY);
            // Green layer (offset mid)
            drawLayer('#00FF00', 0, 0);
            // Blue layer (offset forward)
            drawLayer('#0000FF', offX, offY);

            if (particles.current.length > MAX_PARTICLES) {
                particles.current.shift();
            }

            rafId.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [isHovered]);

    return (
        <>
            <div
                className="fixed inset-0 pointer-events-none z-[999999] hidden md:block"
                style={{
                    filter: 'url(#buttermax-goo)',
                    mixBlendMode: 'difference',
                    opacity: 1
                }}
            >
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="buttermax-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -18"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </>
    );
};

export default CustomCursor;