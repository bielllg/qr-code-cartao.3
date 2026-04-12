import React, { useState } from 'react';
import { motion } from 'framer-motion';
import portfolioImg from '../../img/gemini-portfolio.webp';

export const PortfolioButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="https://portfolio-gabriel-eight-flax.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ver Portfólio"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center w-[214px] h-[54px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none overflow-hidden"
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
        className="absolute right-7 font-bold text-white text-[15px] tracking-wide whitespace-nowrap"
      >
        Ver Portfólio
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
          src={portfolioImg}
          alt="Portfólio"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.a>
  );
};
