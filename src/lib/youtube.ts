import profile from "@/data/profile.json";
import videosFallback from "@/data/videos.json";

export type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  date: string;
  duration?: string;
  url: string;
  playlistId?: string;
};

// The one eJPT-related item allowed in the Videos section: the playlist
// itself, not the individual eJPT videos (those are filtered out below).
const EJPT_PLAYLIST_ID = "PL8IqB6CZ63ln_-nI2oX57nh0tGR7UeMkk";

function formatViews(raw: string): string {
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const days = Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
  if (days < 1) return "today";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return `${w} week${w > 1 ? "s" : ""} ago`;
  }
  if (days < 365) {
    const m = Math.floor(days / 30);
    return `${m} month${m > 1 ? "s" : ""} ago`;
  }
  const y = Math.floor(days / 365);
  return `${y} year${y > 1 ? "s" : ""} ago`;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Excludes INE/eJPT-branded videos (the eJPT playlist card covers that
// content instead — see getEjptPlaylistCard below).
function isEjpt(title: string): boolean {
  return /\b(INE|eJPT)\b/i.test(title);
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function findAll(node: Json, key: string, out: Json[]): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) findAll(item, key, out);
    return;
  }
  for (const k of Object.keys(node)) {
    if (k === key) out.push(node[k]);
    else findAll(node[k], key, out);
  }
}

function asObj(v: Json | undefined): { [key: string]: Json } | null {
  return v && typeof v === "object" && !Array.isArray(v) ? v : null;
}
function asArr(v: Json | undefined): Json[] | null {
  return Array.isArray(v) ? v : null;
}
function asStr(v: Json | undefined): string {
  return typeof v === "string" ? v : "";
}

/**
 * Scrapes the channel's "Videos" tab (the ytInitialData JSON YouTube embeds
 * in the page's initial HTML — no JS execution or API key needed) instead of
 * the public RSS feed, which caps out at the 15 most recent uploads and was
 * hiding most of the channel's real (non-Short) videos. Every lockupViewModel
 * with content type VIDEO is a genuine long-form upload; Shorts use a
 * different renderer entirely, so no separate Shorts filter is needed here.
 */
async function scrapeChannelVideos(channelId: string): Promise<VideoItem[] | null> {
  const res = await fetch(`https://www.youtube.com/channel/${channelId}/videos`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const html = await res.text();
  const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (!match) return null;

  const data = JSON.parse(match[1]) as Json;
  const lockups: Json[] = [];
  findAll(data, "lockupViewModel", lockups);

  const seen = new Set<string>();
  const videos: VideoItem[] = [];

  for (const raw of lockups) {
    const lockup = asObj(raw);
    if (!lockup) continue;

    const id = asStr(lockup.contentId);
    const contentType = asStr(lockup.contentType);
    if (!id || seen.has(id) || contentType !== "LOCKUP_CONTENT_TYPE_VIDEO") continue;

    const metadataVm = asObj(asObj(lockup.metadata)?.lockupMetadataViewModel);
    const title = decodeEntities(asStr(asObj(metadataVm?.title)?.content));
    if (!title || isEjpt(title)) continue;

    const rows = asArr(
      asObj(asObj(metadataVm?.metadata)?.contentMetadataViewModel)?.metadataRows
    );
    const parts = asArr(asObj(rows?.[0])?.metadataParts) ?? [];
    const views = asStr(asObj(asObj(parts[0])?.text)?.content).replace(/\s*views?$/i, "");
    const date = asStr(asObj(asObj(parts[1])?.text)?.content);

    const thumbOverlays =
      asArr(asObj(asObj(lockup.contentImage)?.thumbnailViewModel)?.overlays) ?? [];
    const bottomOverlay = thumbOverlays
      .map((o) => asObj(o)?.thumbnailBottomOverlayViewModel)
      .find((o): o is Json => !!o);
    const badges = asArr(asObj(bottomOverlay)?.badges) ?? [];
    const duration = asStr(asObj(asObj(badges[0])?.thumbnailBadgeViewModel)?.text);

    seen.add(id);
    videos.push({
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      views,
      date,
      duration,
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }

  return videos.length > 0 ? videos : null;
}

// Fetches the eJPT playlist's RSS feed and builds a single card that embeds
// the whole playlist (not the individual videos in it).
async function getEjptPlaylistCard(): Promise<VideoItem | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${EJPT_PLAYLIST_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const xml = await res.text();

    const feedTitle = decodeEntities(
      xml.match(/<feed[\s\S]*?<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? ""
    );
    const entries = xml.split("<entry>").slice(1);
    const firstId = entries[0]?.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
    if (!feedTitle || !firstId) return null;

    return {
      id: firstId,
      title: feedTitle,
      thumbnail: `https://i.ytimg.com/vi/${firstId}/hqdefault.jpg`,
      views: "",
      date: "Playlist",
      duration: `${entries.length} Videos`,
      url: `https://www.youtube.com/playlist?list=${EJPT_PLAYLIST_ID}`,
      playlistId: EJPT_PLAYLIST_ID,
    };
  } catch {
    return null;
  }
}

// Fallback if the channel page scrape ever fails: the public RSS feed is
// simpler but only exposes the 15 most recent uploads.
async function getVideosViaRss(channelId: string): Promise<VideoItem[] | null> {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const xml = await res.text();

  const videos: VideoItem[] = xml
    .split("<entry>")
    .slice(1)
    .map((entry) => {
      const pick = (re: RegExp) => entry.match(re)?.[1] ?? "";
      const id = pick(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const title = decodeEntities(pick(/<title>([\s\S]*?)<\/title>/).trim());
      const isShort = /\/shorts\//.test(entry);
      return {
        isShort,
        video: {
          id,
          title,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          views: formatViews(pick(/<media:statistics[^>]*views="(\d+)"/)),
          date: timeAgo(pick(/<published>(.*?)<\/published>/)),
          url: `https://www.youtube.com/watch?v=${id}`,
        },
      };
    })
    .filter(({ video }) => video.id && video.title && !isEjpt(video.title))
    .filter(({ isShort }) => !isShort)
    .map(({ video }) => video);

  return videos.length > 0 ? videos : null;
}

/**
 * Fetches the channel's real videos (Shorts and INE/eJPT videos excluded —
 * the eJPT playlist is added as its own card instead). Set
 * `youtubeChannelId` in data/profile.json (starts with "UC..."). Falls back
 * to data/videos.json when unset or unreachable, so the site always renders.
 * Revalidates hourly; every Netlify rebuild also refreshes.
 */
export async function getLatestVideos(): Promise<VideoItem[]> {
  const channelId = profile.youtubeChannelId;
  if (!channelId) return videosFallback;

  try {
    const videos =
      (await scrapeChannelVideos(channelId)) ?? (await getVideosViaRss(channelId));
    if (!videos || videos.length === 0) return videosFallback;

    const playlistCard = await getEjptPlaylistCard();
    return playlistCard ? [...videos, playlistCard] : videos;
  } catch {
    return videosFallback;
  }
}
