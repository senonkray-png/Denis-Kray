import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-cream border-t border-grey-soft">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <p className="text-2xl font-black font-syne tracking-tighter text-grey-deep">
                            DENIS KRAY<span className="text-gold">.</span>
                        </p>
                        <p className="text-[10px] text-grey-mid uppercase tracking-widest mt-2 overflow-hidden">
                            © {currentYear} — AI Architect & Automation Expert
                        </p>
                    </div>

                    <div className="flex gap-12">
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase tracking-widest font-black text-grey-mid">Navigation</h4>
                            <nav className="flex flex-col gap-2">
                                <a href="#about" className="text-xs font-bold uppercase hover:text-gold transition-colors text-grey-deep">About</a>
                                <a href="#skills" className="text-xs font-bold uppercase hover:text-gold transition-colors text-grey-deep">Skills</a>
                                <a href="#projects" className="text-xs font-bold uppercase hover:text-gold transition-colors text-grey-deep">Projects</a>
                                <a href="#journey" className="text-xs font-bold uppercase hover:text-gold transition-colors text-grey-deep">Journey</a>
                            </nav>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase tracking-widest font-black text-grey-mid">Contact</h4>
                            <nav className="flex flex-col gap-2">
                                <a href="https://t.me/SK_DK_LK" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase hover:text-gold transition-colors text-grey-deep">Telegram</a>
                                <a href="mailto:senonkray@gmail.com" className="text-xs font-bold uppercase hover:text-gold transition-colors text-grey-deep">Email</a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-grey-soft/50 flex justify-between items-center">
                    <div className="text-[10px] text-grey-mid uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        Exploring the New Frontiers
                    </div>
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ y: -5 }}
                        className="text-xs font-bold uppercase tracking-widest py-2 px-4 bg-cream border border-grey-soft rounded-lg hover:border-gold/50 text-grey-deep shadow-sm"
                    >
                        Back to top
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
