import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const milestones = [
    {
        year: "2016",
        title: "Business Operations",
        content: "10 лет управления производственным бизнесом, где я выстраивал процессы, команды и техническую дисциплину.",
        side: "left"
    },
    {
        year: "2019",
        title: "Hardware & Process",
        content: "Опыт с промышленным оборудованием дал мне понимание сложных систем и переменных, которые позже перешли в IT-архитектуру.",
        side: "right"
    },
    {
        year: "2022",
        title: "AI & Automation",
        content: "Разработка AI-агентов, интеграция CRM и автоматизация рутинных задач с Make, Zapier и n8n.",
        side: "left"
    },
    {
        year: "2025",
        title: "Full-Stack AI Systems",
        content: "Проектирование и запуск цифровых продуктов. Приложений, ecommerce, IoT-интеграций и сложных backend-сервисов.",
        side: "right"
    }
];

const Journey = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline line drawing effect
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                    },
                }
            );

            // Milestones animation
            gsap.utils.toArray(".milestone").forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    x: window.innerWidth < 768 ? (i % 2 === 0 ? -30 : 30) : (i % 2 === 0 ? -100 : 100),
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="journey" ref={containerRef} className="py-32 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-8">
                        03 — The Path
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-syne font-black tracking-tighter text-grey-deep">
                        MY JOURNEY.
                    </h3>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold to-gold-dark origin-top hidden md:block"
                    />

                    <div className="space-y-24">
                        {milestones.map((ms, index) => (
                            <div
                                key={index}
                                className={`milestone relative flex items-center justify-center md:justify-between w-full ${ms.side === 'right' ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content */}
                                <div className={`w-full md:w-[45%] p-8 bg-cream border border-grey-soft rounded-2xl shadow-sm hover:border-gold/30 transition-colors duration-500`}>
                                    <span className="text-gold font-black text-4xl font-syne opacity-20 block mb-4">{ms.year}</span>
                                    <h4 className="text-2xl font-bold font-syne mb-4 uppercase tracking-tighter text-grey-deep">{ms.title}</h4>
                                    <p className="text-grey-mid font-inter leading-relaxed text-sm">
                                        {ms.content}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold z-10 border-4 border-cream hidden md:block" />

                                {/* Spacer */}
                                <div className="hidden md:block w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
