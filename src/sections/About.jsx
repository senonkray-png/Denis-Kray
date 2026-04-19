import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-line", {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
            });

            gsap.to(".parallax-bg", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                y: -100,
                ease: "none",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-[80vh] py-32 flex items-center overflow-hidden bg-cream"
        >
            {/* Background Decorative Element */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gold/5 -skew-x-12 translate-x-20 parallax-bg" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-12 about-line">
                            01 — About me
                        </h2>

                        <div ref={textRef} className="space-y-8">
                            <p className="text-2xl md:text-5xl lg:text-6xl font-syne font-medium leading-[1.2] lg:leading-[1.1] about-line text-grey-deep">
                                Я — <span className="text-grey-mid">AI Solutions Architect</span>, который не пишет код вручную, а проектирует и управляет комплексными цифровыми системами.
                            </p>

                            <p className="text-base md:text-xl text-grey-mid max-w-2xl about-line leading-relaxed">
                                Мой подход ускоряет разработку в 5–10 раз за счёт продуманной архитектуры, AI-агентов и строгой бизнес-логики. Приложения, интеграции и автоматизация работают надёжно, масштабируемо и без лишнего шума.
                            </p>

                            <p className="text-base md:text-xl text-grey-mid max-w-2xl about-line leading-relaxed">
                                За 10 лет управления и работы с промышленным оборудованием я научился переводить сложные бизнес-задачи в понятные технологические решения.
                            </p>

                            <div className="pt-12 about-line">
                                <a href="#contact" className="group flex items-center gap-4 text-grey-deep font-bold tracking-widest uppercase cursor-pointer">
                                    <span className="w-12 h-[1px] bg-grey-deep group-hover:w-20 transition-all duration-500" />
                                    Let's talk
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex items-center justify-center">
                        <div className="relative w-full max-w-sm aspect-square border border-grey-soft p-4 about-line overflow-hidden rounded-[2rem]">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold -translate-x-1 -translate-y-1" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold translate-x-1 translate-y-1" />

                            <div className="h-full w-full overflow-hidden relative rounded-[1.6rem]">
                                <img
                                    src="/avatar.png"
                                    alt="Denis Kray Avatar"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-cream/70 group-hover:bg-cream/50 transition-colors duration-500" />
                                <div className="relative flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
                                    <div className="text-4xl md:text-6xl font-black tracking-tight text-grey-deep opacity-90">DK</div>
                                    <p className="text-grey-mid uppercase tracking-widest text-[10px]">AI Architecture</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
