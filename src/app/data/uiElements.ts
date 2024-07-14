"use client"

import { useState } from "react";

export const useCopyButtonState = () => {
  const [copyButtonState, setCopyButtonState] = useState<string>("copy.svg");

  const copyButtonTimer = () => {
    setCopyButtonState("copyConfirm.svg");
    setTimeout(() => {
      setCopyButtonState("copy.svg");
    }, 3000);
  };

  return { copyButtonState, copyButtonTimer };
};