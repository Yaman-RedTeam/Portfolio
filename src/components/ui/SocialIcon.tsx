import { SiYoutube, SiInstagram, SiGithub, SiTryhackme } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

// lucide-react@1.23.0 (this project's pinned version) dropped brand/logo
// glyphs, so official marks come from react-icons (Simple Icons + Font
// Awesome) instead. Simple Icons has no LinkedIn glyph (removed for brand
// licensing reasons), so LinkedIn uses Font Awesome's official mark.
export const SOCIAL_ICONS: Record<string, IconType> = {
  Youtube: SiYoutube,
  Linkedin: FaLinkedin,
  Instagram: SiInstagram,
  Github: SiGithub,
  TryHackMe: SiTryhackme,
};
