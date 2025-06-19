import React from "react";

interface GlassyModalTitleCloseProps {
  onClose: () => void;
}

const GlassyModalTitleClose: React.FC<GlassyModalTitleCloseProps> = ({
  onClose,
}) => (
  <div className="flex items-center justify-between mb-4 w-full">
    <div className="flex-1 text-center text-white text-lg font-bold tracking-wide select-none">
      open hidden message
    </div>
    <button
      className="text-white text-xl font-bold bg-black/30 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/50 transition ml-2"
      onClick={onClose}
      aria-label="Close"
    >
      ×
    </button>
  </div>
);

export default GlassyModalTitleClose;
