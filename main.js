// ---------- FOOTER YEAR ----------
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// ---------- MOBILE NAV ----------
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a:not(.nav-trigger)').forEach(a =>
      a.addEventListener('click', () => mainNav.classList.remove('open'))
    );
  }
  // mobile: tap to expand mega menus instead of hover
  document.querySelectorAll('.nav-item > .nav-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        trigger.parentElement.classList.toggle('open');
      }
    });
  });
});

// ---------- HERO SLIDER ----------
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.getElementById('sliderDots');
  if (!slides.length) return;
  let idx = 0;
  let timer;

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const d = document.createElement('span');
      if (i === 0) d.classList.add('active');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    if (dotsWrap) {
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  }
  function goTo(i) { idx = (i + slides.length) % slides.length; render(); resetTimer(); }
  function next() { goTo(idx + 1); }
  function prev() { goTo(idx - 1); }
  function resetTimer() { clearInterval(timer); timer = setInterval(next, 5500); }

  const nextBtn = document.getElementById('sliderNext');
  const prevBtn = document.getElementById('sliderPrev');
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  render();
  resetTimer();
});

// ---------- COUNT-UP STATS ----------
document.addEventListener('DOMContentLoaded', () => {
  const statEls = document.querySelectorAll('.stat-cell b[data-target], .qs-item b[data-target]');
  if (!statEls.length) return;
  let counted = false;
  function countUp(el, target) {
    let start = 0;
    const duration = 1400;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const suffix = el.dataset.suffix || '+';
    const t = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(t); }
      el.textContent = start + suffix;
    }, 16);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        statEls.forEach(el => countUp(el, parseInt(el.dataset.target, 10)));
      }
    });
  }, { threshold: 0.3 });
  io.observe(statEls[0].closest('section') || statEls[0]);
});

// ---------- SCROLL REVEAL ----------
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.shead, .whatwedo .wrap > div');
  targets.forEach(el => el.classList.add('reveal'));
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  targets.forEach(el => ro.observe(el));
});

// ================================================================
// SERVICE CATALOG — single source of truth for services.html,
// the homepage services grid, and service.html detail pages.
// ================================================================
const SERVICES = {
  // ---- Software Engineering ----
  "software-development": {
    cat: "Software Engineering", icon: "&#128187;",
    title: "Software Development",
    summary: "Custom, scalable applications built around how your business actually works.",
    body: "We design and build software from the ground up — mapping your workflows first, then engineering an application that fits them, rather than forcing a generic template onto your business. Every build is scoped for maintainability, so the codebase stays easy to extend as your needs grow.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  "custom-software-development": {
    cat: "Software Engineering", icon: "&#9881;&#65039;",
    title: "Custom Software Development",
    summary: "Purpose-built systems that streamline operations and remove manual busywork.",
    body: "When off-the-shelf software falls short, we build the missing piece. Our team works closely with your operations and IT stakeholders to define exactly what the system needs to do, then delivers a solution that fits into your existing tools rather than replacing them wholesale.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  "software-product-development": {
    cat: "Software Engineering", icon: "&#128736;&#65039;",
    title: "Software Product Development",
    summary: "Turning a product idea into a market-ready release, end to end.",
    body: "From the first wireframe to a production launch, we handle product strategy, architecture, and engineering as one continuous process. The goal is a product your users can rely on from day one, with a foundation that can scale as your customer base grows.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  "saas-development": {
    cat: "Software Engineering", icon: "&#9729;&#65039;",
    title: "SaaS Development",
    summary: "Secure, multi-tenant cloud applications engineered for growth.",
    body: "We build SaaS platforms with subscription billing, tenant isolation, and role-based access handled correctly from the start — the parts that are painful to retrofit later. Infrastructure is set up to scale with usage rather than requiring a rebuild at your next growth stage.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
  },
  "software-integration-services": {
    cat: "Software Engineering", icon: "&#128260;",
    title: "Software Integration Services",
    summary: "Connecting the systems you already run so data moves without friction.",
    body: "Most businesses run on a patchwork of tools that don't talk to each other. We build the integrations and middleware that let your CRM, ERP, and internal systems share data reliably, cutting down on duplicate entry and reconciliation work.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80"
  },
  "mvp-development": {
    cat: "Software Engineering", icon: "&#128640;",
    title: "MVP Development",
    summary: "Validate a product idea fast with a functional, user-ready prototype.",
    body: "Before committing to a full build, we help you test the core idea with real users. Our MVP engagements focus on the smallest version of the product that can prove or disprove your assumptions, so you invest further only once you have evidence it's worth it.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  "nearshore-software-development": {
    cat: "Software Engineering", icon: "&#127760;",
    title: "Nearshore Software Development",
    summary: "Cost-effective delivery from a team in your time zone.",
    body: "Our nearshore model gives you overlapping working hours, easier collaboration, and shorter feedback loops than distant outsourcing — without the overhead of hiring locally. You get an experienced engineering team working alongside yours in near real time.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80"
  },
  "digital-transformation": {
    cat: "Software Engineering", icon: "&#129504;",
    title: "Digital Transformation",
    summary: "Modernizing operations and infrastructure with the right technology.",
    body: "Digital transformation isn't about adopting the newest tools for their own sake — it's about removing the friction that's slowing your business down. We assess your current systems, identify the highest-impact changes, and deliver them in stages you can absorb.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
  },
  "low-code-no-code-development": {
    cat: "Software Engineering", icon: "&#129504;",
    title: "Low-Code / No-Code Development",
    summary: "Faster builds for teams that need working software quickly.",
    body: "For internal tools and simpler workflows, a full custom build isn't always necessary. We use low-code and no-code platforms to deliver working applications quickly, while still applying good engineering practices around data structure and security.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  "software-development-outsourcing": {
    cat: "Software Engineering", icon: "&#128101;",
    title: "Software Development Outsourcing",
    summary: "Hand off a project — or a whole product line — to a dedicated team.",
    body: "When you need engineering capacity without growing headcount, we take on full ownership of a project or product area. You get regular updates and full visibility into progress, without having to manage day-to-day development yourself.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },

  // ---- Application Development ----
  "web-development": {
    cat: "Application Development", icon: "&#127760;",
    title: "Web Development",
    summary: "Fast, well-structured websites and web platforms.",
    body: "We build websites and web platforms that load quickly, hold up under real traffic, and are straightforward to update. Every project starts with a clear content and information structure before any visual design work begins.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  "web-application-development": {
    cat: "Application Development", icon: "&#128187;",
    title: "Web Application Development",
    summary: "Interactive, data-driven applications that run in the browser.",
    body: "From internal dashboards to customer-facing portals, we build web applications with the state management, permissions, and performance handling that real usage demands — not just a prototype that breaks under load.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80"
  },
  "application-modernization": {
    cat: "Application Development", icon: "&#128260;",
    title: "Application Modernization",
    summary: "Bringing legacy systems up to modern standards without a risky rebuild.",
    body: "We modernize legacy applications in stages — improving architecture, security, and performance incrementally, so the system stays operational throughout. This avoids the risk and cost of a single big-bang rewrite.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80"
  },
  "mobile-app-development": {
    cat: "Application Development", icon: "&#128241;",
    title: "Mobile App Development",
    summary: "Native and cross-platform apps for iOS and Android.",
    body: "We build mobile apps that feel native to each platform while sharing a common codebase where it makes sense, keeping development costs reasonable without compromising on user experience.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
  },
  "ecommerce-development": {
    cat: "Application Development", icon: "&#128722;",
    title: "eCommerce Development",
    summary: "Storefronts and checkout flows built to convert and scale.",
    body: "We build and customize eCommerce platforms with attention to page speed, checkout friction, and inventory accuracy — the details that most directly affect conversion and repeat purchases.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
  },
  "dedicated-development-team": {
    cat: "Application Development", icon: "&#128101;",
    title: "Dedicated Development Team",
    summary: "A ring-fenced team that works as an extension of yours.",
    body: "Rather than a rotating pool of contractors, you get a consistent team assigned to your product, working your sprint cadence and reporting into your process — with the continuity that comes from people who know your codebase.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  "pwa-development": {
    cat: "Application Development", icon: "&#128241;",
    title: "PWA Development",
    summary: "App-like experiences that run directly in the browser.",
    body: "Progressive web apps give you offline support, push notifications, and home-screen installability without the overhead of maintaining separate native codebases — a practical middle ground for many products.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  "ui-ux-design": {
    cat: "Application Development", icon: "&#127912;",
    title: "UI & UX Design",
    summary: "Interfaces designed around how people actually use your product.",
    body: "We design interfaces starting from user flows and real tasks, not just visual style. The result is a product that's easier to learn, faster to use, and more consistent across screens.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  "frontend-development": {
    cat: "Application Development", icon: "&#10024;",
    title: "Frontend Development",
    summary: "Fast, accessible interfaces built with modern frameworks.",
    body: "We build frontends that are responsive, accessible, and performant by default — using modern frameworks in a way that keeps the codebase maintainable as your product grows, not just fast to ship on day one.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80"
  },

  // ---- AI & Data ----
  "cloud-data-engineering": {
    cat: "AI & Data", icon: "&#9729;&#65039;",
    title: "Cloud & Data Engineering",
    summary: "Azure Data Factory, Databricks, Synapse, Snowflake, and Microsoft Fabric, delivered as production pipelines.",
    body: "This is where AAROHA's roots run deepest. We design and build cloud data platforms — ingestion, transformation, warehousing, and reporting — using the Azure and modern data stack tools your team already relies on, delivered as dependable, documented pipelines rather than one-off scripts.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
  },
  "ai-consulting": {
    cat: "AI & Data", icon: "&#129504;",
    title: "AI Consulting",
    summary: "Practical guidance on where AI can actually help your business.",
    body: "We assess your data, workflows, and goals to identify where AI can realistically add value — and just as importantly, where it can't yet. Recommendations come with a clear view of the data and infrastructure work required to get there.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
  },
  "machine-learning-development": {
    cat: "AI & Data", icon: "&#129302;",
    title: "Machine Learning Development",
    summary: "Models built, evaluated, and deployed into real production systems.",
    body: "We build machine learning models around a specific business outcome, evaluate them against real data, and integrate them into your production systems — with monitoring in place so performance doesn't quietly drift over time.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  "data-science-analysis": {
    cat: "AI & Data", icon: "&#128202;",
    title: "Data Science & Analysis",
    summary: "Turning raw data into decisions your team can act on.",
    body: "We work with your existing data to answer specific business questions — building the analysis, dashboards, and reporting that let your team make decisions with evidence rather than guesswork.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80"
  },
  "it-consulting": {
    cat: "AI & Data", icon: "&#128188;",
    title: "IT Consulting",
    summary: "Technology strategy grounded in what your business actually needs.",
    body: "We assess your current systems, infrastructure, and team capacity, then map out a realistic technology roadmap — prioritized by impact and cost, not by what's trending.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80"
  },

  // ---- Specialized Practices (AAROHA's core technical depth) ----
  "azure-devops-cloud-infrastructure": {
    cat: "Specialized Practices", icon: "&#9881;&#65039;",
    title: "Azure DevOps & Cloud Infrastructure",
    summary: "CI/CD pipelines, containerization, and infrastructure-as-code on Azure.",
    body: "We set up and manage the DevOps backbone behind your applications — CI/CD pipelines, Docker and Kubernetes deployments, and infrastructure defined as code with Terraform. The goal is fewer manual releases and infrastructure you can reproduce reliably.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
  },
  "data-analytics-bi": {
    cat: "Specialized Practices", icon: "&#128202;",
    title: "Data Analytics & BI Dashboards",
    summary: "Power BI and Tableau dashboards built on top of your real data sources.",
    body: "We design and build reporting layers — from SQL modeling through to Power BI or Tableau dashboards — so the people making decisions can see current, accurate numbers without waiting on a manual export.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  },
  "python-full-stack-development": {
    cat: "Specialized Practices", icon: "&#128013;",
    title: "Python Full-Stack Development",
    summary: "Django and REST API-driven web systems, built and deployed end to end.",
    body: "We build web applications on Python and Django with REST APIs, database design, and deployment handled as one connected system — a good fit for internal tools, admin platforms, and data-driven web products.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
  },
  "sap-abap-development": {
    cat: "Specialized Practices", icon: "&#9881;&#65039;",
    title: "SAP ABAP Development",
    summary: "Custom SAP reports, interfaces, and enhancements.",
    body: "We build and maintain custom ABAP developments inside your SAP landscape — reports, interfaces, enhancements, and forms — keeping them documented and aligned with SAP's own upgrade paths.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  "sap-s4-hana-implementation": {
    cat: "Specialized Practices", icon: "&#127970;",
    title: "SAP S/4HANA Implementation & Support",
    summary: "Functional and technical support across your S/4HANA landscape.",
    body: "From configuration to go-live support, we work across the functional and technical sides of S/4HANA — helping teams migrate, customize modules, and keep the system running smoothly afterward.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
  },
  "generative-ai-agent-development": {
    cat: "Specialized Practices", icon: "&#129302;",
    title: "Generative AI & Agent Development",
    summary: "LLM-powered agents, RAG pipelines, and Azure OpenAI integrations.",
    body: "We build generative AI features on top of your own data — retrieval-augmented pipelines, vector databases, and LangChain- or Azure OpenAI-based agents — designed to plug into real workflows rather than sit as a standalone demo.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
  },
  "enterprise-mlops-implementation": {
    cat: "Specialized Practices", icon: "&#128260;",
    title: "Enterprise MLOps Implementation",
    summary: "Model deployment, monitoring, and CI/CD for AI systems in production.",
    body: "We help teams move machine learning models from notebooks into production — setting up deployment pipelines, versioning, and monitoring on Azure so model performance is tracked, not just assumed, once it's live.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80"
  }
};

// ---------- SERVICE DETAIL PAGE RENDERER (service.html) ----------
function renderServiceDetail() {
  const el = document.getElementById('serviceDetail');
  if (!el) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('s');
  const svc = SERVICES[slug];

  if (!svc) {
    el.innerHTML = '<div class="wrap"><p>We couldn\'t find that service. <a href="services.html" style="color:var(--blue);font-weight:600;">See all services →</a></p></div>';
    document.title = "Service not found | AAROHA Technologies";
    return;
  }

  document.title = svc.title + " | AAROHA Technologies";
  document.getElementById('breadcrumbCat').textContent = svc.cat;
  document.getElementById('pageTitle').textContent = svc.title;
  document.getElementById('pageSummary').textContent = svc.summary;

  el.innerHTML = `
    <div class="wrap">
      <div>
        <a href="services.html" class="svc-back">&larr; All Services</a>
        <h2>${svc.title}</h2>
        <p>${svc.body}</p>
        <a href="index.html#contact" class="btn btn-blue">Talk to Us About This</a>
      </div>
      <img src="${svc.image}" alt="${svc.title}" />
    </div>`;
}

// ---------- SERVICES GRID RENDERER (services.html + homepage teaser) ----------
function renderServiceGrid(targetId, opts) {
  const el = document.getElementById(targetId);
  if (!el) return;
  opts = opts || {};
  const limit = opts.limit || null;
  const filterCat = opts.cat || 'All';

  let entries = Object.entries(SERVICES);
  if (filterCat !== 'All') entries = entries.filter(([, s]) => s.cat === filterCat);
  if (limit) entries = entries.slice(0, limit);

  el.innerHTML = entries.map(([slug, s]) => `
    <a class="svc-card" href="service.html?s=${slug}">
      <div class="svc-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.summary}</p>
      <span class="svc-readmore">Read more &rarr;</span>
    </a>
  `).join('');
}

// ---------- CATEGORY TABS (services.html) ----------
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.cat-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderServiceGrid('servicesGrid', { cat: tab.dataset.cat });
    });
  });
}
