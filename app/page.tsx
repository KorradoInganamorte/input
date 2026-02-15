"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePasteClick = async () => {
    try {
      const items = await navigator.clipboard.read();

      for (const item of items) {
        if (item.types.includes("image/png")) {
          const blob = await item.getType("image/png");
          const url = URL.createObjectURL(blob);

          setPastedImage(url); return;
        }

        if (item.types.includes("image/jpeg")) {
          const blob = await item.getType("image/jpeg");
          const url = URL.createObjectURL(blob);

          setPastedImage(url); return;
        }

        if (item.types.includes("image/webp")) {
          const blob = await item.getType("image/webp");
          const url = URL.createObjectURL(blob);

          setPastedImage(url); return;
        }
      }

      fileInputRef.current?.click();
    } catch {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file?.type.startsWith("image/")) {
      setPastedImage(URL.createObjectURL(file));
    }

    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 text-center">
          Text to display
        </h1>

        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handlePasteClick}
            className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-gray-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-gray-500 hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:hover:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 font-medium transition-colors"
          >
            Paste image or choose file
          </button>
        </div>

        <label className="block">
          <span className="sr-only">Enter your text</span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something here..."
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
          />
        </label>

        <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-gray-900 bg-white dark:bg-slate-900 shadow-sm min-h-[100px] p-6 flex items-center justify-center">
          {text ? (
            <p className="text-slate-800 dark:text-slate-100 text-lg whitespace-pre-wrap wrap-break-word text-center">
              <span className="text-slate-900">. </span>
              {text}
              <span className="text-slate-900"> .</span>
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Your text will appear here
            </p>
          )}
        </div>

        <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-gray-900 bg-white dark:bg-slate-900 shadow-sm min-h-[120px] p-4 flex items-center justify-center overflow-hidden">
          {pastedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pastedImage}
              alt="Pasted"
              className="max-w-full max-h-[400px] object-contain"
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Pasted image will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
