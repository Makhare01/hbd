"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Singleton audio element
let globalAudio: HTMLAudioElement | null = null;

const AUDIO_ID = "global-hbd-music";
const STORAGE_KEY = "hbd-music-time";

const ensureAudio = () => {
  if (typeof window === "undefined") return null;
  let audio = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = AUDIO_ID;
    audio.src = "/hbd-music.mp3";
    audio.loop = true;
    audio.hidden = true;
    document.body.appendChild(audio);
  }
  return audio;
};

const BackgroundMusic = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    globalAudio = ensureAudio();
    if (!globalAudio) return;

    // Restore playback position
    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (savedTime && !isNaN(Number(savedTime))) {
      globalAudio.currentTime = Number(savedTime);
    }

    // Save playback position periodically
    const saveTime = () => {
      if (globalAudio) {
        localStorage.setItem(STORAGE_KEY, String(globalAudio.currentTime));
      }
    };
    globalAudio.addEventListener("timeupdate", saveTime);

    // Clean up
    return function cleanup() {
      if (globalAudio) {
        globalAudio.removeEventListener("timeupdate", saveTime);
      }
    };
  }, []);

  useEffect(() => {
    if (!globalAudio) return;
    if (pathname === "/") {
      globalAudio.pause();
      globalAudio.currentTime = 0;
    } else {
      globalAudio.play().catch(() => {
        // Do nothing if autoplay is blocked
      });
    }
  }, [pathname]);

  return null;
};

export default BackgroundMusic;
