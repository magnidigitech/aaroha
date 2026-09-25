export interface IndustryDetail {
  slug: string;
  name: string;
  iconName: string;
  summary: string;
  description: string;
  commonChallenges: string[];
  howWeHelp: string[];
}

export const INDUSTRIES_CATALOG: IndustryDetail[] = [
  {
    slug: "ecommerce",
    name: "eCommerce",
    iconName: "ShoppingBag",
    summary: "Storefronts, checkout flows, and inventory systems built to convert and scale.",
    description:
      "We build and customize modern eCommerce storefronts, headless shopping platforms, checkout flows, and inventory integrations that handle high volume traffic and drive online revenue.",
    commonChallenges: [
      "Cart abandonment caused by checkout latency or complex steps",
      "Inventory mismatches across warehouse and online storefront channels",
      "Slow product catalog rendering on mobile devices",
    ],
    howWeHelp: [
      "Custom headless frontend storefront build for sub-second page loads",
      "Seamless API integration with ERP, WMS, and payment gateways",
      "Optimized mobile checkout flows and conversion tracking",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    iconName: "Stethoscope",
    summary: "Patient portals, scheduling tools, and security-conscious healthcare systems.",
    description:
      "We engineer custom digital healthcare platforms, patient appointment portals, and administrative tools focused on data security, role-based access, and operational efficiency.",
    commonChallenges: [
      "Manual appointment scheduling causing patient delays",
      "Siloed patient records across legacy software tools",
      "Strict data privacy and access security compliance requirements",
    ],
    howWeHelp: [
      "Custom web and mobile patient portal development",
      "Role-based access control (RBAC) and encrypted data architecture",
      "Automated appointment reminder & notification pipelines",
    ],
  },
  {
    slug: "media-entertainment",
    name: "Media & Entertainment",
    iconName: "Film",
    summary: "Content platforms, media portals, and digital distribution tooling.",
    description:
      "We design scalable content distribution platforms, media asset management portals, and streaming-adjacent web applications that engage users and stream smoothly.",
    commonChallenges: [
      "High server load during breaking content releases or events",
      "Complex content catalog taxonomy and metadata management",
      "Multi-device user experience consistency",
    ],
    howWeHelp: [
      "High-throughput cloud architecture with CDN integration",
      "Custom content management tools and search indexing",
      "Responsive web and mobile interface engineering",
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    iconName: "Landmark",
    summary: "Reporting platforms, reconciliation middleware, and secure internal tools.",
    description:
      "We develop secure web tools, automated financial data reconciliation pipelines, and executive reporting dashboards built to handle sensitive financial workflows.",
    commonChallenges: [
      "Manual end-of-month data reconciliation taking days",
      "Security audit risks in unmanaged internal reporting spreadsheets",
      "Lack of real-time visibility into multi-branch metrics",
    ],
    howWeHelp: [
      "Automated financial ETL and reconciliation middleware",
      "Secure executive dashboards with row-level data permissions",
      "Custom internal workflow software with full audit logging",
    ],
  },
  {
    slug: "education",
    name: "Education",
    iconName: "GraduationCap",
    summary: "Learning portals, student management systems, and training platforms.",
    description:
      "We build interactive learning portals, student administrative systems, and custom training platforms that simplify course enrollment, progress tracking, and certification.",
    commonChallenges: [
      "Outdated learning management portals with poor mobile usability",
      "Manual student enrollment and assignment tracking processes",
      "Lack of interactive progress analytics for instructors",
    ],
    howWeHelp: [
      "Custom web-based learning management portals",
      "Automated enrollment, progress tracking, and certificate generation",
      "Interactive video and resource delivery infrastructure",
    ],
  },
  {
    slug: "retail-logistics",
    name: "Retail & Logistics",
    iconName: "Truck",
    summary: "Inventory tracking, order fulfillment tools, and supply-chain dashboards.",
    description:
      "We build custom supply-chain tracking web applications, warehouse inventory management tools, and logistics reporting dashboards that optimize fulfillment workflows.",
    commonChallenges: [
      "Lack of real-time visibility into warehouse stock levels",
      "Manual order status updates causing customer inquiry spikes",
      "Incompatible legacy logistics databases",
    ],
    howWeHelp: [
      "Real-time inventory and order tracking web portals",
      "Custom mobile inventory scanner application integration",
      "Centralized logistics BI dashboards",
    ],
  },
];
