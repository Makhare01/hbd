import React, { useState } from "react";

interface GlassyModalBinaryStepProps {
  binaryValue: string;
  setBinaryValue: (v: string) => void;
  setError: (v: string) => void;
  setStep: (v: "emoji" | "binary" | "decrypted") => void;
  setDecrypted: (v: string) => void;
  error: string;
}

const ENCRYPTED_TEXT =
  "01010011 01101101 01101001 01101100 01100101 00100000 11110000 10011111 10011000 10001010 00101100 00100000 01001100 01101111 01110110 01100101 00100000 01010101 00100000 11100010 10011101 10100100 11101111 10111000 10001111";

const GlassyModalBinaryStep: React.FC<GlassyModalBinaryStepProps> = ({
  binaryValue,
  setBinaryValue,
  setError,
  setStep,
  setDecrypted,
  error,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ENCRYPTED_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  function binaryToText(binary: string): string {
    // Remove all non-binary characters and split by spaces
    const bytes = binary
      .trim()
      .split(/\s+/)
      .map((b) => parseInt(b, 2));
    // Convert to Uint8Array
    const uint8 = new Uint8Array(bytes);
    // Decode as UTF-8
    try {
      return new TextDecoder().decode(uint8);
    } catch {
      return "Invalid binary message";
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-2">
        <div className="flex-1 text-xs text-white bg-white/10 rounded p-2 font-mono break-words whitespace-pre-wrap">
          {ENCRYPTED_TEXT}
        </div>
        <button
          className={`relative bg-blue-500 text-white font-bold py-2 px-3 rounded hover:bg-blue-600 transition flex items-center justify-center ${
            copied ? "bg-green-500" : ""
          }`}
          onClick={handleCopy}
          disabled={copied}
        >
          {copied ? (
            <span className="transition-all animate-pulse">Copied!</span>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <textarea
        className="p-2 rounded bg-white/20 text-white placeholder-white/70 outline-none border border-white/20 min-h-[80px]"
        placeholder="Enter hidden binary message..."
        value={binaryValue}
        onChange={(e) => {
          setBinaryValue(e.target.value);
          setError("");
        }}
      />
      {error && <div className="text-red-400 font-bold">{error}</div>}
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition w-full"
        onClick={() => {
          try {
            const clean = binaryValue.trim();
            if (!clean) throw new Error("Invalid binary message");
            const text = binaryToText(clean);
            if (!text || text === "Invalid binary message")
              throw new Error("Invalid binary message");
            setDecrypted(text);
            setStep("decrypted");
          } catch {
            setError("Invalid binary message");
          }
        }}
      >
        Decrypt
      </button>
    </>
  );
};

export default GlassyModalBinaryStep;
