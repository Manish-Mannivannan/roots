"use client";

import React, { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import Marquee from "./marquee";
import Image from "next/image";

// 1) Your list of picture keys
const pictures: string[] = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

// 2) A typed Page entry
interface Page {
  front: string;
  back: string;
}

// 3) Build your pages array exactly as before
export const pageAtom = atom(0);
export const pages: Page[] = [];

// cover
pages.push({ front: "book-cover", back: pictures[0] });

// pairs of interior pages
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i],
    back: pictures[i + 1],
  });
}

// back cover
pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

const UI: React.FC = () => {
  const [page, setPage] = useAtom(pageAtom);

  const soundMount = useRef(false);
  useEffect(() => {
    if (!soundMount.current) {
      soundMount.current = true;
      return;
    }
    const audio = new Audio("/audios/page-flip-01a.mp3")
    audio.play()
  }, [page])
  
  return (
    <>
      {/* BUTTON BAR */}
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        {/* Dont remove DIV it breaks the buttons from flex between*/}
        <div></div>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {pages.map((_, idx) => (
              <button
                key={idx}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  idx === page ? "bg-white/90 text-black" : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(idx)}
              >
                {idx === 0 ? "Cover" : `Page ${idx}`}
              </button>
            ))}
            {/* back‐cover button */}
            <button
              key="back-cover"
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <Marquee />
    </>
  );
};

export default UI;
