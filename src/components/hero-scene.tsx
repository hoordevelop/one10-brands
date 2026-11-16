"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

function Stage({ animate, mobile }: { animate: boolean; mobile: boolean }) {
  const mass = useRef<Group>(null);
  const rings = useRef<Group>(null);
  const spin = useRef(0);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [invalidate, animate, mobile]);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    if (animate) spin.current += step;
    const t = spin.current;
    if (mass.current) {
      mass.current.rotation.y = t * 0.18;
      mass.current.rotation.x = Math.sin(t * 0.22) * 0.12;
    }
    if (rings.current) {
      rings.current.rotation.z = t * 0.1;
      rings.current.rotation.x = 0.55 + Math.sin(t * 0.16) * 0.06;
    }
    const camera = state.camera;
    const drift = animate ? t : 0.4;
    const reach = mobile ? 0.16 : 0.38;
    camera.position.set(
      Math.sin(drift * 0.11) * reach,
      0.22 + Math.sin(drift * 0.07) * 0.07,
      4.35 + Math.sin(drift * 0.05) * (mobile ? 0.04 : 0.12),
    );
    camera.lookAt(0.2, 0, 0);
  });

  const detail = mobile ? 0 : 1;
  const shards = mobile ? 3 : 5;

  return (
    <>
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#090909", 3.4, 10]} />
      <ambientLight intensity={0.16} />
      <directionalLight position={[2.8, 3.2, 2.4]} intensity={0.42} color="#f4f4f4" />
      <pointLight position={[-2.1, 0.6, 1.8]} intensity={8} distance={9} color="#d71920" />
      <pointLight position={[2.2, -0.8, 1.2]} intensity={2.4} distance={7} color="#d71920" />
      <group position={[0.55, 0.05, 0]}>
        <group ref={mass}>
          <mesh>
            <icosahedronGeometry args={[1.02, detail]} />
            <meshStandardMaterial color="#161616" metalness={0.88} roughness={0.26} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[1.48, 0]} />
            <meshBasicMaterial color="#d71920" wireframe transparent opacity={0.22} />
          </mesh>
        </group>
        <group ref={rings}>
          <mesh rotation={[0.7, 0.15, 0]}>
            <torusGeometry args={[1.72, 0.012, 8, mobile ? 40 : 80]} />
            <meshStandardMaterial
              color="#d71920"
              emissive="#d71920"
              emissiveIntensity={0.7}
              metalness={0.35}
              roughness={0.4}
            />
          </mesh>
          <mesh rotation={[1.15, 0.4, 0.2]}>
            <torusGeometry args={[2.05, 0.006, 8, mobile ? 36 : 72]} />
            <meshStandardMaterial color="#6e1014" emissive="#d71920" emissiveIntensity={0.25} />
          </mesh>
        </group>
        {Array.from({ length: shards }, (_, index) => {
          const angle = (index / shards) * Math.PI * 2;
          return (
            <mesh key={index} position={[Math.cos(angle) * 2.3, Math.sin(angle) * 0.55, Math.sin(angle) * 1.1 - 0.4]}>
              <boxGeometry args={[0.08, 0.08, 0.28]} />
              <meshStandardMaterial color="#1c1c1c" emissive="#d71920" emissiveIntensity={0.18} metalness={0.6} roughness={0.35} />
            </mesh>
          );
        })}
      </group>
      <gridHelper args={[16, mobile ? 12 : 20, "#4a1012", "#171717"]} position={[0.4, -1.55, 0]} />
    </>
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const width = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(width.matches);
    apply();
    width.addEventListener("change", apply);
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      width.removeEventListener("change", apply);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry?.isIntersecting ?? false), {
      threshold: 0.08,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted || reduce === null) return null;

  const animate = reduce === false && onScreen && pageVisible;

  return (
    <div ref={host} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        dpr={mobile ? 1 : [1, 1.35]}
        frameloop={animate ? "always" : "demand"}
        camera={{ position: [0.2, 0.25, 4.4], fov: mobile ? 46 : 40, near: 0.1, far: 20 }}
        gl={{
          antialias: !mobile,
          alpha: false,
          powerPreference: mobile ? "low-power" : "high-performance",
          stencil: false,
        }}
      >
        <Stage animate={animate} mobile={mobile} />
      </Canvas>
    </div>
  );
}
