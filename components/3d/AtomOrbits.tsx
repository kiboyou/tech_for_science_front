"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function AtomOrbits() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#f1c016" metalness={0.4} roughness={0.25} emissive="#2a2200" emissiveIntensity={0.08} />
      </mesh>
      {[2.6, 3.4, 4.2].map((r, i) => (
        <Electron key={i} r={r} tilt={(i - 1) * 0.4} speed={[1.0, 1.3, 0.8][i]} phase={i * 1.2} />
      ))}
    </group>
  );
}

function Electron({ r = 2.5, tilt = 0.2, speed = 1.0, phase = 0.0 }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ang = t * speed + phase;
    const x = r * Math.cos(ang);
    const y = r * Math.sin(ang) * Math.cos(tilt);
    const z = r * Math.sin(ang) * Math.sin(tilt);
    if (ref.current) ref.current.position.set(x, y, z);
  });
  return (
  <mesh ref={ref}>
  <sphereGeometry args={[0.16, 16, 16]} />
  <meshStandardMaterial color="#2dabb2" emissive="#0a3e41" metalness={0.3} roughness={0.3} />
    </mesh>
  );
}
