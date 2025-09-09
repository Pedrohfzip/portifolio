"use client";
import ExperienciasSection from "./components/ExperienciasSection";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProjetosSection from "./components/ProjetosSection";
import ContactForm from "./components/ContactForm";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "./store/navbarSlice";
import type { RootState } from "./store/store";
import Footer from "./components/Footer";
import SkillsSection from "./components/SkillsSection";
import MeshBackground from "./threeJS/MeshBackground";
// Definição das seções para o indicador vertical
const sections = [
  { id: "header", label: "Home" },
  { id: "next-section", label: "Experiências" },
  { id: "projeto", label: "Projetos" },
  { id: "skills", label: "Skills" },
  { id: "footer", label: "footer" },
];


export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const projetosRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.navbar.activeSection);
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    const header = headerRef.current;
    const section = sectionRef.current;
    const projetos = projetosRef.current;
    const skills = skillsRef.current;
    const footer = footerRef.current;
    if (!header || !section || !projetos || !skills || !footer) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === header && entry.isIntersecting) {
            dispatch(setActiveSection("header"));
          }
          if (entry.target === section && entry.isIntersecting) {
            dispatch(setActiveSection("next-section"));
          }
          if (entry.target === projetos && entry.isIntersecting) {
            dispatch(setActiveSection("projetos"));
          }
          if (entry.target === skills && entry.isIntersecting) {
            dispatch(setActiveSection("skills"));
          }
          if (entry.target === footer && entry.isIntersecting) {
            dispatch(setActiveSection("footer"));
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
    observer.observe(projetos);
    observer.observe(skills);
    observer.observe(footer);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <>
    <MeshBackground />
    <div
      className={`m-0 p-0 h-screen w-screen scroll-smooth ${isDesktop ? 'overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory' : ' overflow-y-auto overflow-x-hidden scroll-smooth snap-y '} `}
      style={{ position: "relative" }}
    >

      {/* Indicador vertical de seções - só aparece no desktop */}
      {isDesktop && (
        <nav
          aria-label="Indicador de seções"
          style={{
            position: "fixed",
            top: "50%",
            left: '5%',
            transform: "translateY(-50%)",
            height: "80%",
            width: "0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 50,
            background: "rgba(99, 99, 99, 0.24)",
            pointerEvents: "auto",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              aria-label={section.label}
              onClick={() => {
                const el = document.getElementById(section.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              style={{
                width: activeSection === section.id ? 30 : 14,
                height: activeSection === section.id ? 30 : 14,
                borderRadius: "50%",
                background: activeSection === section.id ? "#abababff" : "rgba(234, 234, 234, 0.15)",
                border: activeSection === section.id ? "2px solid #c9c9c9ff" : "1px solid #888",
                transition: "all 0.2s",
                margin: "0 0 0 0",
                outline: "none",
                boxShadow: activeSection === section.id ? "0 0 0 2px #fff2" : "none",
                cursor: "pointer"
              }}
            />
          ))}
        </nav>
      )}
      <Navbar />
      <Header showAltParticles={activeSection} />
      <ExperienciasSection sectionRef={sectionRef} />
      <ProjetosSection />
      <SkillsSection />
      <Footer />
    </div>
    </>
  );
}