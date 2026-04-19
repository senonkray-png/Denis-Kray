import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Journey', href: '#journey' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6',
                isScrolled ? 'bg-cream/80 backdrop-blur-md py-4 border-b border-grey-soft' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-black font-syne tracking-tighter text-grey-deep"
                >
                    DENIS KRAY<span className="text-gold">.</span>
                </motion.a>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-widest text-grey-deep"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-6 py-2 bg-gold text-white font-bold text-sm rounded-full hover:bg-gold-dark transition-all duration-300 shadow-md"
                    >
                        HIRE ME
                    </motion.a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-grey-deep"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cream border-b border-grey-soft overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col p-8 space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-black uppercase tracking-tighter text-grey-deep hover:text-gold transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a href="#contact" className="w-full py-5 bg-gold text-white font-bold rounded-2xl mt-4 text-center text-lg shadow-lg active:scale-[0.98] transition-transform" onClick={() => setIsMobileMenuOpen(false)}>
                                HIRE ME
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
