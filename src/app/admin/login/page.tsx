import { redirect } from "next/navigation";
import { LoginForm } from "@/components/studio";
import { adminPassword, readSession } from "@/lib/auth";

export default async function LoginPage() {
  if (await readSession()) redirect("/admin");
  return (
    <div className="mx-auto max-w-md py-16">
      <h1 className="font-display text-5xl">Sign in</h1>
      <LoginForm locked={adminPassword() === ""} />
    </div>
  );
}
