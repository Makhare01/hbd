import React from "react";

interface GlassyModalDecryptedStepProps {
  decrypted: string;
  onBack: () => void;
}

const GlassyModalDecryptedStep: React.FC<GlassyModalDecryptedStepProps> = ({
  decrypted,
  onBack,
}) => {
  const isEmpty = !decrypted || decrypted.trim() === "";
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white text-lg font-mono break-words whitespace-pre-wrap p-4 bg-white/10 rounded">
        {isEmpty ? (
          <span className="text-red-400 font-bold">
            Failed to decrypt message.
          </span>
        ) : (
          decrypted
        )}
      </div>
      <button
        className="bg-pink-500/30 text-white font-bold py-2 px-4 rounded hover:bg-pink-500 transition self-end w-full"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
};

export default GlassyModalDecryptedStep;
