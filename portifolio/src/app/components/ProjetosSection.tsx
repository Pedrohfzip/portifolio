"use client";
import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";

export default function ProjetosSection() {
    const projetos = [
        { id: 1, nome: "Projeto 1" },
        { id: 2, nome: "Projeto 2" },
        { id: 3, nome: "Projeto 3" },
    ];

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
            dispatch(setActiveSection("projeto"));
        }
    }, [isInView, dispatch]);

    return (
        <section ref={localRef} id="projeto" className="w-screen h-screen flex flex-col items-center justify-center py-4 md:py-10 snap-center overflow-y-auto z-11 relative bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]">

            {/* Título centralizado só no mobile */}
            {!isDesktop && (
                <div className="w-full flex justify-center items-center">
                    <span className="block text-sm text-white opacity-70 mb-2 text-center">Projetos</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 z-10">
                {projetos.map((projeto, idx) => (
                    <motion.div
                        key={projeto.id}
                        className="rounded-xl shadow-lg flex flex-col items-center justify-center h-48 md:h-56 transition-transform hover:scale-105 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#171717]"
                        initial={{ x: 200, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: idx * 0.15 }}
                    >
                        <a href={`/projetos/${projeto.id}`} className="w-full h-full flex flex-col items-center justify-center no-underline">
                            <span className="text-xl font-semibold text-white mb-2">{projeto.nome}</span>
                            <span className="text-gray-600 dark:text-gray-400">Ver detalhes do projeto</span>
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
