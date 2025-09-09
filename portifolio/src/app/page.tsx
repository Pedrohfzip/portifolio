"use client";
import ExperienciasSection from "./components/ExperienciasSection";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProjetosSection from "./components/ProjetosSection";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "./store/navbarSlice";
import type { RootState } from "./store/store";


export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.navbar.activeSection);
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    const header = headerRef.current;
    const section = sectionRef.current;
    if (!header || !section) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === header && entry.isIntersecting) {
            dispatch(setActiveSection("header"));
          }
          if (entry.target === section && entry.isIntersecting) {
            dispatch(setActiveSection("experiencias"));
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
      console.log(activeSection);
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
    <div
      className={`m-0 p-0 h-screen w-screen scroll-smooth ${isDesktop ? 'overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory' : ''} `}
    >
  <Navbar />
    <Header showAltParticles={activeSection} />
    <ExperienciasSection sectionRef={sectionRef} />
    <ProjetosSection /> 
    </div>
  );
}