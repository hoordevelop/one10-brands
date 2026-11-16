import { catalog, type ServiceSlug } from "@/content/catalog";

export type ServicePoint = { title: string; text: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  summary: string;
  outcome: string;
  intro: string;
  covers: ServicePoint[];
  fit: string[];
  method: ServicePoint[];
  seoDescription: string;
};

const services: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    outcome: "One plan that connects awareness, demand, and the next conversation.",
    summary:
      "Full-funnel marketing for companies that are tired of channels running as separate jobs. Strategy, acquisition, and the campaigns that carry the brand.",
    intro:
      "Digital marketing at One10 is the commercial plan, not a pile of posts. We decide who the work is for, what they should do next, and which channels earn the right to ask. Brand awareness is part of that plan when the market does not know you yet. It is not a substitute for an offer.",
    covers: [
      { title: "Growth campaigns", text: "Campaign systems with a job: attention, enquiry, or sale. Each one has a message, an audience, and a way to judge it." },
      { title: "Acquisition strategy", text: "Where demand should come from, what it should cost to learn, and which channel is a test versus a commitment." },
      { title: "Brand awareness", text: "A clear presence in the markets that matter, built from the same story the sales team can repeat." },
      { title: "Offer and message", text: "The sentence a stranger needs before a click is worth buying. We write it before we scale the media." },
    ],
    fit: [
      "Companies that have outgrown ad-hoc posting and want a single marketing plan.",
      "Teams launching a new offer and needing the market to understand it quickly.",
      "Operators who want media, creative, and the website arguing for the same action.",
    ],
    method: [
      { title: "Commercial brief", text: "We start from the business: margin, sales cycle, and the customer you actually want." },
      { title: "Channel choice", text: "We pick the few channels that can move that customer, and we leave the rest alone." },
      { title: "Campaign system", text: "Creative, landing pages, and measurement are built together so the work can be improved, not just reported." },
    ],
    seoDescription:
      "Digital marketing for brand awareness, acquisition, and growth campaigns. One10 plans the work as one system, from message to measurement.",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    outcome: "Facebook and Instagram campaigns aimed at a lead, a sale, or a booked conversation.",
    summary:
      "Paid social on Facebook and Instagram: audience design, creative testing, lead generation, sales campaigns, retargeting, and ongoing optimization.",
    intro:
      "Meta is useful when the audience can be described and the next step is obvious. We build campaigns around that step — a form, a purchase, a WhatsApp chat, a booking — and we treat creative as the variable that usually decides the result. Targeting and retargeting are structured so warm audiences are not mixed into cold tests.",
    covers: [
      { title: "Lead generation", text: "Instant forms and site leads, with questions that protect the sales team from unqualified volume." },
      { title: "Sales campaigns", text: "Catalog and offer campaigns for products and services that can be bought or booked from the ad." },
      { title: "Targeting", text: "Prospecting built from real customer traits, not a stack of overlapping interests." },
      { title: "Retargeting", text: "Separate sequences for people who watched, visited, or started and did not finish." },
      { title: "Optimization", text: "Weekly decisions on creative, placement, and budget. Reports say what changed and why." },
    ],
    fit: [
      "Brands that need a predictable way to start conversations on Instagram or Facebook.",
      "Commerce teams with a product worth showing in motion.",
      "Service businesses whose best customers share a clear profile.",
    ],
    method: [
      { title: "Offer first", text: "We will not spend to promote a vague claim. The ad has to ask for something specific." },
      { title: "Creative tests", text: "A small set of distinct ideas, not ten tiny variations of the same line." },
      { title: "Account hygiene", text: "Structure, events, and exclusions kept clean so the learning is about the market, not a broken pixel." },
    ],
    seoDescription:
      "Meta Ads for Facebook and Instagram: lead generation, sales, targeting, retargeting, and optimization by One10 Brands Marketing.",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    outcome: "Search, Display, YouTube, and remarketing managed as one paid acquisition account.",
    summary:
      "PPC for people who are already looking, and paid reach for people who are not there yet. Search, Display, YouTube, remarketing, and conversion work.",
    intro:
      "Google Ads pays off when the account matches how people search and how the site converts. We build Search around real queries, not a single broad campaign. Display and YouTube carry the story to people who do not know the name yet. Remarketing speaks to the ones who already raised a hand. Conversion optimization sits beside the media, because a cheaper click into a confused page is not a win.",
    covers: [
      { title: "Search", text: "Query control, negatives, and ads that match the intent of the search, including the unglamorous terms that actually convert." },
      { title: "Display and YouTube", text: "Reach with a point of view, used when the brand needs to be seen before the search begins." },
      { title: "Remarketing", text: "Follow-up for visitors and engagers, with frequency kept in check." },
      { title: "PPC management", text: "Budgets, bids, and structure reviewed on a schedule. Changes are explained in plain language." },
      { title: "Conversion optimization", text: "Landing pages, forms, and tracking checked so the account is optimizing toward a real enquiry or sale." },
    ],
    fit: [
      "Businesses whose customers search for the problem by name.",
      "Teams spending on Google without a clear query map.",
      "Brands that need YouTube or Display to support a launch, not instead of a search plan.",
    ],
    method: [
      { title: "Intent map", text: "We group searches by what the person is trying to do, then build campaigns to match." },
      { title: "Tracking check", text: "Before scale, we confirm the conversion is a real business event." },
      { title: "Waste removal", text: "Negatives, placements, and mismatched ads come out before budgets go up." },
    ],
    seoDescription:
      "Google Ads management for Search, Display, YouTube, remarketing, and conversion optimization. One10 runs PPC with a query plan.",
  },
  {
    slug: "whatsapp-marketing",
    name: "WhatsApp Marketing",
    outcome: "Business messaging that starts conversations and keeps them, where the platform allows it.",
    summary:
      "WhatsApp campaigns, business messaging, engagement, and lead capture, including the automations and inbox handoffs the official tools support.",
    intro:
      "WhatsApp is where many customers already agree to talk. We use it as a business channel: clear opt-in, useful messages, and a path into a human or a CRM when the conversation needs one. Campaigns and automations stay inside what WhatsApp Business and its official integrations support. We do not run scraped lists or unofficial blast tools.",
    covers: [
      { title: "Campaigns", text: "Planned messages for people who have opted in: launches, reminders, and follow-up that respect the thread." },
      { title: "Business messaging", text: "Entry points from ads, the website, and QR or click-to-chat, answered with a consistent first reply." },
      { title: "Lead generation", text: "Questions that qualify a lead inside the chat, then pass a complete note to the person who sells." },
      { title: "Engagement", text: "Sequences for existing customers that are useful enough to be opened, not a daily interruption." },
      { title: "Automation and integrations", text: "Routing, labels, and handoff into the CRM or inbox where a supported integration exists." },
    ],
    fit: [
      "Companies whose customers already prefer WhatsApp to email.",
      "Sales teams losing enquiries in personal phones.",
      "Brands that want click-to-chat from ads without a messy inbox.",
    ],
    method: [
      { title: "Consent and entry", text: "We define how someone opts in and what the first message is allowed to say." },
      { title: "Conversation design", text: "The chat has a job: book, qualify, or support. The copy follows that job." },
      { title: "Handoff", text: "Automation stops where a person should take over, and the record of the chat goes with them." },
    ],
    seoDescription:
      "WhatsApp marketing for campaigns, business messaging, lead generation, and supported automations. One10 does not use unofficial blast tools.",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    outcome: "Campaigns and nurture that treat the list as an audience, not a blast target.",
    summary:
      "Bulk campaigns, audience research, list management, automation, reporting, and the sequences that keep a lead warm.",
    intro:
      "Email still carries the long conversation: the proof, the offer, the reminder. We research who is actually on the list, clean what should not be mailed, and write campaigns a person would finish. Automation nurtures people who are not ready today. Reporting shows what was sent, who stayed, and which message earned the next step.",
    covers: [
      { title: "Campaigns", text: "Broadcasts with one idea and one ask, designed to be read on a phone." },
      { title: "Audience research", text: "Segments from behavior and fit, so a new buyer and a five-year customer do not get the same letter." },
      { title: "List management", text: "Source, consent, and hygiene. We do not buy lists to inflate a number." },
      { title: "Automation", text: "Welcome, nurture, and post-enquiry flows that stop when a person replies or buys." },
      { title: "Reporting", text: "Delivery, engagement, and the commercial outcome the email was meant to support." },
    ],
    fit: [
      "Companies with a list they do not trust or do not mail.",
      "Teams sending the same newsletter to everyone.",
      "Brands that need a nurture path between the first click and the sale.",
    ],
    method: [
      { title: "List truth", text: "We look at where addresses came from before we design a calendar." },
      { title: "Message map", text: "A small set of emails, each with a reason to exist." },
      { title: "Measure the point", text: "Opens are a clue. The report leads with the action the email asked for." },
    ],
    seoDescription:
      "Email marketing: campaigns, audience research, list management, automation, nurture, and reporting from One10 Brands Marketing.",
  },
  {
    slug: "website-development",
    name: "Website Development",
    outcome: "A site that explains the offer, holds up on a phone, and gives the team a way to update it.",
    summary:
      "Business, corporate, agency, landing page, e-commerce, and custom websites. Built to be fast, clear, and maintainable.",
    intro:
      "A website is the place the rest of the marketing has to land. We design and build business sites, corporate sites, agency sites, landing pages, and shops. When the product needs something a template cannot do cleanly, we build it custom. The page has to say what you do, who it is for, and what happens next — on a phone, on a laptop, and without a loading ritual.",
    covers: [
      { title: "Business and corporate sites", text: "A clear structure for services, proof, and contact. No maze of pages that repeat the same claim." },
      { title: "Landing pages", text: "A single path for a campaign: message, evidence, and one action." },
      { title: "E-commerce", text: "Catalog, checkout, and the product story. We scope the platform to the way you actually sell." },
      { title: "Agency and custom builds", text: "Sites with a point of view, including the interactions and content model your team needs." },
      { title: "Care", text: "Performance, forms, and the editing experience are part of the build, not a later phase we hope to reach." },
    ],
    fit: [
      "Companies whose current site cannot explain the offer.",
      "Campaigns that need a page worthy of the media spend.",
      "Teams ready to replace a template that has been bent too far.",
    ],
    method: [
      { title: "Content before chrome", text: "We write the structure and the offer before we decorate it." },
      { title: "Build", text: "Modern, accessible pages. Motion only where it helps the story." },
      { title: "Handover", text: "You get a site the team can update, plus the notes for how it is hosted." },
    ],
    seoDescription:
      "Website development for business, corporate, agency, landing page, e-commerce, and custom sites. One10 builds pages that can sell.",
  },
  {
    slug: "seo",
    name: "SEO",
    outcome: "A site that can be found for the searches that match the business.",
    summary:
      "Technical SEO, on-page structure, off-page authority, keyword research, and the fixes that make a site easier to understand.",
    intro:
      "Search visibility is earned by a site that is crawlable, a page that answers a real query, and authority that was not rented overnight. We do the technical work, the on-page work, and the off-page work that fits the brand. Keyword research starts from how customers talk, not from a spreadsheet of volume alone. We do not sell guaranteed rankings.",
    covers: [
      { title: "Technical SEO", text: "Indexation, speed, architecture, and the errors that keep good pages invisible." },
      { title: "On-page", text: "Titles, structure, and copy that match the query without turning the page into a keyword list." },
      { title: "Keywords", text: "A map of the searches worth winning, grouped by intent and by the page that should own them." },
      { title: "Off-page", text: "Authority from mentions and links that a real company can defend. No bulk schemes." },
      { title: "Site optimization", text: "Internal links, templates, and the content gaps that keep the same topics competing with each other." },
    ],
    fit: [
      "Sites that look finished and still do not appear for their own name and offer.",
      "Companies publishing without a query behind the page.",
      "Teams that want a durable search program, not a one-month spike.",
    ],
    method: [
      { title: "Baseline", text: "We see what is indexed, what is slow, and which pages already have a right to rank." },
      { title: "Fix and write", text: "Technical repairs and the pages the keyword map says are missing." },
      { title: "Authority", text: "Off-page work that matches the brand, reported without vanity graphs." },
    ],
    seoDescription:
      "SEO covering technical, on-page, off-page, keywords, and site optimization. One10 improves visibility and does not guarantee rankings.",
  },
  {
    slug: "crm-development",
    name: "CRM Development",
    outcome: "A system shaped around how you sell: leads, customers, and the work between them.",
    summary:
      "Custom CRM development for leads, customers, dashboards, and the workflow automation that stops jobs falling between tools.",
    intro:
      "Most teams do not need another generic pipeline with the labels renamed. They need the record of a lead, the next action, and a dashboard a manager will actually open. We design custom CRM workflows around the way the company sells and serves. Automation is added where a person is retyping the same fact, not as a layer of triggers nobody trusts.",
    covers: [
      { title: "Custom CRM", text: "Objects, stages, and permissions that match the sale, including the awkward steps a template hides." },
      { title: "Leads and customers", text: "One place for the enquiry, the history, and the person who owns the next step." },
      { title: "Dashboards", text: "The few numbers that change a Monday meeting. Not a wall of charts." },
      { title: "Workflow automation", text: "Assignments, reminders, and handoffs that follow the real process." },
      { title: "Connections", text: "Forms, ads, WhatsApp, and email landing in the CRM when a supported integration exists." },
    ],
    fit: [
      "Sales teams living in spreadsheets and personal inboxes.",
      "Companies whose current CRM was abandoned because it did not fit.",
      "Operators who want the marketing leads to arrive with context.",
    ],
    method: [
      { title: "Map the sale", text: "We write the stages the team already uses, including the exceptions." },
      { title: "Build the record", text: "Fields that get filled, and nothing decorative." },
      { title: "Put it in the week", text: "Dashboards and automations are tested against a real week of leads before we call it done." },
    ],
    seoDescription:
      "Custom CRM development for leads, customers, dashboards, and workflow automation. One10 builds the system around the way you sell.",
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    outcome: "A defined audience, a defined offer, and a path to a qualified conversation.",
    summary:
      "B2B and B2C lead generation: audience research, strategy, and acquisition programs that produce conversations your team can work.",
    intro:
      "A lead is a person who fits and who asked to continue. We build that on purpose for B2B and B2C: research the audience, choose the offer, and run the acquisition that can reach them. The program includes the page, the question set, and the handoff. We do not sell purchased lead lists as a strategy.",
    covers: [
      { title: "B2B", text: "Programs aimed at a role and a company type, with qualification before the sales call." },
      { title: "B2C", text: "Offers for a consumer audience, with consent and a next step that is honest about the product." },
      { title: "Audience research", text: "Who buys, who influences, and which message they have already ignored." },
      { title: "Strategy", text: "Channel, offer, and volume the team can follow up. More leads than you can call is not a result." },
      { title: "Acquisition", text: "The media, pages, and forms that bring the right person in, tracked to the conversation." },
    ],
    fit: [
      "Teams whose pipeline depends on referrals and needs a second source.",
      "Companies getting volume that sales will not touch.",
      "Launches that need the first hundred serious conversations.",
    ],
    method: [
      { title: "Define qualified", text: "We write, with you, what a useful lead looks like before anyone spends." },
      { title: "Build the path", text: "Message, page, and form agree with that definition." },
      { title: "Review the conversations", text: "We listen to what sales received and change the program, not just the dashboard." },
    ],
    seoDescription:
      "B2B and B2C lead generation with audience research, strategy, and acquisition. One10 builds qualified conversations, not bought lists.",
  },
  {
    slug: "branding-design",
    name: "Branding & Creative Design",
    outcome: "An identity and a set of graphics the marketing can actually use.",
    summary:
      "Brand identity, logo, social creatives, posters, and business graphics. Design that holds together across the campaign.",
    intro:
      "Branding here is the system people meet: the name treatment, the logo, the type, the color, and the rules for using them. Creative design is the work that system has to survive — social cuts, posters, decks, and the graphics a sales team sends. We design for use. A logo that only works on a black mockup is not finished.",
    covers: [
      { title: "Identity", text: "Positioning made visible: voice, color, type, and the few rules that keep the work consistent." },
      { title: "Logo", text: "A mark that works small, in one color, and next to a headline." },
      { title: "Social creatives", text: "Frames and templates the team can refill without breaking the brand." },
      { title: "Posters and campaigns", text: "Key visuals for launches, events, and paid media." },
      { title: "Business graphics", text: "The practical set: proposals, one-pagers, and the images the website needs." },
    ],
    fit: [
      "Companies whose materials look like they came from three different years.",
      "Launches that need a visual system, not a single post.",
      "Teams producing social creative every week without a template.",
    ],
    method: [
      { title: "What it must do", text: "We list the surfaces the identity has to survive before we draw." },
      { title: "Design", text: "A tight set of directions, then one system developed properly." },
      { title: "Files people use", text: "Templates and exports, named and handed over, not a graveyard of working files." },
    ],
    seoDescription:
      "Branding and creative design: identity, logo, social creatives, posters, and business graphics from One10 Brands Marketing.",
  },
  {
    slug: "social-media",
    name: "Social Media Management",
    outcome: "Accounts run with a strategy, a calendar, and someone paying attention.",
    summary:
      "Social strategy, content planning, account management, and engagement for brands that want the channel to do a job.",
    intro:
      "Social management is not a promise to post every day. It is a decision about which platforms matter, what the account is for, and what a month of content should teach the audience. We plan, produce or direct the content, publish, and engage. Community replies are part of the work. Vanity posting is not.",
    covers: [
      { title: "Strategy", text: "Platform choice, audience, and the role of the account next to ads and the website." },
      { title: "Content planning", text: "A calendar with themes, not a blank grid filled the night before." },
      { title: "Account management", text: "Publishing, asset care, and the settings that keep the account secure and on-brand." },
      { title: "Engagement", text: "Replies and moderation with a tone the brand can stand behind." },
      { title: "Reporting", text: "What was published, what people did, and what we will change next month." },
    ],
    fit: [
      "Brands whose accounts have gone quiet or inconsistent.",
      "Teams that need a plan before they hire an in-house poster.",
      "Companies running ads into an account that does not explain the product.",
    ],
    method: [
      { title: "Role of the channel", text: "We agree what the account is supposed to do for the business." },
      { title: "System", text: "Pillars, formats, and a production rhythm the team can keep." },
      { title: "Review", text: "Monthly changes based on what the audience actually did." },
    ],
    seoDescription:
      "Social media management: strategy, content planning, account management, and engagement by One10 Brands Marketing.",
  },
  {
    slug: "digital-growth",
    name: "Digital Growth Solutions",
    outcome: "A consulting engagement for the system behind the campaigns.",
    summary:
      "Growth consulting: strategy, conversion optimization, and the digital changes a company needs when tactics are no longer enough.",
    intro:
      "Some companies do not need another channel. They need a look at how demand is created, how the site converts, and which internal habits waste the leads they already pay for. Digital growth work is that consulting engagement. We stay close to the operators, write the strategy, and help the team change the parts of the system that are blocking revenue. It can stand alone or sit above the other services.",
    covers: [
      { title: "Growth strategy", text: "Where the next customers should come from, and which current efforts should stop." },
      { title: "Conversion optimization", text: "The path from visit to enquiry or sale, repaired with evidence rather than opinions." },
      { title: "Consulting", text: "Working sessions with the people who own marketing, sales, and the product." },
      { title: "Digital transformation", text: "The practical shift: tools, pages, and responsibilities. Not a slide titled transformation." },
      { title: "Priorities", text: "A short list of moves in order, so the company is not asked to change everything in a month." },
    ],
    fit: [
      "Leadership teams who suspect the marketing is busy and the revenue is not.",
      "Companies entering a new market and needing the plan before the spend.",
      "Founders who want a senior partner, not a menu of retainers.",
    ],
    method: [
      { title: "Diagnosis", text: "We read the numbers you have and the process you actually run." },
      { title: "Bets", text: "A few moves with an owner and a way to tell if they worked." },
      { title: "Alongside the team", text: "We stay while the first changes are made, then leave a system the company can run." },
    ],
    seoDescription:
      "Digital growth consulting: strategy, conversion optimization, and practical digital change from One10 Brands Marketing.",
  },
];

const bySlug = new Map(services.map((service) => [service.slug, service]));

export function listServices(): Service[] {
  return catalog.map((item) => {
    const service = bySlug.get(item.slug);
    if (!service) throw new Error(`Missing service copy for ${item.slug}`);
    return service;
  });
}

export function findService(slug: string): Service | undefined {
  return bySlug.get(slug as ServiceSlug);
}
