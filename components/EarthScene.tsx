"use client";

import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Group, MathUtils, Mesh, Vector2 } from "three";

export const SCENE_MOTION = {
  idleRotation: 0.045,
  scrollRotation: 0.18,
  pointerStrength: 0.12,
};

type EarthSceneProps = { scrollProgress: number; pointer: Vector2; modelUrl?: string };

function LoadedEarth({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const earth = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={earth} scale={1.42} position={[0, -0.18, 0]} />;
}

function FallbackEarth() {
  const islands = [
    [-0.73, 0.35, 0.51, 0.18], [-0.18, 0.7, 0.42, 0.13], [0.56, 0.28, 0.56, 0.2],
    [0.62, -0.38, 0.34, 0.13], [-0.4, -0.5, 0.43, 0.15], [0.05, -0.78, 0.34, 0.1],
  ];
  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.48, 64, 64]} />
        <meshStandardMaterial color="#b7d5ca" roughness={0.95} metalness={0} />
      </mesh>
      <mesh scale={1.014}>
        <sphereGeometry args={[1.48, 64, 64]} />
        <meshBasicMaterial color="#e5bf71" transparent opacity={0.21} />
      </mesh>
      {islands.map(([x, y, width, height], index) => (
        <mesh key={index} position={[x, y, 1.27]} rotation={[0, 0, (index - 2) * 0.45]}>
          <circleGeometry args={[width, 32]} />
          <meshBasicMaterial color={index % 2 ? "#cf9942" : "#d9ae58"} transparent opacity={0.9} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.7, 0.2, -0.1]}>
        <torusGeometry args={[1.63, 0.018, 8, 100]} />
        <meshBasicMaterial color="#f9f0dc" transparent opacity={0.52} />
      </mesh>
    </group>
  );
}

function SacredEarth({ scrollProgress, pointer, modelUrl }: EarthSceneProps) {
  const group = useRef<Group>(null!);
  const earth = useRef<Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.x * SCENE_MOTION.pointerStrength, 4, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -pointer.y * SCENE_MOTION.pointerStrength, 4, delta);
    earth.current.rotation.y += delta * (SCENE_MOTION.idleRotation + scrollProgress * SCENE_MOTION.scrollRotation);
    earth.current.position.y = Math.sin(t * 0.45) * 0.025 - scrollProgress * 0.22;
  });

  return (
    <group ref={group}>
      <Float speed={0.5} rotationIntensity={0.03} floatIntensity={0.25}>
        <group ref={earth}>
          {modelUrl ? <Suspense fallback={<FallbackEarth />}><LoadedEarth url={modelUrl} /></Suspense> : <FallbackEarth />}
        </group>
      </Float>
    </group>
  );
}

export default function EarthScene(props: EarthSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 35, position: [0, 0, 6.15] }}
      shadows
      className="!absolute inset-0"
    >
      <ambientLight intensity={1.75} color="#dcedf1" />
      <directionalLight castShadow position={[-4, 5, 5]} intensity={2.15} color="#fff6d9" shadow-mapSize={[512, 512]} />
      <directionalLight position={[4, 1, -3]} intensity={0.5} color="#b1e3f0" />
      <SacredEarth {...props} />
    </Canvas>
  );
}
