"use client";

import { motion } from "framer-motion";

interface PopupFeedbackProps {
  title?: string;
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

export default function PopupFeedback({ title = "GBC Coffee", message, onClose }: PopupFeedbackProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className={`rounded-2xl shadow-2xl p-8 max-w-md w-full bg-[#4E2010] text-white`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#C9A882] mb-4">{title}</h2>
          <p className="text-lg font-semibold whitespace-pre-line leading-relaxed">
            {message}
          </p>
          <button
            onClick={onClose}
            className="mt-8 bg-[#C9A882] hover:bg-[#b89870] text-[#4E2010] font-bold py-4 px-10 rounded-full transition uppercase text-sm shadow-lg w-full"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </div>
  );
}