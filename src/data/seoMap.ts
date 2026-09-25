import { COMPANY_INFO } from "./company";
import { SERVICES_CATALOG } from "./services";
import { TRAINING_COURSES } from "./training";

export interface PageSeoMeta {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  keywords: string[];
}

export const SITE_METADATA_MAP: Record<string, PageSeoMeta> = {
  home: {
    title: "AAROHA Technologies | Software, Cloud & Data Engineering | Powered by J2D",
    description:
      "AAROHA Technologies delivers custom software development, application engineering, cloud & data solutions, and IT training. Powered by J2D Technologies.",
    canonical: "https://www.aaroha-inc.com",
    h1: "Software, cloud and data engineering for growing businesses.",
    keywords: [
      "Software Engineering",
      "Cloud Data Engineering",
      "Custom Software Development",
      "Azure Data Factory",
      "React Next.js Development",
      "Tech Training Hyderabad",
    ],
  },
  services: {
    title: "Software Engineering & Data Services | AAROHA Technologies",
    description:
      "Browse AAROHA Technologies' complete catalog of 30 software development, application engineering, cloud data, Azure, SAP, and Generative AI practices.",
    canonical: "https://www.aaroha-inc.com/services",
    h1: "Our Engineering & Technology Services",
    keywords: ["Software Development Services", "Cloud Engineering", "AI Services", "SAP Development"],
  },
  training: {
    title: "Courses & Training Programs | AAROHA Technologies",
    description:
      "Practical tech training in Azure Data Engineering, Data Science, Python Full Stack, SAP, and Generative AI with the project-oriented AAROHA Program and placement assistance.",
    canonical: "https://www.aaroha-inc.com/training",
    h1: "Technology Courses & Training",
    keywords: [
      "Azure Data Engineer Training",
      "Data Science Course Hyderabad",
      "Python Full Stack Course",
      "SAP ABAP Training",
      "Generative AI Course",
    ],
  },
  industries: {
    title: "Industries We Serve | AAROHA Technologies",
    description:
      "See how AAROHA Technologies delivers software, data, and application engineering across eCommerce, Healthcare, Media, Finance, Education, and Logistics.",
    canonical: "https://www.aaroha-inc.com/industries",
    h1: "Industries We Serve",
    keywords: ["eCommerce Software", "Healthcare Tech", "Financial Data Pipelines", "Logistics Solutions"],
  },
  about: {
    title: "About AAROHA Technologies | Software, Cloud & Data Engineering",
    description:
      "Learn about AAROHA Technologies — backed by J2D Technologies' delivery network, delivering enterprise software, cloud data pipelines, and technology training.",
    canonical: "https://www.aaroha-inc.com/about",
    h1: "About AAROHA Technologies",
    keywords: ["About AAROHA Technologies", "J2D Technologies", "Software Development Company Hyderabad"],
  },
  careers: {
    title: "Careers & Openings | AAROHA Technologies",
    description:
      "Explore technology career opportunities and express interest in engineering, cloud data, and software development roles at AAROHA Technologies.",
    canonical: "https://www.aaroha-inc.com/careers",
    h1: "Careers at AAROHA Technologies",
    keywords: ["Software Engineering Jobs Hyderabad", "AAROHA Careers", "Data Engineer Hiring"],
  },
  contact: {
    title: "Contact Us | AAROHA Technologies",
    description:
      "Get in touch with AAROHA Technologies for project discussions, software development inquiries, or course details. Located in Madhapur, Hyderabad.",
    canonical: "https://www.aaroha-inc.com/contact",
    h1: "Let's Talk About Your Project",
    keywords: ["Contact AAROHA Technologies", "Hyderabad Software Office", "Project Enquiry"],
  },
};

export function getServiceSeo(slug: string): PageSeoMeta {
  const service = SERVICES_CATALOG.find((s) => s.slug === slug);
  if (!service) {
    return {
      title: "Service | AAROHA Technologies",
      description: "Explore custom software, cloud, and data engineering services from AAROHA Technologies.",
      canonical: `https://www.aaroha-inc.com/services/${slug}`,
      h1: "Engineering Service",
      keywords: ["Software Services"],
    };
  }

  return {
    title: `${service.title} Services | AAROHA Technologies`,
    description: service.summary,
    canonical: `https://www.aaroha-inc.com/services/${service.slug}`,
    h1: service.title,
    keywords: [service.title, service.category, ...service.technologies],
  };
}

export function getCourseSeo(slug: string): PageSeoMeta {
  const course = TRAINING_COURSES.find((c) => c.slug === slug);
  if (!course) {
    return {
      title: "Course Training | AAROHA Technologies",
      description: "Career-focused tech training programs from AAROHA Technologies.",
      canonical: `https://www.aaroha-inc.com/training/${slug}`,
      h1: "Training Program",
      keywords: ["Tech Training"],
    };
  }

  return {
    title: `${course.title} Training (${course.duration}) | AAROHA Technologies`,
    description: course.summary,
    canonical: `https://www.aaroha-inc.com/training/${course.slug}`,
    h1: course.title,
    keywords: [course.title, ...course.tags],
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.poweredBy,
    url: COMPANY_INFO.siteUrl,
    logo: `${COMPANY_INFO.siteUrl}/assets/aaroha-j2d-logo.png`,
    description: COMPANY_INFO.description,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phones[0].display,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.state,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.country,
    },
    sameAs: [
      COMPANY_INFO.socials.facebook,
      COMPANY_INFO.socials.linkedin,
      COMPANY_INFO.socials.youtube,
      COMPANY_INFO.socials.instagram,
    ],
  };
}
