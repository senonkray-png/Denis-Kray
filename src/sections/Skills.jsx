import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    {
        name: 'AI Architecture',
        category: 'Strategy',
        description: 'Проектирование бизнес-логики и системного уровня для AI-продуктов',
        year: '2024',
    },
    {
        name: 'Full-Stack',
        category: 'Web',
        description: 'React, Node.js и Python для создания продвинутых web-сервисов',
        year: '2024',
    },
    {
        name: 'API & Integrations',
        category: 'Automation',
        description: 'Связываю CRM, платежки, сервисы доставки и облака через надёжные API',
        year: '2024',
    },
    {
        name: 'Automation',
        category: 'Ops',
        description: 'Make / Zapier / n8n и AI-агенты для автоматизации рутинных процессов',
        year: '2025',
    },
    {
        name: 'IoT & Hardware',
        category: 'Embedded',
        description: 'Веб-интерфейсы и облачные интеграции для смарт-устройств и промышленного оборудования',
        year: '2025',
    },
    {
        name: 'Cloud & DevOps',
        category: 'Infrastructure',
        description: 'Развёртывание в AWS, Vercel и DigitalOcean с правильной инфраструктурой',
        year: '2024',
    },
    {
        name: 'Payments',
        category: 'Commerce',
        description: 'Stripe, PayPal, WayForPay, LiqPay — надёжное подключение оплаты и логистики',
        year: '2025',
    },
];

const SkillRow = ({ skill, index }) => {
    const rowRef = useRef(null);

    return (
        <motion.div
            ref={rowRef}
            className="skill-row group relative border-b border-grey-soft flex items-center justify-between gap-6 py-6 md:py-7 overflow-hidden cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {/* Gold fill on hover */}
            <span
                className="absolute inset-0 bg-gold/5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out pointer-events-none"
                aria-hidden="true"
            />

            {/* Index */}
            <span className="relative text-[11px] font-inter text-grey-mid tabular-nums tracking-widest w-8 shrink-0 select-none">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Skill Name */}
            <h3 className="relative flex-1 font-syne font-black text-2xl md:text-5xl lg:text-6xl tracking-tighter text-grey-deep group-hover:text-gold transition-colors duration-400 leading-none">
                {skill.name}
            </h3>

            {/* Category pill */}
            <span className="relative hidden md:inline-flex items-center px-3 py-1 text-[10px] font-inter font-semibold tracking-[0.2em] uppercase text-grey-mid border border-grey-soft group-hover:border-gold/40 group-hover:text-gold transition-colors duration-400 shrink-0">
                {skill.category}
            </span>

            {/* Description — slides in on hover */}
            <p className="relative hidden lg:block text-sm font-inter text-grey-mid max-w-[220px] text-right leading-relaxed opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-400 shrink-0">
                {skill.description}
            </p>

            {/* Year */}
            <span className="relative hidden sm:block text-[11px] font-inter text-grey-soft group-hover:text-gold/60 transition-colors duration-400 tabular-nums tracking-widest shrink-0">
                {skill.year}
            </span>

            {/* Arrow */}
            <span className="relative text-grey-soft group-hover:text-gold transition-all duration-400 translate-x-0 group-hover:translate-x-1 text-xl leading-none select-none shrink-0">
                →
            </span>
        </motion.div>
    );
};

const Skills = () => {
    const containerRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={containerRef}
            className="py-28 md:py-36 relative overflow-hidden"
        >
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream via-grey-soft/10 to-cream pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20">
                    <div className="max-w-xl">
                        <p className="text-sm uppercase tracking-[0.4em] text-gold font-bold font-inter mb-6">
                            02 — Expertise
                        </p>
                        <h2 className="text-3xl md:text-6xl font-syne font-black tracking-tighter text-grey-deep leading-none">
                            A VERSATILE<br />
                            TECH STACK.
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <p className="text-grey-mid max-w-xs md:text-right italic font-inter text-sm leading-relaxed">
                            Архитектура, интеграции и автоматизация, выстроенные под конкретные бизнес-цели.
                        </p>
                        <div className="mt-4 md:ml-auto w-full md:w-fit flex md:justify-end">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-grey-soft font-inter">
                                {skills.length} Technologies
                            </span>
                        </div>
                    </div>
                </div>

                {/* Top border */}
                <div className="border-t border-grey-soft" />

                {/* Skill Rows */}
                <div>
                    {skills.map((skill, index) => (
                        <SkillRow key={skill.name} skill={skill} index={index} />
                    ))}
                </div>

                {/* More coming row */}
                <motion.div
                    className="group flex items-center justify-between py-6 border-t border-dashed border-grey-soft/60 opacity-50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: skills.length * 0.07 + 0.2 }}
                >
                    <span className="text-[11px] font-inter text-grey-mid tabular-nums tracking-widest w-8">
                        {String(skills.length + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-syne font-black text-2xl md:text-4xl tracking-tighter text-grey-mid translate-x-6">
                        More coming soon
                    </span>
                    <span className="text-grey-soft text-xl leading-none">+</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
