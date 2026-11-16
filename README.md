# One10 Brands Marketing

Production site for One10 Brands Marketing. Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Do not set `DATABASE_URL` on this machine. With it unset, inquiries and Studio edits use an in-memory database that resets when the process stops. The published app receives its own Postgres URL from the host.

## Edit the public site without code

Open `/admin` after `ADMIN_PASSWORD` is set.

- Inquiries: every form submission, including when email is not connected.
- Content: WhatsApp, email, social links, service summaries, FAQs, portfolio, and testimonials.

Leave contact fields blank to keep the labeled placeholders. Testimonials stay off the public site until you publish a real, approved quote. Portfolio cards should stay marked Sample until they are real projects. Do not invent clients or results.

## Edit in the repository

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Default placeholder WhatsApp number and email |
| `src/content/services.ts` | Full service pages. Studio can override the summary, outcome, and opening only |
| `src/content/story.ts` | About copy, why One10, and the five process stages |
| `src/content/faq.ts` | Built-in FAQs, used until Studio saves its own |
| `src/content/portfolio.ts` | Built-in sample slots, used until Studio saves projects |

Changes in those files need a new publish.

## Contact form

The form checks fields in the browser and again on the server. It rejects a hidden honeypot, a submission faster than three seconds, a reused token, and too many attempts from one network. The inquiry is stored before email is attempted.

Email sends only when `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `INQUIRY_NOTIFY_EMAIL` are all set.
