"use client";

import React, { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience";
import UI from "./UI"

const AboutPage: React.FC = () => {
  return (
    <main className="relative w-screen h-screen">
      {/* Overlay UI & loading indicator */}
      <UI />
      <Loader />

      {/* 3D canvas */}
      <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </main>
  );
};

export default AboutPage;
