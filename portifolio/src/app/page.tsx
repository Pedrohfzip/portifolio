"use client";
import ParticlesBackground from "./ParticlesBackground";
import dynamic from "next/dynamic";
// Componente alternativo para a próxima sessão
const ParticlesBackgroundAlt = dynamic(() => import("./ParticlesBackgroundAlt"), { ssr: false, loading: () => null });
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiJavascript, SiReact, SiNodedotjs, } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";

// Hook para efeito de digitação
function useTypewriter(text: string, speed = 40) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bgClass, setBgClass] = useState("bg-header");
  const [showAltParticles, setShowAltParticles] = useState(false);
  const text = "Desenvolvo soluções eficientes, escaláveis e inovadoras, com foco em qualidade e experiência do usuário. Sempre em evolução, aprendendo e me adaptando às novas tecnologias.";
  const typedText = useTypewriter(text, 30); // 30ms por caractere

  useEffect(() => {
    const header = headerRef.current;
    const section = sectionRef.current;
    if (!header || !section) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === header && entry.isIntersecting) {
            setBgClass("bg-header");
            setShowAltParticles(false);
          }
          if (entry.target === section && entry.isIntersecting) {
            setBgClass("bg-section");
            setShowAltParticles(true);
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

  const [isDesktop, setIsDesktop] = useState(true);

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
      className={`m-0 p-0 h-screen w-screen scroll-smooth ${bgClass} ${isDesktop ? 'overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory' : ''} `}
    >
      <header
        ref={headerRef}
        className="w-screen h-screen flex flex-col align-center snap-start"
        id="header"
      >
        {!showAltParticles && <ParticlesBackground />}
        <div className="w-screen h-screen flex flex-col items-center justify-around relative z-9 pt-10">
          <div className="flex flex-col items-center space-y-4 text-white-700 z-11">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/perfil.png"
                alt="Avatar"
                width={350}
                height={350}
                className="m-0 p-0 bg-transparent rounded-full object-contain z-20"
              />
            </motion.div>
            <motion.h4
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="m-0 p-0 font-extrabold text-2xl"
              style={{ fontSize: "30px" }}
            >
              Olá, meu nome é Pedro!
            </motion.h4>
            <motion.h5
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="m-0 p-0 font-medium text-lg"
              style={{ fontSize: "20px" }}
            >
              Sou desenvolvedor web.
            </motion.h5>

            {/* Efeito de digitação */}
            <motion.p
              className="m-0 p-0 pt-2"
              style={{ fontSize: "10px", maxWidth: "400px", textAlign: "center" }}
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </motion.p>
            {/* Ícones das tecnologias com animação */}
            <motion.div
              className="flex flex-row items-center justify-center space-x-6 pt-4 text-3xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.25 }
                }
              }}
            >
              <motion.span
                title="JavaScript"
                className="text-yellow-400"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SiJavascript />
              </motion.span>
              <motion.span
                title="React.js"
                className="text-cyan-400"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <SiReact />
              </motion.span>
              <motion.span
                title="Node.js"
                className="text-green-600"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <SiNodedotjs />
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center pb-6">
          <a
            href="#next-section"
            aria-label="Ir para a próxima sessão"
            className="flex arrow-group  arrow-icon z-11"
          >
              <span className="arrow-circle">
              <IoIosArrowDown className="arrow-icon"/>
            </span>
          </a>
        </div>
      </header>
      <section
        ref={sectionRef}
        id="next-section"
        className="w-screen h-screen flex items-center justify-center text-white snap-start relative"
      >
        {showAltParticles && <ParticlesBackgroundAlt />}
        <h2 className="text-4xl font-bold relative z-10">Próxima Sessão</h2>
      </section>
    </div>
  );
}
