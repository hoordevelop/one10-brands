export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const defaultFaqs: FaqItem[] = [
  {
    id: "digital-marketing",
    question: "What does digital marketing include?",
    answer:
      "It is the plan for how the brand is seen, how demand is created, and how that demand becomes a conversation or a sale. Depending on the business, that can include strategy, campaigns, creative, the website, and the reporting that ties them together. We do not start by subscribing you to every channel.",
  },
  {
    id: "meta-ads",
    question: "How do Meta Ads engagements work?",
    answer:
      "We use Facebook and Instagram for a defined action: a lead, a sale, or a booking. The work covers audience structure, creative testing, retargeting, and regular optimization. You still own the ad account. We will not invent a performance number before the account has run.",
  },
  {
    id: "google-ads",
    question: "Which Google Ads products do you manage?",
    answer:
      "Search, Display, YouTube, and remarketing, plus the conversion tracking those campaigns depend on. Search is usually the foundation when people already look for what you sell. Display and YouTube are added when the brand needs to be seen before that search.",
  },
  {
    id: "websites",
    question: "What kinds of websites do you build?",
    answer:
      "Business and corporate sites, agency sites, campaign landing pages, e-commerce, and custom builds when a template would get in the way. The page has to explain the offer and work on a phone. We scope hosting and editing with you before the build starts.",
  },
  {
    id: "seo",
    question: "Can you guarantee a Google ranking?",
    answer:
      "No. SEO here covers technical fixes, on-page structure, keyword research, and off-page work that a real company can defend. Rankings depend on the competitive set and on Google. We will tell you what we are changing and what we are watching. We will not sell a guaranteed position.",
  },
  {
    id: "email",
    question: "What is included in email marketing?",
    answer:
      "Audience research, list management, campaigns, automation, nurture, and reporting. We work with lists you have a right to mail. Buying a list to make the database look larger is not part of the service.",
  },
  {
    id: "whatsapp",
    question: "How do you handle WhatsApp marketing?",
    answer:
      "As business messaging: opt-in campaigns, lead capture, engagement, and the automations or inbox handoffs that official WhatsApp tools support. We do not use scraped numbers or unofficial blasting software. If a use case is outside the platform rules, we will say so.",
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    answer:
      "There is no public rate card. A landing page, a search account, and a CRM are not the same budget, and the state of your current marketing changes the work. The contact form asks for an optional budget so the first reply can be a scoped proposal. Nothing on this website is a quote.",
  },
  {
    id: "timelines",
    question: "How long does a project take?",
    answer:
      "We do not publish a universal timeline. Discovery comes first. After we understand the business we propose milestones for that scope. A campaign can start faster than a custom CRM, and we will not pretend they share a clock.",
  },
  {
    id: "start",
    question: "How do we start?",
    answer:
      "Send the contact form with the service you need and a short description of the business. If email notification is not connected yet, the inquiry is still saved, and the WhatsApp and email options on the contact page are labeled until the real details are added. A proposal follows the first conversation. An inquiry is not a contract.",
  },
  {
    id: "where",
    question: "Where are you based?",
    answer:
      "One10 works with companies across markets. A street address and a company registration number are not published because they have not been supplied for this site. Do not treat any placeholder contact detail as a registered office.",
  },
];
