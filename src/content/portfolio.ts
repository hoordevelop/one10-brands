export type PortfolioItem = {
  id: string;
  title: string;
  summary: string;
  services: string;
  sample: boolean;
};

/**
 * Sample slots only. These are not clients, not case studies, and not results.
 * Replace them in Studio (/admin) when real projects exist.
 */
export const samplePortfolio: PortfolioItem[] = [
  {
    id: "sample-campaign",
    title: "Sample slot — Acquisition campaign",
    summary:
      "A frame for a future multi-channel campaign. No client is named and no performance is claimed. Replace this card when a real project is ready to show.",
    services: "Digital Marketing, Meta Ads",
    sample: true,
  },
  {
    id: "sample-search",
    title: "Sample slot — Search account",
    summary:
      "A frame for a future Google Ads engagement: query map, structure, and landing pages. This is layout only.",
    services: "Google Ads",
    sample: true,
  },
  {
    id: "sample-site",
    title: "Sample slot — Marketing site",
    summary:
      "A frame for a future business or commerce website. The live One10 site is our own. It is not a client project.",
    services: "Website Development",
    sample: true,
  },
  {
    id: "sample-seo",
    title: "Sample slot — Search program",
    summary:
      "A frame for a future SEO program. Rankings and traffic will not be invented to fill this space.",
    services: "SEO",
    sample: true,
  },
  {
    id: "sample-brand",
    title: "Sample slot — Identity system",
    summary:
      "A frame for a future logo, identity, and campaign graphics. No fictional brand is presented as a client.",
    services: "Branding & Creative Design",
    sample: true,
  },
  {
    id: "sample-crm",
    title: "Sample slot — Sales system",
    summary:
      "A frame for a future CRM or lead program. Pipeline figures are omitted on purpose until a real project is published.",
    services: "CRM Development, Lead Generation",
    sample: true,
  },
];
