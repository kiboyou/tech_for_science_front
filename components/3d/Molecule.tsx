"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import * as THREE from "three";

const Float = dynamic(() => import("@react-three/drei").then((m) => m.Float), { ssr: false });

export function Molecule() {
  const H_POS: [number, number, number][] = useMemo(() => [
    [1.9, 1.5, 0],
    [-1.8, 1.2, 0.8],
    [1.4, -1.6, 1.1],
    [-1.5, -1.4, -1.2],
  ], []);
  return (
    <Float floatIntensity={2.2} speed={1}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshStandardMaterial color="#475569" metalness={0.25} roughness={0.3} />
      </mesh>
      {H_POS.map((p, i) => (
        <mesh key={i} position={p as any}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.4} />
        </mesh>
      ))}
      {H_POS.map((p, i) => (
        <Bond key={i} a={[0, 0, 0]} b={p as any} />
      ))}
    </Float>
  );
}

export function Bond({ a, b }: { a: [number, number, number]; b: [number, number, number] }) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const dir = new THREE.Vector3().subVectors(end, start);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  const euler = new THREE.Euler().setFromQuaternion(quat);
  return (
  <mesh position={[mid.x, mid.y, mid.z]} rotation={[euler.x, euler.y, euler.z]}>
  <cylinderGeometry args={[0.1, 0.1, len, 16]} />
  <meshStandardMaterial color="#a3b8be" metalness={0.35} roughness={0.3} />
    </mesh>
  );
}
