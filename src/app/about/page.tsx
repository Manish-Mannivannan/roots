"use client";

import React, { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience";
import UI from "./UI";
import Header from "../components/header/header";

const AboutPage: React.FC = () => {
  return (
    <main className="flex flex-col w-full h-screen">
      <div className="w-full h-fit flex justify-center z-20 mt-5">
        <Header />
      </div>

      <UI />
      <Loader />

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
