"use client";
import dynamic from "next/dynamic";

const Physics = dynamic(() => import("@react-three/rapier").then((m) => m.Physics), { ssr: false });
const RigidBody = dynamic(() => import("@react-three/rapier").then((m) => m.RigidBody), { ssr: false });
const CuboidCollider = dynamic(() => import("@react-three/rapier").then((m) => m.CuboidCollider), { ssr: false });
const BallCollider = dynamic(() => import("@react-three/rapier").then((m) => m.BallCollider), { ssr: false });

export function PhysicsLab() {
  return (
    <Physics gravity={[0, -1.0, 0]}>
      {/* Floor and bounds colliders */}
      <RigidBody type="fixed">
        <CuboidCollider args={[6, 0.25, 6]} position={[0, -2.2, 0]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[6, 0.25, 6]} position={[0, 2.2, 0]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.25, 6, 6]} position={[6, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.25, 6, 6]} position={[-6, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[6, 6, 0.25]} position={[0, 0, 6]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[6, 6, 0.25]} position={[0, 0, -6]} />
      </RigidBody>

      {new Array(64).fill(0).map((_, i) => {
        const r = 0.26 + ((i % 3) * 0.06);
        const px = Math.sin(i) * 2.4;
        const py = 1.2 + ((i % 5) * 0.35);
        const pz = Math.cos(i) * 2.4;
        const vx = (Math.random() - 0.5) * 1.2;
        const vy = (Math.random() - 0.3) * 0.8;
        const vz = (Math.random() - 0.5) * 1.2;
        return (
          <RigidBody
            key={i}
            position={[px, py, pz]}
            restitution={0.92}
            friction={0.08}
            linearDamping={0.02}
            angularDamping={0.02}
            linearVelocity={[vx, vy, vz]}
          >
            <BallCollider args={[r]} />
            <mesh>
              <sphereGeometry args={[r, 24, 24]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#f1c016" : "#2dabb2"}
                emissive={i % 2 === 0 ? "#2a2200" : "#0a3e41"}
                emissiveIntensity={0.12}
                metalness={0.3}
                roughness={0.3}
              />
            </mesh>
          </RigidBody>
        );
      })}
    </Physics>
  );
}
