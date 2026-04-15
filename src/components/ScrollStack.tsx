"use client";
import React, { useEffect, useRef, useState } from "react";

export interface ScrollStackCard {
  title: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
  content?: React.ReactNode;
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
  backgroundColor?: string;
  className?: string;
  sectionHeightMultiplier?: number;
}

const defaultBackgrounds = [
  // Texturas escuras e ultralimpas para não roubar a atenção do texto
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800", // dark liquid abstract
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800", // dark minimal geometric
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800", // deep dark gradient
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800", // deep dark minimal
];

const ScrollStack: React.FC<ScrollStackProps> = ({
  cards,
  backgroundColor = "bg-transparent",
  className = "",
  sectionHeightMultiplier = 4,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollableSectionRef = useRef<HTMLElement>(null);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !scrollableSectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollContainer = scrollableSectionRef.current;
      
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.5;
      
      const hasCompletedScroll = 
        scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
        
      const isAtTop = scrollContainer.scrollTop <= 10;

      if (isInView && !hasCompletedScroll && e.deltaY > 0) {
        e.preventDefault();
        scrollContainer.scrollTop += e.deltaY;
      } else if (isInView && !isAtTop && e.deltaY < 0) {
        e.preventDefault();
        scrollContainer.scrollTop += e.deltaY;
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current || !scrollableSectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollContainer = scrollableSectionRef.current;
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.5;
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const hasCompletedScroll = scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      const isAtTop = scrollContainer.scrollTop <= 10;

      if (isInView && !hasCompletedScroll && deltaY > 0) {
        e.preventDefault();
        scrollContainer.scrollTop += deltaY;
      } else if (isInView && !isAtTop && deltaY < 0) {
        e.preventDefault();
        scrollContainer.scrollTop += deltaY;
      }
    };

    if (isIntersecting) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isIntersecting]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
    
    if (scrollHeight > 0) {
      const scrollProgress = scrollTop / scrollHeight;
      const newIndex = Math.min(
        Math.floor(scrollProgress * cards.length),
        cards.length - 1
      );
      
      if (newIndex !== activeCardIndex) {
        setActiveCardIndex(newIndex);
      }
    }
  };

  const getCardTransform = (index: number) => {
    // Para ver a primeira carta imediatamente, considero index 0 sempre visível.
    const isVisible = activeCardIndex >= index;
    const scale = 0.9 + index * 0.05;
    
    // Deixamos a carta escondida "para baixo" inicialmente, se ela for 1+.
    let translateY = "150px";

    if (isVisible) {
      // Posiciona as ativas com efeito de empilhamento (escada invertida)
      translateY = `${90 - index * 30}px`;
    }

    return {
      transform: `translateY(${translateY}) scale(${scale})`,
      opacity: isVisible ? 1 : 0,
      zIndex: 10 + index * 10,
      pointerEvents: (isVisible ? "auto" : "none") as any,
    };
  };

  return (
    <section
      ref={scrollableSectionRef}
      onScroll={handleScroll}
      // CRÍTICO: Removido overflow-y-scroll e colocado overflow-hidden
      // para evitar que o mouse dê scroll nativo nas cartas ANTES da tela travar.
      className="relative w-full h-[85vh] overflow-hidden [&::-webkit-scrollbar]:hidden"
    >
      <div
        ref={sectionRef}
        className={`relative ${className}`}
        style={{ height: `${sectionHeightMultiplier * 100}vh` }}
      >
        <div
          className={`sticky top-0 w-full h-[85vh] flex items-center justify-center overflow-hidden ${backgroundColor}`}
        >
          <div className="relative w-full max-w-4xl mx-auto h-[350px] md:h-[450px]">
            {cards.map((card, index) => {
              const bg =
                card.backgroundImage ||
                defaultBackgrounds[index % defaultBackgrounds.length];

              return (
                <div
                  key={index}
                  // CRÍTICO: left-0 em vez de left-1/2 -translate-x-[50%] previne quebras
                  className="absolute top-0 left-0 w-full overflow-hidden shadow-2xl border border-white/10 rounded-[24px] bg-[#0c0c0c] transition-all duration-700 ease-out"
                  style={{
                    height: "100%",
                    ...getCardTransform(index),
                  }}
                >
                  {/* Imagem de fundo minimalista bem sutil */}
                  <div
                    className="absolute inset-0 z-0 opacity-[0.12] saturate-50"
                    style={{
                      backgroundImage: `url('${bg}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  
                  {/* Gradiente por cima da imagem: preto profundo, porém não agressivo (um pouquinho mais translúcido) */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-[#0d0d0d]/85 to-[#050505]/95" />

                  {/* Efeito Glow Roxo Suave como antes */}
                  <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[100%] bg-purple-800/25 blur-[100px] z-0 pointer-events-none rounded-full" />

                  {card.badge && (
                    <div className="absolute top-6 right-6 z-20">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg">
                        <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-purple-200">
                          {card.badge}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-8 sm:p-10 md:p-12 h-full flex flex-col justify-center">
                    {card.content ? (
                      card.content
                    ) : (
                      <div className="max-w-2xl">
                        <h3 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg">
                          {card.title}
                        </h3>
                        {card.subtitle && (
                          <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium drop-shadow-md">
                            {card.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;
