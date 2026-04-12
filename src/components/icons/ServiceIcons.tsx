import React from "react";
import { Globe, Wand2, ShieldCheck, Bot } from "lucide-react";

// Wrapper usando CSS puro para evitar conflitos de propagação do framer-motion no componente pai
const AnimatedIcon = ({ children, delay = 0 }) => (
  <div
    className="text-white hover:rotate-6 transition-transform duration-300"
    style={{
      animation: `floatIcon 4s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
);

export const SiteIcon = ({ size = 60, stroke = "#ffffff" }) => (
  <AnimatedIcon delay={0}>
    <Globe size={size} color={stroke} strokeWidth={1.5} />
  </AnimatedIcon>
);

export const DesignIcon = ({ size = 60, stroke = "#ffffff" }) => (
  <AnimatedIcon delay={1}>
    <Wand2 size={size} color={stroke} strokeWidth={1.5} />
  </AnimatedIcon>
);

export const SecurityIcon = ({ size = 60, stroke = "#ffffff" }) => (
  <AnimatedIcon delay={2}>
    <ShieldCheck size={size} color={stroke} strokeWidth={1.5} />
  </AnimatedIcon>
);

export const AutomationIcon = ({ size = 60, stroke = "#ffffff" }) => (
  <AnimatedIcon delay={3}>
    <Bot size={size} color={stroke} strokeWidth={1.5} />
  </AnimatedIcon>
);
