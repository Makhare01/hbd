"use client";
import { useEffect } from "react";

const RequestMicrophonePermission = () => {
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {
        // Silently ignore errors
      });
    }
  }, []);
  return null;
};

export default RequestMicrophonePermission;
