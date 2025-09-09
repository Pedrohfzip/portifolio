"use client";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";

export default function Navbar() {
  const activeSection = useSelector((state: RootState) => state.navbar.activeSection);
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-md flex justify-center items-center h-14">
      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-4 text-white font-semibold text-lg">
        <li>
          <a
            href="#header"
            className={activeSection === "header" ? "text-white navbar-active" : "text-white"}
          >Sobre</a>
        </li>
        <li>
          <a
            href="#next-section"
            className={activeSection === "next-section" ? "text-white navbar-active" : "text-white"}
          >Experiências</a>
        </li>
        <li>
          <a
            href="#projeto"
            className={activeSection === "projeto" ? "text-white navbar-active" : "text-white"}
          >Projetos</a>
        </li>
        <li>
          <a
            href="#skills"
            className={activeSection === "skills" ? "text-white navbar-active" : "text-white"}
          >Skills</a>
        </li>
        <li>
          <a
            href="#footer"
            className={activeSection === "footer" ? "text-white navbar-active" : "text-white"}
          >Contato</a>
        </li>
      </ul>
      {/* Mobile hamburger */}
      <div className="fixed top-0 left-0 md:hidden flex items-center w-full justify-between p-4">
        <button
          className="flex flex-col justify-center items-center w-10 h-10"
          aria-label="Abrir menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-8 h-1 bg-white rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-8 h-1 bg-white rounded my-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-1 bg-white rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {open && (
          <ul className="absolute top-14 left-0 w-full bg-[#171717] shadow-lg flex flex-col items-center py-4 z-50">
            <li className="w-full text-center py-2">
              <a href="#header" className={activeSection === "header" ? "text-white navbar-active" : "text-white"} onClick={() => setOpen(false)}>Sobre</a>
            </li>
            <li className="w-full text-center py-2">
              <a href="#next-section" className={activeSection === "experiencias" ? "text-white navbar-active" : "text-white"} onClick={() => setOpen(false)}>Experiências</a>
            </li>
            <li className="w-full text-center py-2">
              <a href="#projeto" className={activeSection === "projeto" ? "text-white navbar-active" : "text-white"} onClick={() => setOpen(false)}>Projetos</a>
            </li>
            <li className="w-full text-center py-2">
              <a href="#skills" className={activeSection === "skills" ? "text-white navbar-active" : "text-white"} onClick={() => setOpen(false)}>Skills</a>
            </li>
            <li className="w-full text-center py-2">
              <a href="#contato" className={activeSection === "contato" ? "text-white navbar-active" : "text-white"} onClick={() => setOpen(false)}>Contato</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
