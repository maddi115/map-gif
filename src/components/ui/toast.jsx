import React from 'react';

export default function Toast({ message }) {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] animate-toast">
      <div className="bg-white text-black px-6 py-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold text-sm flex items-center gap-2 border border-zinc-200">
        <span>✨</span> {message}
      </div>
    </div>
  );
}
