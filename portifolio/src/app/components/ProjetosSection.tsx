"use client";
import { useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { IoIosArrowUp } from "react-icons/io";

export default function ProjetosSection() {
    const projetos = [
        { id: 1, nome: "Projeto 1" },
        { id: 2, nome: "Projeto 2" },
    ];

    const localRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(localRef, { once: false, amount: 0.7 });
    const dispatch = useDispatch();

    useEffect(() => {
        if (isInView) {
            dispatch(setActiveSection("projeto"));
        }
    }, [isInView, dispatch]);

    return (
        <section ref={localRef} id="projeto" className="w-screen h-screen flex flex-col items-center justify-center bg-transparent py-4 md:py-10 snap-center overflow-y-auto">
            <div className="flex flex-col items-center justify-center pt-3 pb-20">
                <span style={{color: "#3a3a3aff", fontWeight: "bold"}} className="mt-4 text-white">Experiencias</span>
                <a
                    href="#next-section"
                    aria-label="Ir para a próxima sessão"
                    className="flex arrow-group arrow-icon z-11"
                >
                    <span className="arrow-circle">
                        <IoIosArrowUp className="arrow-icon" />
                    </span>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                {projetos.map((projeto, idx) => (
                    <motion.div
                        key={projeto.id}
                        className="bg-[#171717] rounded-xl shadow-lg flex flex-col items-center justify-center h-48 md:h-56 transition-transform hover:scale-105 border border-gray-700"
                        initial={{ x: 200, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: idx * 0.15 }}
                    >
                        <span className="text-xl font-semibold text-white mb-2">{projeto.nome}</span>
                        <span className="text-gray-400">Em breve...</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
