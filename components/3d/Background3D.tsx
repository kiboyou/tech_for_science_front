"use client";
import { useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useRef } from "react";
import * as THREE from "three";

const Canvas = dynamic(() => import("@react-three/fiber").then(m => m.Canvas), { ssr: false });
const Stars = dynamic(() => import("@react-three/drei").then(m => m.Stars), { ssr: false });
const Float = dynamic(() => import("@react-three/drei").then(m => m.Float), { ssr: false });

function FloatingOrbs() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.05;
  });
  return (
    <group ref={ref}>
      <Float floatIntensity={0.6} speed={0.6} rotationIntensity={0.2}>
        <mesh position={[3, 1, -4]}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#f1c016" roughness={0.4} metalness={0.3} emissive="#2a2200" emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[-2, -0.5, -3]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.2} emissive="#1a1a1a" emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[0.5, 1.6, -2]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#2dabb2" roughness={0.45} metalness={0.25} emissive="#0a3e41" emissiveIntensity={0.12} />
        </mesh>
      </Float>
    </group>
  );
}

export function Global3DBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-60 md:opacity-80 dark:opacity-80">
      <Canvas
        camera={{ fov: 60, position: [0, 0, 8] }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
        }}
      >
        <ambientLight intensity={0.12} />
        <directionalLight position={[5, 5, 5]} intensity={0.18} />
        <Stars radius={80} depth={40} count={800} factor={3} saturation={0} fade speed={0.5} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
