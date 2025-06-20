"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageTransition } from "./PageTransition";

export const Confety = () => {
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio("/clapping.mp3");
    audio.play();
    audio.onended = () => {
      router.push("/cake");
    };
  }, [router]);

  const { RiveComponent } = useRive({
    src: "/boomer.riv",
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return (
    <PageTransition>
      <RiveComponent className="w-screen h-screen" />
    </PageTransition>
  );
};
