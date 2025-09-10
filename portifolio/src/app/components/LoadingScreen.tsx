"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200); // 2.2 segundos
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -200 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#171717] text-white text-3xl font-bold"
      style={{ width: "100vw", height: "100vh" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
  {/* Removido texto 'Carregando...' */}
        <div className="w-16 h-16 border-4 border-t-white border-gray-600 rounded-full animate-spin" />
      </motion.div>
    </motion.div>
  );
}
