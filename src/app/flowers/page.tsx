"use client";

import GlassyModal from "@/components/glassy-modal/glassy-modal";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { useState } from "react";

const FlowersPage = () => {
  const STATE_MACHINE_NAME = "State Machine 1";
  const [showModal, setShowModal] = useState(false);

  const { RiveComponent } = useRive({
    src: "/tulips.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    artboard: "flowers",
  });

  return (
    <div className="w-screen h-screen relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 mt-8 p-3 flex flex-col gap-5 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-lg cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <p className="text-base text-white font-bold text-center text-nowrap leading-10">
          01010011 01101101 01101001 01101100 <br />
          01100101 00100000 11110000 10011111 <br />
          10011000 10001010 00101100 00100000 <br />
          01001100 01101111 01110110 01100101 <br />
          00100000 01010101 00100000 11100010 <br />
          10011101 10100100 11101111 10111000 <br />
          10001111
        </p>
      </div>
      {showModal && <GlassyModal onClose={() => setShowModal(false)} />}
      <RiveComponent className="w-screen h-screen" />
    </div>
  );
};

export default FlowersPage;
