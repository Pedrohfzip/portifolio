"use client";
import ExperienciasSection from "./components/ExperienciasSection";
import Header from "./components/Header";
import { useEffect, useState, useRef } from "react";


export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showAltParticles, setActiveSection] = useState<string>("header");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const header = headerRef.current;
    const section = sectionRef.current;
    if (!header || !section) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === header && entry.isIntersecting) {
            setActiveSection("header");
          }
          if (entry.target === section && entry.isIntersecting) {
            setActiveSection("experiencias");
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );
    observer.observe(header);
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <div
      className={`m-0 p-0 h-screen w-screen scroll-smooth ${isDesktop ? 'overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory' : ''} `}
    >
      <nav className="fixed w-full z-50  backdrop-blur-md flex justify-center items-center h-14">
        <ul className="flex space-x-4 text-white font-semibold text-lg">
          <li><a href="#header">Sobre</a></li>
          <li><a href="#next-section">Experiências</a></li>
          <li><a href="#projeto">Projetos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
      <Header showAltParticles={showAltParticles} />
      <ExperienciasSection showAltParticles={showAltParticles} sectionRef={sectionRef} />
    </div>
  );
}