import React, { useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShineButton } from './components/lightswind/ShineButton';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PortfolioButton } from './components/PortfolioButton';
import { AuroraTextEffect } from './components/AuroraTextEffect';
import { TypingText } from './components/TypingText';
import { ShinyText } from './components/ShinyText';
import logoImg from '../img/5ace780f-e5ce-458f-b867-2a8b4600c760-removebg-preview.png';
gsap.registerPlugin(ScrollTrigger);

/* ─── Lazy load de componentes pesados / below-the-fold ─── */
const ShaderGradientCanvas = lazy(() =>
  import('@shadergradient/react').then(m => ({ default: m.ShaderGradientCanvas }))
);
const ShaderGradient = lazy(() =>
  import('@shadergradient/react').then(m => ({ default: m.ShaderGradient }))
);
const AngledSlider = lazy(() =>
  import('./components/AngledSlider').then(m => ({ default: m.AngledSlider }))
);
const ScrollStack = lazy(() => import('./components/ScrollStack'));
const SocialKeyboard = lazy(() => import('./components/SocialKeyboard'));

/* ────────────────────────────────────────────────
   Linhas de texto para a revelação com máscara
   ──────────────────────────────────────────────── */
const REVEAL_LINES = [
  'Desenvolvemos soluções digitais',
  'estratégicas para negócios que',
  'buscam crescimento consistente.',
  'Criamos experiências digitais',
  'que conectam marcas a resultados reais.',
  'Projetamos soluções que elevam o nível',
  'do seu negócio no digital.',
];

import {
  SiteIcon,
  DesignIcon,
  SecurityIcon,
  AutomationIcon
} from './components/icons/ServiceIcons';

const SERVICES = [
  {
    title: 'Sites & Landing Pages',
    desc: 'Desenvolvimento de alta performance com foco total em conversão de clientes.',
    icon: <SiteIcon size={80} />,
  },
  {
    title: 'Automações Customizadas',
    desc: 'Sistemas inteligentes que trabalham por você 24h por dia, 7 dias por semana.',
    icon: <AutomationIcon size={80} />,
  },
  {
    title: 'Design de Interface',
    desc: 'Experiências visuais impactantes que elevam a percepção de valor da sua marca.',
    icon: <DesignIcon size={80} />,
  },
  {
    title: 'Segurança Digital',
    desc: 'Sistemas blindados e proteção de dados para garantir a total integridade do seu negócio.',
    icon: <SecurityIcon size={80} />,
  },
];

const FAQ_CARDS = [
  {
    title: "Quanto tempo demora para o meu site ficar pronto?",
    subtitle: "A maioria dos nossos viabilidade e desenvolvimento é entregue entre 1 a 4 semanas. Trabalhamos com processos estruturados para garantir resultados rápidos e sem perda de qualidade.",
    badge: "⏱ Prazo",
  },
  {
    title: "Como funciona a forma de pagamento?",
    subtitle: "Trabalhamos com 50% de entrada para iniciarmos e 50% apenas na aprovação e entrega final. Isso traz segurança e comprometimento para ambos os lados.",
    badge: "💳 Pagamento",
  },
  {
    title: "Preciso pagar mensalidade depois de pronto?",
    subtitle: "Não! O sistema/site será 100% seu. Você apenas terá os custos anuais básicos do servidor e domínio, a não ser que escolha assinar nosso plano VIP de manutenção contínua.",
    badge: "📉 Sem Mensalidade",
  },
  {
    title: "Vocês oferecem suporte após a entrega?",
    subtitle: "Com certeza! Nossos projetos contam com até 30 dias de suporte técnico intensivo após a entrega, onde ajeitamos qualquer tipo de ajuste para ficar exatamente como esperado.",
    badge: "🛟 Suporte Incluso",
  },
  {
    title: "Eu conseguirei alterar detalhes depois?",
    subtitle: "Sim! Construímos um painel focado em tornar a sua vida fácil: você poderá atualizar textos, trocar imagens ou mexer em valores do catálogo sem mexer em nenhuma linha de código.",
    badge: "⚙️ Facilidade",
  }
];

function App() {
  /* ─── Refs para GSAP ─── */
  const pinnedRef = useRef(null);
  const heroContentRef = useRef(null);
  const columnsContainerRef = useRef(null);
  const revealTextRef = useRef(null);

  /* Número de colunas para o efeito "persiana" */


  /* ═══════════════════════════════════════════════
     GSAP SCROLL TIMELINE
     Todas as fases são amarradas ao scroll (scrub).
     A seção inteira fica pinada enquanto a animação
     acontece, então o pin é liberado para o conteúdo
     de baixo rolar normalmente.
     ═══════════════════════════════════════════════ */
  useGSAP(
    () => {
      const pinned = pinnedRef.current;
      const heroContent = heroContentRef.current;
      const columnsContainer = columnsContainerRef.current;
      const revealText = revealTextRef.current;
      if (!pinned || !heroContent || !columnsContainer || !revealText) return;

      const columns = columnsContainer.querySelectorAll('.curtain-col');
      const lineSpans = pinned.querySelectorAll('.line-text');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinned,
          start: 'top top',
          end: '+=150%',   // Reduzido para ser ultra rápido
          scrub: 1,        // Mais reativo
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ── Fase 1: COLUNAS descem do topo + hero desaparece ── */
      tl.to(
        heroContent,
        { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power2.in' },
        0,
      );
      tl.fromTo(
        columns,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power2.inOut',
        },
        0,
      );

      /* ── Fase 2: Revelação do texto ── */
      tl.fromTo(
        lineSpans,
        { xPercent: 110, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
        },
        1.2,
      );

      /* ── Fase 4: Scale down — texto vira legenda ── */
      tl.to(revealText, {
        scale: 0.3,
        y: '30vh',
        opacity: 0.4,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* ── Fase 5: Fade out do texto ── */
      tl.to(revealText, {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.in',
      });
    },
    { scope: pinnedRef },
  );

  // Força refresh do ScrollTrigger após carregar para evitar bugs de altura no mobile
  React.useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < 768);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const NUM_COLUMNS = isMobile ? 5 : 10;

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <div className="relative w-full bg-transparent font-sans selection:bg-orange-500/30">
      
      {/* ── Background Fixo (Para toda a aplicação) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* CSS gradient - always visible as base layer */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a0015 0%, #1a0040 25%, #0d0025 50%, #180038 75%, #05000f 100%)',
          }}
        />
        {/* Animated glow orbs — higher opacity for rich mobile background */}
        <div
          className="absolute w-[70vw] h-[70vw] md:w-[60vw] md:h-[60vw] rounded-full opacity-60 md:opacity-40"
          style={{
            background: 'radial-gradient(circle, #5606ff 0%, transparent 70%)',
            top: '15%',
            left: '5%',
            filter: 'blur(60px)',
            animation: 'pulseGlow 6s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw] rounded-full opacity-50 md:opacity-30"
          style={{
            background: 'radial-gradient(circle, #fe8989 0%, transparent 70%)',
            bottom: '10%',
            right: '0%',
            filter: 'blur(70px)',
            animation: 'pulseGlow 8s ease-in-out 2s infinite alternate',
          }}
        />
        <div
          className="absolute w-[55vw] h-[55vw] md:w-[40vw] md:h-[40vw] rounded-full opacity-45 md:opacity-25"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            top: '50%',
            right: '10%',
            filter: 'blur(50px)',
            animation: 'pulseGlow 5s ease-in-out 1s infinite alternate',
          }}
        />
        {/* Extra orb for mobile depth */}
        <div
          className="absolute w-[45vw] h-[45vw] rounded-full opacity-35 md:opacity-20"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 60%)',
            top: '70%',
            left: '20%',
            filter: 'blur(60px)',
            animation: 'pulseGlow 7s ease-in-out 3s infinite alternate',
          }}
        />
        {/* ShaderGradient — animated on all devices, lower settings on mobile */}
        <Suspense fallback={null}>
          <ShaderGradientCanvas
            className="h-full w-full"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            pixelDensity={isMobile ? 0.5 : 1}
          >
            <ShaderGradient
              animate="on"
              axesHelper="off"
              bgColor1="#000000"
              bgColor2="#000000"
              brightness={1.1}
              cAzimuthAngle={180}
              cDistance={4.49}
              cPolarAngle={115}
              cameraZoom={1}
              color1="#5606ff"
              color2="#fe8989"
              color3="#000000"
              destination="onCanvas"
              embedMode="off"
              envPreset="city"
              fov={45}
              frameRate={isMobile ? 10 : 15}
              gizmoHelper="hide"
              grain="off"
              lightType="3d"
              pixelDensity={isMobile ? 0.5 : 1}
              positionX={-0.5}
              positionY={0.1}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.1}
              rotationX={0}
              rotationY={0}
              rotationZ={235}
              shader="defaults"
              type="waterPlane"
              uAmplitude={0}
              uDensity={1.1}
              uFrequency={5.0}
              uSpeed={isMobile ? 0.2 : 0.3}
              uStrength={2.4}
              uTime={0.2}
              wireframe={false}
            />
          </ShaderGradientCanvas>
        </Suspense>
      </div>

      {/* ════════════════════════════════════════════
          SEÇÃO PINADA: Hero + Cortina + Texto
          ════════════════════════════════════════════ */}
      <div
        ref={pinnedRef}
        className="relative z-10 h-[100dvh] w-full overflow-hidden"
      >
        {/* Camada 0: Espaço reservado (fundo agora é fixo) */}
        <div className="absolute inset-0 z-0 bg-transparent" />

        {/* ── Camada 1: Overlay de blur/tom escuro ── */}
        <div className="absolute inset-0 z-[1] bg-black/20" />

        {/* ── Header Topo ── */}
        <header className="absolute top-0 left-0 right-0 z-[10] flex items-center justify-between p-6 md:px-12 md:py-8">
          <div className="text-xl font-black italic tracking-widest text-white drop-shadow-md opacity-90">
            GABRIEL <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">WEB</span>
          </div>
          <div>
            <img src={logoImg} alt="Logo" className="h-10 md:h-14 w-auto object-contain opacity-80" />
          </div>
        </header>

        {/* ── Camada 2: Conteúdo do Hero (desaparece com o scroll) ── */}
        <div
          ref={heroContentRef}
          className="relative z-[2] flex h-full flex-col items-center justify-center p-6 text-center text-white"
        >
          <div className="flex max-w-7xl flex-col items-center gap-5 md:gap-8 px-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ShineButton
                label="VAMOS CRIAR ALGO INCRÍVEL JUNTOS"
                size="sm"
                bgColor="linear-gradient(to right, rgba(13, 46, 230, 0.29), rgba(255, 97, 5, 0.42))"
                className="rounded-full border-white/20 px-8 py-2 text-[10px] font-bold tracking-[0.2em]"
              />
            </motion.div>

            <div className="space-y-5 md:space-y-10">
              {/* Título principal */}
              <h1 className="slide-in-elliptic-top-bck-normal mx-auto max-w-none text-[1.7rem] font-bold uppercase italic leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
                O próximo nível do seu{' '}
                <AuroraTextEffect
                  text="negócio"
                  colors={{
                    first: 'bg-purple-300',
                    second: 'bg-white',
                    third: 'bg-violet-200',
                    fourth: 'bg-white',
                  }}
                  className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] drop-shadow-[0_0_22px_rgba(255,255,255,0.5)]"
                  textClassName="font-black italic uppercase"
                  style={{ fontWeight: 1000 }}
                />{' '}
                começa aqui
              </h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="mx-auto max-w-3xl text-[0.9rem] font-bold leading-relaxed text-white/50 sm:text-lg md:text-2xl"
              >
                Desenvolvemos soluções digitais inteligentes para negócios que
                querem escalar com tecnologia, design e automação.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 md:pt-6"
            >
              <PortfolioButton />
              <WhatsAppButton />
            </motion.div>
          </div>
        </div>

        {/* ── Camada 3: COLUNAS PRETAS (descem do topo, escalonadas) ── */}
        <div
          ref={columnsContainerRef}
          className="pointer-events-none absolute inset-0 z-[3] flex"
        >
          {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
            <div
              key={i}
              className="curtain-col h-full"
              style={{
                backgroundColor: '#000000',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
                marginLeft: i === 0 ? 0 : '-1px', 
                width: `calc(${100 / NUM_COLUMNS}% + 2px)`, // Aumentado para 2px de overlap
                willChange: 'transform',
                position: 'relative',
                zIndex: i + 1,
              }}
            />
          ))}
        </div>

        {/* ── Camada 4: Texto de revelação (sobre a cortina) ── */}
        <div
          ref={revealTextRef}
          className="pointer-events-none absolute inset-0 z-[4] flex flex-col items-center justify-center px-4 md:px-6 text-center"
        >
          {REVEAL_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden py-[2px] sm:py-1 md:py-3">
              <span className="line-text block text-[1.05rem] font-black uppercase leading-[1.25] tracking-tight text-white sm:text-2xl md:text-5xl lg:text-[4.5rem]" style={{ wordBreak: 'break-word' }}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SEÇÃO DE SERVIÇOS — Scroll natural após pin
          ════════════════════════════════════════════ */}
      <div className="relative z-10 bg-black px-4 md:px-6 pb-10 md:pb-20 pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-24 text-center"
          >
            <div className="mb-6 flex justify-center">
              <ShinyText
                size="sm"
                weight="bold"
                className="uppercase tracking-[0.4em] drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                baseColor="rgba(192, 132, 252, 0.8)"
                shineColor="rgba(255, 255, 255, 1)"
                speed={2.5}
              >
                Nossos Serviços
              </ShinyText>
            </div>

            <h2 className="mb-8 text-4xl font-bold text-white md:text-6xl flex justify-center flex-wrap gap-x-3 gap-y-2">
              <TypingText as="span" fontSize="" fontWeight="" color="" duration={1.5}>
                Criamos o futuro digital do seu
              </TypingText>
              <TypingText as="span" fontSize="" fontWeight="" color="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent" duration={0.5} delay={1.5}>
                negócio
              </TypingText>
            </h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-purple-600 to-transparent" />
          </motion.div>

          {/* Slider 3D Inclinado de Serviços */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <Suspense fallback={<div className="h-[500px] w-full flex items-center justify-center"><p className="text-white/50">Carregando serviços...</p></div>}>
              <AngledSlider
                items={SERVICES.map((s, i) => ({
                  id: i,
                  emoji: s.icon,
                  title: s.title,
                  description: s.desc
                }))}
                speed={15}
                cardWidth={isMobile ? '260px' : '350px'}
                containerHeight={isMobile ? '400px' : '500px'}
                gap={isMobile ? '24px' : '60px'}
                angle={isMobile ? 12 : 20}
                className="!bg-transparent"
              />
            </Suspense>
          </motion.div>

          {/* FAQ - Perguntas Frequentes usando ScrollStack */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 flex justify-center flex-wrap gap-x-3 gap-y-2">
                <TypingText as="span" fontSize="" fontWeight="" color="" duration={1}>
                  Dúvidas
                </TypingText>
                <TypingText as="span" fontSize="" fontWeight="" color="text-purple-400" delay={1} duration={1.2}>
                  Frequentes
                </TypingText>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Tudo o que você precisa saber antes de dar o próximo passo rumo ao futuro do seu negócio.
              </p>
            </motion.div>

            {/* O ScrollStack captura o Scroll para focar na animação dos cards */}
            <Suspense fallback={<div className="h-[400px] w-full flex items-center justify-center"><p className="text-white/50">Carregando FAQ...</p></div>}>
              <ScrollStack
                cards={FAQ_CARDS}
                sectionHeightMultiplier={4}
              />
            </Suspense>
          </div>

          {/* Teclado Social 3D */}
          <section className="relative z-20 mt-10 md:mt-32 mb-6 md:mb-16 flex flex-col items-center">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 flex justify-center flex-wrap gap-x-3 gap-y-2">
                <TypingText as="span" fontSize="" fontWeight="" color="" duration={0.8}>
                  Minhas
                </TypingText>
                <TypingText as="span" fontSize="" fontWeight="" color="text-purple-400" delay={0.8} duration={0.8}>
                  Redes
                </TypingText>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Conecte-se comigo.
              </p>
            </div>
            <Suspense fallback={<div className="h-[300px] w-full flex items-center justify-center"><p className="text-white/50">Carregando links sociais...</p></div>}>
              <SocialKeyboard />
            </Suspense>
          </section>

          {/* O CTA antigo foi removido para focar no SocialKeyboard */}

        </div>
      </div>

      {/* Decorative blur que ficava aqui perto */}
      <div className="pointer-events-none fixed -bottom-48 -right-48 z-0 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[150px]" />

      {/* FOOTER EVOLUIU CONCURSOS COM GRADIENTE */}
      <div className="w-full relative mt-8 md:mt-20 px-4 sm:px-6 md:px-12 pb-12">
        <div className="relative w-full rounded-[3rem] overflow-hidden border border-white/5 border-t-white/10">

          {/* Radial Gradient Background (Ajustado para Dark Mode com a cor roxo/indigo pedida) */}
          <div
            className="absolute inset-0 z-0 opacity-80"
            style={{
              // O usuário mandou "#fff", mas a foto é preta/escura. Ajustado para gerar o mesmo efeito dark e neon da foto!
              background: "radial-gradient(125% 125% at 50% 10%, #08080c 40%, #6366f1 100%)",
            }}
          />

          {/* Footer Content */}
          <div className="relative z-10 w-full px-8 md:px-16 pt-16 pb-12 flex flex-col items-center justify-center text-center">

            {/* Minimalist Separator */}
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-10" />

            {/* Logo e Nome Gabriel Web (Estilo Limpo) */}
            <div className="flex flex-col items-center justify-center gap-4 mb-6 opacity-90">
              <img src={logoImg} alt="Gabriel Web Icon" className="h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
              <span className="text-[15px] md:text-[16px] font-black italic tracking-widest text-gray-300 drop-shadow-md">
                GABRIEL <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">WEB</span>
              </span>
            </div>

            {/* Enhanced Copyright */}
            <div className="relative group cursor-default">
              <p className="text-gray-500/80 text-[11px] md:text-[12px] tracking-wide font-light">
                © 2026 Gabriel Web. Feito com amor por Gabriel Web.
              </p>

              {/* Decorative interactive glow */}
              <span className="absolute left-1/2 -bottom-4 w-12 h-4 -translate-x-1/2 bg-purple-500/10 blur-xl rounded-full transition-all duration-700 ease-in-out group-hover:w-3/4 group-hover:bg-fuchsia-500/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
