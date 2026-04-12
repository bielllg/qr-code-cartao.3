import React, { useState } from 'react';

// --- Dados das Redes Sociais ---
const skillsData = [
  { id: 'github', name: 'GitHub', color: '#181717', shadow: '#0D0D0D', textColor: '#FFFFFF', level: 'bielllg', desc: 'Meus Repositórios', link: 'https://github.com/bielllg', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { id: 'whatsapp', name: 'WhatsApp', color: '#25D366', shadow: '#128C7E', textColor: '#FFFFFF', level: '(31) 98800-4874', desc: 'Mensagens Diretas', link: 'https://wa.me/5531988004874', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
  { id: 'gmail', name: 'Gmail', color: '#EA4335', shadow: '#B31404', textColor: '#FFFFFF', level: 'g.leonardo...com', desc: 'Contato Profissional', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=g.leonardo2008@gmail.com', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', shadow: '#04417E', textColor: '#FFFFFF', level: 'gabriel-reis...', desc: 'Networking', link: 'https://www.linkedin.com/in/gabriel-reis-a09373358/', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { id: 'portfolio', name: 'Portfólio', color: '#8B5CF6', shadow: '#5B21B6', textColor: '#FFFFFF', level: 'Acesse Aqui', desc: 'Meus Projetos', link: 'https://portfolio-gabriel-eight-flax.vercel.app/', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg> }
];

// Layout das linhas do teclado 
const keyboardLayout = [
  ['github', 'portfolio', 'linkedin'],
  ['whatsapp', 'gmail']
];

// --- Componente da Tecla ---
const Keycap = ({ skill, isActive, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      // CORREÇÃO AQUI: Tamanho fixo (w-16 h-16 sm:w-20 sm:h-20) no contentor pai 
      // Garante que a área de deteção do rato não se mexe quando a tecla é pressionada
      className="relative group cursor-pointer preserve-3d w-16 h-16 sm:w-20 sm:h-20"
      onMouseEnter={() => onMouseEnter(skill)}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        if (skill.link) window.open(skill.link, '_blank', 'noopener,noreferrer');
      }}
    >
      {/* A Tecla 3D */}
      <div 
        className={`keycap-element w-full h-full rounded-xl flex items-center justify-center transition-all duration-150 ease-out`}
        style={{
          backgroundColor: skill.color,
          color: skill.textColor,
          '--shadow-color': skill.shadow,
          // CORREÇÃO: Translação negativa no X (-12px) e positiva no Y (12px).
          // Isto afunda a tecla exatamente na direção em que a sombra é projetada!
          transform: isActive ? 'translate(-12px, 12px)' : 'translate(0px, 0px)',
          boxShadow: isActive 
            ? `-2px -2px 0px rgba(255,255,255,0.2) inset, 
               -1px 1px 0px var(--shadow-color), 
               -2px 2px 0px var(--shadow-color), 
               -10px 10px 30px var(--shadow-color),
               0px 0px 50px ${skill.color}` /* <-- Brilho intenso da cor da própria tecla ao afundar! */
            : `-2px -2px 0px rgba(255,255,255,0.2) inset, 
               -1px 1px 0px var(--shadow-color),
               -2px 2px 0px var(--shadow-color),
               -3px 3px 0px var(--shadow-color),
               -4px 4px 0px var(--shadow-color),
               -5px 5px 0px var(--shadow-color),
               -6px 6px 0px var(--shadow-color),
               -7px 7px 0px var(--shadow-color),
               -8px 8px 0px var(--shadow-color),
               -9px 9px 0px var(--shadow-color),
               -10px 10px 0px var(--shadow-color),
               -11px 11px 0px var(--shadow-color),
               -12px 12px 0px var(--shadow-color),
               -13px 13px 0px var(--shadow-color),
               -14px 14px 0px var(--shadow-color),
               -15px 15px 30px rgba(0,0,0,0.9)`
        }}
      >
        <div className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_25px_rgba(255,255,255,1)] opacity-100 scale-125' : 'drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] opacity-90'}`}>
          {skill.icon}
        </div>
      </div>

      {/* Holograma Popup - Efeito Roxo e Realista */}
      <div 
        className={`hologram-popup absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-out z-50
          ${isActive ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="bg-slate-900/70 backdrop-blur-xl border border-purple-400/40 rounded-xl p-4 shadow-[0_0_40px_rgba(147,51,234,0.5),inset_0_0_20px_rgba(168,85,247,0.2)] w-48 flex flex-col items-center">
          
          <div className="w-12 h-12 mb-2 p-2 bg-gradient-to-br from-white/10 to-transparent rounded-lg border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]" style={{ color: skill.color }}>
             {skill.icon}
          </div>
          
          <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-1 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">{skill.name}</h3>
          <p className="text-purple-300 text-xs font-semibold mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.9)]">{skill.level}</p>
          <p className="text-slate-300 text-xs text-center border-t border-purple-500/30 pt-2 w-full">{skill.desc}</p>
          
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-14 h-16 bg-gradient-to-t from-transparent via-purple-600/20 to-purple-400/60 blur-md pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal ---
export default function SocialKeyboard() {
  const [activeSkillId, setActiveSkillId] = useState(null);

  const rows = keyboardLayout.map(row => 
    row.map(id => skillsData.find(skill => skill.id === id))
  );

  return (
    <div className="w-full relative flex flex-col items-center justify-center font-sans overflow-visible py-20 z-20">
      
      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }

        .isometric-board {
          transform: perspective(1200px) rotateX(55deg) rotateZ(-35deg);
          transform-style: preserve-3d;
        }

        .hologram-popup {
          transform-origin: bottom center;
          transform: translateZ(20px) rotateZ(35deg) rotateX(-55deg) translateY(-20px) scale(0.9);
        }
        
        .group:hover .hologram-popup, .group:active .hologram-popup {
          transform: translateZ(60px) rotateZ(35deg) rotateX(-55deg) translateY(-60px) scale(1);
        }

        .keycap-element {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>

      {/* O Tabuleiro Isométrico */}
      <div className="isometric-board relative select-none preserve-3d mt-10">
        <div className="flex flex-col gap-6 sm:gap-8 preserve-3d">
          {rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex gap-6 sm:gap-8 preserve-3d"
              style={{ marginLeft: `${rowIndex * 2.5}rem` }} 
            >
              {row.map(skill => skill && (
                <Keycap 
                  key={skill.id} 
                  skill={skill} 
                  isActive={activeSkillId === skill.id}
                  onMouseEnter={(s) => setActiveSkillId(s.id)}
                  onMouseLeave={() => setActiveSkillId(null)}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Sombra base */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 blur-2xl -translate-z-10 -translate-y-4 rounded-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
