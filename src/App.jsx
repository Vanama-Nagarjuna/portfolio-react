import { useEffect, useRef, useState } from "react";
import { useScroll, useOwner } from "./hooks";
import { palettes, applyPalette } from "./theme";
import Palettes from "./components/Palettes";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";

const ids = ["home", "about", "experience", "skills", "projects", "ach", "contact"];

export default function App() {
  const { progress, active } = useScroll(ids);
  const { owner: canEdit } = useOwner();
  const glow = useRef(null);
  // Link ki #loader add chesthe loading screen 6 seconds chupistundi
  const [boot, setBoot] = useState(location.hash === "#loader");
  useEffect(() => {
    if (!boot) return;
    const t = setTimeout(() => setBoot(false), 6000);
    return () => clearTimeout(t);
  }, [boot]);
  const [light, setLight] = useState(false);
  const [pal, setPal] = useState(() => {
    try { return +localStorage.getItem("pal") || 0; } catch { return 0; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
    applyPalette(palettes[pal], light);
  }, [light, pal]);

  const pickPalette = (i) => {
    setPal(i);
    try { localStorage.setItem("pal", i); } catch { /* ignore */ }
  };

  useEffect(() => {
    const move = (e) => {
      glow.current.style.left = e.clientX + "px";
      glow.current.style.top = e.clientY + "px";
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);

  if (boot) return <Loader />;

  return (
    <>
      <Background />
      <div id="glow" ref={glow} />
      <div id="bar" style={{ width: progress + "%" }} />
      <Navbar active={active} light={light} onToggle={() => setLight(!light)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <a id="top" href="#home" className={progress > 8 ? "show" : ""} title="Back to top">↑</a>
      {canEdit && <Palettes index={pal} onPick={pickPalette} />}
    </>
  );
}
