import React from "react";

interface GlassyModalEmojiStepProps {
  inputValue: string;
  setInputValue: (v: string) => void;
  setError: (v: string) => void;
  setStep: (v: "emoji" | "binary" | "decrypted") => void;
  error: string;
}

const GlassyModalEmojiStep: React.FC<GlassyModalEmojiStepProps> = ({
  inputValue,
  setInputValue,
  setError,
  setStep,
  error,
}) => (
  <>
    <input
      className="p-2 rounded bg-white/20 text-white placeholder-white/70 outline-none border border-white/20"
      type="text"
      placeholder="Type the emoji..."
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        setError("");
      }}
    />
    {error && <div className="text-red-400 font-bold">{error}</div>}
    <button
      className="bg-white/20 text-white font-bold py-2 rounded hover:bg-white/30 transition"
      onClick={() => {
        if (inputValue === "🐣") {
          setStep("binary");
          setError("");
        } else {
          setError("Incorrect emoji");
        }
      }}
    >
      Submit
    </button>
  </>
);

export default GlassyModalEmojiStep;
