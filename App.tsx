import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-red selection:text-white overflow-x-hidden">
      <div className="bg-noise"></div>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Portfolio />
        <Process />
        <Services />
        <Testimonials />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;