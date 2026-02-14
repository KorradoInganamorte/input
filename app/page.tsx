"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 text-center">
          Text to display
        </h1>

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

        <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-gray-900 bg-white dark:bg-slate-900 shadow-sm min-h-[200px] p-6 flex items-center justify-center">
          {text ? (
            <p className="text-slate-800 dark:text-slate-100 text-lg whitespace-pre-wrap break-words text-center">
              {text}
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Your text will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
