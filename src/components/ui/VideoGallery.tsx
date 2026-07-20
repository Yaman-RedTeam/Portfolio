"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Eye, MonitorPlay } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Marquee from "@/components/ui/Marquee";
import type { VideoItem } from "@/lib/youtube";

export default function VideoGallery({ videos }: { videos: VideoItem[] }) {
  const [active, setActive] = useState<VideoItem | null>(null);
  const pending = (video: VideoItem) => video.id.startsWith("pending-");

  return (
    <>
      <Marquee speed={45} edgeColor="#0a0d10">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="cyber-card w-[340px] shrink-0 overflow-hidden group text-left"
          >
            <div className="relative w-full aspect-video bg-white/5 overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="340px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle
                  className="text-neon-red drop-shadow-[0_0_14px_rgba(255,0,60,0.9)]"
                  size={48}
                />
              </div>
              <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-neon-red/90 text-[10px] font-hack uppercase tracking-wider text-white">
                <MonitorPlay size={11} /> {video.playlistId ? "Playlist" : "Watch"}
              </span>
              {video.duration && (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-hack text-white">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold leading-snug mb-2 line-clamp-2 text-sm">
                {video.title}
              </h3>
              <p className="flex items-center gap-1.5 text-white/50 text-xs font-hack">
                <Eye size={12} />
                {video.views && <>{video.views} views &middot; </>}
                {video.date}
              </p>
            </div>
          </button>
        ))}
      </Marquee>

      <Modal open={!!active} onClose={() => setActive(null)} panelClassName="max-w-3xl">
        {active && (
          <div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
              {pending(active) ? (
                <div className="absolute inset-0 flex items-center justify-center font-hack text-sm text-white/40 uppercase tracking-wider">
                  Link coming soon
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={
                    active.playlistId
                      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${active.playlistId}&autoplay=1&rel=0`
                      : `https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`
                  }
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            <h3 className="font-display font-semibold text-base mt-4 pr-6">{active.title}</h3>
            <p className="flex items-center gap-1.5 text-white/50 text-xs font-hack mt-1">
              <Eye size={12} />
              {active.views && <>{active.views} views &middot; </>}
              {active.date}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
