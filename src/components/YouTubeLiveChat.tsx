"use client";

import { useEffect, useState } from "react";

interface YouTubeLiveChatProps {
  videoId: string;
}

export function YouTubeLiveChat({ videoId }: YouTubeLiveChatProps) {
  const [embedDomain, setEmbedDomain] = useState("");

  useEffect(() => {
    setEmbedDomain(window.location.hostname);
  }, []);

  if (!embedDomain) {
    return (
      <div className="flex items-center justify-center h-full min-h-[320px] text-sm text-foreground/40">
        Cargando chat...
      </div>
    );
  }

  return (
    <iframe
      src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embedDomain}`}
      title="Chat en vivo"
      className="w-full h-full min-h-[320px] sm:min-h-[400px] border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
}
