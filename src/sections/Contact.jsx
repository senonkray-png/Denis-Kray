import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ACCESS_KEY = '89c22f15-1c82-4340-bb88-05be70743532';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        const data = new FormData();
        data.append("access_key", ACCESS_KEY);
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("message", formData.message);
        data.append("subject", "New Portfolio Contact Message");
        data.append("from_name", "Portfolio Connect");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });

            const result = await response.json();

            if (result.success) {
                console.log('SUCCESS!', result);
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                if (form.current) form.current.reset();
            } else {
                console.error('FAILED...', result);
                setStatus('error');
            }
        } catch (err) {
            console.error('Network Error:', err);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    const socials = [
        { iconSrc: "/icon-telegram.png", href: "https://t.me/SK_DK_LK", name: "Telegram", alt: "Telegram" },
        { iconSrc: "/icon-gmail.png", href: "mailto:senonkray@gmail.com", name: "Email", alt: "Email" },
    ];

    return (
        <section id="contact" className="py-32 relative bg-grey-soft/40">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2">
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-8">
                            04 — Connect
                        </h2>
                        <h3
                            className="font-syne font-black tracking-tighter mb-12 uppercase leading-[1.02] md:leading-[0.96] text-grey-deep max-w-full sm:max-w-[36rem] break-normal whitespace-normal"
                            style={{ fontSize: 'clamp(2.8rem, 5vw, 6.2rem)', overflowWrap: 'normal', wordBreak: 'normal' }}
                        >
                            AI Архитектура и Автоматизация под ключ.
                        </h3>

                        <div className="flex flex-wrap gap-8 mt-12">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    whileHover={{ y: -5 }}
                                    className="flex items-center justify-center p-4 bg-cream border border-grey-soft rounded-2xl transition-all duration-300 shadow-sm"
                                >
                                    <img src={social.iconSrc} alt={social.alt} className="w-6 h-6 object-contain" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="title" value="Contact Form Message" />
                            <input type="hidden" name="time" value={new Date().toLocaleString()} />

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-grey-mid">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Your Name"
                                    className="w-full bg-cream border border-grey-soft p-6 rounded-2xl focus:outline-none focus:border-gold transition-colors font-medium text-grey-deep"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-grey-mid">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="hello@world.com"
                                    className="w-full bg-cream border border-grey-soft p-6 rounded-2xl focus:outline-none focus:border-gold transition-colors font-medium text-grey-deep"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-grey-mid">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-cream border border-grey-soft p-6 rounded-2xl focus:outline-none focus:border-gold transition-colors font-medium resize-none text-grey-deep"
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <div className="relative">
                                <motion.button
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className={`w-full ${isSubmitting ? 'bg-grey-mid' : 'bg-gold'} text-white font-black uppercase tracking-[0.2em] py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-gold-dark transition-all duration-500 shadow-lg disabled:cursor-not-allowed`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    {!isSubmitting && <Send size={18} />}
                                </motion.button>

                                <AnimatePresence mode="wait">
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-16 left-0 right-0 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2 text-sm font-medium"
                                        >
                                            <CheckCircle size={18} />
                                            Message sent successfully! I'll get back to you soon.
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-16 left-0 right-0 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium"
                                        >
                                            <AlertCircle size={18} />
                                            Oops! Something went wrong. Please try again or email me directly.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

