"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  PRODUCT_IMAGE_DIMENSIONS,
  PRODUCT_IMAGE_SIZES,
  DEFAULT_IMAGE_QUALITY,
} from "@/utils/imageUtils";

interface Produto {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

interface ItensModalProps {
  show: boolean;
  produto: Produto | null;
  onClose: () => void;
}

export default function ItensModal({ show, produto, onClose }: ItensModalProps) {
  const [showFullImage, setShowFullImage] = useState(false);

  React.useEffect(() => {
    if (show || showFullImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show, showFullImage]);

  if (!show || !produto) return null;

  const isBeverageOrCoffee = produto.nome.toLowerCase().includes("café") || produto.nome.toLowerCase().includes("cappuccino") || produto.nome.toLowerCase().includes("suco") || produto.nome.toLowerCase().includes("coca") || produto.nome.toLowerCase().includes("guaraná") || produto.nome.toLowerCase().includes("água");
  const isSoda = produto.nome.toLowerCase().includes("coca") || produto.nome.toLowerCase().includes("guaraná");
  const isWater = produto.nome.toLowerCase().includes("água");
  const isJuice = produto.nome.toLowerCase().includes("suco");

  return (
    <>
      {showFullImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowFullImage(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl h-auto">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              width={PRODUCT_IMAGE_DIMENSIONS.width * 2}
              height={PRODUCT_IMAGE_DIMENSIONS.height * 2}
              quality={95}
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      )}

      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-modal-title"
      >
        <motion.div
          className="relative bg-[#E6C697] text-[#4E2010] rounded-xl sm:rounded-2xl shadow-[2px_2px_4px_rgba(0,0,0,0.45)] w-full max-w-2xl mx-auto overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center text-white hover:text-gray-200 bg-[#4E2010] hover:bg-[#3D1A0D] rounded-full transition-all shadow-lg"
            aria-label="Fechar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">
            <div
              className="relative w-full md:w-2/5 h-64 sm:h-72 md:h-auto md:min-h-[300px] cursor-pointer flex-shrink-0 overflow-hidden rounded-t-xl sm:rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              onClick={() => setShowFullImage(true)}
            >
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                sizes={PRODUCT_IMAGE_SIZES}
                quality={DEFAULT_IMAGE_QUALITY}
                className="object-cover"
                priority={false}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>

            <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between min-h-[240px]">
              <div>
                <h3 id="item-modal-title" className="text-xl sm:text-2xl font-bold text-[#4E2010]">
                  {produto.nome}
                </h3>
                <p className="mt-2 text-sm text-[#4E2010]/80 leading-relaxed">
                  {produto.descricao}
                </p>

                {isBeverageOrCoffee && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-[#4E2010] mb-2">{isJuice ? "Sabores disponíveis:" : "Tamanhos disponíveis:"}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {isSoda && (
                        <>
                          <li className="text-sm text-[#4E2010]/80">Pequeno (200ml)</li>
                          <li className="text-sm text-[#4E2010]/80">Médio (600ml)</li>
                          <li className="text-sm text-[#4E2010]/80">Grande (2 litros)</li>
                        </>
                      )}
                      {isWater && (
                        <li className="text-sm text-[#4E2010]/80">500ml</li>
                      )}
                      {isJuice && (
                        <>
                          <li className="text-sm text-[#4E2010]/80">Laranja</li>
                          <li className="text-sm text-[#4E2010]/80">Uva</li>
                          <li className="text-sm text-[#4E2010]/80">Abacaxi</li>
                        </>
                      )}
                      {!isSoda && !isWater && !isJuice && (
                        <>
                          <li className="text-sm text-[#4E2010]/80">Pequeno (P)</li>
                          <li className="text-sm text-[#4E2010]/80">Médio (M)</li>
                          <li className="text-sm text-[#4E2010]/80">Grande (G)</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-[#4E2010]">{produto.preco}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
