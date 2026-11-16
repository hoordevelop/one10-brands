import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28">
      <p className="font-display text-7xl text-red">404</p>
      <h1 className="mt-4 font-display text-5xl text-white">That page is not on this site.</h1>
      <p className="mt-4 text-mist">The address may be mistyped. The work lives on the pages in the menu.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </div>
  );
}
