"use client"

import { useState } from "react";

export const useCopyButtonState = () => {
  const [copyButtonState, setCopyButtonState] = useState<string>("UI/copy.svg");

  const copyButtonTimer = () => {
    setCopyButtonState("UI/copyConfirm.svg");
    setTimeout(() => {
      setCopyButtonState("UI/copy.svg");
    }, 3000);
  };

  return { copyButtonState, copyButtonTimer };
};