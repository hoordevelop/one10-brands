import { ContactForm } from "@/components/contact-form";
import { Eyebrow, Placeholder } from "@/components/ui";
import { getPublicContact } from "@/lib/content-store";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata() {
  return pageMeta({
    title: "Contact",
    description:
      "Start a project with One10 Brands Marketing. Send your name, business, email, WhatsApp, service, and a short description.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const contact = await getPublicContact();
  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] text-white">Let’s talk about the work.</h1>
        <p className="mt-6 text-base leading-8 text-mist">
          Tell us the business, the service you need, and what a useful outcome looks like. We reply with questions or a proposal. Sending the form does not create a contract.
        </p>
        <div className="mt-10 space-y-6 border border-white/10 p-5">
          <div>
            <p className="text-[0.72rem] tracking-[0.18em] text-mist uppercase">WhatsApp</p>
            <a className="mt-2 inline-flex text-white" href={`https://wa.me/${contact.whatsappE164}`}>
              {contact.whatsappIsPlaceholder ? "Placeholder number" : `+${contact.whatsappE164}`}
              {contact.whatsappIsPlaceholder ? <Placeholder>Not connected</Placeholder> : null}
            </a>
            {contact.whatsappIsPlaceholder ? (
              <p className="mt-2 text-sm leading-6 text-mist">
                The link uses 000000000000 so the button works. It is not One10’s number. Replace it in Studio or in the site config before you share it.
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-[0.72rem] tracking-[0.18em] text-mist uppercase">Email</p>
            <a className="mt-2 inline-flex text-white" href={`mailto:${contact.email}`}>
              {contact.email}
              {contact.emailIsPlaceholder ? <Placeholder>Not connected</Placeholder> : null}
            </a>
          </div>
        </div>
      </div>
      <div className="border border-white/10 bg-panel/40 p-6 lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  );
}
