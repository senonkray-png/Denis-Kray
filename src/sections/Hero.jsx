import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroScene from '../components/HeroScene';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const splitText = (selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const text = el.innerText.trim();
                const words = text.split(/\s+/);
                el.innerHTML = words.map(word =>
                    `<span class="word inline-block whitespace-nowrap overflow-hidden">${word.split('').map(char =>
                        `<span class="char inline-block">${char}</span>`
                    ).join('')
                    }</span>`
                ).join('&nbsp;');
            });
        };

        splitText('.hero-title span');

        const tl = gsap.timeline({ delay: 0.1 });
        tl.fromTo('.hero-eyebrow',
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
        )
            .fromTo('.word .char',
                { y: '110%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 1, stagger: 0.015, ease: 'power4.out' },
                '-=0.5'
            )
            .fromTo('.hero-divider',
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
                '-=0.4'
            )
            .fromTo('.hero-desc',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.4'
            )
            .fromTo('.hero-stats',
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
                '-=0.4'
            )
            .fromTo('.hero-3d-col',
                { opacity: 0, scale: 0.85 },
                { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
                '-=1.3'
            )
            .fromTo('.scroll-indicator',
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                '-=0.4'
            );

        return () => { };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100svh] pt-32 lg:pt-40 pb-12 flex items-start overflow-hidden bg-cream"
        >
            {/* Subtle grain overlay for depth */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.025,
                }}
            />

            {/* Main content grid */}
            <div className="container mx-auto px-8 lg:px-16 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 w-full">

                    {/* ── LEFT: Text ── */}
                    <div className="flex flex-col items-start w-full max-w-full lg:max-w-[55%] xl:max-w-[52%] 2xl:max-w-[48%]">

                        {/* Eyebrow */}
                        <div className="hero-eyebrow flex items-center gap-4 mb-10 opacity-0">
                            <div className="w-10 h-px bg-gold" />
                            <span className="text-gold font-bold tracking-[0.45em] uppercase text-[11px]">
                                AI Solutions Architect
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="hero-title font-black font-syne leading-[0.95] lg:leading-[0.9] tracking-tighter mb-8 select-none break-words"
                            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                        >
                            <span className="block mb-2 text-grey-deep">DENIS KRAY</span>
                            <span
                                className="block mb-2"
                                style={{
                                    WebkitTextStroke: '1.5px #C5A059',
                                    color: 'transparent',
                                }}
                            >
                                AI SOLUTIONS
                            </span>
                            <span className="block text-grey-deep">ARCHITECT</span>
                        </h1>

                        {/* Divider */}
                        <div
                            className="hero-divider w-full h-px bg-grey-soft mb-8 origin-left"
                            style={{ transform: 'scaleX(0)' }}
                        />

                        {/* Description */}
                        <p className="hero-desc text-grey-mid text-base lg:text-lg leading-relaxed font-medium max-w-md mb-10 opacity-0">
                            IT-инженер новой формации. Проектирую архитектуру, выстраиваю строгую бизнес-логику и реализую сложные цифровые продукты через AI-агентов.
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                            <div className="hero-stats opacity-0">
                                <p className="text-grey-mid uppercase tracking-widest text-[9px] mb-1">Focus</p>
                                <p className="font-syne font-bold text-sm lg:text-base text-grey-deep whitespace-nowrap">AI · Automation · Integration</p>
                            </div>
                            <div
                                className="hero-stats opacity-0 w-px h-8 bg-grey-soft hidden lg:block"
                            />
                            <div className="hero-stats opacity-0">
                                <p className="text-grey-mid uppercase tracking-widest text-[9px] mb-1">Stack</p>
                                <p className="font-syne font-bold text-sm lg:text-base text-grey-deep whitespace-nowrap">React · Node · Python</p>
                            </div>
                            <div
                                className="hero-stats opacity-0 w-px h-8 bg-grey-soft hidden lg:block"
                            />
                            <div className="hero-stats opacity-0">
                                <p className="text-grey-mid uppercase tracking-widest text-[9px] mb-1">Status</p>
                                <p className="font-syne font-bold text-sm lg:text-base text-gold whitespace-nowrap">Open for selective projects</p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: 3D Object ── */}
                    <div
                        className="hero-3d-col lg:w-[40%] w-full hidden lg:flex items-center justify-center lg:translate-y-[-5%] order-first lg:order-none"
                        style={{
                            maxWidth: '520px',
                            height: 'clamp(320px, 40vw, 650px)',
                            opacity: 0,
                            position: 'relative',
                        }}
                    >
                        {/* Gold ambient glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 50%, rgba(197,160,89,0.15) 0%, transparent 68%)',
                                filter: 'blur(32px)',
                            }}
                        />
                        {/* Subtle ring accent */}
                        <div
                            className="absolute pointer-events-none rounded-full border border-gold"
                            style={{
                                width: '65%',
                                aspectRatio: '1',
                                opacity: 0.08,
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                        <HeroScene />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-10 left-12 flex items-center gap-5 opacity-0">
                <div className="w-10 h-px bg-grey-soft relative overflow-hidden">
                    <motion.div
                        animate={{ x: [-40, 40] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 left-0 w-full h-full bg-gold"
                    />
                </div>
                <span className="text-[9px] uppercase tracking-[0.35em] text-grey-mid select-none">Scroll to explore</span>
            </div>

            {/* Floating info */}
            <div className="absolute bottom-10 right-12 text-right hidden lg:flex flex-col items-end gap-1">
                <p className="text-grey-mid text-[9px] uppercase tracking-widest">Available for selective projects</p>
                <p className="text-gold text-[9px] uppercase tracking-widest font-bold">© 2026</p>
            </div>
        </section>
    );
};

export default Hero;
