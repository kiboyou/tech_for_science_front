"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

// Simple friendly robot built from primitives that gently steps forward and waves
export function Robot() {
  const group = useRef<Group>(null!);
  const rightArm = useRef<Group>(null!);
  const leftArm = useRef<Group>(null!);
  const leftLeg = useRef<Group>(null!);
  const rightLeg = useRef<Group>(null!);
  const bars = [useRef<Mesh>(null!), useRef<Mesh>(null!), useRef<Mesh>(null!), useRef<Mesh>(null!), useRef<Mesh>(null!)];
  const head = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Bigger forward/back float (z amplitude) and vertical bob
    const z = 0.8 + Math.sin(t * 0.8) * 1.0; // center 0.8, amp 1.0
    const y = 0.18 * Math.sin(t * 2.0);
    if (group.current) {
      group.current.position.set(0, y, z);
  group.current.rotation.y = Math.sin(t * 0.6) * 0.28;
    }

    // Wave with right arm
  if (rightArm.current) {
  rightArm.current.rotation.z = Math.sin(t * 2.0) * 1.1 + 0.9; // bigger wave
  rightArm.current.rotation.x = 0.28 * Math.sin(t * 1.4);
    }
    // Slight counter-swing on left arm
    if (leftArm.current) {
  leftArm.current.rotation.z = -0.25 + Math.sin(t * 1.6 + Math.PI) * 0.22;
    }
    // Subtle nod
    if (head.current) {
  head.current.rotation.x = Math.sin(t * 1.1) * 0.12;
  head.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    }

    // Walking/stepping legs
    const step = Math.sin(t * 1.6) * 0.45;
    if (leftLeg.current) leftLeg.current.rotation.x = step;
    if (rightLeg.current) rightLeg.current.rotation.x = -step;

    // Chest LED bars animation
    bars.forEach((ref, i) => {
      const phase = i * 0.6;
      const amp = 0.6 + 0.4 * Math.sin(t * 2.2 + phase);
      const m = ref.current;
      if (m) {
        m.scale.y = 0.6 + amp; // 0.6 -> ~1.6
        m.position.y = 1.05 + (m.scale.y - 1) * 0.12;
      }
    });
  });

  // Brand-aligned colors
  const gold = "#f1c016";
  const teal = "#2dabb2";

  return (
    <group ref={group} position={[0, 0, 0]} scale={[1.75, 1.75, 1.75]}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.2, 0.6]} />
        <meshStandardMaterial color={gold} emissive="#4a3a01" emissiveIntensity={0.12} metalness={0.25} roughness={0.4} />
      </mesh>
      {/* Chest visor */}
      <mesh position={[0, 1.05, 0.31]}>
        <boxGeometry args={[0.62, 0.22, 0.04]} />
        <meshStandardMaterial color="#0b2d2f" emissive="#103e40" emissiveIntensity={0.35} metalness={0.2} roughness={0.6} />
      </mesh>
      {/* LED equalizer bars */}
      {[-0.24, -0.12, 0, 0.12, 0.24].map((x, i) => (
        <mesh key={i} ref={bars[i]} position={[x, 1.05, 0.33]} scale={[1, 1, 1]}>
          <boxGeometry args={[0.04, 0.12, 0.02]} />
          <meshStandardMaterial color={i % 2 ? teal : gold} emissive={i % 2 ? teal : gold} emissiveIntensity={0.6} />
        </mesh>
      ))}
      {/* Head */}
      <mesh ref={head} position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={teal} emissive="#0a3e41" emissiveIntensity={0.12} metalness={0.2} roughness={0.35} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 1.6, 0.31]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="white" emissive="#222" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0.15, 1.6, 0.31]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="white" emissive="#222" emissiveIntensity={0.08} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color={gold} />
      </mesh>
      <mesh position={[0, 2.15, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.3} />
      </mesh>
  {/* Arms */}
      <group ref={rightArm} position={[-0.6, 1.0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color={teal} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
          <meshStandardMaterial color={gold} />
        </mesh>
      </group>

      <group ref={leftArm} position={[0.6, 1.0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color={teal} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
          <meshStandardMaterial color={gold} />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={leftLeg} position={[-0.25, 0.0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.9, 10]} />
          <meshStandardMaterial color={teal} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.25, 0.0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.9, 10]} />
          <meshStandardMaterial color={teal} />
        </mesh>
      </group>
      {/* Halo ring behind for extra flair */}
      <mesh position={[0, 1.0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 12, 64]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.35} metalness={0.2} roughness={0.4} />
      </mesh>
      {/* Ground shadow catcher (stronger) */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color="#000" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}
