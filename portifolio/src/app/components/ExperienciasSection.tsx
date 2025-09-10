"use client";
import { RefObject, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import MeshBackground from "../threeJS/MeshBackground";
import { SiReact, SiNodedotjs, SiPostgresql, SiLinux } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

export default function ExperienciasSection({ sectionRef }: { sectionRef: RefObject<HTMLDivElement | null> }) {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: false, amount: 0.7 });
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isInView) {
      dispatch(setActiveSection("next-section"));
    }
  }, [isInView, dispatch]);

  return (
    <section
      ref={sectionRef}
      id="next-section"
      className="w-screen h-screen max-h-screen flex flex-col items-center justify-center snap-center relative bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
    >
      {/* Título centralizado só no mobile */}
      {!isDesktop && (
        <div className="w-full flex justify-center items-center">
          <span className="block text-sm mb-2 text-center text-[var(--foreground)] dark:text-[var(--foreground)] opacity-70">Experiências</span>
        </div>
      )}
  <div ref={localRef} className="relative flex flex-col justify-center align-center z-10 max-w-xl pl-4 text-[var(--foreground)] dark:text-[var(--foreground)]">
        {/* Linha vertical animada */}
        <motion.div
          className="absolute left-0 top-0 w-1 bg-gray-300 dark:bg-gray-700"
          style={{ height: "80%" }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Experiência 1 */}
        <motion.div
          className="flex items-center mb-20"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="ml-0">
            <h3 className={`font-bold ${isDesktop ? 'text-xl' : 'text-lg'} flex items-center gap-2`}>
              Desenvolvedor Full Stack trainee
              <span className="flex gap-1 text-base text-cyan-600 dark:text-cyan-300 opacity-80">
                <SiReact />
                <SiNodedotjs />
                <SiPostgresql />
              </span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">NDM Advogados, 2024 - 2025</p>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              Desenvolvimento de aplicações web com React, Node.js e PostgreSQL.<br/>
              APIs REST, autenticação JWT, integração de sistemas e deploy automatizado.<br/>
              Suporte técnico e treinamento de usuários.
            </p>
          </div>
        </motion.div>
        {/* Experiência 2 */}
        <motion.div
          className="flex items-center mb-20"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="ml-0">
            <h3 className={`font-bold ${isDesktop ? 'text-xl' : 'text-lg'} flex items-center gap-2`}>
              Suporte Técnico em TI
              <span className="flex gap-1 text-base text-blue-600 dark:text-blue-300 opacity-70">
                <FaWindows />
                <SiLinux />
              </span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">Trombini Embalagens, 2022 - 2023</p>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              Atendimento a usuários, manutenção de hardware/software e configuração de sistemas.<br/>
              Treinamento, implantação de ferramentas e relatórios de TI.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
