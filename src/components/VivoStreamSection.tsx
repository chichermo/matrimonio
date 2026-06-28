"use client";

import { useState } from "react";
import { weddingConfig } from "@/lib/config";
import { VideoFrame } from "@/components/VideoFrame";
import { StreamPlayer } from "@/components/StreamPlayer";
import { StreamChatPanel } from "@/components/StreamChatPanel";
import { WeddingCountdown } from "@/components/WeddingCountdown";

export function VivoStreamSection() {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <>
      {!isStreaming && (
        <div className="mb-4 sm:mb-6 max-w-2xl mx-auto">
          <WeddingCountdown />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-stretch">
        <div className="lg:col-span-2 min-w-0 flex">
          <div className="w-full">
            <VideoFrame
              coupleNames={weddingConfig.coupleNames}
              weddingDate={weddingConfig.weddingDate}
              location={weddingConfig.location}
              isLive={isStreaming}
            >
              <StreamPlayer onShowPlayerChange={setIsStreaming} />
            </VideoFrame>
          </div>
        </div>

        <div className="lg:col-span-1 min-w-0 flex flex-col">
          <StreamChatPanel
            youtubeVideoId={weddingConfig.youtubeVideoId}
            isLive={isStreaming}
          />
        </div>
      </div>
    </>
  );
}
