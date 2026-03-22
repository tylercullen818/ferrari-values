"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function CarBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const bodyMat = (
    <meshStandardMaterial
      color="#DC0000"
      metalness={0.9}
      roughness={0.15}
    />
  );

  const darkMat = (
    <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.3} />
  );

  const glassMat = (
    <meshPhysicalMaterial
      color="#222222"
      metalness={0.1}
      roughness={0}
      transmission={0.6}
      thickness={0.2}
    />
  );

  const wheelMat = (
    <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
  );

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[3.2, 0.45, 1.3]} />
        {bodyMat}
      </mesh>

      {/* Hood slope - front */}
      <mesh position={[1.2, 0.25, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[1.2, 0.35, 1.25]} />
        {bodyMat}
      </mesh>

      {/* Rear section */}
      <mesh position={[-1.1, 0.3, 0]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[1.0, 0.4, 1.28]} />
        {bodyMat}
      </mesh>

      {/* Cabin */}
      <mesh position={[0.1, 0.72, 0]}>
        <boxGeometry args={[1.4, 0.35, 1.1]} />
        {glassMat}
      </mesh>

      {/* Cabin roof taper */}
      <mesh position={[-0.15, 0.72, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.8, 0.34, 1.08]} />
        {glassMat}
      </mesh>

      {/* Front splitter */}
      <mesh position={[1.75, 0.1, 0]}>
        <boxGeometry args={[0.3, 0.06, 1.4]} />
        {darkMat}
      </mesh>

      {/* Rear diffuser */}
      <mesh position={[-1.65, 0.12, 0]}>
        <boxGeometry args={[0.2, 0.08, 1.35]} />
        {darkMat}
      </mesh>

      {/* Rear spoiler */}
      <mesh position={[-1.55, 0.6, 0]}>
        <boxGeometry args={[0.15, 0.04, 1.4]} />
        {bodyMat}
      </mesh>

      {/* Side skirts */}
      <mesh position={[0, 0.1, 0.7]}>
        <boxGeometry args={[3.0, 0.08, 0.06]} />
        {darkMat}
      </mesh>
      <mesh position={[0, 0.1, -0.7]}>
        <boxGeometry args={[3.0, 0.08, 0.06]} />
        {darkMat}
      </mesh>

      {/* Wheels */}
      {[
        [1.05, 0, 0.7],
        [1.05, 0, -0.7],
        [-1.0, 0, 0.7],
        [-1.0, 0, -0.7],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
            {wheelMat}
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.08, 8, 24]} />
            <meshStandardMaterial color="#222" metalness={0.3} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[1.85, 0.35, 0.4]}>
        <boxGeometry args={[0.05, 0.1, 0.25]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[1.85, 0.35, -0.4]}>
        <boxGeometry args={[0.05, 0.1, 0.25]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-1.75, 0.35, 0.4]}>
        <boxGeometry args={[0.05, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[-1.75, 0.35, -0.4]}>
        <boxGeometry args={[0.05, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 8, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[-8, 5, -5]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#DC0000"
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffdddd" />
      <CarBody />
      <Environment preset="city" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.9}
          roughness={0.4}
        />
      </mesh>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 rounded-full border-2 border-[#DC0000]/20 border-t-[#DC0000] animate-spin" />
    </div>
  );
}

export function HeroCar() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [4, 2.5, 4], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
