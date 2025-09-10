"use client";
import MeshBackground from "../threeJS/MeshBackground";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { useEffect, useRef, forwardRef, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

const Header = forwardRef<HTMLDivElement, { showAltParticles: string }>(
  function Header({ }, ref) {
    const dispatch = useDispatch();
    const text = "Tenho 23 anos e curto desenvolver soluções práticas e inovadoras, sempre pensando na qualidade do código e na experiência do usuário.";
    const typedText = useTypewriter(text, 30);
    const [imgSize, setImgSize] = useState(400);
    const inViewRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(inViewRef, { once: false, amount: 0.7 });

    // Atualiza o estado global do navbar quando a sessão está visível
    useEffect(() => {
      if (isInView) {
        dispatch(setActiveSection("header"));
      }
    }, [isInView, dispatch]);

    useEffect(() => {
      function handleResize() {
        const w = window.innerWidth;
        if (w > 1200) setImgSize(400);
        else if (w > 900) setImgSize(350);
        else if (w > 600) setImgSize(350);
        else setImgSize(300);
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Detecta se é mobile
    const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 768 : true;
    return (
      <header
        ref={ref}
        className="w-screen h-screen max-h-screen flex flex-col align-center snap-center bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
        id="header"
        style={{ paddingTop: '56px' }}
      >
        {/* Título discreto só no mobile */}
        <motion.div ref={inViewRef} className="w-screen h-screen flex flex-col items-center justify-center relative z-9 ">
          <div className="flex flex-col items-center space-y-2 z-11 text-[var(--foreground)] dark:text-[var(--foreground)]">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {!isDesktop && (
                <div className="w-full flex justify-center">
                  <span className="block text-sm mb-2 text-center text-[var(--foreground)] dark:text-[var(--foreground)] opacity-70">Sobre Mim</span>
                </div>
              )}
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                style={{ display: "inline-block" }}
              >
                <Image
                  src="/perfil.png"
                  alt="Avatar"
                  width={imgSize}
                  height={imgSize}
                  className="m-0 p-0 bg-transparent rounded-full object-contain z-20"
                  style={{ minWidth: '400px' }}
                />
              </motion.div>
              <motion.div>
                <motion.h4
                  initial={{ x: 200, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="m-0 p-0 font-extrabold text-center text-2xl text-[var(--foreground)] dark:text-[var(--foreground)]"
                  style={{ fontSize: "28px" }}
                  >
                    Olá, meu nome é Pedro!
                  </motion.h4>
                  <motion.h5
                    initial={{ x: -200, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="m-0 p-0 font-medium text-center text-lg text-[var(--foreground)] dark:text-[var(--foreground)]"
                    style={{ fontSize: "18px" }}
                  >
                    Sou desenvolvedor web.
                </motion.h5>
                <motion.p
                  className="relative text-center mt-1 mb-1 p-1 rounded-2xl shadow-lg max-w-xs text-[var(--foreground)] dark:text-[var(--foreground)] bg-[var(--background)] dark:bg-[var(--background)]"
                  style={{ fontSize: "12px", minWidth: "100px" }}
                  initial={{ opacity: 1, x: 0 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span className={isDesktop ? `block text-base` : `block text-base`}>{typedText}<span className="animate-pulse">|</span></motion.span>
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-row items-center justify-center space-x-4 pt-2 text-2xl"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.25 }
                }
              }}
            >
              <motion.a
                href="https://github.com/Pedrohfzip"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="text-[var(--foreground)] dark:text-[var(--foreground)] hover:text-blue-400"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/pedro-h-fagundes"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-[var(--foreground)] dark:text-[var(--foreground)] hover:text-blue-400"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="mailto:pedrohenriquezip@gmail.com"
                title="Email"
                className="text-[var(--foreground)] dark:text-[var(--foreground)] hover:text-blue-400"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <FaEnvelope />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </header>
    );
  }
);

export default Header;
