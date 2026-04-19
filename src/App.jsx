import React, { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-dark text-white selection:bg-blue-500 selection:text-white">
      <CustomCursor />
      <Navbar />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
