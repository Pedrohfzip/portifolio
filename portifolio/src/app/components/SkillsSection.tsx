"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { SiReact, SiNodedotjs, SiPostgresql, SiJavascript, SiTypescript, SiLinux, SiGithub, SiTailwindcss } from "react-icons/si";
import MeshBackground from "../threeJS/MeshBackground";
const skills = [
  { name: "JavaScript", icon: <SiJavascript />, level: "Avançado" },
  { name: "React", icon: <SiReact />, level: "Avançado" },
  { name: "Node.js", icon: <SiNodedotjs />, level: "Avançado" },
  { name: "PostgreSQL", icon: <SiPostgresql />, level: "Avançado" },
  { name: "TypeScript", icon: <SiTypescript />, level: "Avançado" },
  { name: "Linux", icon: <SiLinux />, level: "Intermediário" },
  { name: "GitHub", icon: <SiGithub />, level: "Intermediário" },
  { name: "TailwindCSS", icon: <SiTailwindcss />, level: "Básico" },
];

function chunkArray(arr: any[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function SkillsSection() {
  const skillRows = chunkArray(skills, 4);
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
      dispatch(setActiveSection("skills"));
    }
  }, [isInView, dispatch]);

  return (
    <>
        <MeshBackground />
        <section ref={localRef} id="skills" className=" h-screen py-8 flex flex-col items-center justify-center text-white snap-start">
        <div className="flex flex-col gap-6 w-full max-w-2xl px-2">
            {skillRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-row justify-center gap-6">
                {row.map((skill, idx) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: (rowIdx * 4 + idx) * 0.15 }}
                    className="flex flex-col items-center justify-center"
                >
                    <span className="mb-1 text-2xl opacity-80">{skill.icon}</span>
                    <span className="font-medium text-sm mb-1">{skill.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${skill.level === "Avançado" ? "bg-green-700" : skill.level === "Intermediário" ? "bg-yellow-700" : "bg-gray-700"} opacity-80`}>{skill.level}</span>
                </motion.div>
                ))}
            </div>
            ))}
        </div>
        </section>
    </>
  );
}
