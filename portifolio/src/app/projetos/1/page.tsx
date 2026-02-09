"use client";
import Link from "next/link";

export default function Projeto1Page() {
  return (
    <section className="w-screen min-h-screen flex flex-col items-center bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)] p-8">
      <h1 className="text-5xl font-extrabold mb-2 mt-8 text-center">Projeto 1</h1>
      <hr className="w-32 border-t-2 border-blue-500 mb-8 mx-auto" />
      <div className="max-w-3xl w-full mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Sobre o Projeto</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 text-justify">
            Este projeto foi desenvolvido para demonstrar habilidades em desenvolvimento web, incluindo frontend, backend e integração de sistemas. O objetivo é apresentar uma solução completa, moderna e eficiente.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 text-justify">
            As principais tecnologias utilizadas foram React, Next.js, Node.js, Express e PostgreSQL, com foco em segurança, performance e escalabilidade.
          </p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Funcionalidades e Estrutura</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 text-justify">
            O sistema conta com cadastro e login de usuários, gerenciamento de dados, interface responsiva, relatórios e dashboards. A arquitetura foi pensada para facilitar manutenção e expansão futura.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 text-justify">
            O deploy é automatizado, garantindo agilidade nas atualizações. A autenticação é feita via JWT, proporcionando segurança e controle de acesso.
          </p>
        </div>
        <Link href="/projetos" className="inline-block mt-4 text-blue-600 dark:text-blue-300 hover:underline">Voltar para projetos</Link>
      </div>
    </section>
  );
}
