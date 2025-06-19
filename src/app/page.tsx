"use client";

import { Confety } from "@/components/confetty";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect, useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const STATE_MACHINE_NAME = "State Machine 1";

  const { rive, RiveComponent } = useRive({
    src: "/gift.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const isOverlayInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "isoverlay"
  );

  const onClick = () => {
    if (rive) {
      rive.pause();
    }
    const audio = new Audio("/open.mp3");
    audio.play();
    audio.onended = () => {
      setClicked(true);
    };
  };

  useEffect(() => {
    const animate = () => {
      if (isOverlayInput) {
        isOverlayInput.value = true;
        setTimeout(() => {
          if (isOverlayInput) {
            isOverlayInput.value = false;
          }
        }, 500);
      }
    };

    const intervalId = setInterval(() => {
      animate();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isOverlayInput]);

  return !clicked ? (
    <RiveComponent
      className="w-screen h-screen"
      onClick={onClick}
      onTouchEnd={onClick}
    />
  ) : (
    <Confety />
  );
}
