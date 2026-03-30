import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarUrl(seed: string) {
  // Using high-quality "lorelei" style for a more premium cartoonish feel
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

export function resolveAvatar(photo: string | undefined | null, seed: string) {
    if (!photo || photo.includes("pexels.com") || photo === "/avatar.png") {
        return getAvatarUrl(seed);
    }
    return photo;
}
