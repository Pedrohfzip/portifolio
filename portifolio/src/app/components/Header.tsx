"use client";
import MeshBackground from "../threeJS/MeshBackground";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { useEffect, useRef, forwardRef, useState } from "react";
import { SiJavascript, SiReact, SiNodedotjs } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";

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
  function Header({ showAltParticles }, ref) {
    const dispatch = useDispatch();
    const text = "Tenho 23 anos e curto desenvolver soluções práticas e inovadoras, sempre pensando na qualidade e na experiência de quem usa. Estou em constante evolução, aprendendo e me adaptando às novas tecnologias.";
    const typedText = useTypewriter(text, 30);
    const [imgSize, setImgSize] = useState(350);
    const localRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(localRef, { once: false });

    // Atualiza o estado global do navbar quando a sessão está visível
    useEffect(() => {
      if (isInView) {
        dispatch(setActiveSection("header"));
      }
    }, [isInView, dispatch]);

    useEffect(() => {
      function handleResize() {
        const w = window.innerWidth;
        if (w > 1200) setImgSize(350);
        else if (w > 900) setImgSize(280);
        else if (w > 600) setImgSize(200);
        else setImgSize(120);
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <header
        ref={ref}
        className="w-screen h-screen max-h-screen flex flex-col align-center snap-center"
        id="header"
        style={{ paddingTop: '56px' }}
      >
        {showAltParticles && <MeshBackground />}
        <div ref={localRef} className="w-screen h-screen flex flex-col items-center justify-center relative z-9 pt-2 pb-2">
          <div className="flex flex-col items-center space-y-2 text-white-700 z-11">
            <div className="flex flex-row items-center justify-center space-x-4">
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={isInView ? { x: [0, 4, -4, 4, 0], y: [0, -4, 0, 4, 0] } : { x: 0, y: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
            </div>
            <motion.h4
              initial={{ x: 200, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
              transition={{ duration: 1 }}
              className="m-0 p-0 font-extrabold text-2xl"
              style={{ fontSize: "28px" }}
            >
              Olá, meu nome é Pedro!
            </motion.h4>
            <motion.h5
              initial={{ x: -200, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
              transition={{ duration: 1 }}
              className="m-0 p-0 font-medium text-lg"
              style={{ fontSize: "18px" }}
            >
              Sou desenvolvedor web.
            </motion.h5>
            <motion.p
              className="relative text-center mt-1 mb-1 p-1 text-white-900 rounded-2xl shadow-lg max-w-xs text-sm"
              style={{ fontSize: "12px", minWidth: "100px", backgroundColor: "#171717ff" }}
              initial={{ opacity: 1, x: 0 }}
              animate={isInView ? { x: [0, 2, -2, 2, 0], y: [0, -2, 3, 2, 0] } : { x: 0, y: 0 }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span className="block">{typedText}<span className="animate-pulse">|</span></motion.span>
            </motion.p>
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
              <motion.span
                title="JavaScript"
                className="text-yellow-400"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                <SiJavascript />
              </motion.span>
              <motion.span
                title="React.js"
                className="text-cyan-400"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <SiReact />
              </motion.span>
              <motion.span
                title="Node.js"
                className="text-green-600"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <SiNodedotjs />
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[-4px] justify-center pb-6">
          <span style={{color: "#3a3a3aff", fontWeight: "bold"}} className="mt-4">Experiências</span>
          <a
            href="#next-section"
            aria-label="Ir para a próxima sessão"
            className="flex arrow-group  arrow-icon z-11"
          >
            <span className="arrow-circle">
              <IoIosArrowDown className="arrow-icon" />
            </span>
          </a>
        </div>
      </header>
    );
  }
);

export default Header;
