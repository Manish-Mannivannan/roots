"use client";

import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import Book from "./book";

const Experience: React.FC = () => {
  return (
    <>
      <Book />
      {/* OrbitControls lets you rotate/zoom the scene with the mouse */}
      <OrbitControls />

      {/* Environment adds an HDRI studio light setup */}
      <Environment preset="studio" />

      {/* A directional “sun” light */}
      <directionalLight
        // position = [x, y, z]
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        // improve shadow map resolution
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        // small bias to reduce shadow artifacts
        shadow-bias={-0.0001}
      />

      {/* A ground plane that receives shadows */}
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;