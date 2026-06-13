import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import About from './components/sections/About';
import MediaCoverage from './components/sections/Media';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Vaastavya — Architecture & Interior Design. Award-winning studio crafting spaces across India and Africa since 2006.';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero id="home" />
        <Work id="work" />
        <About id="about" />
        <MediaCoverage id="media" />
        <Contact id="contact" />
      </main>
      <Footer />
    </>
  );
}

export default App;
