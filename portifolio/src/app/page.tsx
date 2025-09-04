"use client";
import ParticlesBackground from "./ParticlesBackground";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiJavascript, SiReact, SiNodedotjs } from "react-icons/si";

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
  const text = "Focado em criar soluções eficientes, escaláveis e de alto impacto. Tenho experiência em projetos completos, prezando por qualidade, boas práticas e evolução contínua, sempre buscando aprender e me adaptar às novas tecnologias e inovando na experiência do usuário.";
  const typedText = useTypewriter(text, 30); // 30ms por caractere

  return (
    <div className="m-0 p-0 h-screen w-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory ">
      <header
        className="w-screen h-screen flex flex-col align-center snap-start"
        style={{
          background:
            "radial-gradient(circle at left, #090A09 50%, #0D0C0D, #0D0C0D, #0D0C0D 80%, #0D0C0D 10%)",
        }}
        id="header"
      >
        <ParticlesBackground />
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
          <a
            href="#next-section"
            aria-label="Ir para a próxima sessão"
            className="animate-bounce"
          >
            <span className="block w-8 h-8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6V24" stroke="#ffffffff" strokeWidth="4" strokeLinecap="round"/>
                <path d="M8 18L16 26L24 18" stroke="#ffffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </header>
      <section
        id="next-section"
        className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white snap-start"
        style={{
          background:
            "radial-gradient(circle at left, #090A09 50%, #0D0C0D, #0D0C0D, #0D0C0D 80%, #0D0C0D 10%)",
        }}
      >
        <h2 className="text-4xl font-bold">Próxima Sessão</h2>
      </section>
    </div>
  );
}
