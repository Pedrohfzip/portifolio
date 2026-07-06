import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Database,
  Server,
  Layers,
  Box,
  Globe,
  Terminal,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const DISPLAY = "'Bricolage Grotesque', sans-serif";
const BODY = "'DM Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const SKILLS = [
  { label: "JavaScript", Icon: Terminal },
  { label: "TypeScript", Icon: Terminal },
  { label: "Node.js", Icon: Server },
  { label: "React", Icon: Layers },
  { label: "Next.js", Icon: Globe },
  { label: "PostgreSQL", Icon: Database },
  { label: "Docker", Icon: Box },
  { label: "Python", Icon: Terminal },
  { label: "REST APIs", Icon: Server },
  { label: "Git / GitLab", Icon: Terminal },
  { label: "Azure / M365", Icon: Globe },
  { label: "Cypress", Icon: Terminal },
];

const EXPERIENCE = [
  {
    role: "Analista de TI",
    company: "Estrutural Ezortea",
    period: "2025 — Atual",
    summary:
      "Desenvolvimento de aplicações internas com Next.js, Node.js e PostgreSQL. Administração de Azure, M365, Active Directory e Windows Server. Ponte entre TI e negócio.",
  },
  {
    role: "Desenvolvedor Full Stack",
    company: "NDM Consultoria",
    period: "2024 — 2025",
    summary:
      "Aplicações web completas com React e Node.js, APIs REST, modelagem PostgreSQL e testes E2E com Cypress. Automações com Python e workflow colaborativo via GitLab.",
  },
  {
    role: "Suporte de TI",
    company: "Trombini Embalagens",
    period: "2022 — 2023",
    summary:
      "Manutenção de hardware e software, gerenciamento de ativos e usuários, resolução de incidentes com registro e acompanhamento de chamados corporativos.",
  },
];

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Stack", href: "#stack" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Projetos", href: "#projetos" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-5 block"
      style={{ fontFamily: MONO }}
    >
      {children}
    </span>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border"
        : ""
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-14 lg:px-20 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: MONO }}
        >
          pf<span className="text-primary">.dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: BODY }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-200"
          style={{ fontFamily: BODY }}
        >
          Contato
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-px bg-foreground transition-all duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors text-base"
              style={{ fontFamily: BODY }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="text-primary text-base"
            style={{ fontFamily: BODY }}
          >
            Contato
          </a>
        </div>
      )}
    </motion.header>
  );
}

function Hero() {
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => !t), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-6 md:px-14 lg:px-20 pt-32 max-w-6xl mx-auto">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-7"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="w-8 h-px bg-primary" />
          <Label>Full Stack Developer · +5 anos de experiência</Label>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[clamp(3.2rem,10vw,8.5rem)] font-bold leading-[0.88] tracking-tight text-foreground"
          style={{ fontFamily: DISPLAY }}
        >
          Pedro
          <br />
          <span className="text-primary">Fagundes</span>
          <span
            className="inline-block w-[0.06em] h-[0.85em] ml-2 bg-primary align-middle translate-y-[-0.05em] transition-opacity duration-100"
            style={{ opacity: tick ? 1 : 0 }}
          />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground max-w-md text-[1.05rem] leading-relaxed"
          style={{ fontFamily: BODY }}
        >
          Visão sistêmica da rede ao deploy — identifico gargalos e resolvo
          problemas de ponta a ponta com autonomia.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-4 pt-1"
        >
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background text-sm font-medium rounded-full hover:opacity-90 active:scale-95 transition-all"
            style={{ fontFamily: BODY }}
          >
            Ver projetos <ArrowUpRight size={14} />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 right-6 md:right-14 lg:right-20 flex flex-col items-center gap-3"
      >
        <div className="h-14 w-px bg-gradient-to-b from-transparent to-primary" />
        <span
          className="text-[10px] text-muted-foreground tracking-widest [writing-mode:vertical-rl]"
          style={{ fontFamily: MONO }}
        >
          scroll
        </span>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section
      id="sobre"
      className="border-t border-border px-6 md:px-14 lg:px-20 py-24 max-w-6xl mx-auto"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid md:grid-cols-2 gap-12 md:gap-20 items-start"
      >
        <div>
          <motion.div variants={fadeUp}>
            <Label>/ Sobre</Label>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
            style={{ fontFamily: DISPLAY }}
          >
            Da infraestrutura
            <br />
            ao
            <br />
            <span className="text-primary">software</span>
          </motion.h2>
        </div>
        <motion.div variants={fadeUp} className="space-y-4">
          <p
            className="text-muted-foreground leading-relaxed"
            style={{ fontFamily: BODY }}
          >
            Profissional com mais de 5 anos de experiência atuando de forma
            integrada em desenvolvimento de software, suporte técnico e
            infraestrutura de TI.
          </p>
          <p
            className="text-muted-foreground leading-relaxed"
            style={{ fontFamily: BODY }}
          >
            Essa visão sistêmica — da camada de rede ao deploy em produção —
            me permite mapear causas-raiz, priorizar soluções e executar com
            autonomia e clareza.
          </p>
          <div
            className="pt-4 flex flex-wrap gap-3 text-xs text-muted-foreground"
            style={{ fontFamily: MONO }}
          >
            <span>Análise de causa-raiz</span>
            <span className="text-border">·</span>
            <span>Execução autônoma</span>
            <span className="text-border">·</span>
            <span>Entrega com responsabilidade</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stack() {
  return (
    <section
      id="stack"
      className="border-t border-border px-6 md:px-14 lg:px-20 py-24 max-w-6xl mx-auto"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp}>
          <Label>/ Stack técnica</Label>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
          style={{ fontFamily: DISPLAY }}
        >
          Ferramentas do dia a dia
        </motion.h2>
        <motion.div variants={stagger} className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.label}
              variants={fadeUp}
              whileHover={{ scale: 1.04, borderColor: "#4ecca3", color: "#4ecca3" }}
              className="px-4 py-2 border border-border rounded-full text-sm text-foreground flex items-center gap-2 cursor-default transition-colors duration-150"
              style={{ fontFamily: BODY }}
            >
              <skill.Icon size={13} className="opacity-60" />
              {skill.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experiencia"
      className="border-t border-border px-6 md:px-14 lg:px-20 py-24 max-w-6xl mx-auto"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp}>
          <Label>/ Experiência</Label>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-16 text-foreground"
          style={{ fontFamily: DISPLAY }}
        >
          Trajetória profissional
        </motion.h2>

        <div>
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group grid md:grid-cols-[220px_1fr] gap-6 md:gap-12 py-10 border-b border-border last:border-0"
            >
              <div>
                <span
                  className="text-[11px] text-muted-foreground block mb-2"
                  style={{ fontFamily: MONO }}
                >
                  {exp.period}
                </span>
                <h3
                  className="text-base font-semibold text-foreground mb-1"
                  style={{ fontFamily: DISPLAY }}
                >
                  {exp.role}
                </h3>
                <span
                  className="text-sm text-primary"
                  style={{ fontFamily: BODY }}
                >
                  {exp.company}
                </span>
              </div>
              <p
                className="text-muted-foreground leading-relaxed self-center text-[0.95rem]"
                style={{ fontFamily: BODY }}
              >
                {exp.summary}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projetos"
      className="border-t border-border px-6 md:px-14 lg:px-20 py-24 max-w-6xl mx-auto"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp}>
          <Label>/ Projetos</Label>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-14 text-foreground"
          style={{ fontFamily: DISPLAY }}
        >
          O que estou construindo
        </motion.h2>

        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease }}
          className="group relative border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 cursor-pointer"
        >
          {/* top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

          <div className="grid md:grid-cols-2">
            {/* Info */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span
                    className="text-xs text-primary"
                    style={{ fontFamily: MONO }}
                  >
                    Em desenvolvimento
                  </span>
                </div>

                <h3
                  className="text-5xl md:text-6xl font-bold text-foreground mb-5 leading-none"
                  style={{ fontFamily: DISPLAY }}
                >
                  Fast
                  <span className="text-primary">Sign</span>
                </h3>

                <p
                  className="text-muted-foreground leading-relaxed mb-8 text-[0.95rem]"
                  style={{ fontFamily: BODY }}
                >
                  Plataforma de assinatura digital — assine, envie e gerencie
                  documentos com segurança. Interface moderna, fluxo intuitivo
                  e integrações via API REST.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "PostgreSQL", "Docker"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-secondary text-muted-foreground text-xs border border-border"
                      style={{ fontFamily: MONO }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <span
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors"
                  style={{ fontFamily: BODY }}
                >
                  Preview em breve <ArrowUpRight size={13} />
                </span>
              </div>
            </div>

            {/* Visual mockup */}
            <div className="relative bg-card border-l border-border min-h-[320px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

              {/* Faux UI mockup */}
              <div className="relative w-[260px] space-y-3 p-4">
                <div className="rounded-lg bg-background border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-primary" style={{ fontFamily: MONO }}>FS</span>
                    </div>
                    <div className="h-2 w-20 rounded-full bg-muted" />
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-muted" />
                    <div className="h-2 w-4/5 rounded-full bg-muted" />
                    <div className="h-2 w-3/5 rounded-full bg-muted" />
                  </div>
                  <div className="flex justify-end">
                    <div className="h-7 w-24 rounded-full bg-primary/80 flex items-center justify-center">
                      <span className="text-[9px] font-medium text-background" style={{ fontFamily: BODY }}>Assinar →</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-background border border-border p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-[8px]">✓</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 w-3/4 rounded-full bg-muted" />
                    <div className="h-1.5 w-1/2 rounded-full bg-muted" />
                  </div>
                </div>
                <div className="rounded-lg bg-background border border-border p-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-[8px]">◷</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                    <div className="h-1.5 w-2/5 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-xs text-muted-foreground text-center mt-8"
          style={{ fontFamily: MONO }}
        >
          + mais projetos em breve
        </motion.p>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contato"
      className="border-t border-border px-6 md:px-14 lg:px-20 py-28 max-w-6xl mx-auto"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="text-center max-w-xl mx-auto"
      >
        <motion.div variants={fadeUp}>
          <Label>/ Contato</Label>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight"
          style={{ fontFamily: DISPLAY }}
        >
          Vamos trabalhar
          <br />
          <span className="text-primary">juntos?</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground mb-10 leading-relaxed"
          style={{ fontFamily: BODY }}
        >
          Aberto a projetos, oportunidades e colaborações.
          <br />
          Me manda uma mensagem.
        </motion.p>
        <motion.a
          variants={fadeUp}
          href="mailto:pedro@email.com"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-medium rounded-full hover:opacity-95 transition-opacity text-base"
          style={{ fontFamily: BODY }}
        >
          <Mail size={17} />
          fagundeshpedro@gmail.com
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: MONO }}
        >
          © 2025 Pedro Fagundes
        </span>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: MONO }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Ambient cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(78,204,163,0.045), transparent 40%)`,
        }}
      />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
