import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5">
      <p className="font-display text-7xl text-red">404</p>
      <h1 className="mt-4 font-display text-5xl text-white">That page is not on this site.</h1>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center bg-red px-6 text-sm tracking-[0.16em] text-white uppercase">
        Back home
      </Link>
    </div>
  );
}
