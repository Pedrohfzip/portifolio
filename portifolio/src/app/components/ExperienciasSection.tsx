"use client";
import { IoIosArrowDown } from "react-icons/io";
import { RefObject, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";

export default function ExperienciasSection({ sectionRef }: { sectionRef: RefObject<HTMLDivElement | null> }) {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: false, amount: 0.7 });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInView) {
      dispatch(setActiveSection("experiencias"));
    }
  }, [isInView, dispatch]);

  return (
    <section
      ref={sectionRef}
      id="next-section"
      className="w-screen h-screen h-100 flex items-center justify-center text-white snap-center relative"
    >
      <div ref={localRef} className="relative flex flex-col justify-center align-center z-10 max-w-xl pl-4">
        {/* Linha vertical animada */}
        <motion.div
          className="absolute left-0 top-0 w-1"
          style={{ background: "#111311", height: "80%" }}
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
            <h3 className="font-bold text-xl">Desenvolvedor Full Stack trainee</h3>
            <p className="text-sm text-gray-200">NDM Advogados, 2024 - 2025</p>
            <p className="text-gray-300 text-sm">Desenvolvimento full stack de aplicações web com React, Node.js e PostgreSQL, incluindo testes automatizados e suporte ao usuário.</p>
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
            <h3 className="font-bold text-xl">Suporte Técnico em TI</h3>
            <p className="text-sm text-gray-200">Trombini Embalagens, 2022 - 2023</p>
            <p className="text-gray-300 text-sm">Atendimento e suporte a usuários, manutenção de hardware e software.</p>
          </div>
        </motion.div>
        <div className="flex flex-col items-center justify-center pt-6 pb-2">
          <span className="mt-4 text-white">Projetos</span>
          <a
            href="#projeto"
            aria-label="Ir para a próxima sessão"
            className="flex arrow-group arrow-icon z-11"
          >
            <span className="arrow-circle">
              <IoIosArrowDown className="arrow-icon" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
