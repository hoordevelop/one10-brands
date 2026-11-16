"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function introAlreadySeen() {
  return (
    sessionStorage.getItem("one10-intro") === "1" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Intro() {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const seen = useSyncExternalStore(
    () => () => {},
    introAlreadySeen,
    () => true,
  );

  useEffect(() => {
    if (seen || dismissed || reduce) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("one10-intro", "1");
      setDismissed(true);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [seen, dismissed, reduce]);

  if (seen || dismissed || reduce) return null;

  function close() {
    sessionStorage.setItem("one10-intro", "1");
    setDismissed(true);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-label="One10 introduction"
    >
      <motion.p
        className="font-display text-7xl tracking-[0.18em] text-white sm:text-8xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ONE10
      </motion.p>
      <motion.span
        className="mt-5 h-px w-40 origin-left bg-red"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      />
      <motion.p
        className="mt-4 text-[0.72rem] tracking-[0.42em] text-mist"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        BRANDS MARKETING
      </motion.p>
      <button
        type="button"
        onClick={close}
        className="mt-10 text-xs tracking-[0.22em] text-mist uppercase hover:text-white"
      >
        Skip
      </button>
    </motion.div>
  );
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceQuery.matches) return;

    const dots = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      s: Math.random() * 0.15 + 0.04,
    }));
    let frame = 0;
    let alive = true;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!alive || !canvas || !context) return;
      if (document.hidden) {
        frame = requestAnimationFrame(draw);
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of dots) {
        dot.y -= dot.s / 600;
        if (dot.y < 0) dot.y = 1;
        context.beginPath();
        context.fillStyle = "rgba(215,25,32,0.55)";
        context.arc(dot.x * canvas.width, dot.y * canvas.height, dot.r, 0, Math.PI * 2);
        context.fill();
      }
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}

export function Counters() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState(reduce ? [12, 5] : [0, 0]);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 900);
          const eased = 1 - Math.pow(1 - t, 3);
          setValues([Math.round(12 * eased), Math.round(5 * eased)]);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  const items = [
    { value: values[0], label: "Service lines" },
    { value: values[1], label: "Process stages" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6">
      {items.map((item) => (
        <div key={item.label} className="border-t border-white/15 pt-4">
          <p className="font-display text-6xl leading-none text-white sm:text-7xl">
            {String(item.value).padStart(2, "0")}
          </p>
          <p className="mt-2 text-sm text-mist">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function move(event: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  }

  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`transition-transform duration-300 ${className}`}>
      {children}
    </div>
  );
}

export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        style={{ y }}
        className="sweep absolute -right-24 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.45),transparent_68%)] blur-2xl"
      />
    </div>
  );
}
