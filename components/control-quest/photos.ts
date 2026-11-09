import fs from "node:fs";
import path from "node:path";
import { gallery } from "./content";

export type Photo = { src: string; alt: string };

const PHOTO_DIR = path.join(process.cwd(), "public", "control-quest", "photos");
const PHOTO_EXT = /\.(jpe?g|png|webp|avif)$/i;
const toSrc = (file: string) => `/control-quest/photos/${encodeURIComponent(file)}`;

/** Every photo in public/control-quest/photos/, read when the page is built. */
export function listPhotos(): Photo[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(PHOTO_DIR).filter((f) => PHOTO_EXT.test(f));
  } catch {
    return [];
  }
  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(0, gallery.max)
    .map((file, i) => ({ src: toSrc(file), alt: gallery.alt[file] ?? gallery.fallbackAlt(i + 1) }));
}

/** One named photo, or null when that file is not in the folder. */
export function findPhoto(file: string): Photo | null {
  if (!fs.existsSync(path.join(PHOTO_DIR, file))) return null;
  return { src: toSrc(file), alt: gallery.alt[file] ?? "" };
}
