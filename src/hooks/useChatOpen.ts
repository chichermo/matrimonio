"use client";

import { useEffect, useState } from "react";
import { getWeddingDate } from "@/lib/config";

const CHAT_BEFORE_MS = 15 * 60 * 1000;
const CHAT_DURATION_MS = 2 * 60 * 60 * 1000;

export function useChatOpen(isStreaming: boolean) {
  const [timeOpen, setTimeOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      const ceremony = getWeddingDate().getTime();
      setTimeOpen(now >= ceremony - CHAT_BEFORE_MS && now <= ceremony + CHAT_DURATION_MS);
    };
    check();
    const id = setInterval(check, 15000);
    return () => clearInterval(id);
  }, []);

  return isStreaming || timeOpen;
}
