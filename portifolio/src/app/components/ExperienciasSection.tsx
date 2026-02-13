"use client";
import { RefObject, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { SiReact, SiNodedotjs, SiPostgresql, SiLinux } from "react-icons/si";
import { SiJavascript, SiHtml5, SiCss3 } from "react-icons/si";
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
  <div ref={localRef} className={`relative z-10 w-full max-w-6xl px-4 text-[var(--foreground)] dark:text-[var(--foreground)] flex ${isDesktop ? 'flex-row gap-8 items-stretch justify-center' : 'flex-col'}`}>
    {/* Experiência 1 - Analista de TI / Desenvolvedor */}
    <motion.div
      className="flex-1 flex flex-col bg-white/90 dark:bg-[#232323]/90 rounded-2xl shadow-2xl p-10 mb-8 md:mb-0 min-h-[500px] min-w-[500px] max-w-[420px] border border-gray-200 dark:border-gray-700"
      initial={{ x: 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3 className={`font-bold ${isDesktop ? 'text-xl' : 'text-lg'} flex items-center gap-2`}>
          Analista de TI / Desenvolvedor
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">Empresa Atual, 2025 - presente</p>
      <span className="flex gap-1 text-base text-green-600 dark:text-green-300 opacity-80 mb-5">
          <FaWindows />
          <SiLinux />
          <SiJavascript className="text-yellow-500" />
          <SiHtml5 className="text-orange-500" />
          <SiCss3 className="text-blue-500" />
          <SiPostgresql className="text-cyan-700 dark:text-cyan-300" />
      </span>
      <p className="text-gray-800 dark:text-gray-300 text-sm text-justify">
        - Suporte técnico na infraestrutura e dispositivos da empresa.<br/><br/>
        - Manutenção de rede, gerenciamento de servidores e atualização de software.<br/><br/>
        - Gerenciamento de licenças e segurança de sistemas.<br/><br/>
        - Desenvolvimento de aplicativos para automação de processos administrativos e de produção.<br/><br/>
        - Atuação estratégica para otimizar recursos, garantir disponibilidade e inovação tecnológica.<br/><br/>
        - Responsável por projetos de automação, integração de sistemas e melhoria contínua.
      </p>
    </motion.div>
    {/* Experiência 2 - Desenvolvedor Full Stack trainee */}
    <motion.div
      className="flex-1 flex flex-col bg-white/90 dark:bg-[#232323]/90 rounded-2xl shadow-2xl p-10 mb-8 md:mb-0 min-h-[500px] min-w-[500px] max-w-[420px] border border-gray-200 dark:border-gray-700"
      initial={{ x: 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <h3 className={`font-bold ${isDesktop ? 'text-xl' : 'text-lg'} flex items-center gap-2`}>
          Desenvolvedor Full Stack trainee
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">NDM Advogados, 2024 - 2025</p>
      <span className="flex gap-1 text-base text-cyan-600 dark:text-cyan-300 opacity-80 mb-5">
          <SiReact />
          <SiNodedotjs />
          <SiPostgresql />
      </span>

      <p className="text-gray-800 dark:text-gray-300 text-sm text-justify">
        - Desenvolvimento de aplicações web completas com React, Node.js e PostgreSQL, atuando desde o frontend até o backend.<br/><br/>
        - Criação de APIs REST robustas, autenticação JWT, integração de sistemas, automação de deploy e versionamento com Git.<br/><br/>
        - Implementação de testes automatizados, otimização de performance, arquitetura escalável e segurança de dados.<br/><br/>
        - Participação ativa em reuniões de definição de requisitos, colaboração com equipes multidisciplinares e resolução de problemas complexos.<br/><br/>
        - Suporte técnico, treinamento de usuários e documentação técnica detalhada.<br/><br/>
        - Vaga de grande importância, responsável por garantir a qualidade, eficiência e inovação nos projetos da empresa.
      </p>
    </motion.div>
    {/* Experiência 3 - Suporte Técnico em TI */}
    <motion.div
      className="flex-1 flex flex-col bg-white/90 dark:bg-[#232323]/90 rounded-2xl shadow-2xl p-10 min-h-[500px] min-w-[500px] max-w-[420px] border border-gray-200 dark:border-gray-700"
      initial={{ x: 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    >
      <h3 className={`font-bold ${isDesktop ? 'text-xl' : 'text-lg'} flex items-center gap-2`}>
          Suporte Técnico em TI
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">Trombini Embalagens, 2022 - 2023</p>
      <span className="flex gap-1 text-base text-blue-600 dark:text-blue-300 opacity-70 mb-5">
          <FaWindows />
          <SiLinux />
          <SiJavascript className="text-yellow-500" />
          <SiHtml5 className="text-orange-500" />
          <SiCss3 className="text-blue-500" />
          <SiPostgresql className="text-cyan-700 dark:text-cyan-300" />
      </span>
      <p className="text-gray-800 dark:text-gray-300 text-sm text-justify">
        - Atendimento a usuários, manutenção de hardware/software e configuração de sistemas.<br/><br/>
        - Treinamento, implantação de ferramentas e relatórios de TI.<br/><br/>
        - Desenvolvimento de sistema de gerenciamento de acessos e licenças utilizando JavaScript, HTML, CSS, PostgreSQL e Windows Server.
      </p>
    </motion.div>
  </div>
    </section>
  );
}
