"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-5">
      <h1 className="font-display text-5xl text-white">Something went wrong.</h1>
      <p className="mt-4 text-mist">The page did not finish loading. You can try again.</p>
      <button type="button" onClick={reset} className="mt-8 inline-flex min-h-12 w-fit items-center bg-red px-6 text-sm tracking-[0.16em] text-white uppercase">
        Try again
      </button>
    </div>
  );
}
