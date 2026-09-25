import json

services = [
    # Software Engineering (10)
    {
        "slug": "software-development",
        "title": "Software Development",
        "category": "Software Engineering",
        "iconName": "Code2",
        "summary": "Custom, scalable applications engineered around how your business actually works.",
        "overview": "We design and build custom software applications from the ground up. Rather than forcing your business workflows into off-the-shelf templates, we map your processes first and engineer solutions built for maintainability, reliability, and scale.",
        "intendedAudience": [
            "Growing companies replacing spreadsheet systems",
            "Enterprises building proprietary internal platforms",
            "Product managers requiring dedicated development capacity"
        ],
        "problemsAddressed": [
            "Off-the-shelf software failing to fit unique operational workflows",
            "Legacy systems accumulating technical debt and security risks",
            "Siloed tools creating manual data re-entry bottlenecks"
        ],
        "scopeDeliverables": [
            "System architecture design and database schema mapping",
            "Full-stack custom application development",
            "Automated testing suite and CI/CD deployment pipeline",
            "Technical documentation and code handover"
        ],
        "useCases": [
            "Proprietary operational management platforms",
            "Custom workflow engines & approval portals",
            "Multi-department business management web software"
        ],
        "scopeBoundaries": {
            "included": ["System architecture design", "Full-stack development", "Unit/Integration testing", "Cloud deployment configuration"],
            "separateAgreement": ["Third-party API licensing fees", "24/7 infrastructure monitoring beyond initial warranty period"]
        },
        "clientPreparation": [
            "List of primary business user roles & permissions",
            "Sample data spreadsheets or workflow charts",
            "Access to target cloud hosting environment (AWS/Azure)"
        ],
        "costFactors": [
            "Number of custom user roles and permissions",
            "Complexity of external database integrations",
            "Custom reporting and automated notification logic"
        ],
        "handoverDetails": [
            "100% source code ownership transfer via Git",
            "System architecture & API documentation",
            "30-day post-launch warranty support"
        ],
        "deliveryApproach": "Agile software delivery with 2-week sprint cycles, continuous integration, and transparent client milestone reviews.",
        "technologies": ["TypeScript", "Node.js", "React", "PostgreSQL", "Docker", "AWS"],
        "faqs": [
            {"question": "What software development methodology do you use?", "answer": "We follow Agile Scrum methodologies with 2-week sprint iterations, bi-weekly reviews, and daily progress transparency."},
            {"question": "Who owns the intellectual property and source code?", "answer": "You retain 100% full intellectual property and source code ownership upon project completion and payment."}
        ],
        "relatedSlugs": ["custom-software-development", "saas-development", "software-integration-services"]
    },
    {
        "slug": "custom-software-development",
        "title": "Custom Software Development",
        "category": "Software Engineering",
        "iconName": "Cpu",
        "summary": "Purpose-built systems that streamline operations and remove manual busywork.",
        "overview": "When standard commercial software limits your efficiency, our engineers build tailored software systems that precisely match your unique operational logic, security compliance, and scalability demands.",
        "intendedAudience": [
            "Mid-market enterprises with complex operational workflows",
            "Logistics, healthcare, and financial service firms needing compliant tools",
            "Companies outgrowing rigid SaaS products"
        ],
        "problemsAddressed": [
            "Manual data synchronization across incompatible software products",
            "High ongoing SaaS licensing costs for feature-bloated tools",
            "Inability to automate specialized internal business processes"
        ],
        "scopeDeliverables": [
            "Requirements discovery & technical specification doc",
            "Custom backend API & relational database development",
            "Modern web dashboard UI with role-based access control",
            "End-to-end automated integration testing"
        ],
        "useCases": [
            "Internal ERP/CRM custom modules",
            "Automated inventory & logistics dispatch boards",
            "Compliant patient or client record management systems"
        ],
        "scopeBoundaries": {
            "included": ["Custom web UI & backend API", "Role-based security controls", "Database schema migration scripts"],
            "separateAgreement": ["On-premise hardware server procurement", "Ongoing multi-year SLA maintenance"]
        },
        "clientPreparation": [
            "Process flow diagram of current manual tasks",
            "Key security & compliance requirements list",
            "Designated internal product owner for weekly sprint sign-offs"
        ],
        "costFactors": [
            "Number of distinct user permission levels",
            "Volume of historical data to migrate",
            "Complexity of legacy system integration APIs"
        ],
        "handoverDetails": [
            "Complete repository access (GitHub/GitLab)",
            "Database schema diagrams & API specs",
            "User training sessions & administrator video walkthroughs"
        ],
        "deliveryApproach": "User-centric engineering focused on clean architecture, comprehensive automated testing, and seamless user adoption.",
        "technologies": ["React", "Python", "Node.js", "PostgreSQL", "Redis", "Docker"],
        "faqs": [
            {"question": "How do you ensure custom software is easy to maintain?", "answer": "We adhere to clean code principles, strict TypeScript typing, modular microservices architecture, and comprehensive inline documentation."},
            {"question": "Can custom software integrate with our existing ERP?", "answer": "Yes. We specialize in building secure REST and GraphQL API connectors to integrate custom software with SAP, Salesforce, and legacy databases."}
        ],
        "relatedSlugs": ["software-development", "software-integration-services", "legacy-system-modernization"]
    },
    {
        "slug": "software-integration-services",
        "title": "Software Integration Services",
        "category": "Software Engineering",
        "iconName": "Network",
        "summary": "Connect fragmented software systems to automate data flow and eliminate duplicate entry.",
        "overview": "Disconnect between software platforms leads to data siloing, manual entry errors, and lost productivity. Our integration engineers design robust API middleware and webhooks that bridge your CRMs, ERPs, databases, and third-party SaaS applications.",
        "intendedAudience": [
            "Organizations running multiple disconnected cloud SaaS platforms",
            "Enterprises connecting modern cloud tools to legacy on-premise databases",
            "Operations teams suffering from double-entry bottlenecks"
        ],
        "problemsAddressed": [
            "Manual copy-pasting of customer data between CRM and ERP",
            "Out-of-sync inventory levels across e-commerce and warehouse tools",
            "Brittle webhooks breaking silently without error monitoring"
        ],
        "scopeDeliverables": [
            "API architecture mapping and interface specification",
            "Custom middleware connector build with retry logic",
            "Real-time webhook and event handler implementation",
            "Automated error logging and operational monitoring dashboard"
        ],
        "useCases": [
            "Salesforce CRM to SAP ERP bidirectional sync",
            "Payment gateway to accounting ledger automation",
            "E-commerce storefront to warehouse WMS API pipeline"
        ],
        "scopeBoundaries": {
            "included": ["API middleware development", "Error handling & retries", "Webhook listeners", "Data transformation mapping"],
            "separateAgreement": ["Third-party API vendor usage charges", "Custom vendor-side API changes"]
        },
        "clientPreparation": [
            "API documentation & sandbox keys for both target systems",
            "Field mapping rules spreadsheet (Source field -> Destination field)",
            "Test data records for validation"
        ],
        "costFactors": [
            "Number of endpoints and data models synchronized",
            "Real-time streaming vs. batch sync frequency",
            "Quality and stability of third-party API documentation"
        ],
        "handoverDetails": [
            "Middleware source code and deployment scripts",
            "API field mapping documentation",
            "Monitoring dashboard login credentials"
        ],
        "deliveryApproach": "Decoupled event-driven integration architecture ensuring zero data loss and automated failover recovery.",
        "technologies": ["Node.js", "Python", "Kafka", "RabbitMQ", "AWS Lambda", "PostgreSQL"],
        "faqs": [
            {"question": "What happens if one of the third-party APIs goes down?", "answer": "Our middleware incorporates resilient message queues (RabbitMQ/SQS) and exponential backoff retry logic to ensure data is safely processed once the target system recovers."},
            {"question": "How fast is the integration synchronization?", "answer": "We support both real-time webhook-based event synchronization (sub-second) and scheduled batch processing based on your business needs."}
        ],
        "relatedSlugs": ["api-development-integration", "middleware-integration", "custom-software-development"]
    },
    {
        "slug": "enterprise-software-architecture",
        "title": "Enterprise Software Architecture",
        "category": "Software Engineering",
        "iconName": "Layers",
        "summary": "High-availability system design built for performance, security, and long-term maintainability.",
        "overview": "Unplanned architectural growth leads to technical debt, security vulnerabilities, and system outages. Our enterprise architects evaluate your systems, design cloud-native blueprints, and establish scalable technical standards.",
        "intendedAudience": [
            "Companies scaling software to support rapid user growth",
            "CTOs preparing for major cloud migrations or system rewrites",
            "Enterprises needing high-availability & disaster recovery strategies"
        ],
        "problemsAddressed": [
            "Monolithic systems crashing during peak traffic surges",
            "Unclear data boundaries creating security & compliance risks",
            "Lack of standardized coding guidelines causing team slowdowns"
        ],
        "scopeDeliverables": [
            "Comprehensive technical architecture assessment",
            "Cloud-native target architecture blueprint (C4 model)",
            "Database partitioning & caching strategy",
            "Disaster recovery and high-availability design plan"
        ],
        "useCases": [
            "Deconstructing legacy monoliths into domain-driven microservices",
            "Multi-region cloud failover architecture setup",
            "High-throughput event-driven system design"
        ],
        "scopeBoundaries": {
            "included": ["Architecture assessment document", "C4 model diagrams", "Security & data flow blueprints", "Tech stack recommendation report"],
            "separateAgreement": ["Full code refactoring implementation (covered under separate development sprint)"]
        },
        "clientPreparation": [
            "Current system architecture diagrams & code repository access",
            "Traffic peak metrics & database volume figures",
            "List of key performance SLAs and compliance targets"
        ],
        "costFactors": [
            "Total number of subsystems and databases evaluated",
            "Compliance requirements (SOC2, HIPAA, GDPR)",
            "Depth of hands-on code auditing required"
        ],
        "handoverDetails": [
            "Architectural Blueprint Document & C4 Diagrams",
            "Technology Roadmap & Migration Strategy",
            "Executive presentation & engineering team alignment workshop"
        ],
        "deliveryApproach": "Domain-Driven Design (DDD) methodology delivering pragmatic, scalable, and resilient software blueprints.",
        "technologies": ["AWS", "Azure", "Kubernetes", "Microservices", "PostgreSQL", "Redis"],
        "faqs": [
            {"question": "Do you provide hands-on implementation alongside architectural advice?", "answer": "Yes. Our senior architects stay involved during execution to guide your engineering teams or lead delivery sprints."},
            {"question": "How do you handle security and compliance in enterprise design?", "answer": "We incorporate zero-trust security principles, encrypted data transit/rest, and ISO/SOC2 compliant boundary isolation."}
        ],
        "relatedSlugs": ["microservices-architecture", "legacy-system-modernization", "software-development"]
    },
    {
        "slug": "legacy-system-modernization",
        "title": "Legacy System Modernization",
        "category": "Software Engineering",
        "iconName": "RefreshCw",
        "summary": "Refactor and migrate aging systems to modern cloud frameworks with zero business disruption.",
        "overview": "Outdated legacy applications carry security vulnerabilities, high hosting costs, and developer scarcity. We safely refactor, re-architect, or re-host aging codebases to modern React, Node, and cloud infrastructure.",
        "intendedAudience": [
            "Enterprises running mission-critical applications on obsolete frameworks",
            "Organizations struggling to find developers for legacy stacks",
            "Companies reducing high maintenance & legacy server costs"
        ],
        "problemsAddressed": [
            "Security risks from unpatched legacy language frameworks",
            "Slow performance and inability to scale on legacy hardware",
            "Inability to integrate legacy apps with modern cloud APIs"
        ],
        "scopeDeliverables": [
            "Legacy codebase audit & refactoring roadmap",
            "Incremental migration plan (Strangler Fig Pattern)",
            "Modern API wrapper & cloud database migration",
            "Automated test coverage to prevent regression errors"
        ],
        "useCases": [
            "Migrating legacy ASP.NET/Java monoliths to Node.js & React",
            "Converting on-premise SQL databases to cloud-native PostgreSQL",
            "Refactoring desktop client applications into modern web portals"
        ],
        "scopeBoundaries": {
            "included": ["Code audit & migration roadmap", "API wrapper build", "Incremental module refactoring", "Data migration scripts"],
            "separateAgreement": ["Hardware disposal & legacy server physical decommissioning"]
        },
        "clientPreparation": [
            "Access to legacy source code repositories & database schemas",
            "List of critical business workflows & user permissions",
            "Historical database backup files for test migration"
        ],
        "costFactors": [
            "Age and lines of legacy code to refactor",
            "Quality of existing legacy documentation",
            "Database size and schema complexity"
        ],
        "handoverDetails": [
            "Modernized cloud-native codebase",
            "Automated CI/CD deployment pipelines",
            "Comprehensive API documentation and developer guides"
        ],
        "deliveryApproach": "Strangler Fig pattern allowing incremental, risk-free replacement of legacy components while maintaining system availability.",
        "technologies": ["React", "TypeScript", "Node.js", "Docker", "PostgreSQL", "AWS"],
        "faqs": [
            {"question": "Will modernization cause downtime for our existing business?", "answer": "No. Using the Strangler Fig pattern, we migrate features incrementally side-by-side, ensuring zero downtime for your active operations."},
            {"question": "How do you preserve existing business logic during rewrite?", "answer": "We write automated integration test suites against your existing inputs and outputs to guarantee identical functional outcomes."}
        ],
        "relatedSlugs": ["custom-software-development", "enterprise-software-architecture", "web-application-development"]
    },
    {
        "slug": "api-development-integration",
        "title": "API Development & Integration",
        "category": "Software Engineering",
        "iconName": "Terminal",
        "summary": "Secure, well-documented REST and GraphQL APIs built for high throughput and easy developer consumption.",
        "overview": "APIs are the backbone of modern software. We design, build, and deploy high-performance RESTful and GraphQL APIs featuring robust authentication, rate limiting, and automated OpenAPI (Swagger) documentation.",
        "intendedAudience": [
            "SaaS platforms opening developer APIs for partner ecosystems",
            "Mobile app teams requiring fast, secure backend endpoints",
            "Enterprises centralizing backend data services"
        ],
        "problemsAddressed": [
            "Slow, unoptimized API endpoints causing app lag",
            "Lack of rate limiting leading to API abuse or security breaches",
            "Outdated or missing API documentation frustrating developers"
        ],
        "scopeDeliverables": [
            "RESTful or GraphQL API endpoint design & specification",
            "JWT / OAuth2 authentication & rate limiting setup",
            "Automated OpenAPI / Swagger interactive documentation",
            "Performance optimization & Redis response caching"
        ],
        "useCases": [
            "Public developer API platforms with API key monetization",
            "Mobile app backend REST APIs with push notification triggers",
            "Internal microservices REST communication layer"
        ],
        "scopeBoundaries": {
            "included": ["API backend development", "Authentication middleware", "OpenAPI documentation", "Unit & integration tests"],
            "separateAgreement": ["Third-party API gateway subscription fees (Kong, Apigee)"]
        },
        "clientPreparation": [
            "Data model requirements & expected response payloads",
            "Security & authentication requirements (OAuth/SAML/JWT)",
            "Target traffic volume and throughput expectations"
        ],
        "costFactors": [
            "Number of API endpoints and CRUD operations",
            "Authentication complexity (Single Sign-On, OAuth2)",
            "Third-party integrations connected via API"
        ],
        "handoverDetails": [
            "API source code & deployment scripts",
            "Interactive Swagger/Postman API collection",
            "API security and maintenance guide"
        ],
        "deliveryApproach": "API-first engineering methodology prioritizing contract-first design, comprehensive documentation, and high-performance execution.",
        "technologies": ["Node.js", "Express", "FastAPI", "GraphQL", "Swagger/OpenAPI", "Redis"],
        "faqs": [
            {"question": "Do you support both REST and GraphQL APIs?", "answer": "Yes. We recommend REST for standardized public APIs and GraphQL for complex frontend apps requiring precise, flexible data fetching."},
            {"question": "How do you protect APIs against security threats?", "answer": "We enforce strict OAuth2/JWT tokens, rate limiting, CORS restrictions, input sanitization, and automated OWASP vulnerability scans."}
        ],
        "relatedSlugs": ["software-integration-services", "backend-development", "microservices-architecture"]
    },
    {
        "slug": "microservices-architecture",
        "title": "Microservices Architecture",
        "category": "Software Engineering",
        "iconName": "Boxes",
        "summary": "Decoupled, containerized service design for elastic scalability and independent team deployment.",
        "overview": "As engineering organizations grow, monolithic codebases create deployment bottlenecks. We design and implement decoupled microservices architectures using Docker, Kubernetes, and gRPC/REST communication layers.",
        "intendedAudience": [
            "Scale-up engineering teams experiencing monolith bottlenecks",
            "Organizations requiring independent scaling of high-traffic features",
            "Companies adopting containerization (Docker/Kubernetes)"
        ],
        "problemsAddressed": [
            "Single bug bringing down the entire monolithic application",
            "Slow deployment pipelines requiring all teams to deploy at once",
            "Inability to scale specific CPU-heavy features independently"
        ],
        "scopeDeliverables": [
            "Domain-driven microservices breakdown & boundary design",
            "Containerization (Docker) and Kubernetes (EKS/AKS) manifest setup",
            "Service mesh & API gateway configuration",
            "Distributed tracing & centralized logging setup"
        ],
        "useCases": [
            "E-commerce microservices (Catalog, Cart, Payment, Inventory)",
            "Fintech transaction processing pipelines",
            "High-traffic media streaming backends"
        ],
        "scopeBoundaries": {
            "included": ["Microservices code separation", "Docker containerization", "Kubernetes manifests", "Distributed tracing setup"],
            "separateAgreement": ["Cloud infrastructure hosting bill (AWS/Azure)"]
        },
        "clientPreparation": [
            "Existing system architecture diagrams",
            "Domain model & team structure overview",
            "Cloud provider account credentials (AWS/Azure/GCP)"
        ],
        "costFactors": [
            "Number of microservices to design and deploy",
            "Complexity of distributed data transactions (Saga pattern)",
            "Container orchestration requirements (Kubernetes vs ECS)"
        ],
        "handoverDetails": [
            "Infrastructure-as-Code scripts (Terraform/Helm)",
            "Microservices source code repositories",
            "Operational monitoring & alerting runbooks"
        ],
        "deliveryApproach": "Domain-Driven Design (DDD) delivering independently deployable, resilient microservices with automated CI/CD pipelines.",
        "technologies": ["Node.js", "Go", "Docker", "Kubernetes", "gRPC", "RabbitMQ"],
        "faqs": [
            {"question": "When should a business switch from monolith to microservices?", "answer": "We recommend microservices when multiple engineering teams are blocking each other on releases, or when specific features require independent elastic scaling."},
            {"question": "How do you handle distributed data consistency?", "answer": "We utilize event-driven patterns such as Event Sourcing and the Saga pattern to ensure eventual consistency across decoupled databases."}
        ],
        "relatedSlugs": ["enterprise-software-architecture", "devops-ci-cd-automation", "backend-development"]
    },
    {
        "slug": "software-testing-qa",
        "title": "Software Testing & QA",
        "category": "Software Engineering",
        "iconName": "CheckCircle2",
        "summary": "Automated and manual testing services ensuring defect-free releases and high application performance.",
        "overview": "Software bugs cost money and damage brand reputation. Our QA engineers implement automated test suites (unit, integration, E2E, performance) and conduct rigorous manual testing to ensure your releases are stable and secure.",
        "intendedAudience": [
            "Software companies launching mission-critical web/mobile apps",
            "Development teams lacking dedicated internal QA capacity",
            "Enterprises requiring compliance & regression testing before release"
        ],
        "problemsAddressed": [
            "Frequent software regressions breaking previously working features",
            "Slow manual testing cycles delaying product releases",
            "App crashes under high concurrent user load"
        ],
        "scopeDeliverables": [
            "Test strategy document & test plan creation",
            "Automated E2E testing setup (Cypress/Playwright)",
            "API automated testing suite (Postman/Supertest)",
            "Load and performance stress testing report (JMeter/K6)"
        ],
        "useCases": [
            "Pre-launch automated regression testing pipelines",
            "E-commerce checkout flow load testing",
            "Cross-browser and multi-device usability validation"
        ],
        "scopeBoundaries": {
            "included": ["Test suite creation", "Automated CI/CD test runner integration", "Bug report logs", "Performance test results"],
            "separateAgreement": ["Third-party cross-browser testing device lab subscriptions (BrowserStack)"]
        },
        "clientPreparation": [
            "Staging environment URL & access credentials",
            "User story acceptance criteria documentation",
            "Target device and browser list"
        ],
        "costFactors": [
            "Number of user flows and test cases covered",
            "Automated testing vs manual exploratory testing ratio",
            "Performance load scale (e.g. testing for 10k concurrent users)"
        ],
        "handoverDetails": [
            "Automated test suite repository & execution guides",
            "Detailed bug tracking reports with reproduction steps",
            "Final QA sign-off & performance baseline report"
        ],
        "deliveryApproach": "Shift-left QA methodology integrating testing early into CI/CD build pipelines for instant feedback.",
        "technologies": ["Playwright", "Cypress", "Jest", "K6", "JMeter", "Postman"],
        "faqs": [
            {"question": "Do you write automated tests that run automatically in CI/CD?", "answer": "Yes. We configure automated test runners in GitHub Actions, GitLab CI, or Azure DevOps to block failing code before deployment."},
            {"question": "What is the difference between automated and manual QA testing?", "answer": "Automated testing quickly verifies repetitive paths and APIs, while manual testing evaluates subtle UI nuances, user experience, and exploratory edge cases."}
        ],
        "relatedSlugs": ["devops-ci-cd-automation", "software-development", "full-stack-development"]
    },
    {
        "slug": "devops-ci-cd-automation",
        "title": "DevOps & CI/CD Automation",
        "category": "Software Engineering",
        "iconName": "Workflow",
        "summary": "Automated deployment pipelines and cloud infrastructure provisioning for zero-downtime releases.",
        "overview": "Manual deployments are slow, error-prone, and risky. Our DevOps engineers automate your build, test, and release pipelines using GitHub Actions, Azure DevOps, and Terraform, enabling fast and zero-downtime deployments.",
        "intendedAudience": [
            "Development teams spending hours on manual server deployments",
            "Companies scaling cloud infrastructure on AWS, Azure, or GCP",
            "Organizations establishing Infrastructure-as-Code standards"
        ],
        "problemsAddressed": [
            "Deployment outages caused by manual configuration mistakes",
            "Long release cycles delaying feature deployment to customers",
            "Inconsistent staging vs. production server environments"
        ],
        "scopeDeliverables": [
            "Automated CI/CD build & release pipeline setup",
            "Infrastructure-as-Code (Terraform/Bicep) provision scripts",
            "Zero-downtime deployment strategy (Blue/Green or Canary)",
            "Automated cloud server health & uptime monitoring"
        ],
        "useCases": [
            "Automated GitHub Actions pipeline for Next.js / AWS",
            "Kubernetes cluster automated Helm deployment",
            "Azure DevOps CI/CD pipeline for enterprise software"
        ],
        "scopeBoundaries": {
            "included": ["CI/CD pipeline configuration", "Terraform scripts", "Server monitoring setup", "Deployment documentation"],
            "separateAgreement": ["Monthly cloud infrastructure server costs"]
        },
        "clientPreparation": [
            "Cloud provider administrative credentials (AWS/Azure/GCP)",
            "Git repository administrative access",
            "Server environment environment variables list"
        ],
        "costFactors": [
            "Number of server environments (Dev, Staging, Prod)",
            "Infrastructure complexity (Kubernetes vs PaaS)",
            "Compliance requirements (SOC2/HIPAA deployment controls)"
        ],
        "handoverDetails": [
            "Terraform & CI/CD workflow repository code",
            "DevOps architecture documentation & secrets management guide",
            "Team training session on automated release deployment"
        ],
        "deliveryApproach": "GitOps approach treating infrastructure as code, ensuring repeatable, automated, and audit-ready cloud deployments.",
        "technologies": ["GitHub Actions", "Azure DevOps", "Terraform", "Docker", "Kubernetes", "AWS"],
        "faqs": [
            {"question": "How do you achieve zero-downtime deployments?", "answer": "We utilize Blue/Green deployment or rolling updates where new code is fully launched and tested on secondary containers before instant traffic routing."},
            {"question": "Can you automate infrastructure management on both AWS and Azure?", "answer": "Yes. We use Terraform to create cloud-agnostic Infrastructure-as-Code templates for AWS, Azure, and Google Cloud Platform."}
        ],
        "relatedSlugs": ["microservices-architecture", "software-testing-qa", "software-development"]
    },
    {
        "slug": "middleware-integration",
        "title": "Middleware Integration Services",
        "category": "Software Engineering",
        "iconName": "Server",
        "summary": "Enterprise service bus (ESB) and messaging middleware for asynchronous enterprise communication.",
        "overview": "Complex enterprise applications require high-speed, asynchronous message queues to handle heavy data flows. We engineer custom integration middleware and event buses using RabbitMQ, Apache Kafka, and AWS SQS.",
        "intendedAudience": [
            "Enterprises handling millions of daily messages or events",
            "Financial institutions requiring transactional event guarantees",
            "Logistics & retail platforms with real-time order processing"
        ],
        "problemsAddressed": [
            "Synchronous API bottlenecks crashing systems during traffic spikes",
            "Lost data packets during high-volume server transactions",
            "Tight coupling between core banking/ERP backends and external tools"
        ],
        "scopeDeliverables": [
            "Event-driven architecture design & queue taxonomy",
            "High-throughput message broker setup (Kafka / RabbitMQ)",
            "Custom consumer & producer middleware service build",
            "Dead-letter queue (DLQ) & automated retry mechanism"
        ],
        "useCases": [
            "Real-time order processing & payment event distribution",
            "IoT telemetry data ingestion middleware",
            "Enterprise Service Bus (ESB) backend unification"
        ],
        "scopeBoundaries": {
            "included": ["Middleware pipeline development", "Message broker configuration", "DLQ retry handlers", "Load testing"],
            "separateAgreement": ["Third-party messaging cluster hosting costs"]
        },
        "clientPreparation": [
            "Event payload schemas & data volume metrics",
            "Message throughput & latency SLA targets",
            "Target cloud server environment access"
        ],
        "costFactors": [
            "Message volume and throughput requirements (e.g. 100k events/sec)",
            "Event schema transformation complexity",
            "Multi-region message cluster replication requirements"
        ],
        "handoverDetails": [
            "Middleware repository code & deployment manifests",
            "Event schema documentation & monitoring dashboard access",
            "Operational recovery runbook"
        ],
        "deliveryApproach": "Event-Driven Architecture (EDA) ensuring guaranteed message delivery, high concurrency, and zero system coupling.",
        "technologies": ["Apache Kafka", "RabbitMQ", "Node.js", "Go", "AWS SQS", "Docker"],
        "faqs": [
            {"question": "What is the difference between RabbitMQ and Apache Kafka?", "answer": "RabbitMQ is ideal for complex routing and transactional message queues, whereas Kafka excels at massive, high-throughput event streaming and logs."},
            {"question": "How do you prevent message loss in middleware?", "answer": "We use persistent disk queuing, publisher confirmations, consumer acknowledgments, and dead-letter queues to guarantee zero data loss."}
        ],
        "relatedSlugs": ["software-integration-services", "api-development-integration", "microservices-architecture"]
    },

    # Application Development (9)
    {
        "slug": "web-development",
        "title": "Web Development",
        "category": "Application Development",
        "iconName": "Monitor",
        "summary": "Fast, responsive, SEO-optimized business websites and web platforms.",
        "overview": "We design and build modern websites and web platforms that load fast, hold up under high traffic, and present your company cleanly across desktop and mobile browsers.",
        "intendedAudience": [
            "Growing companies rebuilding outdated corporate websites",
            "Service businesses needing high-converting web presence",
            "Organizations prioritizing fast page speeds, accessibility, and SEO foundations"
        ],
        "problemsAddressed": [
            "Slow page speeds causing high mobile visitor drop-off",
            "Difficult content updates requiring developer help for simple text changes",
            "Unclear navigation structure confusing potential leads",
            "Unreliable contact forms failing to deliver business inquiries",
            "Poor search engine crawlability and missing metadata"
        ],
        "scopeDeliverables": [
            "Information architecture & mobile-responsive UI design",
            "Semantic React / Next.js frontend code build",
            "Headless Content Management System (CMS) configuration",
            "Technical SEO setup (Meta tags, Open Graph, Sitemap.xml, Robots.txt)",
            "Form validation & contact notification pipeline setup",
            "Cross-browser, mobile, and Core Web Vitals optimization"
        ],
        "useCases": [
            "Corporate technology company websites",
            "Professional service firm web portals",
            "High-performance marketing & product landing pages"
        ],
        "scopeBoundaries": {
            "included": [
                "Responsive design & build for agreed page templates",
                "CMS content editor setup for blog & general pages",
                "Technical SEO foundations & schema markup",
                "Form submission setup & analytics event tracking"
            ],
            "separateAgreement": [
                "Copywriting and translation services from scratch",
                "Stock photography purchasing costs",
                "Ongoing monthly content creation services"
            ]
        },
        "clientPreparation": [
            "Company branding guidelines (logo, colors, fonts)",
            "Approved page text content and images",
            "Domain registrar & DNS management access"
        ],
        "costFactors": [
            "Total number of unique page layouts required",
            "Complexity of custom interactive calculators or multi-step forms",
            "CMS integration requirements and custom content modeling"
        ],
        "handoverDetails": [
            "Complete source code repository transfer",
            "CMS administrator account credentials & video user guide",
            "Domain DNS pointing & SSL certificate deployment",
            "30 days post-launch technical warranty"
        ],
        "deliveryApproach": "Performance-first web engineering following modern Web Vitals and Web Content Accessibility Guidelines (WCAG).",
        "technologies": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Headless CMS"],
        "faqs": [
            {"question": "What types of websites do you build?", "answer": "We build corporate business websites, service company portals, content marketing sites, and custom marketing platforms using React and Next.js."},
            {"question": "Can your team update content without developer help?", "answer": "Yes. We configure modern headless CMS platforms (Sanity, Strapi, Contentful) so your team can edit text, blog posts, and images independently."}
        ],
        "relatedSlugs": ["web-application-development", "ui-ux-design", "frontend-development"]
    },
    {
        "slug": "web-application-development",
        "title": "Web Application Development",
        "category": "Application Development",
        "iconName": "Layout",
        "summary": "Interactive, data-driven web software with secure logins and rich user interfaces.",
        "overview": "Unlike static marketing websites, web applications involve complex user authentication, real-time data state management, interactive dashboards, and backend database integrations. We build custom web apps engineered for speed and security.",
        "intendedAudience": [
            "Businesses launching customer portal platforms",
            "SaaS startups building cloud web applications",
            "Companies replacing legacy desktop software with browser apps"
        ],
        "problemsAddressed": [
            "Clunky, desktop-only software slowing down mobile employees",
            "Insecure user authentication vulnerable to unauthorized access",
            "Slow data loading times when fetching complex database reports"
        ],
        "scopeDeliverables": [
            "Single Page Application (SPA) or Server-Side Rendered (SSR) web app build",
            "Secure user sign-in, role management, and password reset workflows",
            "Interactive dashboard charts & data table grids",
            "REST / GraphQL API integration & global state management setup"
        ],
        "useCases": [
            "Customer self-service billing & management portals",
            "B2B SaaS web applications with subscription logic",
            "Internal project tracking and reporting web dashboards"
        ],
        "scopeBoundaries": {
            "included": ["Full web app frontend & backend API integration", "User authentication setup", "Responsive UI layouts", "QA browser testing"],
            "separateAgreement": ["Third-party SMS/Email gateway sending fees (Twilio/SendGrid)"]
        },
        "clientPreparation": [
            "User journey wireframes or feature checklist",
            "User permission levels definition",
            "Target cloud hosting credentials"
        ],
        "costFactors": [
            "Number of interactive app screens and forms",
            "Complexity of backend data calculations & real-time updates",
            "Third-party payment or CRM integrations"
        ],
        "handoverDetails": [
            "Full source code ownership transfer",
            "Environment configuration setup guide",
            "30-day post-launch technical support"
        ],
        "deliveryApproach": "Modern component-driven development with React/Next.js ensuring modularity, security, and lightning-fast load times.",
        "technologies": ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
        "faqs": [
            {"question": "What is the difference between a website and a web application?", "answer": "A website primarily displays content for marketing. A web application is an interactive software tool where users log in, manage data, perform transactions, and trigger business workflows."},
            {"question": "How do you handle user authentication and security?", "answer": "We implement industry-standard authentication (OAuth2, JWT, Auth0, Firebase Auth) with encrypted sessions, multi-factor authentication (MFA), and strict role-based permissions."}
        ],
        "relatedSlugs": ["web-development", "saas-development", "full-stack-development"]
    },
    {
        "slug": "mobile-app-development",
        "title": "Mobile App Development",
        "category": "Application Development",
        "iconName": "Smartphone",
        "summary": "Native and cross-platform mobile apps for iOS and Android with smooth UI and offline sync.",
        "overview": "Engage your customers and mobile workforce directly on their mobile devices. We build high-performance iOS and Android mobile applications using React Native and Flutter, complete with push notifications, offline storage, and biometric authentication.",
        "intendedAudience": [
            "Businesses launching customer mobile apps on App Store and Google Play",
            "Field service companies equipping mobile workers with offline tools",
            "Consumer tech startups building mobile-first products"
        ],
        "problemsAddressed": [
            "Poor mobile web user experience failing to retain customers",
            "Inability to send direct push notifications to engage users",
            "App crashes on low-network or offline field conditions"
        ],
        "scopeDeliverables": [
            "iOS & Android cross-platform app codebase (React Native / Flutter)",
            "Push notification system setup (Firebase Cloud Messaging)",
            "Biometric login (FaceID / TouchID) & secure token storage",
            "App Store and Google Play store submission management"
        ],
        "useCases": [
            "Consumer e-commerce & loyalty mobile apps",
            "Field service dispatch and inspection apps",
            "Healthcare patient appointment & telemetry apps"
        ],
        "scopeBoundaries": {
            "included": ["Mobile app design & development", "Push notification setup", "App Store submission assistance", "QA test build deployment"],
            "separateAgreement": ["Apple Developer ($99/yr) and Google Play ($25) account fee payments"]
        },
        "clientPreparation": [
            "Apple Developer & Google Play Console account access",
            "App branding assets (icon, splash screen logo)",
            "List of required mobile device sensors (GPS, Camera, Bluetooth)"
        ],
        "costFactors": [
            "Number of native device features used (Camera, GPS, Bluetooth)",
            "Offline data sync complexity",
            "In-app purchase & payment gateway integration"
        ],
        "handoverDetails": [
            "Mobile app source code repository",
            "App Store release binary build files (.ipa / .aab)",
            "Store submission guideline compliance report"
        ],
        "deliveryApproach": "Cross-platform mobile engineering ensuring 95%+ code sharing between iOS and Android without sacrificing native performance.",
        "technologies": ["React Native", "Flutter", "TypeScript", "Firebase", "iOS Swift", "Android Kotlin"],
        "faqs": [
            {"question": "Do you build separate apps for iOS and Android or one cross-platform app?", "answer": "We recommend cross-platform frameworks like React Native or Flutter, which build native iOS and Android apps from a single codebase, saving up to 40% in cost and time."},
            {"question": "Will you handle the App Store and Google Play submission process?", "answer": "Yes. We manage store metadata, screenshot preparation, test builds, and guidelines compliance through to official publication."}
        ],
        "relatedSlugs": ["cross-platform-mobile-dev", "progressive-web-apps", "ui-ux-design"]
    },
    {
        "slug": "frontend-development",
        "title": "Frontend Engineering",
        "category": "Application Development",
        "iconName": "Code",
        "summary": "Pixel-perfect, accessible, and fast React/Next.js user interfaces engineered for conversion.",
        "overview": "The front end is where your users experience your product. We turn design mockups into pixel-perfect, accessible, and performant React, Next.js, and TypeScript web interfaces adhering to WCAG accessibility standards.",
        "intendedAudience": [
            "Product teams requiring specialized React/Next.js frontend developers",
            "Design agencies looking for a reliable technical build partner",
            "Companies modernizing slow, outdated frontend templates"
        ],
        "problemsAddressed": [
            "UI mockups built inaccurately with clumsy layout bugs",
            "Slow bundle sizes causing high Largest Contentful Paint (LCP) scores",
            "Lack of accessibility compliance leading to usability barriers"
        ],
        "scopeDeliverables": [
            "Pixel-perfect React component library build",
            "Design system token setup (Tailwind CSS / Figma sync)",
            "Responsive layout optimization across all viewport sizes",
            "Core Web Vitals performance tuning and bundle optimization"
        ],
        "useCases": [
            "SaaS application UI overhaul",
            "Interactive financial dashboard frontends",
            "Accessible enterprise web portals"
        ],
        "scopeBoundaries": {
            "included": ["React/Next.js component development", "Design system integration", "Responsive cross-browser testing", "Performance optimization"],
            "separateAgreement": ["Backend database or API creation (covered under backend services)"]
        },
        "clientPreparation": [
            "Figma / Adobe XD design files with full component specs",
            "Brand typography, color palette, and icon guidelines",
            "API documentation for data binding"
        ],
        "costFactors": [
            "Number of unique screen templates and complex UI states",
            "Interactive animations and dynamic drag-and-drop features",
            "Level of WCAG AA accessibility compliance required"
        ],
        "handoverDetails": [
            "Clean React component source repository",
            "Storybook component library documentation",
            "Bundle size & Web Vitals audit sign-off"
        ],
        "deliveryApproach": "Component-driven development using React and Tailwind CSS, prioritizing semantic HTML5, zero-layout-shift performance, and modularity.",
        "technologies": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Storybook", "Framer Motion"],
        "faqs": [
            {"question": "How do you guarantee the frontend matches our Figma designs?", "answer": "We use Storybook and automated visual regression testing to verify exact design token, typography, and layout alignment."},
            {"question": "Do you ensure frontend applications are mobile-responsive?", "answer": "Yes. Every component is engineered mobile-first and tested across iOS Safari, Android Chrome, and desktop viewports."}
        ],
        "relatedSlugs": ["web-development", "ui-ux-design", "full-stack-development"]
    },
    {
        "slug": "backend-development",
        "title": "Backend Engineering",
        "category": "Application Development",
        "iconName": "Database",
        "summary": "Scalable server architectures, secure databases, and business logic execution pipelines.",
        "overview": "A reliable backend powers your entire digital business. Our engineers build secure, high-throughput server backends using Node.js, Python, and PostgreSQL, focusing on database query optimization, data security, and API stability.",
        "intendedAudience": [
            "Applications expecting rapid data growth and high concurrent users",
            "Companies needing robust data validation and backend business logic",
            "Development teams requiring microservices backend engineering"
        ],
        "problemsAddressed": [
            "Database queries timing out under concurrent user load",
            "Insecure server endpoints vulnerable to SQL injection",
            "Unstructured business logic causing data corruption"
        ],
        "scopeDeliverables": [
            "Scalable server logic build (Node.js / Python)",
            "Relational database design, indexing & ORM setup",
            "Background job worker & task queue configuration",
            "Security encryption (transit/rest) & audit log setup"
        ],
        "useCases": [
            "High-throughput transactional backend services",
            "Automated background PDF/Report generation workers",
            "Secure multi-tenant data isolation layer"
        ],
        "scopeBoundaries": {
            "included": ["Backend server code", "Database schema & migrations", "Unit test suite", "Cloud server deployment configuration"],
            "separateAgreement": ["Frontend web/mobile user interface design"]
        },
        "clientPreparation": [
            "Business logic requirements document & data structures",
            "Security & compliance policy documentation",
            "Target cloud server infrastructure access"
        ],
        "costFactors": [
            "Complexity of business rules and calculation logic",
            "Database schema complexity & data volume scale",
            "Third-party external service integrations"
        ],
        "handoverDetails": [
            "Backend source repository & migration scripts",
            "Database entity relationship (ERD) diagrams",
            "Server environment maintenance runbook"
        ],
        "deliveryApproach": "Clean architecture principles separating domain business logic from data storage, ensuring testability and high throughput.",
        "technologies": ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
        "faqs": [
            {"question": "Which backend framework do you recommend?", "answer": "We recommend Node.js/Express for high-concurrency API services and Python/FastAPI for data-intensive or AI-integrated applications."},
            {"question": "How do you optimize backend performance?", "answer": "We utilize database indexing, Redis memory caching, connection pooling, and asynchronous background worker queues."}
        ],
        "relatedSlugs": ["api-development-integration", "full-stack-development", "cloud-data-engineering"]
    },
    {
        "slug": "full-stack-development",
        "title": "Full-Stack Development",
        "category": "Application Development",
        "iconName": "Layers",
        "summary": "End-to-end web software development combining modern frontends with secure backend infrastructure.",
        "overview": "Eliminate communication gaps between frontend and backend teams. Our full-stack engineering teams handle everything from UI design and React components down to database schemas and cloud deployment.",
        "intendedAudience": [
            "Startups and businesses building complete web platforms from scratch",
            "Product managers wanting single-team delivery accountability",
            "Companies modernizing end-to-end legacy applications"
        ],
        "problemsAddressed": [
            "Friction between separate frontend and backend contractors",
            "Mismatched data types between API responses and UI screens",
            "Slow release velocity due to split team handoffs"
        ],
        "scopeDeliverables": [
            "Full-stack architecture blueprint & database schema",
            "React / Next.js frontend UI build with state management",
            "Node.js / Python backend API & authentication setup",
            "CI/CD deployment pipeline to cloud infrastructure"
        ],
        "useCases": [
            "End-to-end SaaS product MVP builds",
            "Custom enterprise workflow management systems",
            "Customer-facing digital service portals"
        ],
        "scopeBoundaries": {
            "included": ["End-to-end UI, API, and database development", "Unit/Integration testing", "Cloud deployment", "Source code handover"],
            "separateAgreement": ["Ongoing 24/7 server infrastructure monitoring"]
        },
        "clientPreparation": [
            "Feature requirements backlog or wireframes",
            "Brand identity guidelines & key user workflows",
            "Cloud hosting account access (AWS/Vercel)"
        ],
        "costFactors": [
            "Total number of application modules and user roles",
            "Complexity of backend calculations & data volume",
            "Third-party external service integrations"
        ],
        "handoverDetails": [
            "Single unified full-stack code repository",
            "System setup scripts & API documentation",
            "30-day post-launch warranty and bug fixes"
        ],
        "deliveryApproach": "Unified TypeScript full-stack development (Next.js + Node + PostgreSQL) enabling end-to-end type safety and rapid feature delivery.",
        "technologies": ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
        "faqs": [
            {"question": "What are the advantages of choosing full-stack delivery?", "answer": "Full-stack delivery eliminates communication gaps between frontend and backend teams, uses unified TypeScript type definitions, and accelerates delivery by up to 30%."},
            {"question": "Can full-stack teams scale as our product grows?", "answer": "Yes. We build modular codebases that allow seamless transition into specialized frontend and backend microservices as your scaling demands grow."}
        ],
        "relatedSlugs": ["web-application-development", "saas-development", "mvp-development"]
    },
    {
        "slug": "progressive-web-apps",
        "title": "Progressive Web Apps (PWA)",
        "category": "Application Development",
        "iconName": "Globe",
        "summary": "App-like mobile experiences delivered through web browsers with offline access and installability.",
        "overview": "Progressive Web Apps deliver mobile app speed, home screen installation, and push notifications directly through standard web browsers — avoiding App Store fees and approval delays.",
        "intendedAudience": [
            "Businesses wanting mobile presence without maintaining separate iOS/Android apps",
            "E-commerce stores driving higher mobile conversion rates",
            "Content platforms requiring offline reading and fast loading"
        ],
        "problemsAddressed": [
            "High App Store commission fees and strict review delays",
            "Mobile visitors refusing to download app store apps for simple tasks",
            "Loss of connectivity causing white screens on mobile websites"
        ],
        "scopeDeliverables": [
            "PWA manifest file configuration & home screen install prompts",
            "Service worker setup for background offline caching",
            "Web Push Notification integration setup",
            "Lightweight, fast-loading mobile UI build"
        ],
        "useCases": [
            "Offline field reporting and inspection web tools",
            "Fast mobile e-commerce checkout portals",
            "Event agenda & ticket mobile web apps"
        ],
        "scopeBoundaries": {
            "included": ["PWA manifest & Service Worker build", "Offline cache strategies", "Push notification setup", "Lighthouse PWA audit"],
            "separateAgreement": ["Submission to native Apple App Store (native wrapper)"]
        },
        "clientPreparation": [
            "Mobile app icon graphics (512x512 PNG)",
            "Web push notification service account setup",
            "List of key offline page views and assets"
        ],
        "costFactors": [
            "Complexity of offline data synchronization logic",
            "Number of interactive mobile pages cached",
            "Push notification segmentation features"
        ],
        "handoverDetails": [
            "Complete PWA web repository code",
            "Service worker caching documentation",
            "Lighthouse 100/100 PWA score audit certificate"
        ],
        "deliveryApproach": "Offline-first web engineering utilizing modern Service Workers and IndexedDB storage for seamless connectivity transitions.",
        "technologies": ["Next.js", "React", "Workbox", "IndexedDB", "Tailwind CSS", "Web Push API"],
        "faqs": [
            {"question": "Can a PWA work completely offline?", "answer": "Yes. Service workers cache essential HTML, CSS, JavaScript, and IndexedDB data, allowing users to browse and submit forms offline, which sync once connected."},
            {"question": "Does PWA support push notifications on iOS?", "answer": "Yes. Modern iOS versions (iOS 16.4+) fully support Web Push notifications for PWA apps added to the home screen."}
        ],
        "relatedSlugs": ["web-development", "mobile-app-development", "cross-platform-mobile-dev"]
    },
    {
        "slug": "cross-platform-mobile-dev",
        "title": "Cross-Platform Mobile Development",
        "category": "Application Development",
        "iconName": "Smartphone",
        "summary": "Single codebase iOS and Android mobile app engineering with native speed and feel.",
        "overview": "Build for both major mobile platforms at once. Using React Native and Flutter, we engineer cross-platform mobile apps that deliver native 60fps performance, hardware access, and uniform user experience.",
        "intendedAudience": [
            "Startups launching on both iOS and Android with limited initial budget",
            "Enterprises building internal employee tools for mixed mobile devices",
            "Product managers accelerating time-to-market across mobile stores"
        ],
        "problemsAddressed": [
            "Doubled development costs when writing separate iOS (Swift) and Android (Kotlin) code",
            "Inconsistent feature updates between iOS and Android versions",
            "High maintenance overhead for dual mobile dev teams"
        ],
        "scopeDeliverables": [
            "Unified React Native or Flutter mobile codebase",
            "Native device bridge setup (Camera, GPS, Biometrics, Push)",
            "Shared state management & offline data caching layer",
            "Automated store build deployment scripts (Fastlane)"
        ],
        "useCases": [
            "On-demand service booking mobile apps",
            "Enterprise employee field tracking apps",
            "Social community and messaging mobile apps"
        ],
        "scopeBoundaries": {
            "included": ["iOS and Android shared app codebase", "Native module bindings", "Fastlane store deployment scripts", "QA testing on physical devices"],
            "separateAgreement": ["Apple/Google store developer membership fees"]
        },
        "clientPreparation": [
            "UI design assets optimized for mobile (Figma)",
            "Developer accounts for Apple and Google",
            "Backend API endpoints for mobile data"
        ],
        "costFactors": [
            "Number of native hardware integrations (Bluetooth, NFC, Camera)",
            "Complexity of custom mobile animations",
            "Offline data sync requirements"
        ],
        "handoverDetails": [
            "Unified mobile application repository",
            "Store release automation scripts",
            "Device testing sign-off matrix"
        ],
        "deliveryApproach": "Clean cross-platform architecture maximizing code reuse (up to 95%) while preserving native platform UI guidelines.",
        "technologies": ["React Native", "Flutter", "TypeScript", "Dart", "Firebase", "Fastlane"],
        "faqs": [
            {"question": "Is performance as good as native Swift/Kotlin apps?", "answer": "Yes. Modern frameworks like React Native and Flutter compile directly to native UI components and machine code, delivering smooth 60fps performance."},
            {"question": "Can we access native device features like Bluetooth or Camera?", "answer": "Absolutely. We write custom native modules to interact with Bluetooth LE, NFC, GPS, background sensors, and biometrics."}
        ],
        "relatedSlugs": ["mobile-app-development", "progressive-web-apps", "ui-ux-design"]
    },
    {
        "slug": "ui-ux-design",
        "title": "UI/UX Product Design",
        "category": "Application Development",
        "iconName": "Palette",
        "summary": "User research, wireframing, interactive prototyping, and design systems for web and mobile.",
        "overview": "Great software begins with intuitive design. Our product designers combine user research, wireframing, usability testing, and modern Figma design systems to craft interfaces that users love.",
        "intendedAudience": [
            "Startups needing product interface design before writing code",
            "Enterprises redesigning confusing legacy application portals",
            "Software companies building design systems for multi-product consistency"
        ],
        "problemsAddressed": [
            "High user drop-off caused by confusing navigation and clutter",
            "Inconsistent UI styles across different software products",
            "Developers wasting time guessing layout details during implementation"
        ],
        "scopeDeliverables": [
            "User personas & journey mapping documentation",
            "Low-fidelity wireframes & interactive Figma click-through prototype",
            "High-fidelity visual design & UI component library",
            "Design system tokens (colors, typography, spacing specs)"
        ],
        "useCases": [
            "SaaS application complete redesign",
            "Mobile app click-through prototype for investor pitches",
            "Enterprise design system component library creation"
        ],
        "scopeBoundaries": {
            "included": ["Figma visual designs", "Interactive click-through prototype", "Design system tokens", "Developer handoff specs"],
            "separateAgreement": ["Front-end code implementation (covered under frontend engineering)"]
        },
        "clientPreparation": [
            "Brand identity guidelines & logo vector files",
            "Competitor products or UI inspiration examples",
            "Target audience profile & key user tasks list"
        ],
        "costFactors": [
            "Number of unique app screens and modal flows",
            "Depth of user research and usability interviews",
            "Design system component library scale"
        ],
        "handoverDetails": [
            "Organized Figma master file link",
            "Interactive prototype link for stakeholder demos",
            "Exported SVG icons and image asset package"
        ],
        "deliveryApproach": "Human-Centered Design (HCD) framework balancing visual elegance with practical usability and engineering feasibility.",
        "technologies": ["Figma", "Design Systems", "Prototyping", "User Research", "WCAG Accessibility"],
        "faqs": [
            {"question": "What deliverables do we receive at the end of the UI/UX phase?", "answer": "You receive a complete organized Figma file with all screen layouts, an interactive click-through prototype, and developer handoff specs with design tokens."},
            {"question": "Do your designers understand technical feasibility?", "answer": "Yes. Our designers collaborate closely with our frontend engineers to ensure every design is performant and efficient to build in React."}
        ],
        "relatedSlugs": ["frontend-development", "web-development", "web-application-development"]
    },

    # AI & Data (5)
    {
        "slug": "cloud-data-engineering",
        "title": "Cloud & Data Engineering",
        "category": "AI & Data",
        "iconName": "Database",
        "summary": "Enterprise cloud data lakehouses, automated ETL/ELT pipelines, and analytics infrastructure.",
        "overview": "Modern businesses need clean, accessible, and real-time data to drive decision-making. We build production cloud data pipelines and lakehouses using Azure Data Factory, Databricks, Snowflake, and Microsoft Fabric.",
        "intendedAudience": [
            "Enterprises drowning in disconnected transactional databases",
            "Data teams needing automated data ingestion from multiple APIs",
            "Companies preparing data infrastructure for AI & BI reporting"
        ],
        "problemsAddressed": [
            "Siloed business data preventing unified executive reporting",
            "Manual CSV data consolidation taking days every month",
            "Unreliable ETL scripts breaking without automated alerts"
        ],
        "scopeDeliverables": [
            "Data architecture design (Medallion: Bronze/Silver/Gold)",
            "Automated ETL/ELT pipelines (Azure Data Factory / Databricks)",
            "Cloud Data Lakehouse configuration (Snowflake / Fabric)",
            "Data quality checks, monitoring, and error alert setup"
        ],
        "useCases": [
            "Enterprise central data lakehouse implementation",
            "Real-time e-commerce analytics ingestion pipeline",
            "Financial transaction data consolidation for audit compliance"
        ],
        "scopeBoundaries": {
            "included": ["Pipeline development", "Lakehouse schema design", "Data quality checks", "Alerting & monitoring setup"],
            "separateAgreement": ["Monthly cloud provider usage charges (Azure/AWS/Snowflake)"]
        },
        "clientPreparation": [
            "Access to source database read-replicas & API keys",
            "Data dictionary and field definitions list",
            "Target cloud subscription access"
        ],
        "costFactors": [
            "Number of distinct data sources integrated",
            "Volume of daily data ingested (GBs/TBs)",
            "Real-time streaming vs daily batch sync requirement"
        ],
        "handoverDetails": [
            "Data pipeline source code & infrastructure scripts",
            "Data model dictionary and schema lineage diagrams",
            "Operational runbook & monitoring dashboard access"
        ],
        "deliveryApproach": "Medallion Architecture (Bronze -> Silver -> Gold) ensuring data hygiene, high performance, and enterprise governance.",
        "technologies": ["Azure Data Factory", "Databricks", "PySpark", "Snowflake", "Microsoft Fabric", "SQL"],
        "faqs": [
            {"question": "What is Medallion Architecture in data engineering?", "answer": "Medallion Architecture organizes data into Bronze (raw ingestion), Silver (cleansed & deduplicated), and Gold (business-ready aggregated) layers for high data quality."},
            {"question": "Do you support Microsoft Fabric data implementations?", "answer": "Yes. We design end-to-end Microsoft Fabric OneLake and Data Factory pipelines for unified enterprise analytics."}
        ],
        "relatedSlugs": ["data-analytics-bi", "generative-ai-agent-development", "ai-consulting"]
    },
    {
        "slug": "generative-ai-agent-development",
        "title": "Generative AI & Agent Development",
        "category": "AI & Data",
        "iconName": "Sparkles",
        "summary": "Custom RAG pipelines, LLM fine-tuning, and autonomous AI agents grounded in private data.",
        "overview": "Transform your proprietary enterprise data into intelligent AI assistants. We build custom Retrieval-Augmented Generation (RAG) agents and automated LLM workflows using Azure OpenAI, LangChain, and vector databases.",
        "intendedAudience": [
            "Organizations looking to automate internal document research",
            "Customer support teams seeking 24/7 intelligent agent responses",
            "Product managers embedding GenAI features into software products"
        ],
        "problemsAddressed": [
            "Employees spending hours searching through thousands of PDF manuals",
            "Generic ChatGPT models hallucinating false business answers",
            "Privacy concerns surrounding company data leaking into public AI models"
        ],
        "scopeDeliverables": [
            "Private enterprise RAG pipeline architecture",
            "Document parsing, vector embedding, and indexing",
            "Azure OpenAI model integration with guardrails",
            "Custom web conversational UI or API integration"
        ],
        "useCases": [
            "Internal policy & technical manual AI research agent",
            "Customer support ticket automated resolution agent",
            "Contract & legal document parsing workflow"
        ],
        "scopeBoundaries": {
            "included": ["RAG pipeline build", "Vector DB indexing", "Azure OpenAI model setup", "Security guardrails", "Web UI / API"],
            "separateAgreement": ["Azure OpenAI API token consumption costs"]
        },
        "clientPreparation": [
            "Sample enterprise documents (PDF, Docx, TXT)",
            "Azure cloud subscription with OpenAI model quota",
            "Evaluation criteria & sample test question set"
        ],
        "costFactors": [
            "Volume and diversity of document formats indexed",
            "Agent autonomy level (read-only search vs multi-step actions)",
            "Fine-tuning vs standard RAG architecture requirement"
        ],
        "handoverDetails": [
            "GenAI application repository & vector indexing scripts",
            "Model prompt engineering & guardrail configuration docs",
            "30-day post-launch technical warranty"
        ],
        "deliveryApproach": "Enterprise GenAI engineering with strict zero-data-retention, hallucination guardrails, and deterministic grounding.",
        "technologies": ["Azure OpenAI", "LangChain", "LlamaIndex", "Pinecone", "Python", "FastAPI"],
        "faqs": [
            {"question": "Is our private company data safe when using LLM agents?", "answer": "Yes. We use enterprise Azure OpenAI instances with strict zero-data-retention policies, ensuring your data is never used to train public models."},
            {"question": "How do you prevent AI model hallucinations?", "answer": "We enforce strict Retrieval-Augmented Generation (RAG) grounding, requiring the model to cite exact source document passages for every answer."}
        ],
        "relatedSlugs": ["cloud-data-engineering", "ai-consulting", "machine-learning-solutions"]
    },
    {
        "slug": "data-analytics-bi",
        "title": "Data Analytics & Business Intelligence",
        "category": "AI & Data",
        "iconName": "BarChart3",
        "summary": "Executive Power BI dashboards, automated KPI reporting, and self-service analytics.",
        "overview": "Turn complex data into actionable executive insights. We build interactive Power BI and Tableau dashboards connected directly to your cloud data warehouse, empowering decision-makers with real-time metrics.",
        "intendedAudience": [
            "Executives needing real-time visibility into revenue and operations",
            "Department heads spending hours building manual weekly Excel reports",
            "Companies standardizing KPI metrics across multiple business units"
        ],
        "problemsAddressed": [
            "Conflicting metrics reported by different department spreadsheets",
            "Delayed reporting resulting in outdated decision-making",
            "Clunky, hard-to-read static reports that lack interactive drilling"
        ],
        "scopeDeliverables": [
            "KPI taxonomy & data metric definition workshop",
            "Data warehouse semantic layer & DAX metric modeling",
            "Interactive Power BI / Tableau dashboard design",
            "Automated scheduled email report distribution"
        ],
        "useCases": [
            "Executive financial & revenue performance dashboard",
            "Sales funnel & marketing attribution dashboard",
            "Supply chain & inventory turnover analytics portal"
        ],
        "scopeBoundaries": {
            "included": ["DAX model design", "Dashboard visual build", "Row-level security setup", "User training guide"],
            "separateAgreement": ["Power BI Pro/Premium software user licensing costs"]
        },
        "clientPreparation": [
            "Access to data warehouse or SQL database views",
            "List of key business metrics & mathematical formulas",
            "Target dashboard user list and permission requirements"
        ],
        "costFactors": [
            "Number of distinct dashboard pages and visual reports",
            "Complexity of DAX measures & backend semantic calculations",
            "Row-level security (RLS) implementation scale"
        ],
        "handoverDetails": [
            "Power BI (.pbix) master file repository",
            "Semantic model data dictionary document",
            "Executive and end-user video walkthrough guides"
        ],
        "deliveryApproach": "User-centric BI design delivering fast-loading, intuitive dashboards with row-level security and mobile optimization.",
        "technologies": ["Power BI", "DAX", "Tableau", "SQL", "Azure Synapse", "Snowflake"],
        "faqs": [
            {"question": "Can Power BI dashboards automatically refresh with live data?", "answer": "Yes. We configure scheduled automated data refreshes (up to 48 times daily) or direct query connections for real-time reporting."},
            {"question": "How do you ensure sensitive financial reports are restricted to executives?", "answer": "We enforce Row-Level Security (RLS) in Power BI, restricting report access based on user role, department, or management tier."}
        ],
        "relatedSlugs": ["cloud-data-engineering", "ai-consulting", "machine-learning-solutions"]
    },
    {
        "slug": "ai-consulting",
        "title": "AI Strategy & Consulting",
        "category": "AI & Data",
        "iconName": "Lightbulb",
        "summary": "AI roadmap planning, feasibility auditing, technology evaluation, and ROI modeling.",
        "overview": "Navigating artificial intelligence can be overwhelming. Our AI consultants help your organization identify high-impact AI use cases, evaluate data readiness, select the right tech stack, and calculate realistic implementation ROI.",
        "intendedAudience": [
            "Executives formulating an enterprise AI transformation strategy",
            "Product teams evaluating whether to use GenAI vs traditional ML",
            "Companies auditing data privacy and AI compliance risks"
        ],
        "problemsAddressed": [
            "Wasting money on overhyped AI projects with no clear ROI",
            "Unclear data governance exposing the business to privacy risks",
            "Confusion over open-source vs commercial AI models (OpenAI/Anthropic)"
        ],
        "scopeDeliverables": [
            "Enterprise AI opportunity & feasibility assessment",
            "Data readiness & infrastructure audit report",
            "AI technology stack roadmap & vendor selection",
            "Executive business case & ROI financial projection"
        ],
        "useCases": [
            "Enterprise AI adoption strategy roadmap (1-3 year plan)",
            "GenAI build vs buy analysis report",
            "AI security and governance framework creation"
        ],
        "scopeBoundaries": {
            "included": ["Consulting assessment workshop", "AI roadmap document", "Vendor evaluation matrix", "Executive presentation"],
            "separateAgreement": ["Full software development execution (covered under AI agent or ML development)"]
        },
        "clientPreparation": [
            "List of priority business challenges to solve with AI",
            "Overview of current data storage & IT infrastructure",
            "Key executive stakeholders available for interview sessions"
        ],
        "costFactors": [
            "Number of business units evaluated",
            "Depth of technical data auditing required",
            "Duration of consulting engagement"
        ],
        "handoverDetails": [
            "Comprehensive AI Strategy & Roadmap Document",
            "Vendor comparison matrix & tech stack selection guide",
            "Executive board-ready presentation slide deck"
        ],
        "deliveryApproach": "Pragmatic, value-driven AI advisory connecting cutting-edge technology capabilities directly to measurable business outcomes.",
        "technologies": ["Azure OpenAI", "Generative AI", "Machine Learning", "Python", "Data Governance"],
        "faqs": [
            {"question": "How long does an AI strategy consulting engagement take?", "answer": "A standard AI feasibility and strategy engagement typically spans 2 to 4 weeks from discovery interviews to final executive roadmap delivery."},
            {"question": "Do you help us select between custom model training and ready-made APIs?", "answer": "Yes. We perform rigorous cost, privacy, and accuracy evaluations comparing off-the-shelf APIs, RAG, fine-tuning, and custom open-source models."}
        ],
        "relatedSlugs": ["generative-ai-agent-development", "cloud-data-engineering", "machine-learning-solutions"]
    },
    {
        "slug": "machine-learning-solutions",
        "title": "Machine Learning Solutions",
        "category": "AI & Data",
        "iconName": "Cpu",
        "summary": "Predictive modeling, recommendation engines, and automated anomaly detection algorithms.",
        "overview": "Leverage statistical learning to predict trends and automate decisioning. We build custom machine learning models for demand forecasting, customer churn prediction, recommendation engines, and automated anomaly detection.",
        "intendedAudience": [
            "E-commerce platforms requiring personalized product recommendations",
            "Financial institutions automating fraud detection and risk scoring",
            "Supply chain companies predicting inventory demand"
        ],
        "problemsAddressed": [
            "High customer churn due to lack of proactive intervention",
            "Inaccurate inventory forecasting causing stockouts or excess holding",
            "Manual fraud detection failing to catch complex patterns"
        ],
        "scopeDeliverables": [
            "Data preprocessing, feature engineering & model selection",
            "Supervised / Unsupervised ML model training & evaluation",
            "Model packaging into scalable REST API endpoint",
            "MLOps automated retraining pipeline setup"
        ],
        "useCases": [
            "Customer churn prediction and retention trigger model",
            "E-commerce personalized product recommendation engine",
            "Industrial equipment predictive maintenance alert system"
        ],
        "scopeBoundaries": {
            "included": ["Model training & evaluation", "REST API endpoint deployment", "Validation metrics report", "Feature engineering pipeline"],
            "separateAgreement": ["Third-party cloud GPU server training costs"]
        },
        "clientPreparation": [
            "Historical labeled dataset (CSV/Parquet/Database access)",
            "Target accuracy metrics & operational performance targets",
            "Access to data science cloud environment"
        ],
        "costFactors": [
            "Dataset size and quality of feature labeling",
            "Algorithm complexity (Random Forest vs Deep Neural Networks)",
            "Real-time inference vs batch scoring requirements"
        ],
        "handoverDetails": [
            "Trained model artifacts and Python source code",
            "Model validation accuracy & confusion matrix report",
            "API deployment specs and MLOps maintenance guide"
        ],
        "deliveryApproach": "Rigorous data science lifecycle (CRISP-DM) ensuring reproducible experiments, high model accuracy, and robust production deployment.",
        "technologies": ["Python", "Scikit-Learn", "TensorFlow", "PyTorch", "MLflow", "FastAPI"],
        "faqs": [
            {"question": "How much historical data do we need to build a predictive ML model?", "answer": "While data requirements vary by problem, most predictive models require at least 10,000 to 50,000 historical records for reliable accuracy."},
            {"question": "How do you monitor machine learning models against data drift in production?", "answer": "We set up MLOps pipelines using MLflow to track model metrics in production and trigger automated retraining when feature distributions shift."}
        ],
        "relatedSlugs": ["cloud-data-engineering", "generative-ai-agent-development", "ai-consulting"]
    },

    # Specialized Practices (7)
    {
        "slug": "sap-s4-hana-implementation",
        "title": "SAP S/4HANA Implementation & Support",
        "category": "Specialized Practices",
        "iconName": "Building2",
        "summary": "Functional configuration and technical support across your S/4HANA landscape.",
        "overview": "From module configuration to technical support, we assist organizations in implementing, customizing, and managing their SAP S/4HANA ERP environment.",
        "intendedAudience": [
            "Enterprises migrating from SAP ECC to S/4HANA",
            "Organizations implementing custom S/4HANA modules",
            "Companies requiring post-go-live SAP support"
        ],
        "problemsAddressed": [
            "High complexity during SAP ECC to S/4HANA migration",
            "Misconfigured functional SAP modules causing operational friction",
            "Lack of internal specialized SAP technical support capacity"
        ],
        "scopeDeliverables": [
            "S/4HANA functional module configuration (FI/CO, MM, SD, PP)",
            "Technical migration & data conversion support",
            "Fiori app launchpad setup and custom extension",
            "Post-go-live support and SLA ticket maintenance"
        ],
        "useCases": [
            "SAP ECC to S/4HANA Cloud / On-Premise conversions",
            "Custom ABAP on HANA RICEFW development",
            "SAP Fiori launchpad custom app extensions"
        ],
        "scopeBoundaries": {
            "included": ["Functional module config", "Data migration conversion", "Custom ABAP development", "Go-live hypercare"],
            "separateAgreement": ["SAP software user license fees"]
        },
        "clientPreparation": ["Business process master list (BPML)", "Legacy SAP ECC system access"],
        "costFactors": ["Number of SAP functional modules in scope", "Volume of custom ABAP RICEFW objects"],
        "handoverDetails": ["Functional & technical design documents (FDD/TDD)", "Go-live signoff documentation"],
        "deliveryApproach": "SAP Activate methodology combining structured sprint milestones with rigorous testing and change management.",
        "technologies": ["SAP S/4HANA", "SAP Fiori", "CDS Views", "SAP Activate", "ABAP on HANA"],
        "faqs": [
            {"question": "Do you support Greenfield and Brownfield S/4HANA implementations?", "answer": "Yes. We assist both new Greenfield implementations and system conversion (Brownfield) migrations from SAP ECC."},
            {"question": "Do you provide custom ABAP development on HANA?", "answer": "Yes. Our team develops custom ABAP Core Data Services (CDS) views, AMDP procedures, and Fiori extensions adhering to SAP clean core guidelines."}
        ],
        "relatedSlugs": ["digital-transformation", "custom-software-development", "software-integration-services"]
    },
    {
        "slug": "dedicated-development-team",
        "title": "Dedicated Development Team",
        "category": "Specialized Practices",
        "iconName": "UserCheck",
        "summary": "A ring-fenced engineering team working as an extension of yours.",
        "overview": "Gain dedicated software engineers, UI designers, and QA specialists assigned exclusively to your products, following your sprint cadence and development tools.",
        "intendedAudience": [
            "Tech companies needing ongoing dev capacity",
            "Product leaders accelerating feature roadmap delivery",
            "Businesses building long-term engineering teams without hiring overhead"
        ],
        "problemsAddressed": [
            "Recruitment friction and high developer attrition",
            "Inconsistent quality from project-by-project freelancers",
            "Knowledge loss between short-term contracting gigs"
        ],
        "scopeDeliverables": [
            "Full-time dedicated developers, UI designers, and QA testers",
            "Direct integration into your Slack, Jira, and GitHub",
            "Daily standups and sprint planning participation",
            "Monthly predictable billing structure"
        ],
        "useCases": [
            "Long-term product feature backlog delivery",
            "Scaling frontend/backend dev capacity during expansion",
            "Augmenting internal teams with specialized cloud or React talent"
        ],
        "scopeBoundaries": {
            "included": ["Dedicated full-time engineer allocation", "Daily standup participation", "Direct code commits"],
            "separateAgreement": ["Third-party software tools & hardware procurement"]
        },
        "clientPreparation": ["Sprint management tool access (Jira/Linear)", "Git repository developer access"],
        "costFactors": ["Number of dedicated engineers and seniority levels", "Contract duration"],
        "handoverDetails": ["Continuous direct Git commits to your repositories", "Transparent daily work logs"],
        "deliveryApproach": "Dedicated team model aligned to your working hours, methodology, and technical quality standards.",
        "technologies": ["React", "TypeScript", "Node.js", "Python", "DevOps", "QA Automation"],
        "faqs": [
            {"question": "How quickly can a dedicated team start?", "answer": "We can assemble and onboard dedicated engineers onto your codebase within 1 to 2 weeks of scoping."},
            {"question": "How do you handle time-zone overlap?", "answer": "Our teams guarantee a minimum of 4 to 6 hours of direct working overlap with US, UK, and European business hours for real-time collaboration."}
        ],
        "relatedSlugs": ["nearshore-software-development", "software-development-outsourcing", "full-stack-development"]
    },
    {
        "slug": "saas-development",
        "title": "SaaS Development",
        "category": "Specialized Practices",
        "iconName": "Cloud",
        "summary": "Secure, multi-tenant cloud applications engineered for subscription growth.",
        "overview": "Building a Software-as-a-Service product requires specialized multi-tenant data architecture, automated subscription billing, user role management, and bulletproof tenant isolation. We engineer production-ready SaaS platforms.",
        "intendedAudience": [
            "Startups launching commercial B2B or B2C SaaS platforms",
            "Companies converting single-tenant software into multi-tenant SaaS",
            "Product teams scaling SaaS infrastructure for global users"
        ],
        "problemsAddressed": [
            "Data leakage between customer accounts due to poor tenant isolation",
            "Complex Stripe/Chargebee subscription billing integration bugs",
            "High server infrastructure costs caused by un-optimized cloud queries"
        ],
        "scopeDeliverables": [
            "Multi-tenant database schema & isolation architecture",
            "Automated subscription billing integration (Stripe / Chargebee)",
            "Tenant onboarding & admin dashboard portal",
            "Role-based access control (RBAC) & SSO integration"
        ],
        "useCases": [
            "B2B enterprise subscription web software",
            "Vertical SaaS platforms for specialized industries",
            "Freemium consumer web applications"
        ],
        "scopeBoundaries": {
            "included": ["Multi-tenant backend architecture", "Stripe billing integration", "Admin portal build", "Tenant isolation testing"],
            "separateAgreement": ["Stripe / Payment processor transaction processing fees"]
        },
        "clientPreparation": [
            "Subscription tier pricing structure (Free, Standard, Enterprise)",
            "List of features enabled per subscription tier",
            "Stripe merchant account API keys"
        ],
        "costFactors": [
            "Number of subscription tiers and complex billing logic",
            "Multi-tenant isolation model (Shared DB vs Database-per-tenant)",
            "Custom enterprise SSO integration requirements"
        ],
        "handoverDetails": [
            "Full SaaS codebase & cloud deployment scripts",
            "Stripe webhook event handler documentation",
            "30-day post-launch technical warranty"
        ],
        "deliveryApproach": "Multi-tenant cloud engineering prioritizing strict tenant data isolation, high availability, and automated billing synchronization.",
        "technologies": ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Stripe API", "Docker"],
        "faqs": [
            {"question": "How do you ensure data isolation between different SaaS tenants?", "answer": "We enforce strict row-level tenant security (RLS) or database-per-tenant isolation, combined with automated middleware tenant validation on every API call."},
            {"question": "What payment gateways do you support for subscription billing?", "answer": "We integrate leading subscription billing platforms including Stripe, Chargebee, Paddle, and Razorpay for recurring card and invoice payments."}
        ],
        "relatedSlugs": ["web-application-development", "full-stack-development", "mvp-development"]
    },
    {
        "slug": "nearshore-software-development",
        "title": "Nearshore Software Development",
        "category": "Specialized Practices",
        "iconName": "Globe",
        "summary": "Flexible engineering teams operating with close time-zone alignment and seamless collaboration.",
        "overview": "Scale your development output with nearshore engineering teams that match your working hours, speak fluent English, and integrate directly into your Agile sprint workflows.",
        "intendedAudience": [
            "North American and European tech companies needing same-day collaboration",
            "Engineering managers seeking cost-effective dev capacity without lag",
            "Startups requiring rapid dev team onboarding"
        ],
        "problemsAddressed": [
            "Delayed communication caused by 12-hour off-shore time differences",
            "Misaligned sprint goals due to lack of daily real-time standups",
            "High domestic developer hiring costs limiting runway"
        ],
        "scopeDeliverables": [
            "Ring-fenced nearshore software engineering pod",
            "Real-time daily Slack and Zoom sprint collaboration",
            "Direct code commits into your Git infrastructure",
            "Transparent weekly work log reports"
        ],
        "useCases": [
            "Real-time sprint pairing on core web apps",
            "Scaling mobile app engineering velocity",
            "Augmenting internal QA and automation capacity"
        ],
        "scopeBoundaries": {
            "included": ["Dedicated nearshore developers", "Real-time time zone alignment", "Direct sprint integration"],
            "separateAgreement": ["On-site client travel accommodation expenses"]
        },
        "clientPreparation": ["Sprint planning tool access (Jira)", "Git repository developer access"],
        "costFactors": ["Developer skill tier and experience level", "Team pod size"],
        "handoverDetails": ["Daily code commits to client repositories", "Weekly sprint progress reviews"],
        "deliveryApproach": "Time-zone aligned Agile delivery ensuring active collaboration during your core business hours.",
        "technologies": ["React", "Node.js", "TypeScript", "Python", "DevOps", "AWS"],
        "faqs": [
            {"question": "What time-zone overlap can we expect with nearshore teams?", "answer": "Our nearshore teams guarantee 6 to 8 hours of direct working overlap with your core business hours."},
            {"question": "How do nearshore developers communicate with our internal team?", "answer": "Nearshore engineers join your daily Slack/Teams channels, participate in morning standups, and present live sprint demos."}
        ],
        "relatedSlugs": ["dedicated-development-team", "software-development-outsourcing", "full-stack-development"]
    },
    {
        "slug": "software-development-outsourcing",
        "title": "Software Development Outsourcing",
        "category": "Specialized Practices",
        "iconName": "Briefcase",
        "summary": "End-to-end outsourced project delivery managed by experienced engineering leads.",
        "overview": "Outsource complete software projects with confidence. We take full ownership of discovery, design, development, quality assurance, and deployment — delivering turn-key software solutions on time.",
        "intendedAudience": [
            "Non-technical founders looking for an end-to-end technology partner",
            "Enterprises outsourcing secondary software products",
            "Companies needing fixed-scope project delivery"
        ],
        "problemsAddressed": [
            "Lack of internal engineering bandwidth to build new products",
            "Risk of budget overruns from mismanaged contracting projects",
            "Unclear project status and poor delivery communication"
        ],
        "scopeDeliverables": [
            "End-to-end technical project management & delivery",
            "Architecture design, development, and QA testing",
            "Bi-weekly milestone reviews and live software demos",
            "Final turn-key software handover & documentation"
        ],
        "useCases": [
            "Complete turn-key custom portal development",
            "Legacy application complete rebuild outsourcing",
            "Specialized module build for enterprise systems"
        ],
        "scopeBoundaries": {
            "included": ["Complete project delivery lifecycle", "PM, Dev, QA team allocation", "Milestone reviews", "Code handover"],
            "separateAgreement": ["Third-party cloud infrastructure hosting costs"]
        },
        "clientPreparation": [
            "Project scope requirements or business goals document",
            "Designated internal point of contact for milestone signoffs"
        ],
        "costFactors": ["Scope breadth and milestone deliverable scale", "Required technology stack"],
        "handoverDetails": ["Turn-key 100% IP source code transfer", "Complete technical documentation"],
        "deliveryApproach": "Managed project delivery model with fixed milestones, bi-weekly demos, and guaranteed technical quality standards.",
        "technologies": ["React", "Node.js", "TypeScript", "Python", "PostgreSQL", "AWS"],
        "faqs": [
            {"question": "How do you ensure quality when outsourcing an entire project?", "answer": "Every outsourced project is assigned a senior Technical Lead and QA Manager who enforce code reviews, automated testing, and bi-weekly live software demonstrations."},
            {"question": "Is IP ownership transferred to our company?", "answer": "Yes. Complete 100% intellectual property and source code ownership is legally transferred to your business upon milestone completion."}
        ],
        "relatedSlugs": ["dedicated-development-team", "custom-software-development", "mvp-development"]
    },
    {
        "slug": "mvp-development",
        "title": "MVP Development for Startups",
        "category": "Specialized Practices",
        "iconName": "Zap",
        "summary": "Rapid 6-to-8 week Minimum Viable Product builds designed for speed-to-market and investor demos.",
        "overview": "Launch your startup fast without compromising on code quality. We focus on core user workflows, building production-ready MVPs in 6 to 8 weeks so you can test market demand, onboard early users, and pitch investors.",
        "intendedAudience": [
            "Early-stage tech startups validating product-market fit",
            "Entrepreneurs preparing click-through software for seed funding",
            "Corporate innovation labs launching quick pilot products"
        ],
        "problemsAddressed": [
            "Spending 9+ months over-engineering features before testing the market",
            "Running out of pre-seed runway due to slow development",
            "Unscalable prototype code crashing during early user growth"
        ],
        "scopeDeliverables": [
            "Core feature scoping & MVP wireframe mapping",
            "Rapid 6-to-8 week full-stack web/mobile app build",
            "User authentication, database, and primary workflow build",
            "Cloud infrastructure launch on Vercel / AWS"
        ],
        "useCases": [
            "Investor pitch demonstration software",
            "Early user beta release web applications",
            "Market-demand validation landing platforms"
        ],
        "scopeBoundaries": {
            "included": ["Core MVP feature development", "Cloud deployment", "Source code handover", "30-day warranty"],
            "separateAgreement": ["Non-essential secondary feature backlog items"]
        },
        "clientPreparation": [
            "Priority list of 3-5 core user features (Must-haves vs Nice-to-haves)",
            "Target launch deadline and budget parameters"
        ],
        "costFactors": ["Number of core MVP screens and workflows", "Third-party API integrations (Stripe, Twilio)"],
        "handoverDetails": ["Clean modular codebase ready for scaling", "Deployment setup instructions"],
        "deliveryApproach": "Lean MVP engineering prioritizing core feature speed-to-market while building on scalable modern React architecture.",
        "technologies": ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Supabase/PostgreSQL"],
        "faqs": [
            {"question": "How fast can you build and launch an MVP?", "answer": "Our standard MVP sprint cycle delivers a production-ready application in 6 to 8 weeks from scope sign-off."},
            {"question": "Can the MVP codebase be scaled after we get funding?", "answer": "Yes. We build MVPs using production-grade React, Next.js, and Node.js codebases, ensuring you never have to throw away code when scaling."}
        ],
        "relatedSlugs": ["saas-development", "full-stack-development", "web-application-development"]
    },
    {
        "slug": "digital-transformation",
        "title": "Digital Transformation Services",
        "category": "Specialized Practices",
        "iconName": "Compass",
        "summary": "Modernize paper-based and legacy workflows with custom digital portals and cloud automation.",
        "overview": "Transition your legacy business processes into modern digital experiences. We audit manual workflows, replace paper forms with cloud web portals, and automate data flows across your enterprise.",
        "intendedAudience": [
            "Established enterprises replacing paper forms & manual spreadsheets",
            "Service companies digitizing client onboarding & service delivery",
            "Organizations looking to improve operational efficiency"
        ],
        "problemsAddressed": [
            "Manual paper-based forms causing lost data and processing delays",
            "Inability to track operational status across departments",
            "High administrative overhead costs for routine client tasks"
        ],
        "scopeDeliverables": [
            "Operational workflow audit & digital transformation roadmap",
            "Custom digital client & employee web portal build",
            "Automated document processing & e-signature integration",
            "Staff training & change management support"
        ],
        "useCases": [
            "Paperless client onboarding & document portal",
            "Field service digital inspection & approval workflow",
            "Multi-department request tracking digital platform"
        ],
        "scopeBoundaries": {
            "included": ["Workflow audit report", "Digital portal development", "Integration middleware", "Staff training sessions"],
            "separateAgreement": ["Third-party e-signature API fees (DocuSign)"]
        },
        "clientPreparation": [
            "Samples of current paper forms or manual spreadsheets",
            "Key operational department lead interview access"
        ],
        "costFactors": ["Number of manual workflows digitized", "Integration complexity with existing legacy ERPs"],
        "handoverDetails": ["Digital portal source code & cloud infrastructure", "User training manuals & process videos"],
        "deliveryApproach": "Process-first digital engineering focusing on user adoption, process automation, and measurable operational cost reduction.",
        "technologies": ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "DocuSign API"],
        "faqs": [
            {"question": "How do you ensure non-technical staff adopt new digital tools?", "answer": "We conduct user testing during design, build intuitive clean interfaces, and provide hands-on training sessions and video user guides."},
            {"question": "Can digital transformation tools connect to our existing ERP?", "answer": "Yes. We build custom API connectors to bridge new digital portals directly to your existing SAP, Salesforce, or SQL databases."}
        ],
        "relatedSlugs": ["custom-software-development", "legacy-system-modernization", "software-integration-services"]
    }
]

# Generate typescript file output
ts_content = '''export type ServiceCategory =
  | "Software Engineering"
  | "Application Development"
  | "AI & Data"
  | "Specialized Practices";

export interface ServiceDetail {
  slug: string;
  title: string;
  category: ServiceCategory;
  iconName: string;
  summary: string;
  overview: string;
  intendedAudience: string[];
  problemsAddressed: string[];
  scopeDeliverables: string[];
  useCases?: string[];
  scopeBoundaries?: {
    included: string[];
    separateAgreement: string[];
  };
  clientPreparation?: string[];
  costFactors?: string[];
  handoverDetails?: string[];
  deliveryApproach: string;
  technologies: string[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const BUSINESS_NEEDS_MAP = [
  {
    id: "new-product",
    title: "Build a New Product",
    tagline: "Turn an idea or prototype into a market-ready release",
    slugs: ["mvp-development", "saas-development", "web-application-development", "mobile-app-development"],
  },
  {
    id: "improve-app",
    title: "Improve an Existing Application",
    tagline: "Refactor legacy systems, upgrade UI/UX, or modernize stack",
    slugs: ["application-modernization", "ui-ux-design", "frontend-development", "custom-software-development"],
  },
  {
    id: "connect-systems",
    title: "Connect Systems & APIs",
    tagline: "Unify CRMs, ERPs, and internal databases so data flows without friction",
    slugs: ["software-integration-services", "digital-transformation", "custom-software-development"],
  },
  {
    id: "use-data",
    title: "Use Data & AI Better",
    tagline: "Build cloud pipelines, executive dashboards, or RAG AI agents",
    slugs: ["cloud-data-engineering", "data-analytics-bi", "generative-ai-agent-development", "ai-consulting"],
  },
  {
    id: "extend-team",
    title: "Extend Your Engineering Team",
    tagline: "Access ring-fenced developers working in your time zone & sprint tools",
    slugs: ["dedicated-development-team", "nearshore-software-development", "software-development-outsourcing"],
  },
];

export const SERVICE_COMPARISONS = [
  {
    title: "Web Development vs. Web Application Development",
    point1: "Web Development focuses on fast, responsive, SEO-optimized marketing sites and content platforms.",
    point2: "Web Application Development focuses on complex, data-driven browser tools with authentication, state management, and API backends.",
  },
  {
    title: "SaaS Development vs. Custom Software Development",
    point1: "SaaS Development is engineered for multi-tenant subscription products serving many external customer accounts.",
    point2: "Custom Software Development is engineered specifically for your internal operational workflows and infrastructure.",
  },
  {
    title: "Dedicated Development Team vs. Project Delivery",
    point1: "Dedicated Teams integrate into your daily sprints and tools, working on your ongoing product roadmap.",
    point2: "Project Delivery is scoped around a fixed set of agreed deliverables, milestones, and handover criteria.",
  },
  {
    title: "Cloud Data Engineering vs. Data Analytics & BI",
    point1: "Cloud Data Engineering builds the underlying pipelines, storage, and transformation layers (ADF, Databricks, Snowflake).",
    point2: "Data Analytics & BI designs the front-end reporting layer (Power BI, Tableau) for executive metrics.",
  },
];

export const ENGAGEMENT_OPTIONS = [
  {
    title: "Project-Based Delivery",
    description: "Ideal for defined scopes, new product builds, or system integrations with clear milestones and deliverables.",
    bestFor: "Clear technical scope, fixed timeline, end-to-end delivery ownership",
  },
  {
    title: "Dedicated Engineering Team",
    description: "Ring-fenced developers, designers, and QA engineers working as a seamless extension of your internal team.",
    bestFor: "Ongoing product roadmap, sprint integration, direct team collaboration",
  },
  {
    title: "Ongoing Support & SLA Maintenance",
    description: "Post-launch application monitoring, cloud infrastructure management, security updates, and performance optimization.",
    bestFor: "Production system stability, zero-downtime SLA, proactive security",
  },
];

export const GENERAL_SERVICES_FAQS = [
  {
    question: "Which service is right for my business?",
    answer:
      "If you are launching a new software product, start with MVP or SaaS Development. If you are solving operational bottlenecks between tools, look at Software Integration or Custom Software. If you need data infrastructure, Cloud & Data Engineering or Data Analytics is ideal. You can also contact us for a brief discovery discussion.",
  },
  {
    question: "Can you improve an existing system, or do you only build new ones?",
    answer:
      "We frequently work on existing codebases — performing application modernization, refactoring legacy architecture, adding API integrations, or upgrading frontends to modern React frameworks.",
  },
  {
    question: "What information do you need to prepare a proposal?",
    answer:
      "To provide an initial scope proposal, we typically need a summary of your goals, target audience, core user workflows, existing tech stack details (if any), and your target timeline.",
  },
  {
    question: "Can we start with a smaller project or discovery phase?",
    answer:
      "Yes. Many clients begin with a short 1 to 2 week Discovery & Architecture phase to map wireframes, data models, and technical requirements before committing to full development.",
  },
  {
    question: "How do you estimate project cost and delivery time?",
    answer:
      "Estimates are calculated based on required technical roles, architecture complexity, third-party integrations, data volume, and testing requirements. We break estimates down into clear milestone phases.",
  },
  {
    question: "How will we receive updates and review progress?",
    answer:
      "We run bi-weekly sprint reviews with live software demonstrations, provide access to Jira/Trello boards, and maintain daily communication via dedicated Slack or Teams channels.",
  },
  {
    question: "Can you work with our existing technology and internal team?",
    answer:
      "Absolutely. Our engineers integrate into your existing Git repositories, matching your coding standards, deployment pipelines, and sprint tools.",
  },
  {
    question: "How are scope changes handled during a project?",
    answer:
      "If new requirements emerge during development, we evaluate the impact on timeline and budget, present options clearly, and adjust the sprint backlog upon your written approval.",
  },
  {
    question: "What documentation and access will we receive at handover?",
    answer:
      "At project completion, you receive full source code access, environment setup scripts, API documentation, deployment guidelines, and complete 100% intellectual property ownership.",
  },
  {
    question: "What support is available after launch?",
    answer:
      "We offer flexible post-launch support plans covering bug fixes, server monitoring, security patches, cloud cost management, and feature enhancements.",
  },
];

export const SERVICES_CATALOG: ServiceDetail[] = ''' + json.dumps(services, indent=2) + ';'

with open('src/data/services.ts', 'w') as f:
    f.write(ts_content)

print(f"Successfully generated {len(services)} services in src/data/services.ts!")
