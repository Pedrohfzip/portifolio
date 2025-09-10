"use client";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import type { RootState } from "../store/store";

export default function Footer() {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: false, amount: 0.7 });
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.navbar.activeSection);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (isInView) {
      dispatch(setActiveSection("footer"));
    }
  }, [isInView, dispatch]);

  const animateLinks = activeSection === "footer" ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };

  return (
    <footer
      ref={localRef}
      id="footer"
      className="w-screen h-screen py-6 flex flex-col items-center justify-center opacity-80 text-sm mt-auto snap-end bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
      style={{ scrollSnapAlign: "end" }}
    >
      <motion.div
        className="flex flex-row gap-3 mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={animateLinks}
        transition={{ duration: 0.8 }}
      >
        <a
          href="https://www.linkedin.com/in/pedro-h-fagundes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-[var(--foreground)] dark:text-[var(--foreground)]"
        >
          <FaLinkedin size={22} /> LinkedIn
        </a>
        <a
          href="https://github.com/Pedrohfzip"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-[var(--foreground)] dark:text-[var(--foreground)]"
        >
          <FaGithub size={22} /> GitHub
        </a>
        <a
          href="mailto:fagundeshpedro@gmail.com"
          className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-[var(--foreground)] dark:text-[var(--foreground)]"
        >
          <FaEnvelope size={22} /> E-mail
        </a>
        <a
          href="https://wa.me/5549998251401"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors text-[var(--foreground)] dark:text-[var(--foreground)]"
        >
          <SiWhatsapp size={22} /> WhatsApp
        </a>
      </motion.div>
      <motion.div
        className="flex flex-row gap-6 mb-4 text-[var(--foreground)] dark:text-[var(--foreground)]"
        initial={{ opacity: 0, y: 40 }}
        animate={animateLinks}
        transition={{ duration: 0.8 }}
      >
        <span>Feito por Pedro Henrique Fagundes</span>
      </motion.div>
    </footer>
  );
}
