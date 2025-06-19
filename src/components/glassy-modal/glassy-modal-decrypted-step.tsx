import React from "react";

interface GlassyModalDecryptedStepProps {
  decrypted: string;
}

const GlassyModalDecryptedStep: React.FC<GlassyModalDecryptedStepProps> = ({
  decrypted,
}) => (
  <div className="text-white text-lg font-mono break-words whitespace-pre-wrap p-4 bg-white/10 rounded">
    {decrypted}
  </div>
);

export default GlassyModalDecryptedStep;
