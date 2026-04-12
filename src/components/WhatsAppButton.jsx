import React, { useState } from 'react';
import { motion } from 'framer-motion';
import whatsappIcon from '../assets/whatsapp-icon.png';

export const WhatsAppButton = ({ numeroTelefone = "31988004874", mensagemPadrao = "Olá! Gostaria de obter mais informações." }) => {
  const whatsappUrl = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagemPadrao)}`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center w-[214px] h-[54px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-[0_10px_40px_rgba(255,255,255,0.5)] hover:shadow-[0_15px_60px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-105 focus:outline-none overflow-hidden"
    >
      {/* Texto: Começa na direita e desliza para a esquerda */}
      <motion.span
        animate={isHovered ? { x: -48 } : { x: [0, -48, 0, 0] }}
        transition={isHovered ?
          { duration: 0.3, ease: "easeOut" } :
          {
            duration: 3,
            times: [0, 0.4, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }
        }
        className="absolute right-5 font-bold text-white text-[15px] tracking-wide whitespace-nowrap"
      >
        Entrar em contato
      </motion.span>

      {/* Círculo com a imagem: Começa na esquerda e desliza para a direita */}
      <motion.div
        animate={isHovered ? { x: 160 } : { x: [0, 160, 0, 0] }}
        transition={isHovered ?
          { duration: 0.3, ease: "easeOut" } :
          {
            duration: 3,
            times: [0, 0.4, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }
        }
        className="absolute left-[6px] flex items-center justify-center w-[42px] h-[42px] rounded-full z-10 shadow-sm overflow-hidden bg-white"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.a>
  );
};
