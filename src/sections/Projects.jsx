import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "AI-Powered E-commerce",
        number: "01",
        category: "Full Stack / Commerce",
        year: "2025",
        description: "Архитектура интернет-магазина с кастомным каталогом, системой оплаты и автоматической синхронизацией CRM и склада.",
        tags: ["React", "Node.js", "Stripe", "CRM", "Automation"],
        links: { github: "#contact", demo: "https://t.me/SK_DK_LK" },
        accent: "#C5A059",
        sourceLabel: "Contact for Case Study"
    },
    {
        title: "IoT Control Suite",
        number: "02",
        category: "IoT / Hardware",
        year: "2025",
        description: "Веб-приложение для удалённого управления умными устройствами через облачные API и мосты Tuya, с мониторингом и телеграм-уведомлениями.",
        tags: ["IoT", "Tuya", "API", "Dashboard"],
        links: { github: "#contact", demo: "https://t.me/SK_DK_LK" },
        accent: "#2C2C2C"
    },
    {
        title: "Automation & Integrations",
        number: "03",
        category: "AI / Workflow",
        year: "2026",
        description: "Автоматизация бизнес-процессов: парсинг данных, генерация документов, интеграция с Bitrix24, amoCRM и сервисами доставки.",
        tags: ["n8n", "Zapier", "AI", "Telegram"],
        links: { github: "#contact", demo: "https://t.me/SK_DK_LK" },
        accent: "#C5A059",
        demoLabel: "Contact via Telegram"
    },
];

const ProjectSlide = ({ project, index }) => {
    const slideRef = useRef(null);
    const titleRef = useRef(null);
    const metaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger in the title words only when this slide is active
            gsap.from(titleRef.current?.querySelectorAll('.title-word'), {
                scrollTrigger: {
                    trigger: slideRef.current,
                    start: 'left 80%',
                    containerAnimation: window.__projectsScrollAnim,
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.out',
            });

            gsap.from(metaRef.current?.children, {
                scrollTrigger: {
                    trigger: slideRef.current,
                    start: 'left 70%',
                    containerAnimation: window.__projectsScrollAnim,
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, slideRef);

        return () => ctx.revert();
    }, []);

    const titleWords = project.title.split(' ');

    // Unique animation delay per slide so they feel independent
    const delay = index * 1.3;

    return (
        <div
            ref={slideRef}
            className="h-screen w-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        >
            {/* ── CSS keyframes (injected once per slide, scoped by index) ── */}
            <style>{`
                @keyframes orbitRing-${index} {
                    from { transform: rotate(${delay * 40}deg); }
                    to   { transform: rotate(${delay * 40 + 360}deg); }
                }
                @keyframes floatY {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-14px); }
                }
                @keyframes scanLine {
                    0%   { top: -4px; opacity: 0; }
                    5%   { opacity: 1; }
                    95%  { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes pulseDot {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50%       { opacity: 0.7; transform: scale(1.4); }
                }
                @keyframes drawLine {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
            `}</style>

            {/* ── TOP-LEFT corner bracket ── */}
            <div className="absolute top-8 left-8 pointer-events-none" aria-hidden="true">
                <div style={{ width: 56, height: 56, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 24, height: 2, background: project.accent, opacity: 0.85 }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: 24, background: project.accent, opacity: 0.85 }} />
                </div>
            </div>

            {/* ── TOP-RIGHT corner bracket ── */}
            <div className="absolute top-8 right-8 pointer-events-none" aria-hidden="true">
                <div style={{ width: 56, height: 56, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 24, height: 2, background: project.accent, opacity: 0.85 }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 2, height: 24, background: project.accent, opacity: 0.85 }} />
                </div>
            </div>

            {/* ── BOTTOM-LEFT corner bracket ── */}
            <div className="absolute bottom-8 left-8 pointer-events-none" aria-hidden="true">
                <div style={{ width: 56, height: 56, position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: 24, height: 2, background: project.accent, opacity: 0.85 }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: 2, height: 24, background: project.accent, opacity: 0.85 }} />
                </div>
            </div>

            {/* ── BOTTOM-RIGHT corner bracket ── */}
            <div className="absolute bottom-8 right-8 pointer-events-none" aria-hidden="true">
                <div style={{ width: 56, height: 56, position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 2, background: project.accent, opacity: 0.85 }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 2, height: 24, background: project.accent, opacity: 0.85 }} />
                </div>
            </div>

            {/* ── Orbiting ring (top-right area) ── */}
            <div
                className="absolute pointer-events-none"
                aria-hidden="true"
                style={{ top: '12%', right: '6%', width: 110, height: 110 }}
            >
                {/* Outer ring */}
                <div style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%',
                    border: `1.5px solid ${project.accent}90`,
                    position: 'absolute',
                }} />
                {/* Orbiting dot */}
                <div style={{
                    width: '100%', height: '100%',
                    position: 'absolute',
                    animation: `orbitRing-${index} 8s linear infinite`,
                    animationDelay: `${-delay * 2}s`,
                }}>
                    <div style={{
                        width: 8, height: 8,
                        borderRadius: '50%',
                        background: project.accent,
                        opacity: 1,
                        position: 'absolute',
                        top: -4, left: '50%',
                        marginLeft: -4,
                        boxShadow: `0 0 8px ${project.accent}`,
                    }} />
                </div>
                {/* Inner static ring */}
                <div style={{
                    width: '62%', height: '62%',
                    borderRadius: '50%',
                    border: `1px dashed ${project.accent}70`,
                    position: 'absolute',
                    top: '19%', left: '19%',
                }} />
                {/* Center crosshair */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <div style={{ width: 12, height: 1.5, background: project.accent, opacity: 0.7, marginBottom: 4 }} />
                    <div style={{ width: 1.5, height: 12, background: project.accent, opacity: 0.7, margin: '0 auto' }} />
                </div>
            </div>

            {/* ── Bottom-left floating plus marks ── */}
            {[
                { x: '6%', y: '72%', size: 14, dur: 3.8, del: 0 },
                { x: '3%', y: '55%', size: 9, dur: 5.1, del: 1.2 },
                { x: '11%', y: '82%', size: 11, dur: 4.3, del: 0.6 },
            ].map((p, i) => (
                <div
                    key={i}
                    className="absolute pointer-events-none"
                    aria-hidden="true"
                    style={{
                        left: p.x, top: p.y,
                        animation: `floatY ${p.dur}s ease-in-out infinite`,
                        animationDelay: `${p.del + delay * 0.4}s`,
                    }}
                >
                    <div style={{ position: 'relative', width: p.size, height: p.size }}>
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1.5, background: project.accent, opacity: 0.65 }} />
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1.5, background: project.accent, opacity: 0.65 }} />
                    </div>
                </div>
            ))}

            {/* ── Slow sweeping scan line ── */}
            <div
                className="absolute inset-x-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    height: 1,
                    background: `linear-gradient(to right, transparent, ${project.accent}BB, transparent)`,
                    animation: `scanLine 7s ease-in-out infinite`,
                    animationDelay: `${delay * 0.8}s`,
                }}
            />

            {/* ── Dot grid — top left strip ── */}
            <div
                className="absolute top-16 left-16 pointer-events-none"
                aria-hidden="true"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}
            >
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: 2, height: 2,
                            borderRadius: '50%',
                            background: project.accent,
                            animation: `pulseDot 3s ease-in-out infinite`,
                            animationDelay: `${(i * 0.15 + delay * 0.3) % 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Giant background number */}
            <span
                className="absolute right-0 bottom-0 font-syne font-black leading-none select-none pointer-events-none"
                style={{
                    fontSize: 'clamp(120px, 25vw, 380px)',
                    opacity: 0.07,
                    color: project.accent,
                    transform: 'translate(5%, 10%)',
                }}
                aria-hidden="true"
            >
                {project.number}
            </span>

            {/* Thin vertical accent line */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}40, transparent)` }}
            />

            <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-24 items-center relative z-10">

                {/* LEFT — Typographic title block */}
                <div className="min-w-0">
                    {/* Category + number */}
                    <div className="flex items-center gap-4 mb-10">
                        <span
                            className="text-[10px] uppercase tracking-[0.4em] font-inter font-bold"
                            style={{ color: project.accent }}
                        >
                            {project.category}
                        </span>
                        <div className="h-px flex-1 max-w-[60px] bg-grey-soft" />
                        <span className="text-[10px] font-inter text-grey-mid tracking-widest tabular-nums">
                            {project.number} / 0{projects.length}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        ref={titleRef}
                        className="font-syne font-black uppercase tracking-tighter leading-none text-grey-deep break-words min-w-0"
                        style={{ fontSize: 'clamp(30px, 6.5vw, 88px)' }}
                    >
                        {titleWords.map((word, i) => (
                            <span key={i} className="title-word block overflow-hidden">
                                <span className="block">{word}</span>
                            </span>
                        ))}
                    </h3>

                    {/* Tag row */}
                    <div className="flex flex-wrap gap-2 mt-10">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 border text-[9px] uppercase font-inter font-bold tracking-[0.25em] text-grey-mid transition-colors"
                                style={{ borderColor: 'var(--color-grey-soft)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Meta / description */}
                <div
                    ref={metaRef}
                    className="min-w-0 lg:max-w-xs space-y-8 lg:border-l lg:border-grey-soft lg:pl-12"
                >
                    {/* Year */}
                    <div className="hidden sm:block">
                        <p className="text-[9px] uppercase tracking-[0.3em] font-inter text-grey-mid mb-1">Year</p>
                        <p className="font-syne font-black text-3xl text-grey-deep">{project.year}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] font-inter text-grey-mid mb-3">About</p>
                        <p className="font-inter text-grey-mid text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-3 pt-2">
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 font-syne font-bold uppercase tracking-widest text-xs text-grey-deep hover:text-gold transition-colors duration-300"
                            >
                                <span
                                    className="w-8 h-8 flex items-center justify-center border border-grey-soft group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300"
                                >
                                    <ArrowUpRight size={14} />
                                </span>
                                {project.demoLabel || "View Demo"}
                            </a>
                        )}
                        <a
                            href={project.links.github}
                            target={project.links.github.startsWith('#') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 font-syne font-bold uppercase tracking-widest text-xs text-grey-deep hover:text-gold transition-colors duration-300"
                        >
                            <span
                                className="w-8 h-8 flex items-center justify-center border border-grey-soft group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300"
                            >
                                <Github size={14} />
                            </span>
                            {project.sourceLabel || "Source Code"}
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-10 left-8 md:left-16 flex items-center gap-4">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className="h-[1px] transition-all duration-300"
                        style={{
                            width: i === index ? 40 : 16,
                            background: i === index ? project.accent : 'var(--color-grey-soft)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const pin = gsap.fromTo(
                sectionRef.current,
                { translateX: 0 },
                {
                    translateX: `-${(projects.length - 1) * 100}vw`,
                    ease: 'none',
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top top',
                        end: `${(projects.length - 1) * 1000} top`,
                        scrub: 0.6,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            window.__projectsScrollAnim = self;
                        },
                    },
                }
            );
            return () => pin.kill();
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" className="overflow-hidden bg-cream pt-28">
            {/* Section header visible above the pinned scroll */}
            <div className="container mx-auto px-6 pt-20 pb-0">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm uppercase tracking-[0.4em] text-gold font-bold font-inter mb-4">
                            03 — Work
                        </p>
                        <h2 className="font-syne font-black text-4xl md:text-5xl tracking-tighter text-grey-deep">
                            SELECTED<br />PROJECTS.
                        </h2>
                    </div>
                    <p className="hidden md:block text-grey-mid text-sm font-inter italic max-w-[200px] text-right">
                        Scroll to explore each project →
                    </p>
                </div>
                <div className="mt-8 border-t border-grey-soft" />
            </div>

            <div ref={triggerRef}>
                <div
                    ref={sectionRef}
                    className="h-screen flex flex-nowrap overflow-hidden"
                    style={{ width: `${projects.length * 100}vw` }}
                >
                    {projects.map((project, index) => (
                        <ProjectSlide key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
