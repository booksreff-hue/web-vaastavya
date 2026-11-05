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
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'VAASTAVYA - Architecture & Interior Design. Studio crafting spaces across India, Africa and the Middle East since 2006.';
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
