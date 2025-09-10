"use client";
import { useRef, useEffect, JSX } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import { SiReact, SiNodedotjs, SiPostgresql, SiJavascript, SiTypescript,SiNextdotjs, SiLinux, SiGithub, SiTailwindcss } from "react-icons/si";
import MeshBackground from "../threeJS/MeshBackground";

type Skill = {
  name: string;
  icon: JSX.Element;
  level: "Avançado" | "Intermediário" | "Básico";
};

const skills: Skill[] = [
  { name: "JavaScript", icon: <SiJavascript />, level: "Avançado" },
  { name: "TypeScript", icon: <SiTypescript />, level: "Avançado" },
  { name: "Node.js", icon: <SiNodedotjs />, level: "Avançado" },
  { name: "React", icon: <SiReact />, level: "Avançado" },
  { name: "Next.JS", icon: <SiNextdotjs />, level: "Avançado" },
  { name: "TailwindCSS", icon: <SiTailwindcss />, level: "Intermediário" },
  { name: "PostgreSQL", icon: <SiPostgresql />, level: "Avançado" },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function SkillsSection() {
  const skillRows = chunkArray(skills, 3);
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: false, amount: 0.7 });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInView) {
      dispatch(setActiveSection("skills"));
    }
  }, [isInView, dispatch]);

  return (
    <>
      <MeshBackground />
      <section ref={localRef} id="skills" className="h-screen py-8 flex flex-col items-center justify-center snap-start bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)]">
        <div className="flex flex-col gap-6 w-full max-w-2xl px-2">
          {skillRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-row justify-center gap-6">
              {row.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: (rowIdx * 3 + idx) * 0.15 }}
                  className="flex flex-col items-center justify-center text-[var(--foreground)] dark:text-[var(--foreground)]"
                >
                  <span className="mb-1 text-2xl opacity-80">{skill.icon}</span>
                  <span className="font-medium text-sm mb-1">{skill.name}</span>
                  <span className={`text-xs px-2 py-1 rounded opacity-80
                    ${skill.level === "Avançado" ? "bg-green-700 dark:bg-green-600 text-white" :
                      skill.level === "Intermediário" ? "bg-yellow-700 dark:bg-yellow-500 text-white" :
                      "bg-gray-700 dark:bg-gray-400 text-white dark:text-black"}
                  `}>{skill.level}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
