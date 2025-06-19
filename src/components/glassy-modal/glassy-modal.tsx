import React, { useState } from "react";
import GlassyModalBinaryStep from "./glassy-modal-binary-step";
import GlassyModalDecryptedStep from "./glassy-modal-decrypted-step";
import GlassyModalEmojiStep from "./glassy-modal-emoji-step";
import GlassyModalTitleClose from "./glassy-modal-title-close";

interface GlassyModalProps {
  onClose: () => void;
}

const GlassyModal: React.FC<GlassyModalProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"emoji" | "binary" | "decrypted">("emoji");
  const [binaryValue, setBinaryValue] = useState("");
  const [decrypted, setDecrypted] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 pt-5 flex flex-col gap-4 min-w-[300px] max-w-[450px]">
        <GlassyModalTitleClose onClose={onClose} />
        {step === "emoji" && (
          <GlassyModalEmojiStep
            inputValue={inputValue}
            setInputValue={setInputValue}
            setError={setError}
            setStep={setStep}
            error={error}
          />
        )}
        {step === "binary" && (
          <GlassyModalBinaryStep
            binaryValue={binaryValue}
            setBinaryValue={setBinaryValue}
            setError={setError}
            setStep={setStep}
            setDecrypted={setDecrypted}
            error={error}
          />
        )}
        {step === "decrypted" && (
          <GlassyModalDecryptedStep
            decrypted={decrypted}
            onBack={() => setStep("binary")}
          />
        )}
      </div>
    </div>
  );
};

export default GlassyModal;
