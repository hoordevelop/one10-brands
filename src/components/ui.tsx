import Link from "next/link";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-mist">
      <span className="h-px w-8 bg-red" aria-hidden />
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const look =
    variant === "solid"
      ? "bg-red text-white shadow-[0_0_0_1px_rgba(215,25,32,0.5)] hover:shadow-[0_14px_40px_rgba(215,25,32,0.38)]"
      : "border border-white/20 text-white hover:border-red";
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center px-6 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition hover:-translate-y-0.5 ${look} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Mark() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center border border-red font-display text-lg leading-none text-white">
        <span className="type-3d">10</span>
      </span>
      <span>
        <span className="type-3d block font-display text-[1.7rem] leading-none tracking-[0.16em] text-white">
          ONE10
        </span>
        <span className="mt-1 hidden text-[0.58rem] tracking-[0.32em] text-mist sm:block">BRANDS MARKETING</span>
      </span>
    </span>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 inline-flex items-center bg-red px-1.5 py-0.5 text-[0.62rem] tracking-[0.16em] text-white uppercase">
      {children}
    </span>
  );
}
