"use client";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function Navbar() {
  const activeSection = useSelector((state: RootState) => state.navbar.activeSection);
  return (
  <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-md flex justify-center items-center h-14">
      <ul className="flex space-x-4 text-white font-semibold text-lg">
        <li>
          <a
            href="#header"
            className={activeSection === "header" ? "text-white navbar-active" : "text-white"}
          >Sobre</a>
        </li>
        <li>
          <a
            href="#next-section"
            className={activeSection === "experiencias" ? "text-white navbar-active" : "text-white"}
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
            href="#contato"
            className={activeSection === "contato" ? "text-white navbar-active" : "text-white"}
          >Contato</a>
        </li>
      </ul>
    </nav>
  );
}
