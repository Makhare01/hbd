"use client";

import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import BlowDetector from "./BlowDetector";

const STATE_MACHINE_NAME = "State Machine 1";

const CakePage = () => {
  const router = useRouter();

  const { rive, RiveComponent } = useRive({
    src: "/hbd.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    onStateChange: (event) => {
      if (Array.isArray(event.data) && event.data.includes("CandleFlameOut")) {
        router.push("/flowers");
      }
    },
  });

  const onIsBlowingInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "IsBlowing"
  );

  const inputRef = useRef(onIsBlowingInput);

  useEffect(() => {
    inputRef.current = onIsBlowingInput;
  }, [onIsBlowingInput]);

  return (
    <div className="w-full h-full">
      <BlowDetector
        onBlow={() => {
          if (inputRef.current) {
            inputRef.current.value = true;
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.value = false;
              }
            }, 500);
            // Optionally reset after a delay
          }
        }}
      />
      <RiveComponent className="w-screen h-screen" />
    </div>
  );
};

export default CakePage;
