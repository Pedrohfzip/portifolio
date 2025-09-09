"use client";
import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../store/navbarSlice";
import MeshBackground from "../threeJS/MeshBackground";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, amount: 0.7 });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInView) {
      dispatch(setActiveSection("contato"));
    }
  }, [isInView, dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Aqui você pode integrar com um serviço de email, ex: EmailJS, Formspree, etc.
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200);
  }
  // force push
  return (
    <>
      <MeshBackground />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-[#171717] rounded-xl shadow-lg p-6 flex flex-col gap-4 text-white z-10"
        style={{ opacity: sent ? 0.7 : 1 }}
        id="contato"
      >
        <h2 className="text-lg font-semibold mb-2 text-center opacity-80">Fale comigo</h2>
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange}
          className="bg-transparent border-b border-gray-600 py-2 px-2 focus:outline-none focus:border-white transition-all text-sm"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={form.email}
          onChange={handleChange}
          className="bg-transparent border-b border-gray-600 py-2 px-2 focus:outline-none focus:border-white transition-all text-sm"
          required
        />
        <textarea
          name="message"
          placeholder="Sua mensagem"
          value={form.message}
          onChange={handleChange}
          className="bg-transparent border-b border-gray-600 py-2 px-2 focus:outline-none focus:border-white transition-all text-sm resize-none min-h-[100px]"
          required
        />
        <button
          type="submit"
          disabled={loading || sent}
          className="mt-2 py-2 px-4 rounded bg-white text-[#171717] font-bold transition-all hover:bg-gray-200 disabled:opacity-60"
        >
          {loading ? "Enviando..." : sent ? "Enviado!" : "Enviar"}
        </button>
      </form>
    </>
  );
}
