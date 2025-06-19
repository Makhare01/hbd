"use client";

import { useEffect, useRef } from "react";

interface BlowDetectorProps {
  onBlow: () => void;
  threshold?: number; // Optional: allow customizing sensitivity
}

const DEFAULT_THRESHOLD = 0.2; // Adjust as needed

const BlowDetector: React.FC<BlowDetectorProps> = ({
  onBlow,
  threshold = DEFAULT_THRESHOLD,
}) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const blowingRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (cancelled) return;
        streamRef.current = stream;
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const detect = () => {
          if (!analyserRef.current || !dataArrayRef.current) return;
          analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
          // Calculate normalized volume
          let sum = 0;
          for (let i = 0; i < dataArrayRef.current.length; i++) {
            const val = (dataArrayRef.current[i] - 128) / 128;
            sum += val * val;
          }
          const volume = Math.sqrt(sum / dataArrayRef.current.length);
          if (volume > threshold) {
            if (!blowingRef.current) {
              blowingRef.current = true;
              onBlow();
            }
          } else {
            blowingRef.current = false;
          }
          animationFrameRef.current = requestAnimationFrame(detect);
        };
        detect();
      } catch {
        // Silently do nothing if permission denied or not available
      }
    })();
    return () => {
      cancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [onBlow, threshold]);

  return null;
};

export default BlowDetector;
