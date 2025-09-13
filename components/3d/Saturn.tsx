"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Saturn() {
  const group = useRef<THREE.Group>(null!);
  const moon1 = useRef<THREE.Mesh>(null!);
  const moon2 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.14;
    const t = state.clock.getElapsedTime();
    const r1 = 3.8;
    const r2 = 5.0;
    if (moon1.current) moon1.current.position.set(Math.cos(t * 0.6) * r1, 0.38 * Math.sin(t * 0.8), Math.sin(t * 0.6) * r1);
    if (moon2.current) moon2.current.position.set(Math.cos(t * 0.35 + 1.2) * r2, -0.32 * Math.sin(t * 0.5), Math.sin(t * 0.35 + 1.2) * r2);
  });

  return (
    <group ref={group} rotation={[0.15, 0, 0]}>
      {/* Planet */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#d4b483" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Rings */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[2.0, 3.2, 96]} />
  <meshPhysicalMaterial color="#efd68f" opacity={0.6} transparent side={THREE.DoubleSide} roughness={0.6} metalness={0.05} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[3.3, 3.6, 96]} />
  <meshPhysicalMaterial color="#c5b87a" opacity={0.35} transparent side={THREE.DoubleSide} roughness={0.7} metalness={0.03} />
      </mesh>

      {/* Moons */}
      <mesh ref={moon1}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh ref={moon2}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.85} metalness={0.05} />
      </mesh>
    </group>
  );
}
