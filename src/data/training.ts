export interface TrainingCourse {
  slug: string;
  title: string;
  category: "Cloud & Data Engineering" | "Software Engineering" | "AI & Analytics" | "SAP Practices" | "Emerging & Security";
  isUpcoming?: boolean;
  duration: string;
  weeklyHours: string;
  format: string;
  level: string;
  gradientBg: string;
  tags: string[];
  summary: string;
  overview: string;
  intendedLearners: string[];
  prerequisites: string[];
  quickFacts: {
    batchDetails: string;
    language: string;
    commitment: string;
    prerequisiteSummary: string;
  };
  whatYouWillLearn: string[];
  curriculum: {
    module: string;
    objective: string;
    topics: string[];
    exercise: string;
    assessment?: string;
  }[];
  projects: {
    title: string;
    type: "Practice Project" | "Simulated Business Project" | "Capstone Project";
    problem: string;
    whatYouBuild: string;
    tools: string[];
    deliverables: string[];
    reviewProcess: string;
  }[];
  classExperience: {
    liveSessions: string;
    recordings: string;
    assignments: string;
    doubtSupport: string;
  };
  trainer: {
    name: string;
    title: string;
    experience: string;
    role: string;
    avatarUrl?: string;
  };
  scheduleFees: {
    nextBatchDate: string;
    timings: string;
    feeStructure: string;
    paymentTerms: string;
  };
  careerSupportDetails: {
    resumePreparation: string;
    mockInterviews: string;
    technicalPreparation: string;
    jobReferrals: string;
    supportDuration: string;
    studentResponsibilities: string[];
  };
  faqs: { question: string; answer: string }[];
  certificateIssuer?: string;
  relatedSlugs: string[];
}

export const AAROHA_PROGRAM_STEPS = [
  {
    step: 1,
    title: "Foundation & Concepts",
    description: "Master core technical fundamentals, coding syntax, and tools with live interactive guidance.",
  },
  {
    step: 2,
    title: "Guided Lab Exercises",
    description: "Complete module-by-module practical exercises with instructor code reviews and feedback.",
  },
  {
    step: 3,
    title: "Simulated Business Projects",
    description: "Build realistic, end-to-end portfolio projects matching enterprise technical requirements.",
  },
  {
    step: 4,
    title: "Technical Mock Evaluations",
    description: "Participate in 1-on-1 technical mock interviews and resume optimization sessions.",
  },
  {
    step: 5,
    title: "Placement Assistance",
    description: "Access direct job referral opportunities with our established network of hiring partners.",
  },
];

export const CAREER_SUPPORT_AREAS = [
  {
    icon: "FileText",
    title: "ATS Resume Preparation",
    description: "One-on-one resume crafting emphasizing your hands-on projects and technical skills.",
  },
  {
    icon: "Mic",
    title: "Technical Mock Interviews",
    description: "2 Simulated 1-on-1 technical mock interview sessions with actionable feedback.",
  },
  {
    icon: "Code",
    title: "Technical Preparation",
    description: "Comprehensive repository of top technical interview questions and scenario answers.",
  },
  {
    icon: "Handshake",
    title: "Hiring Partner Referrals",
    description: "Direct referral sharing with hiring partner recruiters upon successful course completion.",
  },
  {
    icon: "Clock",
    title: "6-Month Placement Window",
    description: "Ongoing career placement support for up to 6 months post-course graduation.",
  },
];

export const GENERAL_TRAINING_FAQS = [
  {
    question: "Who are AAROHA training courses designed for?",
    answer:
      "Our courses are designed for students, fresh graduates, software developers, and IT professionals looking to build practical, project-backed technical skills in high-demand domains.",
  },
  {
    question: "How are classes delivered?",
    answer:
      "Classes are conducted live interactively online. High-definition video recordings are uploaded after every class for lifelong revision.",
  },
  {
    question: "What if I miss a live class?",
    answer:
      "You can review the full HD recording of the missed class and resolve doubts during weekend mentor office hours or via our technical support chat.",
  },
  {
    question: "How does placement assistance work?",
    answer:
      "Placement assistance includes ATS resume building, technical mock interviews, interview question prep, and referral sharing with hiring partners for students who complete their projects and pass mock evaluations.",
  },
  {
    question: "What certificate will I receive upon completion?",
    answer:
      "You receive a verifiable Certificate of Completion issued by AAROHA Technologies (Powered by J2D Technologies) upon completing all assignments and capstone project requirements.",
  },
  {
    question: "Can I pay course fees in installments?",
    answer:
      "Yes. We offer flexible installment plans for all our 2-month and 3-month programs.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "A 100% full refund is available if requested prior to the start of the second live class session.",
  },
];

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    "slug": "azure-data-engineer",
    "title": "Azure Data Engineer Masterclass",
    "category": "Cloud & Data Engineering",
    "duration": "3 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Recorded Sessions",
    "level": "Beginner to Advanced",
    "gradientBg": "from-blue-900 to-slate-900",
    "tags": [
      "Cloud Data",
      "PySpark",
      "ADF",
      "Databricks",
      "Snowflake"
    ],
    "summary": "Master enterprise cloud data engineering on Microsoft Azure \u2014 building automated ADF pipelines, Databricks PySpark transformations, and Snowflake data lakehouses from scratch.",
    "overview": "This comprehensive 3-month program covers end-to-end Azure Data Engineering from foundational SQL and Python up to enterprise data lakehouse architecture. You will learn to build automated ingestion pipelines in Azure Data Factory, process large datasets using Apache Spark on Azure Databricks, and model data for reporting in Synapse and Snowflake.",
    "intendedLearners": [
      "Software developers and SQL developers transitioning to Cloud Data Engineering",
      "ETL developers moving from on-premise SSIS/Informatica to Azure Cloud",
      "Fresh graduates and IT professionals seeking job-ready cloud data skills"
    ],
    "prerequisites": [
      "Basic understanding of SQL queries (SELECT, JOIN, GROUP BY)",
      "Fundamental knowledge of any programming language (Python or C# helpful but not mandatory)",
      "Computer with stable internet connection for cloud lab access"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Weekday Evening Batches Available",
      "language": "English",
      "commitment": "8-10 Hours per week (4 hrs live class + 5 hrs lab practice)",
      "prerequisiteSummary": "Basic SQL knowledge required; Python provided in Module 1"
    },
    "whatYouWillLearn": [
      "Design and deploy production Azure Data Factory (ADF) pipelines with dynamic triggers",
      "Write scalable PySpark data transformation scripts on Azure Databricks clusters",
      "Implement Medallion Architecture (Bronze, Silver, Gold data layers) in Delta Lake",
      "Integrate Azure Synapse Analytics and Snowflake cloud data warehouses",
      "Configure Git version control, CI/CD deployment, and automated alert monitoring for data pipelines"
    ],
    "curriculum": [
      {
        "module": "Module 1: Cloud & Data Fundamentals + Python for Data",
        "objective": "Master Python data structures, pandas, and cloud storage basics on Azure.",
        "topics": [
          "Cloud Storage Architecture",
          "Azure Blob & ADLS Gen2",
          "Python Data Structures",
          "Pandas DataFrames",
          "Data Cleaning"
        ],
        "exercise": "Build a Python script to validate, clean, and upload raw CSV files into ADLS Gen2 storage.",
        "assessment": "Python syntax & file handling practical code submission."
      },
      {
        "module": "Module 2: Azure Data Factory (ADF) Pipeline Engineering",
        "objective": "Build automated ETL pipelines using ADF activities, parameters, and triggers.",
        "topics": [
          "Copy Data Activity",
          "Mapping Data Flows",
          "Lookup & Get Metadata",
          "Pipeline Parameters & Variables",
          "Tumbling Window Triggers"
        ],
        "exercise": "Construct an ADF pipeline that ingests data from HTTP endpoints and SQL DB into ADLS Gen2 automatically every midnight.",
        "assessment": "ADF pipeline deployment & parameters verification test."
      },
      {
        "module": "Module 3: Apache Spark & Azure Databricks Deep Dive",
        "objective": "Process multi-gigabyte datasets using PySpark DataFrames and Delta Lake.",
        "topics": [
          "Spark Architecture",
          "PySpark Transformations & Actions",
          "Databricks Notebooks",
          "Delta Lake ACID Transactions",
          "Medallion Architecture"
        ],
        "exercise": "Clean 5 million raw web click logs using PySpark and save into Delta Lake Bronze, Silver, and Gold layers.",
        "assessment": "PySpark optimization and Delta Lake notebook evaluation."
      },
      {
        "module": "Module 4: Data Warehousing (Synapse & Snowflake) + CI/CD",
        "objective": "Build warehouse dimensional models and deploy pipelines with Azure DevOps.",
        "topics": [
          "Star & Snowflake Schema Design",
          "Azure Synapse Dedicated Pools",
          "Snowflake Data Loading",
          "Azure DevOps CI/CD for ADF",
          "Monitoring & Alerting"
        ],
        "exercise": "Automate deployment of ADF pipelines from Dev to Prod environment using Azure DevOps YAML pipelines.",
        "assessment": "End-to-end data warehouse architecture review."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Multi-Source Retail Sales Ingestion",
        "type": "Practice Project",
        "problem": "Daily sales records arrive in different formats (CSV, JSON) across multiple vendor servers.",
        "whatYouBuild": "An automated ADF pipeline that collects, formats, and stores files into ADLS Gen2 with email alerts.",
        "tools": [
          "Azure Data Factory",
          "ADLS Gen2",
          "Azure Logic Apps",
          "JSON/CSV"
        ],
        "deliverables": [
          "Configured ADF pipeline JSON",
          "Data ingestion verification log"
        ],
        "reviewProcess": "Mentor code review during weekly lab session."
      },
      {
        "title": "Simulated Business Project: Enterprise E-Commerce Data Lakehouse",
        "type": "Simulated Business Project",
        "problem": "An e-commerce business needs to aggregate order transactions, customer clickstreams, and warehouse stock into a unified analytics data lakehouse.",
        "whatYouBuild": "A complete Medallion Architecture data lakehouse processing raw clickstreams through PySpark on Databricks into Snowflake reporting tables.",
        "tools": [
          "Azure Databricks",
          "PySpark",
          "Delta Lake",
          "Snowflake",
          "Azure Data Factory",
          "Power BI"
        ],
        "deliverables": [
          "Databricks PySpark PyBook code",
          "Snowflake data model scripts",
          "Power BI dashboard connection"
        ],
        "reviewProcess": "1-on-1 technical review and architecture evaluation with Senior Lead Trainer."
      }
    ],
    "classExperience": {
      "liveSessions": "Interactive weekend/weekday live sessions with real-time screen sharing and hands-on coding.",
      "recordings": "Full high-definition video recordings uploaded within 4 hours of class for lifelong access.",
      "assignments": "Practical hands-on lab exercises assigned after every module with code review feedback.",
      "doubtSupport": "Dedicated Slack/WhatsApp technical support channels with response within 2 hours."
    },
    "trainer": {
      "name": "Srinivas Rao",
      "title": "Principal Cloud Data Architect",
      "experience": "12+ Years Experience in Enterprise Data Engineering (Azure, Databricks, Snowflake)",
      "role": "Lead Instructor & Mentor for Azure Data Engineering Practices"
    },
    "scheduleFees": {
      "nextBatchDate": "Upcoming Batch Starts First Monday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 10:00 AM - 12:30 PM | Weekday Batch: Mon-Thu 8:00 PM - 9:30 PM",
      "feeStructure": "Transparent course fee with flexible 2-installment payment plan option",
      "paymentTerms": "Full refund available if cancelled before the start of the 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "One-on-one ATS-optimized resume building session tailored for Cloud Data Engineer roles.",
      "mockInterviews": "2 Technical mock interviews with detailed feedback on PySpark, ADF, and SQL questions.",
      "technicalPreparation": "Repository of top 150+ Azure Data Engineer interview questions and scenario answers.",
      "jobReferrals": "Direct referrals to hiring partners upon successful completion of capstone project and mock clearance.",
      "supportDuration": "Career placement assistance provided for up to 6 months post-course completion.",
      "studentResponsibilities": [
        "Maintain 80%+ attendance",
        "Complete all module assignments & capstone project",
        "Pass technical mock interview evaluation"
      ]
    },
    "faqs": [
      {
        "question": "Who is this course suitable for?",
        "answer": "This course is ideal for software developers, SQL developers, ETL engineers, and fresh graduates aiming to start a career as a Cloud Data Engineer."
      },
      {
        "question": "Why does this standalone Azure course take 3 months while the Gen AI version takes 2 months?",
        "answer": "The 3-month Masterclass starts from absolute fundamentals (SQL, Python, data warehousing) up through Databricks. The 2-month Gen AI program is an accelerated track for learners who already have baseline data pipeline knowledge and want to add Generative AI / RAG features."
      },
      {
        "question": "What knowledge do I need before joining?",
        "answer": "Basic SQL knowledge is required. We cover Python for Data Engineering during Module 1."
      },
      {
        "question": "Are class sessions live or recorded?",
        "answer": "All classes are conducted live interactively online. HD recordings are posted after every class for review."
      },
      {
        "question": "Do I get hands-on access to Azure cloud tools?",
        "answer": "Yes. We guide you step-by-step to set up your free Azure Cloud account and Databricks Community Edition for hands-on practice."
      },
      {
        "question": "What projects will I complete during the course?",
        "answer": "You will complete 1 practice data ingestion project and 1 enterprise simulated Medallion Data Lakehouse capstone project using PySpark and Snowflake."
      },
      {
        "question": "How can I get help outside of class hours?",
        "answer": "You get access to a dedicated technical support group on Slack/WhatsApp where trainers answer questions within 2 hours."
      },
      {
        "question": "What certificate is provided upon completion?",
        "answer": "You receive a verifiable Certificate of Completion issued by AAROHA Technologies (Powered by J2D Technologies)."
      },
      {
        "question": "What placement support is included?",
        "answer": "Includes ATS resume preparation, 2 technical mock interviews, interview question banks, and job referrals to hiring partners for eligible graduates."
      },
      {
        "question": "What are the payment options and refund policy?",
        "answer": "We offer flexible installment payment options. A 100% refund is available if requested prior to the start of the 2nd class."
      }
    ],
    "relatedSlugs": [
      "azure-data-engineer-genai",
      "data-science-ml",
      "business-analytics-powerbi"
    ]
  },
  {
    "slug": "azure-data-engineer-genai",
    "title": "Azure Data Engineer with Gen AI & AI Agents",
    "category": "Cloud & Data Engineering",
    "duration": "2 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Recorded Sessions",
    "level": "Intermediate Track",
    "gradientBg": "from-blue-900 via-indigo-900 to-slate-900",
    "tags": [
      "GenAI",
      "Azure OpenAI",
      "RAG Pipelines",
      "Vector DB",
      "AI Agents"
    ],
    "summary": "Accelerated 2-month track combining Azure Data Factory & Databricks pipelines with Azure OpenAI, RAG architectures, and autonomous AI agents.",
    "overview": "Designed for developers and data professionals with baseline pipeline knowledge, this accelerated 2-month program focuses on connecting enterprise Azure data platforms with Generative AI capabilities. You will learn to build Retrieval-Augmented Generation (RAG) pipelines, index data into vector databases, and deploy AI agents.",
    "intendedLearners": [
      "Data Engineers adding Generative AI and LLM pipelines to their skillset",
      "Software Engineers looking to build AI-powered enterprise applications",
      "Tech professionals with existing SQL/Python knowledge seeking fast-track GenAI skills"
    ],
    "prerequisites": [
      "Prior experience with SQL or Python programming",
      "Familiarity with basic data pipeline concepts",
      "Azure account setup readiness for OpenAI service access"
    ],
    "quickFacts": {
      "batchDetails": "Accelerated Weekend & Evening Batches",
      "language": "English",
      "commitment": "8-10 Hours per week",
      "prerequisiteSummary": "Prior Python/SQL knowledge required for accelerated 2-month pace"
    },
    "whatYouWillLearn": [
      "Build automated data ingestion pipelines targeting Azure Vector Search & Pinecone",
      "Integrate Azure OpenAI Service APIs (GPT-4, Embeddings) safely with zero data leakage",
      "Develop Retrieval-Augmented Generation (RAG) document research pipelines using LangChain",
      "Deploy autonomous multi-step AI agents capable of querying SQL and Vector databases",
      "Implement enterprise AI security guardrails, prompt evaluation, and monitoring"
    ],
    "curriculum": [
      {
        "module": "Module 1: Azure Data Pipeline & Vector Database Foundations",
        "objective": "Build automated ADF pipelines feeding chunked data into Vector Databases.",
        "topics": [
          "ADF Pipelines",
          "Text Chunking Strategies",
          "Vector Embeddings",
          "Azure AI Search",
          "Pinecone Indexing"
        ],
        "exercise": "Ingest 500 PDF technical manuals via ADF, chunk text, and index embeddings into Azure AI Search.",
        "assessment": "Vector indexing pipeline validation test."
      },
      {
        "module": "Module 2: RAG Architecture & Azure OpenAI Integration",
        "objective": "Build RAG pipelines connecting company data to Azure OpenAI GPT-4 models.",
        "topics": [
          "Azure OpenAI Deployment",
          "LangChain Framework",
          "RAG Prompt Engineering",
          "Citation & Hallucination Guardrails"
        ],
        "exercise": "Construct a Q&A pipeline where GPT-4 answers policy questions using indexed company document passages.",
        "assessment": "RAG evaluation benchmark testing accuracy & grounding."
      },
      {
        "module": "Module 3: Autonomous AI Agents & Tool Calling",
        "objective": "Engineer multi-agent workflows capable of executing SQL queries and API calls.",
        "topics": [
          "LangChain Agents",
          "SQL Database Agent Tools",
          "Multi-Agent Collaboration",
          "FastAPI AI Endpoint Deployment"
        ],
        "exercise": "Build an AI agent that accepts natural language questions, generates SQL, executes queries on PostgreSQL, and returns executive summaries.",
        "assessment": "Full AI Agent Capstone Project evaluation."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: PDF Document Vector Search Pipeline",
        "type": "Practice Project",
        "problem": "Company policy documents are trapped in un-searchable static PDF files.",
        "whatYouBuild": "A Python script parsing PDFs, generating OpenAI embeddings, and building a vector search index.",
        "tools": [
          "Python",
          "Azure OpenAI",
          "LangChain",
          "Pinecone"
        ],
        "deliverables": [
          "Vector search Python script",
          "Sample query benchmark log"
        ],
        "reviewProcess": "Code review during weekly practical session."
      },
      {
        "title": "Simulated Business Project: Enterprise Knowledge Base RAG Assistant",
        "type": "Simulated Business Project",
        "problem": "An enterprise support team needs a secure internal AI agent that reads technical documentation and answers customer questions with exact page citations.",
        "whatYouBuild": "A complete RAG AI assistant with web UI, Azure OpenAI integration, strict zero-data-retention guardrails, and automated citation logging.",
        "tools": [
          "Azure OpenAI",
          "LangChain",
          "Azure AI Search",
          "FastAPI",
          "React UI"
        ],
        "deliverables": [
          "Full application code repository",
          "Guardrail evaluation report",
          "Live demonstration"
        ],
        "reviewProcess": "Detailed technical panel demo and code evaluation."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive classes with hands-on GenAI prompt engineering and Python coding.",
      "recordings": "All session recordings provided with lifetime access.",
      "assignments": "Weekly GenAI lab challenges and prompt evaluation tasks.",
      "doubtSupport": "Direct mentor access via private Slack workspace."
    },
    "trainer": {
      "name": "Dr. Rajesh Kumar",
      "title": "AI Architect & Lead GenAI Researcher",
      "experience": "10+ Years in AI/ML & Cloud Systems Architecture",
      "role": "Lead Instructor for GenAI & AI Agent Engineering"
    },
    "scheduleFees": {
      "nextBatchDate": "Starting 15th of Next Month",
      "timings": "Weekend Batch: Sat & Sun 2:00 PM - 5:00 PM",
      "feeStructure": "Competitive fee with 2-installment payment structure available",
      "paymentTerms": "Full refund available prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "Resume optimization highlighting GenAI, RAG, and Azure OpenAI project capabilities.",
      "mockInterviews": "2 GenAI technical mock interviews focusing on RAG architecture and LLM guardrails.",
      "technicalPreparation": "Curated repository of GenAI interview questions and system design scenarios.",
      "jobReferrals": "Referrals to hiring partners looking for GenAI & Data Engineers.",
      "supportDuration": "6 Months career support post-completion.",
      "studentResponsibilities": [
        "Complete all GenAI labs",
        "Build and present Capstone RAG project",
        "Pass mock interview review"
      ]
    },
    "faqs": [
      {
        "question": "Why does this Gen AI course take 2 months while the standalone Azure course takes 3 months?",
        "answer": "The standalone 3-month course covers foundational data engineering (SQL, basic Python, data warehousing) from scratch. This 2-month track is designed for learners with prior SQL/Python experience who want to fast-track directly into Azure OpenAI, RAG, and AI Agent development."
      },
      {
        "question": "What prior experience do I need?",
        "answer": "Prior experience with basic Python programming and SQL is recommended for this accelerated pace."
      },
      {
        "question": "Will we use enterprise Azure OpenAI or public OpenAI?",
        "answer": "We use enterprise Azure OpenAI instances to demonstrate enterprise-grade security and zero-data-retention practices."
      },
      {
        "question": "What projects will I build?",
        "answer": "You will build a PDF Vector Search pipeline and an Enterprise Knowledge Base RAG Assistant with strict guardrails."
      },
      {
        "question": "Are recordings provided?",
        "answer": "Yes. HD recordings are made available after every live session."
      },
      {
        "question": "What placement assistance is provided?",
        "answer": "Includes resume refinement for AI roles, mock interviews, AI system design prep, and referral sharing."
      },
      {
        "question": "What certificate is awarded?",
        "answer": "A Certificate of Completion in Azure Data & GenAI Engineering from AAROHA Technologies."
      },
      {
        "question": "What if I miss a live class?",
        "answer": "You can watch the recording and ask questions during weekend doubt-clearing sessions."
      },
      {
        "question": "Can my employer sponsor this course?",
        "answer": "Yes. We issue official corporate invoices for employer reimbursement."
      },
      {
        "question": "What is the refund policy?",
        "answer": "Full refund available if requested before the 2nd live class."
      }
    ],
    "relatedSlugs": [
      "azure-data-engineer",
      "generative-ai-engineering",
      "data-science-ml"
    ]
  },
  {
    "slug": "data-science-ml",
    "title": "Data Science & Machine Learning",
    "category": "AI & Analytics",
    "duration": "3 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Lab Practice",
    "level": "Beginner to Advanced",
    "gradientBg": "from-emerald-900 to-teal-700",
    "tags": [
      "Python",
      "Machine Learning",
      "Scikit-Learn",
      "Pandas",
      "Statistics"
    ],
    "summary": "Practical Data Science program covering exploratory data analysis, statistical modeling, machine learning algorithms, and MLOps deployment in Python.",
    "overview": "Master the complete data science workflow from data Wrangling and feature engineering to training predictive machine learning models and deploying them as REST APIs. Learn Scikit-Learn, Pandas, NumPy, and model evaluation techniques.",
    "intendedLearners": [
      "Aspiring Data Scientists and Machine Learning Engineers",
      "Data Analysts advancing to predictive modeling and machine learning",
      "Software developers entering the Data Science domain"
    ],
    "prerequisites": [
      "High school mathematics (basic algebra and statistics helpful)",
      "Basic computer literacy",
      "No prior coding experience required \u2014 Python covered from scratch"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Weekday Evening Batches",
      "language": "English",
      "commitment": "8-10 Hours/Week",
      "prerequisiteSummary": "No prior coding needed; Python & Math taught from basics"
    },
    "whatYouWillLearn": [
      "Perform exploratory data analysis and data visualization using Pandas, Seaborn, and Matplotlib",
      "Apply key statistical concepts (probability, hypothesis testing, A/B testing) to business problems",
      "Build supervised ML models (Linear Regression, Logistic Regression, Decision Trees, Random Forests, XGBoost)",
      "Implement unsupervised learning algorithms (K-Means Clustering, PCA dimensionality reduction)",
      "Deploy trained machine learning models as production REST API endpoints using FastAPI"
    ],
    "curriculum": [
      {
        "module": "Module 1: Python for Data Science & Exploratory Analysis",
        "objective": "Master Python libraries for data manipulation and visualization.",
        "topics": [
          "NumPy Arrays",
          "Pandas DataFrames",
          "Data Cleaning",
          "Matplotlib & Seaborn Visualization"
        ],
        "exercise": "Analyze and clean a 100,000-row real estate dataset to identify key pricing factors.",
        "assessment": "Exploratory Data Analysis notebook project."
      },
      {
        "module": "Module 2: Applied Statistics & Machine Learning Algorithms",
        "objective": "Build and evaluate supervised and unsupervised ML models.",
        "topics": [
          "Regression Models",
          "Classification Algorithms",
          "Cross-Validation",
          "Random Forest & XGBoost",
          "Clustering"
        ],
        "exercise": "Train a customer churn prediction model using Random Forest and evaluate Precision/Recall metrics.",
        "assessment": "Machine Learning algorithm implementation test."
      },
      {
        "module": "Module 3: Model Deployment & MLOps Foundations",
        "objective": "Package ML models into production API services.",
        "topics": [
          "Model Serialization (Joblib/Pickle)",
          "FastAPI Microservices",
          "Docker Containerization",
          "Model Drift Monitoring"
        ],
        "exercise": "Deploy the churn model as a REST API endpoint inside a Docker container.",
        "assessment": "Capstone Model Deployment Project."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: House Price Prediction Model",
        "type": "Practice Project",
        "problem": "Predict residential real estate prices based on property features and location metrics.",
        "whatYouBuild": "A regression model evaluating housing attributes with automated feature scaling.",
        "tools": [
          "Python",
          "Pandas",
          "Scikit-Learn",
          "Matplotlib"
        ],
        "deliverables": [
          "Jupyter notebook code",
          "Model evaluation metrics report"
        ],
        "reviewProcess": "Code review during practical lab session."
      },
      {
        "title": "Simulated Business Project: E-Commerce Customer Churn & Segmentation Engine",
        "type": "Simulated Business Project",
        "problem": "An online retailer needs to predict which high-value customers are likely to churn next month and segment them for retention campaigns.",
        "whatYouBuild": "An end-to-end ML pipeline combining K-Means customer segmentation with an XGBoost churn prediction API service.",
        "tools": [
          "Python",
          "Scikit-Learn",
          "XGBoost",
          "FastAPI",
          "Docker",
          "Power BI"
        ],
        "deliverables": [
          "Trained model package",
          "FastAPI server code",
          "Customer segmentation dashboard"
        ],
        "reviewProcess": "1-on-1 presentation and technical assessment."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive classes focusing on real-world datasets and algorithm coding.",
      "recordings": "HD recordings available after each class.",
      "assignments": "Weekly coding assignments with automated test checks.",
      "doubtSupport": "Slack support channel with mentor assistance."
    },
    "trainer": {
      "name": "Ananya Sharma",
      "title": "Lead Data Scientist",
      "experience": "9+ Years in Predictive Analytics & Machine Learning Engineering",
      "role": "Lead Data Science Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 2nd Saturday of Next Month",
      "timings": "Weekend: Sat & Sun 10:00 AM - 1:00 PM",
      "feeStructure": "Standard fee with 3-installment payment plan",
      "paymentTerms": "Full refund before 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "Custom Data Science resume setup highlighting ML projects and GitHub portfolio.",
      "mockInterviews": "2 Technical mock interviews covering Python, statistics, and ML algorithms.",
      "technicalPreparation": "Data Science interview question bank and scenario exercises.",
      "jobReferrals": "Referral opportunities with hiring partner network.",
      "supportDuration": "6 Months career assistance post-course.",
      "studentResponsibilities": [
        "80%+ class attendance",
        "Complete all projects",
        "Pass mock interview"
      ]
    },
    "faqs": [
      {
        "question": "Do I need a math background for Data Science?",
        "answer": "High school level math is sufficient. We teach the necessary statistics and probability concepts step-by-step."
      },
      {
        "question": "What tools and libraries are taught?",
        "answer": "You will learn Python, NumPy, Pandas, Scikit-Learn, XGBoost, Matplotlib, FastAPI, and Docker."
      },
      {
        "question": "How long is the course?",
        "answer": "3 Months with 8-10 hours per week commitment."
      },
      {
        "question": "Is placement assistance included?",
        "answer": "Yes. Includes resume optimization, mock interviews, and referral opportunities."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, all sessions are recorded and accessible anytime."
      },
      {
        "question": "What projects will I build?",
        "answer": "A House Price Regression project and a Customer Churn & Segmentation Capstone engine."
      },
      {
        "question": "What certificate do I receive?",
        "answer": "A Certificate in Data Science & Machine Learning from AAROHA Technologies."
      },
      {
        "question": "Can I switch to Data Science from a non-IT background?",
        "answer": "Yes, many of our successful learners transitioned from non-IT domain roles by building a strong project portfolio."
      },
      {
        "question": "How is doubt resolution handled?",
        "answer": "Via dedicated Slack channels and weekend mentor office hours."
      },
      {
        "question": "What is the refund policy?",
        "answer": "100% refund before the 2nd live class."
      }
    ],
    "relatedSlugs": [
      "azure-data-engineer-genai",
      "business-analytics-powerbi",
      "generative-ai-engineering"
    ]
  },
  {
    "slug": "python-full-stack",
    "title": "Python Full Stack Development",
    "category": "Software Engineering",
    "duration": "3 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Hands-on Coding",
    "level": "Beginner to Advanced",
    "gradientBg": "from-blue-800 to-indigo-900",
    "tags": [
      "Python",
      "Django",
      "React",
      "PostgreSQL",
      "REST API"
    ],
    "summary": "Full-stack web development program teaching modern Python backend (Django/FastAPI), React frontend, PostgreSQL databases, and cloud deployment.",
    "overview": "Learn end-to-end web software engineering. Master Python programming, Django web framework, RESTful API design, modern React UI development, PostgreSQL database management, and cloud deployment on Vercel/AWS.",
    "intendedLearners": [
      "Aspiring Full-Stack Software Engineers",
      "Python developers expanding into frontend React UI development",
      "Fresh graduates building a job-ready web development portfolio"
    ],
    "prerequisites": [
      "Basic computer literacy",
      "Logical thinking skills",
      "No prior programming experience required \u2014 Python taught from scratch"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Weekday Evening Options",
      "language": "English",
      "commitment": "8-10 Hours/Week",
      "prerequisiteSummary": "Beginner-friendly; coding taught from fundamentals"
    },
    "whatYouWillLearn": [
      "Write clean, object-oriented Python code adhering to PEP 8 standards",
      "Build secure web application backends and REST APIs using Django and FastAPI",
      "Create interactive, responsive web user interfaces using React and Tailwind CSS",
      "Design relational database schemas and write optimized SQL queries in PostgreSQL",
      "Deploy full-stack web applications to cloud platforms with CI/CD deployment"
    ],
    "curriculum": [
      {
        "module": "Module 1: Python Core & Database Fundamentals",
        "objective": "Master OOP Python and relational database design.",
        "topics": [
          "Python OOP",
          "Data Structures",
          "PostgreSQL Schema Design",
          "SQL Queries & Joins"
        ],
        "exercise": "Build a command-line inventory management tool connected to PostgreSQL database.",
        "assessment": "Python OOP & SQL database test."
      },
      {
        "module": "Module 2: Django & REST API Development",
        "objective": "Build secure backend web APIs using Django REST Framework.",
        "topics": [
          "Django Models & ORM",
          "Django REST Framework",
          "JWT Authentication",
          "API Endpoints"
        ],
        "exercise": "Create a secure REST API for a user management and blogging platform.",
        "assessment": "Django REST API functional submission."
      },
      {
        "module": "Module 3: React Frontend & Full-Stack Integration",
        "objective": "Build modern React frontends and connect to Django backends.",
        "topics": [
          "React Components & Hooks",
          "State Management",
          "Axios API Binding",
          "Tailwind CSS",
          "Vercel / AWS Deployment"
        ],
        "exercise": "Deploy a complete Full-Stack web application combining React UI and Django API backend.",
        "assessment": "Full-Stack Web App Capstone evaluation."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Task Management REST API",
        "type": "Practice Project",
        "problem": "Create a multi-user task tracking system with authentication.",
        "whatYouBuild": "A Django REST API with user sign-in, task CRUD operations, and permission checks.",
        "tools": [
          "Python",
          "Django REST Framework",
          "PostgreSQL",
          "Postman"
        ],
        "deliverables": [
          "API repository code",
          "Postman endpoint collection"
        ],
        "reviewProcess": "Code review during lab sessions."
      },
      {
        "title": "Simulated Business Project: Full-Stack E-Commerce Web Portal",
        "type": "Simulated Business Project",
        "problem": "Build a complete online store with product catalog, shopping cart, user account portal, and order checkout.",
        "whatYouBuild": "A responsive React web frontend connected to a Django backend API with PostgreSQL storage and Stripe payment checkout.",
        "tools": [
          "React",
          "Django",
          "PostgreSQL",
          "Tailwind CSS",
          "Stripe API",
          "Vercel"
        ],
        "deliverables": [
          "Full-Stack source code repository",
          "Live deployed website link"
        ],
        "reviewProcess": "Live software demonstration and technical panel review."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive coding sessions with instant instructor feedback.",
      "recordings": "HD recordings available for every class.",
      "assignments": "Practical coding tasks after each module.",
      "doubtSupport": "Slack community support with fast turnaround."
    },
    "trainer": {
      "name": "Karthik Verma",
      "title": "Senior Full-Stack Architect",
      "experience": "11+ Years in Software Engineering & Web Architecture",
      "role": "Lead Full Stack Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 1st Monday of Next Month",
      "timings": "Weekday Batch: Mon-Thu 7:30 PM - 9:00 PM",
      "feeStructure": "Standard course fee with flexible installment options",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "Full-Stack developer resume review highlighting GitHub repositories and live app links.",
      "mockInterviews": "2 Full-stack technical mock interviews (React UI + Python Backend).",
      "technicalPreparation": "Coding challenge preparation and full-stack interview question banks.",
      "jobReferrals": "Referral opportunities to hiring partners.",
      "supportDuration": "6 Months career assistance post-course.",
      "studentResponsibilities": [
        "80%+ attendance",
        "Complete capstone project",
        "Pass mock interview review"
      ]
    },
    "faqs": [
      {
        "question": "Do I need coding experience to join?",
        "answer": "No. Python and web development fundamentals are taught from absolute scratch."
      },
      {
        "question": "What stack will I learn?",
        "answer": "Python, Django, Django REST Framework, React, PostgreSQL, Tailwind CSS, and Git."
      },
      {
        "question": "How long is the course?",
        "answer": "3 Months with 8-10 hours per week commitment."
      },
      {
        "question": "Is job placement assistance provided?",
        "answer": "Yes. Includes ATS resume building, mock interviews, and referral opportunities."
      },
      {
        "question": "Are classes recorded?",
        "answer": "Yes, all live sessions are recorded and accessible anytime."
      },
      {
        "question": "What full-stack project will I build?",
        "answer": "You will build a full-stack E-Commerce portal with React, Django API, PostgreSQL, and Stripe integration."
      },
      {
        "question": "What certificate will I earn?",
        "answer": "A Certificate in Python Full Stack Development from AAROHA Technologies."
      },
      {
        "question": "Will I learn how to deploy applications?",
        "answer": "Yes, you will learn to deploy frontend apps on Vercel and backend services on AWS/Heroku."
      },
      {
        "question": "How are doubts resolved?",
        "answer": "Via Slack support groups and live mentor Q&A sessions."
      },
      {
        "question": "What is the refund policy?",
        "answer": "Full refund available before the 2nd live class."
      }
    ],
    "relatedSlugs": [
      "react-nextjs-frontend",
      "java-full-stack",
      "data-science-ml"
    ]
  },
  {
    "slug": "sap-abap",
    "title": "SAP ABAP on HANA Development",
    "category": "SAP Practices",
    "duration": "2.5 Months",
    "weeklyHours": "8 Hours/Week",
    "format": "Live Online + SAP System Access",
    "level": "Intermediate",
    "gradientBg": "from-slate-900 to-blue-950",
    "tags": [
      "SAP ABAP",
      "ABAP on HANA",
      "CDS Views",
      "OData",
      "Fiori"
    ],
    "summary": "Enterprise SAP ABAP programming course covering classical ABAP, RICEFW development, ABAP on HANA, CDS Views, and OData services for SAP Fiori.",
    "overview": "Master specialized SAP ERP programming. Learn classical ABAP, Data Dictionary, Reports, Smartforms, Module Pool, ABAP on HANA optimizations, Core Data Services (CDS) views, and OData services for modern SAP Fiori applications.",
    "intendedLearners": [
      "Software developers entering SAP enterprise consulting",
      "SAP functional consultants adding technical ABAP capabilities",
      "IT professionals seeking specialized SAP technical roles"
    ],
    "prerequisites": [
      "Basic understanding of programming concepts (variables, loops, conditions)",
      "Basic understanding of relational database concepts",
      "SAP system access setup readiness"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Evening Options",
      "language": "English",
      "commitment": "8 Hours/Week",
      "prerequisiteSummary": "Basic programming and database understanding recommended"
    },
    "whatYouWillLearn": [
      "Develop custom SAP reports, Data Dictionary objects, and internal tables",
      "Create RICEFW (Reports, Interfaces, Conversions, Enhancements, Forms, Workflows) objects",
      "Write high-performance ABAP on HANA code utilizing Core Data Services (CDS Views)",
      "Build OData services using SEGW transaction to feed SAP Fiori frontend applications",
      "Perform SAP code debugging, performance tracing, and code compliance checks"
    ],
    "curriculum": [
      {
        "module": "Module 1: Classical ABAP & Data Dictionary (DDIC)",
        "objective": "Master SAP Data Dictionary, tables, views, and Classical/Interactive Reports.",
        "topics": [
          "SAP Architecture",
          "ABAP Dictionary (Tables, Views, Structures)",
          "Open SQL",
          "Internal Tables",
          "Classical Reports"
        ],
        "exercise": "Create custom SAP DDIC tables and build an interactive sales order reporting tool in SAP GUI.",
        "assessment": "SAP DDIC & Report programming evaluation."
      },
      {
        "module": "Module 2: RICEFW Development & Enhancements",
        "objective": "Build enterprise SAP enhancements, BAPIs, BDC, and Smartforms.",
        "topics": [
          "BDC Data Conversion",
          "BAPI Interfaces",
          "User Exits & BAdIs",
          "Smartforms & Adobe Forms"
        ],
        "exercise": "Develop a BDC program to automatically post customer invoice records into SAP FI module.",
        "assessment": "RICEFW objects development submission."
      },
      {
        "module": "Module 3: ABAP on HANA, CDS Views & OData Services",
        "objective": "Build modern ABAP on HANA CDS Views and OData services for SAP Fiori.",
        "topics": [
          "HANA Database Architecture",
          "CDS Views & Associations",
          "AMDP Procedures",
          "SEGW OData Service Creation"
        ],
        "exercise": "Build a CDS View with associations and publish as an OData service connected to a Fiori app.",
        "assessment": "SAP ABAP on HANA Capstone project review."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Custom SAP Purchase Order Report",
        "type": "Practice Project",
        "problem": "A company needs a custom ALV grid report listing purchase orders filtered by vendor and date range.",
        "whatYouBuild": "An ABAP ALV report with interactive drill-down functionality.",
        "tools": [
          "SAP GUI",
          "ABAP Workbench",
          "ALV Grid"
        ],
        "deliverables": [
          "ABAP report source code",
          "Report output screenshots"
        ],
        "reviewProcess": "Code review on live SAP training server."
      },
      {
        "title": "Simulated Business Project: ABAP on HANA OData Service for Fiori App",
        "type": "Simulated Business Project",
        "problem": "An enterprise requires a modern SAP Fiori app to approve high-value sales orders, needing a high-performance backend OData service.",
        "whatYouBuild": "Custom CDS Views on SAP S/4HANA connected to a SEGW OData service with full CRUD operations and authorization checks.",
        "tools": [
          "SAP S/4HANA Server",
          "ADT (ABAP Development Tools)",
          "CDS Views",
          "OData SEGW"
        ],
        "deliverables": [
          "CDS View definitions",
          "OData service registration",
          "Functional test log"
        ],
        "reviewProcess": "1-on-1 technical evaluation with Lead SAP Architect."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive classes conducted on active SAP training server environments.",
      "recordings": "Full access to HD recordings for revision.",
      "assignments": "Practical SAP programming tasks assigned after each module.",
      "doubtSupport": "Dedicated SAP mentor support for system errors and code debugging."
    },
    "trainer": {
      "name": "Venkatesh Rao",
      "title": "Senior SAP S/4HANA Technical Architect",
      "experience": "14+ Years in Enterprise SAP ABAP & HANA Consulting",
      "role": "Lead SAP Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 3rd Saturday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 3:00 PM - 5:30 PM",
      "feeStructure": "Comprehensive fee includes 3 months SAP server access",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "SAP ABAP resume crafting highlighting RICEFW and ABAP on HANA projects.",
      "mockInterviews": "2 SAP technical mock interviews focusing on ABAP Dictionary, CDS Views, and OData.",
      "technicalPreparation": "Repository of SAP ABAP interview question banks.",
      "jobReferrals": "Referral sharing for SAP partner network openings.",
      "supportDuration": "6 Months career assistance post-course.",
      "studentResponsibilities": [
        "Complete all SAP programming exercises",
        "Pass SAP technical mock interview"
      ]
    },
    "faqs": [
      {
        "question": "Do I get hands-on access to an SAP system?",
        "answer": "Yes. 3 Months of live SAP training server access is included with the course."
      },
      {
        "question": "Does this course cover modern ABAP on HANA?",
        "answer": "Yes. Includes CDS Views, AMDP, and OData service development alongside classical ABAP."
      },
      {
        "question": "How long is the course?",
        "answer": "2.5 Months (approx 10 weeks) with 8 hours per week commitment."
      },
      {
        "question": "What prerequisites are needed?",
        "answer": "Basic programming concepts and SQL knowledge are recommended."
      },
      {
        "question": "Is placement assistance provided?",
        "answer": "Yes. Includes SAP resume building, mock interviews, and referral support."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, recordings are posted after every live session."
      },
      {
        "question": "What projects will I build?",
        "answer": "An ALV Purchase Order report and an ABAP on HANA CDS/OData service Capstone project."
      },
      {
        "question": "What certificate do I receive?",
        "answer": "A Certificate of Completion in SAP ABAP Development from AAROHA Technologies."
      },
      {
        "question": "How are system errors handled?",
        "answer": "Mentors assist with SAP server access issues and code debugging during office hours."
      },
      {
        "question": "What is the refund policy?",
        "answer": "100% refund available prior to 2nd live class."
      }
    ],
    "relatedSlugs": [
      "sap-s4-hana-implementation",
      "azure-data-engineer",
      "python-full-stack"
    ]
  },
  {
    "slug": "generative-ai-engineering",
    "title": "Generative AI Engineering & RAG Systems",
    "category": "AI & Analytics",
    "duration": "2 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Hands-on AI Labs",
    "level": "Intermediate",
    "gradientBg": "from-[#050E2B] via-blue-950 to-indigo-950",
    "tags": [
      "LangChain",
      "LlamaIndex",
      "Azure OpenAI",
      "Vector DB",
      "RAG"
    ],
    "summary": "Build production-grade Generative AI applications, Retrieval-Augmented Generation (RAG) pipelines, and autonomous AI agents using LangChain, LlamaIndex, and Vector Databases.",
    "overview": "Master enterprise Generative AI engineering. Learn to integrate LLM models (Azure OpenAI, Hugging Face, Llama 3), build advanced RAG search systems, index data in vector databases (Pinecone, Qdrant, ChromaDB), and construct autonomous AI agent workflows.",
    "intendedLearners": [
      "Software developers embedding AI features into products",
      "Data engineers building enterprise GenAI pipelines",
      "AI enthusiasts seeking practical hands-on LLM engineering skills"
    ],
    "prerequisites": [
      "Intermediate Python programming knowledge",
      "Familiarity with REST APIs",
      "Basic understanding of JSON and data handling"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Evening Options",
      "language": "English",
      "commitment": "8-10 Hours/Week",
      "prerequisiteSummary": "Intermediate Python programming knowledge required"
    },
    "whatYouWillLearn": [
      "Connect and prompt enterprise LLMs safely using Azure OpenAI and LangChain",
      "Build advanced RAG pipelines with hybrid keyword-vector search and re-ranking",
      "Manage vector databases (Pinecone, Qdrant, ChromaDB) for semantic search",
      "Develop multi-step autonomous AI agents with custom tool-calling functions",
      "Implement enterprise AI guardrails, evaluation benchmarks, and cost optimization"
    ],
    "curriculum": [
      {
        "module": "Module 1: LLM Foundations & Vector Databases",
        "objective": "Master text embeddings, chunking, and vector database indexing.",
        "topics": [
          "OpenAI & Azure APIs",
          "Embeddings Math",
          "Text Chunking Strategies",
          "Pinecone & ChromaDB Indexing"
        ],
        "exercise": "Parse 100 enterprise PDF documents, generate embeddings, and build a semantic search index.",
        "assessment": "Vector indexing benchmark test."
      },
      {
        "module": "Module 2: Advanced RAG Architectures & LangChain",
        "objective": "Construct production RAG pipelines with re-ranking and prompt guardrails.",
        "topics": [
          "LangChain RAG Pipelines",
          "LlamaIndex Document Indexing",
          "Re-ranking (Cohere)",
          "Hallucination Guardrails"
        ],
        "exercise": "Build an enterprise Q&A bot that cites exact page numbers from PDF manuals.",
        "assessment": "RAG evaluation accuracy audit."
      },
      {
        "module": "Module 3: Autonomous AI Agents & API Deployment",
        "objective": "Build multi-agent tool-calling workflows and deploy as web API.",
        "topics": [
          "LangChain Agents",
          "Function Calling",
          "Database Agent Tools",
          "FastAPI GenAI Server Deployment"
        ],
        "exercise": "Deploy an AI Agent service that queries SQL databases and generates analytical summaries automatically.",
        "assessment": "Generative AI Capstone Project review."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: PDF Document Q&A Bot",
        "type": "Practice Project",
        "problem": "Extract quick answers from dense PDF policy manuals.",
        "whatYouBuild": "A Python RAG application searching embedded PDFs and returning cited answers.",
        "tools": [
          "Python",
          "LangChain",
          "ChromaDB",
          "Azure OpenAI"
        ],
        "deliverables": [
          "RAG Python code",
          "Sample test suite"
        ],
        "reviewProcess": "Code review during practical lab."
      },
      {
        "title": "Simulated Business Project: Autonomous Enterprise Data & Research Agent",
        "type": "Simulated Business Project",
        "problem": "An enterprise requires an autonomous AI agent that accepts research questions, queries internal SQL databases, conducts vector searches on technical docs, and drafts executive briefing reports.",
        "whatYouBuild": "A multi-tool AI agent built with LangChain, Azure OpenAI, PostgreSQL, and FastAPI with web interface.",
        "tools": [
          "Azure OpenAI",
          "LangChain",
          "Pinecone",
          "FastAPI",
          "PostgreSQL",
          "React"
        ],
        "deliverables": [
          "Full application code repository",
          "Agent evaluation benchmark log"
        ],
        "reviewProcess": "Live technical demo and code review."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive AI engineering labs with instructor guidance.",
      "recordings": "All session recordings uploaded with lifetime access.",
      "assignments": "Weekly GenAI prompt engineering and Python challenges.",
      "doubtSupport": "Private Slack channel for technical assistance."
    },
    "trainer": {
      "name": "Dr. Rajesh Kumar",
      "title": "AI Architect & Lead GenAI Researcher",
      "experience": "10+ Years in AI/ML & Cloud Systems Architecture",
      "role": "Lead GenAI Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 2nd Monday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 2:00 PM - 5:00 PM",
      "feeStructure": "Standard fee with 2-installment plan option",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "GenAI developer resume review emphasizing RAG and LLM agent projects.",
      "mockInterviews": "2 GenAI technical mock interviews covering RAG architecture and prompt engineering.",
      "technicalPreparation": "GenAI interview question bank and coding challenges.",
      "jobReferrals": "Referral opportunities to hiring partners.",
      "supportDuration": "6 Months career support post-course.",
      "studentResponsibilities": [
        "Complete all GenAI labs",
        "Build and demo Capstone project",
        "Pass mock interview"
      ]
    },
    "faqs": [
      {
        "question": "Who is this course suitable for?",
        "answer": "Ideal for software developers, data engineers, and AI enthusiasts wanting hands-on LLM and RAG application engineering skills."
      },
      {
        "question": "What prerequisites are needed?",
        "answer": "Intermediate Python programming knowledge is required."
      },
      {
        "question": "What tools and frameworks will I learn?",
        "answer": "LangChain, LlamaIndex, Azure OpenAI, Pinecone, ChromaDB, FastAPI, and Python."
      },
      {
        "question": "How long is the course?",
        "answer": "2 Months with 8-10 hours per week commitment."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, all sessions are recorded and accessible anytime."
      },
      {
        "question": "What projects will I build?",
        "answer": "A PDF Q&A Bot and an Autonomous Enterprise Research AI Agent with database tool access."
      },
      {
        "question": "What certificate do I receive?",
        "answer": "A Certificate in Generative AI Engineering from AAROHA Technologies."
      },
      {
        "question": "Is placement assistance included?",
        "answer": "Yes. Includes resume tuning, mock interviews, and partner referrals."
      },
      {
        "question": "How are doubts resolved?",
        "answer": "Via private Slack technical channels and weekly Q&A sessions."
      },
      {
        "question": "What is the refund policy?",
        "answer": "100% refund available prior to 2nd live class."
      }
    ],
    "relatedSlugs": [
      "azure-data-engineer-genai",
      "data-science-ml",
      "python-full-stack"
    ]
  },
  {
    "slug": "react-nextjs-frontend",
    "title": "React & Next.js Frontend Engineering",
    "category": "Software Engineering",
    "duration": "2 Months",
    "weeklyHours": "8 Hours/Week",
    "format": "Live Online + Project Practice",
    "level": "Beginner to Intermediate",
    "gradientBg": "from-sky-900 to-blue-950",
    "tags": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Web Vitals"
    ],
    "summary": "Modern frontend engineering program teaching React 19, Next.js App Router, TypeScript, Tailwind CSS, and Core Web Vitals performance optimization.",
    "overview": "Master modern web user interface engineering. Learn React components, hooks, state management, Next.js Server Components, App Router navigation, TypeScript typing, and Tailwind CSS responsive styling.",
    "intendedLearners": [
      "Web developers modernizing from HTML/jQuery/Bootstrap to React & Next.js",
      "Backend developers expanding into full-stack frontend capabilities",
      "Fresh graduates building modern web UI engineering skills"
    ],
    "prerequisites": [
      "Basic understanding of HTML5, CSS3, and JavaScript syntax",
      "No prior React knowledge required"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Evening Options",
      "language": "English",
      "commitment": "8 Hours/Week",
      "prerequisiteSummary": "Basic HTML/CSS/JavaScript knowledge required"
    },
    "whatYouWillLearn": [
      "Build modular React UI components using modern Hooks (useState, useEffect, useMemo, useCallback)",
      "Master Next.js App Router, Server Components, and Server Actions for optimal performance",
      "Write type-safe frontend code using TypeScript interfaces and generics",
      "Style responsive web applications rapidly using Tailwind CSS utility classes",
      "Optimize web application loading speeds to achieve 90+ Core Web Vitals scores"
    ],
    "curriculum": [
      {
        "module": "Module 1: Modern JavaScript (ES6+) & React Fundamentals",
        "objective": "Master modern JavaScript and React component architecture.",
        "topics": [
          "ES6+ Syntax",
          "React Components & Props",
          "useState & useEffect Hooks",
          "Form State Management"
        ],
        "exercise": "Build an interactive task tracking web application with persistent local storage.",
        "assessment": "React fundamentals coding evaluation."
      },
      {
        "module": "Module 2: TypeScript & Next.js App Router",
        "objective": "Build server-rendered web applications with Next.js and TypeScript.",
        "topics": [
          "TypeScript Interfaces",
          "Next.js App Router",
          "Server Components vs Client Components",
          "API Routes & Data Fetching"
        ],
        "exercise": "Construct a multi-page product catalog website using Next.js App Router and TypeScript.",
        "assessment": "Next.js App Router evaluation."
      },
      {
        "module": "Module 3: Tailwind CSS, State Management & Vercel Deployment",
        "objective": "Style responsive UI and deploy optimized Next.js apps.",
        "topics": [
          "Tailwind CSS Responsive Utilities",
          "Global State Management",
          "Core Web Vitals Tuning",
          "Vercel Deployment"
        ],
        "exercise": "Deploy a complete high-performance SaaS marketing platform to Vercel.",
        "assessment": "Frontend Engineering Capstone project review."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Interactive Analytics Dashboard UI",
        "type": "Practice Project",
        "problem": "Create a responsive frontend dashboard with dark mode and filter controls.",
        "whatYouBuild": "A React dashboard UI with chart components and dynamic data filters.",
        "tools": [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Recharts"
        ],
        "deliverables": [
          "React application repository",
          "Live demo link"
        ],
        "reviewProcess": "Code review during practical lab session."
      },
      {
        "title": "Simulated Business Project: High-Performance SaaS Product Marketing Platform",
        "type": "Simulated Business Project",
        "problem": "A tech company requires a lightning-fast marketing website with blog CMS, dynamic pricing calculator, contact forms, and 95+ Web Vitals scores.",
        "whatYouBuild": "A Next.js App Router platform built with TypeScript, Tailwind CSS, headless CMS integration, and Vercel hosting.",
        "tools": [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Vercel"
        ],
        "deliverables": [
          "Full source code repository",
          "Live Vercel deployment link",
          "Lighthouse 95+ audit screenshot"
        ],
        "reviewProcess": "1-on-1 code review and performance score verification."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive coding classes with instant bug fixes and guidance.",
      "recordings": "HD recordings available after every session.",
      "assignments": "Practical UI component building tasks after each module.",
      "doubtSupport": "Slack support channel with fast response."
    },
    "trainer": {
      "name": "Karthik Verma",
      "title": "Senior Full-Stack Architect",
      "experience": "11+ Years in Software Engineering & Web Architecture",
      "role": "Lead Frontend Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 1st Saturday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 10:00 AM - 12:30 PM",
      "feeStructure": "Competitive fee with 2-installment payment structure",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "Frontend developer resume optimization featuring GitHub and live Vercel deployments.",
      "mockInterviews": "2 Technical mock interviews covering React hooks, Next.js App Router, and TypeScript.",
      "technicalPreparation": "React & JS interview question banks and live coding challenge prep.",
      "jobReferrals": "Referrals shared with hiring partner companies.",
      "supportDuration": "6 Months career assistance post-course.",
      "studentResponsibilities": [
        "Complete all UI labs",
        "Deploy Capstone project on Vercel",
        "Pass mock interview review"
      ]
    },
    "faqs": [
      {
        "question": "What prerequisites are needed?",
        "answer": "Basic HTML, CSS, and JavaScript knowledge is required before starting."
      },
      {
        "question": "Will we learn Next.js App Router?",
        "answer": "Yes. We cover Next.js App Router, Server Components, and Server Actions in depth."
      },
      {
        "question": "How long is the course?",
        "answer": "2 Months with 8 hours per week commitment."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, recordings are posted after every live session."
      },
      {
        "question": "Is placement assistance included?",
        "answer": "Yes. Includes resume optimization, mock interviews, and referral support."
      },
      {
        "question": "What project will I build?",
        "answer": "An Analytics Dashboard UI and a high-performance Next.js SaaS Marketing Platform."
      },
      {
        "question": "What certificate do I earn?",
        "answer": "A Certificate in React & Next.js Frontend Engineering from AAROHA Technologies."
      },
      {
        "question": "Will we use TypeScript?",
        "answer": "Yes. TypeScript is integrated throughout the course for type-safe frontend code."
      },
      {
        "question": "How are doubts resolved?",
        "answer": "Via Slack support groups and live mentor office hours."
      },
      {
        "question": "What is the refund policy?",
        "answer": "Full refund available prior to 2nd live class."
      }
    ],
    "relatedSlugs": [
      "python-full-stack",
      "java-full-stack",
      "ui-ux-design"
    ]
  },
  {
    "slug": "devops-cloud-engineering",
    "title": "DevOps & Cloud Infrastructure Engineering",
    "category": "Cloud & Data Engineering",
    "duration": "3 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Cloud Labs",
    "level": "Intermediate",
    "gradientBg": "from-slate-900 to-indigo-950",
    "tags": [
      "DevOps",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions"
    ],
    "summary": "Practical DevOps program covering Docker containerization, Kubernetes cluster orchestration, Terraform Infrastructure-as-Code, and CI/CD pipelines on AWS/Azure.",
    "overview": "Master modern DevOps practices. Learn to automate infrastructure using Terraform, package applications with Docker, orchestrate scalable workloads on Kubernetes (EKS/AKS), and construct zero-downtime CI/CD pipelines using GitHub Actions and Azure DevOps.",
    "intendedLearners": [
      "System Administrators transitioning to DevOps & Cloud Architecture",
      "Software Developers wanting to automate release pipelines and infrastructure",
      "IT professionals seeking high-demand DevOps engineering certification"
    ],
    "prerequisites": [
      "Basic Linux command-line understanding (cd, ls, grep, permissions)",
      "Basic understanding of web networking (HTTP, DNS, Ports)",
      "Cloud free-tier account readiness (AWS or Azure)"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Evening Options",
      "language": "English",
      "commitment": "8-10 Hours/Week",
      "prerequisiteSummary": "Basic Linux command-line and networking knowledge recommended"
    },
    "whatYouWillLearn": [
      "Write Infrastructure-as-Code (IaC) scripts using Terraform to provision AWS/Azure resources",
      "Containerize microservice applications using Docker and Docker Compose",
      "Deploy, scale, and manage container workloads on Kubernetes (EKS/AKS) clusters",
      "Construct automated CI/CD build and release pipelines using GitHub Actions & Azure DevOps",
      "Configure cloud monitoring, logging, and alerting using Prometheus, Grafana, and CloudWatch"
    ],
    "curriculum": [
      {
        "module": "Module 1: Linux Administration, Scripting & Docker Containerization",
        "objective": "Master Linux server commands, bash scripting, and Docker container packaging.",
        "topics": [
          "Linux System Admin",
          "Bash Shell Scripting",
          "Docker Images & Containers",
          "Docker Compose",
          "Multi-stage Builds"
        ],
        "exercise": "Containerize a multi-tier web app (Node.js + PostgreSQL) into optimized Docker images.",
        "assessment": "Docker containerization practical test."
      },
      {
        "module": "Module 2: Terraform Infrastructure-as-Code & Cloud Automation",
        "objective": "Provision cloud infrastructure automatically using Terraform.",
        "topics": [
          "Terraform Syntax",
          "State File Management",
          "AWS VPC & EC2 Provisioning",
          "Terraform Modules",
          "Azure Bicep Basics"
        ],
        "exercise": "Write Terraform scripts to automatically create a multi-AZ AWS VPC with security groups and EC2 servers.",
        "assessment": "Terraform infrastructure template evaluation."
      },
      {
        "module": "Module 3: Kubernetes Orchestration & CI/CD Pipelines",
        "objective": "Deploy scalable applications on Kubernetes clusters via GitHub Actions.",
        "topics": [
          "Kubernetes Architecture",
          "Pods, Deployments & Services",
          "Ingress Controllers",
          "GitHub Actions CI/CD",
          "Prometheus & Grafana"
        ],
        "exercise": "Deploy a microservices app to Kubernetes cluster with automated Blue/Green deployments via GitHub Actions.",
        "assessment": "DevOps Capstone Project review."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Automated GitHub Actions CI/CD Pipeline",
        "type": "Practice Project",
        "problem": "Automate testing and deployment of a web application to AWS EC2.",
        "whatYouBuild": "A GitHub Actions workflow triggered on git push, building Docker images and running tests.",
        "tools": [
          "GitHub Actions",
          "Docker",
          "AWS EC2",
          "Bash"
        ],
        "deliverables": [
          "GitHub Actions workflow YAML file",
          "Deployment execution log"
        ],
        "reviewProcess": "Code review during practical lab session."
      },
      {
        "title": "Simulated Business Project: Enterprise Kubernetes Infrastructure & Microservices CI/CD",
        "type": "Simulated Business Project",
        "problem": "An enterprise requires automated zero-downtime deployment for a 4-microservice application on a Kubernetes cluster with Terraform infrastructure provisioning and Grafana monitoring.",
        "whatYouBuild": "Terraform code provisioning AWS EKS, Dockerized microservice manifests, Helm charts, GitHub Actions CI/CD pipelines, and Grafana monitoring dashboards.",
        "tools": [
          "Terraform",
          "Kubernetes",
          "AWS EKS",
          "Docker",
          "GitHub Actions",
          "Helm",
          "Grafana"
        ],
        "deliverables": [
          "Terraform infrastructure code",
          "Kubernetes manifests",
          "CI/CD pipeline scripts",
          "Monitoring dashboard link"
        ],
        "reviewProcess": "1-on-1 architecture review and live failover demonstration."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive classes with step-by-step cloud lab execution.",
      "recordings": "HD recordings available for every class.",
      "assignments": "Practical hands-on lab tasks after every module.",
      "doubtSupport": "Slack support group with fast mentor assistance."
    },
    "trainer": {
      "name": "Srinivas Rao",
      "title": "Principal Cloud Data Architect",
      "experience": "12+ Years Experience in Enterprise Cloud & DevOps Architecture",
      "role": "Lead DevOps Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 2nd Saturday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 2:00 PM - 5:00 PM",
      "feeStructure": "Standard fee with 3-installment payment option",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "DevOps Engineer resume optimization emphasizing Terraform, Kubernetes, and CI/CD projects.",
      "mockInterviews": "2 Technical mock interviews covering Linux, Docker, Kubernetes, and Terraform.",
      "technicalPreparation": "DevOps interview scenario banks and architecture troubleshooting prep.",
      "jobReferrals": "Referral opportunities with hiring partner network.",
      "supportDuration": "6 Months career support post-course.",
      "studentResponsibilities": [
        "80%+ attendance",
        "Complete capstone project",
        "Pass mock interview review"
      ]
    },
    "faqs": [
      {
        "question": "What prerequisites are needed?",
        "answer": "Basic Linux command-line familiarity and basic networking knowledge are recommended."
      },
      {
        "question": "Which cloud provider is covered?",
        "answer": "Primary focus on AWS and Azure cloud platforms using cloud-agnostic Terraform."
      },
      {
        "question": "How long is the course?",
        "answer": "3 Months with 8-10 hours per week commitment."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, recordings are posted after every live session."
      },
      {
        "question": "Is job placement assistance included?",
        "answer": "Yes. Includes resume tuning, mock interviews, and partner referrals."
      },
      {
        "question": "What projects will I build?",
        "answer": "A GitHub Actions CI/CD pipeline and an Enterprise Kubernetes Infrastructure with Terraform & Grafana."
      },
      {
        "question": "What certificate do I receive?",
        "answer": "A Certificate in DevOps & Cloud Infrastructure Engineering from AAROHA Technologies."
      },
      {
        "question": "Will we use physical cloud accounts?",
        "answer": "Yes, we guide you to set up AWS/Azure free-tier accounts for hands-on practice."
      },
      {
        "question": "How are doubts resolved?",
        "answer": "Via Slack support groups and live mentor Q&A sessions."
      },
      {
        "question": "What is the refund policy?",
        "answer": "Full refund available prior to 2nd live class."
      }
    ],
    "relatedSlugs": [
      "azure-data-engineer",
      "python-full-stack",
      "react-nextjs-frontend"
    ]
  },
  {
    "slug": "java-full-stack",
    "title": "Java Full Stack Engineering",
    "category": "Software Engineering",
    "duration": "3 Months",
    "weeklyHours": "8-10 Hours/Week",
    "format": "Live Online + Code Labs",
    "level": "Beginner to Advanced",
    "gradientBg": "from-amber-950 to-slate-900",
    "tags": [
      "Java",
      "Spring Boot",
      "Microservices",
      "React",
      "PostgreSQL"
    ],
    "summary": "Enterprise Java Full Stack program teaching Core Java, Spring Boot 3, REST APIs, Microservices, React frontend UI, and PostgreSQL database integration.",
    "overview": "Master enterprise software development with Java. Learn Core Java OOP, Spring Boot 3 microservices, Spring Data JPA, RESTful API security, React frontend UI, and PostgreSQL database management.",
    "intendedLearners": [
      "Software engineering students building Java enterprise capabilities",
      "Core Java developers expanding into modern Spring Boot microservices & React",
      "IT professionals seeking enterprise Java developer roles"
    ],
    "prerequisites": [
      "Basic computer literacy",
      "Logical reasoning skills",
      "No prior Java experience required \u2014 Java taught from core concepts"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Evening Options",
      "language": "English",
      "commitment": "8-10 Hours/Week",
      "prerequisiteSummary": "Beginner-friendly; Java programming taught from fundamentals"
    },
    "whatYouWillLearn": [
      "Write object-oriented Core Java code adhering to clean architecture standards",
      "Build enterprise RESTful web services using Spring Boot 3 and Spring Data JPA",
      "Implement secure authentication using Spring Security and JWT tokens",
      "Create responsive web frontends using React, TypeScript, and Tailwind CSS",
      "Deploy Java Spring Boot microservices using Docker containers and cloud hosting"
    ],
    "curriculum": [
      {
        "module": "Module 1: Core Java OOP & Database Design",
        "objective": "Master Java OOP concepts, Collections framework, and PostgreSQL SQL.",
        "topics": [
          "Java OOP Concepts",
          "Collections Framework",
          "Exception Handling",
          "PostgreSQL Schema & SQL"
        ],
        "exercise": "Build a Java console application for a banking transaction system connected to PostgreSQL database.",
        "assessment": "Core Java OOP coding test."
      },
      {
        "module": "Module 2: Spring Boot 3 & Microservices Backend",
        "objective": "Build RESTful microservices with Spring Boot 3, JPA, and Spring Security.",
        "topics": [
          "Spring Boot 3",
          "Spring Data JPA",
          "REST API Controller",
          "Spring Security & JWT",
          "Swagger Specs"
        ],
        "exercise": "Develop a multi-tenant Spring Boot REST API service for an online order management platform.",
        "assessment": "Spring Boot REST API functional review."
      },
      {
        "module": "Module 3: React Integration & Full-Stack Cloud Deployment",
        "objective": "Connect React frontend to Spring Boot backend and deploy.",
        "topics": [
          "React Integration",
          "Axios API Binding",
          "Dockerizing Spring Boot",
          "Cloud Deployment"
        ],
        "exercise": "Deploy a full-stack Enterprise Java application combining React UI and Spring Boot microservices backend.",
        "assessment": "Java Full Stack Capstone project evaluation."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Banking Transaction REST API",
        "type": "Practice Project",
        "problem": "Build a secure REST API for account creation, deposits, and transfers.",
        "whatYouBuild": "A Spring Boot 3 REST API with JWT authentication and transaction audit logs.",
        "tools": [
          "Java 21",
          "Spring Boot 3",
          "Spring Data JPA",
          "PostgreSQL"
        ],
        "deliverables": [
          "Spring Boot source code repository",
          "Postman API test suite"
        ],
        "reviewProcess": "Code review during practical lab session."
      },
      {
        "title": "Simulated Business Project: Enterprise Order Fulfillment & Portal System",
        "type": "Simulated Business Project",
        "problem": "An enterprise logistics company requires an order processing portal with React frontend, Spring Boot microservice backend, role-based authorization, and real-time status tracking.",
        "whatYouBuild": "A full-stack enterprise web portal with React UI, Spring Boot 3 backend, PostgreSQL database, and Docker container deployment.",
        "tools": [
          "Java 21",
          "Spring Boot 3",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Docker"
        ],
        "deliverables": [
          "Full-Stack source code repository",
          "Docker Compose setup scripts",
          "Live demonstration"
        ],
        "reviewProcess": "1-on-1 technical demo and architecture review."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive Java coding sessions with step-by-step guidance.",
      "recordings": "HD recordings available for every class.",
      "assignments": "Practical Java coding challenges after each module.",
      "doubtSupport": "Dedicated Slack support group with mentor assistance."
    },
    "trainer": {
      "name": "Karthik Verma",
      "title": "Senior Full-Stack Architect",
      "experience": "11+ Years in Enterprise Java & Software Architecture",
      "role": "Lead Java Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 1st Saturday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 10:00 AM - 1:00 PM",
      "feeStructure": "Standard fee with 3-installment payment plan",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "Java Developer resume review emphasizing Spring Boot and microservices capstone projects.",
      "mockInterviews": "2 Technical mock interviews covering Core Java, OOP, Spring Boot, and SQL.",
      "technicalPreparation": "Java coding interview question banks and system design exercises.",
      "jobReferrals": "Referral opportunities to hiring partners.",
      "supportDuration": "6 Months career support post-course.",
      "studentResponsibilities": [
        "80%+ attendance",
        "Complete capstone project",
        "Pass mock interview review"
      ]
    },
    "faqs": [
      {
        "question": "Do I need prior Java knowledge?",
        "answer": "No. We cover Core Java programming from absolute fundamentals."
      },
      {
        "question": "What version of Java and Spring Boot will I learn?",
        "answer": "You will learn modern Java (Java 17/21) and Spring Boot 3."
      },
      {
        "question": "How long is the course?",
        "answer": "3 Months with 8-10 hours per week commitment."
      },
      {
        "question": "Is placement support included?",
        "answer": "Yes. Includes resume optimization, mock interviews, and partner referrals."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, recordings are posted after every live session."
      },
      {
        "question": "What project will I build?",
        "answer": "A Banking Transaction API and an Enterprise Order Fulfillment Full-Stack System."
      },
      {
        "question": "What certificate do I earn?",
        "answer": "A Certificate in Java Full Stack Engineering from AAROHA Technologies."
      },
      {
        "question": "Will we learn microservices?",
        "answer": "Yes, Spring Boot microservices architecture and Docker containerization are covered."
      },
      {
        "question": "How are doubts resolved?",
        "answer": "Via Slack support groups and live mentor Q&A sessions."
      },
      {
        "question": "What is the refund policy?",
        "answer": "Full refund available prior to 2nd live class."
      }
    ],
    "relatedSlugs": [
      "python-full-stack",
      "react-nextjs-frontend",
      "devops-cloud-engineering"
    ]
  },
  {
    "slug": "business-analytics-powerbi",
    "title": "Business Analytics with Power BI & SQL",
    "category": "AI & Analytics",
    "duration": "2 Months",
    "weeklyHours": "8 Hours/Week",
    "format": "Live Online + Dashboard Labs",
    "level": "Beginner to Intermediate",
    "gradientBg": "from-yellow-950 to-slate-900",
    "tags": [
      "Power BI",
      "DAX",
      "SQL",
      "Excel Analytics",
      "Data Modeling"
    ],
    "summary": "Business Analytics program teaching SQL data querying, Power BI interactive dashboard design, DAX metric modeling, and executive KPI reporting.",
    "overview": "Transform raw business data into actionable executive insights. Master SQL data querying, Power Query data transformation, DAX formula modeling, Power BI interactive dashboard design, and automated report publishing.",
    "intendedLearners": [
      "Business Analysts, Financial Analysts, and Operations Managers",
      "Excel power users upgrading to automated Power BI reporting",
      "Fresh graduates seeking high-demand Business Intelligence roles"
    ],
    "prerequisites": [
      "Basic working knowledge of Microsoft Excel",
      "No prior SQL or programming experience required \u2014 SQL taught from scratch"
    ],
    "quickFacts": {
      "batchDetails": "Weekend & Evening Options",
      "language": "English",
      "commitment": "8 Hours/Week",
      "prerequisiteSummary": "Basic Excel knowledge helpful; SQL taught from fundamentals"
    },
    "whatYouWillLearn": [
      "Query, filter, join, and aggregate business data using SQL",
      "Clean, transform, and unpivot raw data tables using Power Query Editor",
      "Design relational star-schema data models and active relationships in Power BI",
      "Write complex DAX formulas (CALCULATE, SUMX, Time Intelligence) for KPI metrics",
      "Publish interactive Power BI dashboards with row-level security and mobile views"
    ],
    "curriculum": [
      {
        "module": "Module 1: Business SQL Data Querying & Analysis",
        "objective": "Master SQL SELECT, WHERE, GROUP BY, JOINs, and Aggregations.",
        "topics": [
          "SQL Relational Tables",
          "Filtering & Sorting",
          "SQL Joins",
          "Group By & Having",
          "Subqueries"
        ],
        "exercise": "Write SQL queries to answer 15 business questions on customer sales and order data.",
        "assessment": "SQL data querying practical test."
      },
      {
        "module": "Module 2: Power BI Data Modeling & DAX Metric Calculations",
        "objective": "Build star-schema data models and write DAX measures.",
        "topics": [
          "Power Query Transformations",
          "Star Schema Design",
          "DAX Calculated Columns vs Measures",
          "CALCULATE & Filter Context",
          "Time Intelligence DAX"
        ],
        "exercise": "Build a DAX metric library calculating Year-Over-Year growth, Month-To-Date revenue, and profit margins.",
        "assessment": "DAX metric modeling practical submission."
      },
      {
        "module": "Module 3: Dashboard Design, Row-Level Security & Publishing",
        "objective": "Design executive dashboards and publish with security permissions.",
        "topics": [
          "Visual Design Best Practices",
          "Interactive Drill-Downs & Slicers",
          "Row-Level Security (RLS)",
          "Power BI Service Publishing"
        ],
        "exercise": "Publish a complete Executive Performance Dashboard to Power BI Service with role-based access.",
        "assessment": "Business Analytics Capstone Dashboard review."
      }
    ],
    "projects": [
      {
        "title": "Practice Project: Financial Sales & Margin Dashboard",
        "type": "Practice Project",
        "problem": "Create a 2-page sales performance report with region and product filters.",
        "whatYouBuild": "A Power BI report featuring revenue KPIs, profit margin trends, and country slicers.",
        "tools": [
          "Power BI Desktop",
          "Power Query",
          "DAX"
        ],
        "deliverables": [
          "Power BI (.pbix) master file",
          "Dashboard PDF export"
        ],
        "reviewProcess": "Visual and DAX review during lab session."
      },
      {
        "title": "Simulated Business Project: Executive Enterprise Revenue & Operations Portal",
        "type": "Simulated Business Project",
        "problem": "An executive team requires a real-time Power BI dashboard tracking global revenue, customer acquisition cost, order fulfillment SLA, and inventory turnover across 5 business units.",
        "whatYouBuild": "An interactive 4-page Power BI dashboard connected to SQL Server data warehouse, with DAX time-intelligence metrics, drill-through pages, and row-level security.",
        "tools": [
          "Power BI",
          "DAX",
          "SQL Server",
          "Power Query",
          "Power BI Service"
        ],
        "deliverables": [
          "Master .pbix file",
          "DAX documentation guide",
          "Live published dashboard link"
        ],
        "reviewProcess": "1-on-1 executive presentation review."
      }
    ],
    "classExperience": {
      "liveSessions": "Live interactive classes with hands-on dashboard building.",
      "recordings": "HD recordings available for every class.",
      "assignments": "Weekly SQL and Power BI dashboard tasks.",
      "doubtSupport": "Slack channel support for DAX formulas and data model troubleshooting."
    },
    "trainer": {
      "name": "Ananya Sharma",
      "title": "Lead Data Scientist & Analytics Consultant",
      "experience": "9+ Years in Business Intelligence & Executive Analytics",
      "role": "Lead BI Instructor"
    },
    "scheduleFees": {
      "nextBatchDate": "Starts 1st Saturday of Next Month",
      "timings": "Weekend Batch: Sat & Sun 11:00 AM - 1:30 PM",
      "feeStructure": "Competitive fee with 2-installment payment structure",
      "paymentTerms": "Full refund prior to 2nd live class."
    },
    "careerSupportDetails": {
      "resumePreparation": "Business Analyst / Power BI resume review highlighting DAX metric libraries and portfolio dashboards.",
      "mockInterviews": "2 Technical mock interviews covering SQL queries, DAX formulas, and dashboard design principles.",
      "technicalPreparation": "Power BI & SQL interview question banks and business scenario challenges.",
      "jobReferrals": "Referral opportunities shared with hiring partners.",
      "supportDuration": "6 Months career assistance post-course.",
      "studentResponsibilities": [
        "Complete all SQL & Power BI labs",
        "Publish Capstone dashboard",
        "Pass mock interview review"
      ]
    },
    "faqs": [
      {
        "question": "Do I need coding or SQL experience?",
        "answer": "No. SQL and data modeling are taught from absolute fundamentals."
      },
      {
        "question": "What tools will I learn?",
        "answer": "Power BI Desktop, Power Query, DAX, SQL Server, Excel, and Power BI Service."
      },
      {
        "question": "How long is the course?",
        "answer": "2 Months with 8 hours per week commitment."
      },
      {
        "question": "Are live classes recorded?",
        "answer": "Yes, all sessions are recorded and accessible anytime."
      },
      {
        "question": "Is placement assistance included?",
        "answer": "Yes. Includes resume optimization, mock interviews, and referral support."
      },
      {
        "question": "What dashboard project will I build?",
        "answer": "A Financial Sales report and an Executive Enterprise Revenue & Operations 4-page Dashboard."
      },
      {
        "question": "What certificate do I earn?",
        "answer": "A Certificate in Business Analytics & Power BI from AAROHA Technologies."
      },
      {
        "question": "Is Power BI software free to use during the course?",
        "answer": "Yes. Power BI Desktop is completely free to download and use for learning."
      },
      {
        "question": "How are DAX doubts resolved?",
        "answer": "Via Slack support groups and live mentor office hours."
      },
      {
        "question": "What is the refund policy?",
        "answer": "Full refund available prior to 2nd live class."
      }
    ],
    "relatedSlugs": [
      "data-science-ml",
      "cloud-data-engineering",
      "azure-data-engineer"
    ]
  }
,
  {
      "slug": "data-science",
      "title": "Data Science & Machine Learning",
      "category": "AI & Analytics",
      "isUpcoming": true,
      "duration": "3 Months",
      "weeklyHours": "8-10 Hours/Week",
      "format": "Live Online + Recorded Sessions",
      "level": "Beginner to Advanced",
      "gradientBg": "from-cyan-950 via-blue-900 to-slate-900",
      "tags": [
          "Data Science",
          "Machine Learning",
          "Python",
          "Deep Learning",
          "NLP",
          "Pandas",
          "Scikit-Learn"
      ],
      "summary": "Master end-to-end Data Science, Statistical Modeling, Machine Learning pipelines, and Deep Learning using Python, Scikit-Learn, and TensorFlow with industry capstones.",
      "overview": "This comprehensive Data Science program prepares you for high-impact roles in Data Science, Machine Learning Engineering, and Predictive Analytics. You will master data wrangling with Pandas and NumPy, exploratory data analysis, statistical modeling, supervised/unsupervised machine learning algorithms, deep neural networks, and model deployment via REST APIs.",
      "intendedLearners": [
          "Aspiring Data Scientists, ML Engineers, and Data Analysts",
          "Software developers seeking to transition into AI and Data Science",
          "Fresh graduates and STEM professionals with analytical aptitude"
      ],
      "prerequisites": [
          "Basic understanding of high school mathematics (Linear Algebra, Calculus, Statistics basics)",
          "Basic programming curiosity (Python fundamentals taught from scratch in Module 1)",
          "Laptop/desktop with internet access for Jupyter/Colab notebooks"
      ],
      "quickFacts": {
          "batchDetails": "Upcoming Weekend & Evening Cohorts",
          "language": "English",
          "commitment": "8-10 Hours/Week (4 hrs Live Class + 5 hrs Hands-on Projects)",
          "prerequisiteSummary": "No prior ML experience required; Python covered in Week 1"
      },
      "whatYouWillLearn": [
          "Master Python for Data Science: NumPy, Pandas, Matplotlib, and Seaborn",
          "Build regression, classification, clustering, and ensemble models with Scikit-Learn",
          "Implement Deep Learning neural networks with TensorFlow and Keras",
          "Perform Natural Language Processing (NLP) with HuggingFace and spaCy",
          "Deploy trained ML models to production using FastAPI and Docker on Cloud"
      ],
      "curriculum": [
          {
              "module": "Module 1: Python & Exploratory Data Analysis",
              "objective": "Build strong foundations in Python programming, scientific computing with NumPy, and data manipulation with Pandas.",
              "topics": [
                  "Python Data Structures & OOP",
                  "NumPy Vectorized Arrays",
                  "Pandas DataFrames & Cleaning",
                  "Visualizations with Matplotlib/Seaborn",
                  "Feature Engineering"
              ],
              "exercise": "Clean and analyze a messy 500,000-record real-world retail transactions dataset."
          },
          {
              "module": "Module 2: Applied Statistics & Classical Machine Learning",
              "objective": "Master statistical hypothesis testing, feature selection, and classical supervised/unsupervised algorithms.",
              "topics": [
                  "Probability & Hypothesis Testing",
                  "Linear & Logistic Regression",
                  "Decision Trees & Random Forests",
                  "Gradient Boosting (XGBoost/LightGBM)",
                  "K-Means Clustering & PCA"
              ],
              "exercise": "Train and optimize a customer churn prediction model achieving 92%+ precision."
          },
          {
              "module": "Module 3: Deep Learning & NLP Fundamentals",
              "objective": "Understand Artificial Neural Networks (ANNs), Convolutional Networks (CNNs), and Natural Language Processing.",
              "topics": [
                  "Neural Network Architectures",
                  "Backpropagation & Optimizers",
                  "TensorFlow & Keras Implementation",
                  "Text Preprocessing & Embeddings",
                  "Transformers & LLM Basics"
              ],
              "exercise": "Build a sentiment analysis and multi-class ticket classification system."
          },
          {
              "module": "Module 4: Model Deployment & MLOps Production",
              "objective": "Package machine learning models into production-ready containerized APIs and deploy on cloud.",
              "topics": [
                  "Model Serialization & Versioning",
                  "FastAPI Inference Endpoints",
                  "Docker Containerization",
                  "Cloud Deployment on Azure/AWS",
                  "Monitoring Drift & Retraining"
              ],
              "exercise": "Deploy a real-time fraud detection API with Docker and Swagger documentation."
          }
      ],
      "projects": [
          {
              "title": "Practice Project: Predictive Real Estate Valuation Engine",
              "type": "Practice Project",
              "problem": "Predict housing market prices using multi-feature geospatial and economic datasets.",
              "whatYouBuild": "Feature engineering pipeline + tuned Random Forest & Ridge Regression models with cross-validation.",
              "tools": [
                  "Python",
                  "Pandas",
                  "Scikit-Learn",
                  "Seaborn"
              ],
              "deliverables": [
                  "Jupyter notebook analysis",
                  "Evaluated ML model pipeline",
                  "Feature importance chart"
              ],
              "reviewProcess": "Mentor code review on feature selection and evaluation metrics (RMSE, R2)."
          },
          {
              "title": "Simulated Business Project: Enterprise Credit Risk Assessment Platform",
              "type": "Simulated Business Project",
              "problem": "Financial institutions need automated loan default prediction to minimize non-performing assets.",
              "whatYouBuild": "End-to-end credit scoring pipeline with imbalanced data handling (SMOTE), XGBoost, and FastAPI deployment.",
              "tools": [
                  "Python",
                  "XGBoost",
                  "FastAPI",
                  "Docker",
                  "Azure"
              ],
              "deliverables": [
                  "Production REST API",
                  "Model drift report",
                  "Docker container image"
              ],
              "reviewProcess": "1-on-1 technical evaluation and deployment code review."
          }
      ],
      "classExperience": {
          "liveSessions": "Live instructor-led interactive weekend/evening sessions with instant doubt resolution.",
          "recordings": "Full 1080p HD recordings uploaded within 2 hours of class completion.",
          "assignments": "Hands-on coding notebooks and dataset challenges with automated grading.",
          "doubtSupport": "Dedicated Slack support channel and weekly mentor 1-on-1 office hours."
      },
      "trainer": {
          "name": "Senior Staff Data Scientist",
          "title": "AI/ML Lead Architect & Analytics Specialist",
          "experience": "11+ Years in Enterprise Data Science & Predictive Systems",
          "role": "Lead Instructor & Project Evaluator"
      },
      "scheduleFees": {
          "nextBatchDate": "Upcoming Cohort \u2014 Pre-Registration Open",
          "timings": "Weekends: 7:00 PM \u2013 9:00 PM IST | Weekdays: 8:00 AM \u2013 9:30 AM IST",
          "feeStructure": "Early Bird Scholarship Available (Pay in 2 Easy Installments)",
          "paymentTerms": "Pre-register now to reserve your seat with zero upfront commitment."
      },
      "careerSupportDetails": {
          "resumePreparation": "Custom ATS-optimized data science resume highlighting real-world predictive models and code repos.",
          "mockInterviews": "2 Technical mock interviews covering Python algorithms, statistics, and ML system design.",
          "technicalPreparation": "Repository of 250+ top Data Science interview questions and coding challenges.",
          "jobReferrals": "Direct profile sharing with top tech startups, GCCs, and enterprise analytics hiring teams.",
          "supportDuration": "6 Months dedicated career counseling and placement assistance.",
          "studentResponsibilities": [
              "Complete all lab assignments",
              "Submit and present capstone project",
              "Attend mock evaluations"
          ]
      },
      "faqs": [
          {
              "question": "Do I need a strong mathematical background for this Data Science course?",
              "answer": "Basic high school math is sufficient. All relevant statistical concepts, linear algebra, and calculus principles are taught step-by-step with intuitive practical Python examples."
          },
          {
              "question": "What tools and libraries are covered?",
              "answer": "Python, Jupyter, NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, XGBoost, TensorFlow, Keras, FastAPI, and Docker."
          },
          {
              "question": "Is this course live or pre-recorded?",
              "answer": "All sessions are conducted live interactively online by senior industry practitioners, with full HD class recordings provided for lifelong revision."
          }
      ],
      "relatedSlugs": [
          "data-analytics",
          "azure-data-engineer-genai",
          "generative-ai-engineering"
      ]
  },
  {
      "slug": "data-analytics",
      "title": "Data Analytics & Business Intelligence",
      "category": "AI & Analytics",
      "isUpcoming": true,
      "duration": "2.5 Months",
      "weeklyHours": "8-10 Hours/Week",
      "format": "Live Online + Recorded Sessions",
      "level": "Beginner to Intermediate",
      "gradientBg": "from-blue-950 via-indigo-900 to-slate-900",
      "tags": [
          "Data Analytics",
          "SQL",
          "Power BI",
          "Tableau",
          "Excel",
          "Python",
          "Business Intelligence"
      ],
      "summary": "Become a job-ready Data & BI Analyst. Learn advanced SQL, Power BI DAX, Tableau interactive dashboards, and Python analytics to transform complex raw data into actionable executive insights.",
      "overview": "This program empowers you to bridge the gap between raw data and executive business decisions. You will master relational SQL database querying, advanced data cleaning, Power BI DAX modeling, Tableau storytelling, and Python exploratory data analysis to solve core business problems in e-commerce, finance, healthcare, and operations.",
      "intendedLearners": [
          "Aspiring Data Analysts, BI Developers, and Business Analysts",
          "Excel users and reporting professionals upgrading to modern SQL & Power BI stack",
          "Graduates from commerce, engineering, and arts backgrounds seeking high-growth analytics careers"
      ],
      "prerequisites": [
          "Basic familiarity with Microsoft Excel or spreadsheets",
          "No coding knowledge required \u2014 SQL, Power BI, and Python are taught from scratch",
          "Computer with Windows/Mac for Power BI Desktop and SQL Server access"
      ],
      "quickFacts": {
          "batchDetails": "Upcoming Evening & Weekend Batches",
          "language": "English",
          "commitment": "8 Hours/Week (4 hrs Live Class + 4 hrs Hands-on Dashboard Labs)",
          "prerequisiteSummary": "Zero coding prerequisites; beginner friendly curriculum"
      },
      "whatYouWillLearn": [
          "Master Advanced SQL: Window Functions, CTEs, Joins, Aggregations, and Query Optimization",
          "Build dynamic Power BI & Tableau dashboards with custom KPI metrics and DAX formulas",
          "Perform data wrangling and statistical reporting with Python (Pandas, Plotly)",
          "Design star-schema relational data models for scalable enterprise reporting",
          "Present actionable insights through executive business storytelling and KPI decks"
      ],
      "curriculum": [
          {
              "module": "Module 1: Advanced SQL & Relational Databases",
              "objective": "Master enterprise data extraction, transformation, and analytical querying with SQL.",
              "topics": [
                  "Relational Database Design",
                  "Complex Joins & Subqueries",
                  "Window Functions (RANK, LEAD, LAG)",
                  "Common Table Expressions (CTEs)",
                  "Stored Procedures & Indexing"
              ],
              "exercise": "Write 25+ business queries analyzing user behavior across a multi-million-row database."
          },
          {
              "module": "Module 2: Power BI & DAX Data Modeling",
              "objective": "Transform raw datasets into automated interactive enterprise Power BI dashboards.",
              "topics": [
                  "Power Query ETL Transformation",
                  "Star Schema & Data Modeling",
                  "DAX Calculations (CALCULATE, Time Intelligence)",
                  "Interactive Visualizations & Slicers",
                  "Power BI Service & Scheduling"
              ],
              "exercise": "Build a 3-page Executive Financial & Sales Revenue Performance Dashboard."
          },
          {
              "module": "Module 3: Tableau Visual Analytics & Storytelling",
              "objective": "Create polished Tableau dashboards, calculated fields, and visual data stories.",
              "topics": [
                  "Tableau Architecture & Connection",
                  "Calculated Fields & LOD Expressions",
                  "Dual-Axis Charts & Geospatial Maps",
                  "Dashboard Actions & Interactivity",
                  "Publishing to Tableau Public/Server"
              ],
              "exercise": "Develop an interactive Global Logistics & Supply Chain Tracker."
          },
          {
              "module": "Module 4: Python Analytics & Business Presentation",
              "objective": "Use Python for exploratory data analysis, automated reporting, and executive presentations.",
              "topics": [
                  "Python for Analytics (Pandas, Plotly)",
                  "A/B Testing & Statistical Analysis",
                  "Automated Excel/PDF Report Generation",
                  "Executive Storytelling & KPI Formulation"
              ],
              "exercise": "Deliver a complete marketing campaign ROI analysis presentation."
          }
      ],
      "projects": [
          {
              "title": "Practice Project: E-Commerce Customer Cohort Analysis",
              "type": "Practice Project",
              "problem": "Analyze customer retention, repeat purchase rates, and lifetime value over 12 months.",
              "whatYouBuild": "SQL cohort analysis script and interactive Power BI retention heatmaps.",
              "tools": [
                  "SQL Server",
                  "Power BI",
                  "Excel"
              ],
              "deliverables": [
                  "SQL scripts",
                  "Power BI report (.pbix)",
                  "Insight summary document"
              ],
              "reviewProcess": "Code review on SQL query efficiency and visual hierarchy."
          },
          {
              "title": "Simulated Business Project: Enterprise Omnichannel Operations Dashboard",
              "type": "Simulated Business Project",
              "problem": "Operations leadership needs a single pane of glass for real-time inventory, sales, and refund metrics.",
              "whatYouBuild": "Production multi-page Power BI dashboard with complex DAX time intelligence and automatic refresh.",
              "tools": [
                  "Power BI",
                  "PostgreSQL",
                  "DAX Studio",
                  "Python"
              ],
              "deliverables": [
                  "Interactive Power BI dashboard",
                  "DAX documentation",
                  "Executive presentation deck"
              ],
              "reviewProcess": "1-on-1 dashboard review assessing design, speed, and business KPI clarity."
          }
      ],
      "classExperience": {
          "liveSessions": "Live interactive classes with hands-on dashboard building in real-time.",
          "recordings": "Lifetime access to class recordings, dataset files, and DAX cheat sheets.",
          "assignments": "Weekly business scenario case studies with personalized feedback.",
          "doubtSupport": "Daily mentor assistance for SQL queries and Power BI DAX debugging."
      },
      "trainer": {
          "name": "Principal BI Consultant",
          "title": "Lead Business Intelligence Architect",
          "experience": "10+ Years in Global Enterprise BI & Analytics Consulting",
          "role": "Lead Instructor"
      },
      "scheduleFees": {
          "nextBatchDate": "Upcoming Cohort \u2014 Pre-Registration Open",
          "timings": "Evening: 8:00 PM \u2013 9:30 PM IST | Weekend Morning: 9:30 AM \u2013 11:30 AM IST",
          "feeStructure": "Early Bird Scholarship Available",
          "paymentTerms": "Reserve your seat with zero upfront commitment."
      },
      "careerSupportDetails": {
          "resumePreparation": "Resume optimized for Data Analyst, BI Analyst, and SQL Developer roles.",
          "mockInterviews": "2 Mock interviews focused on SQL live coding and business case study resolution.",
          "technicalPreparation": "Top 200 SQL, DAX, and BI interview questions & scenario answers.",
          "jobReferrals": "Direct sharing with analytics firms, MNCs, and growing startups.",
          "supportDuration": "6 Months placement guidance.",
          "studentResponsibilities": [
              "Complete all weekly dashboard assignments",
              "Present capstone project"
          ]
      },
      "faqs": [
          {
              "question": "Can I learn Data Analytics without any coding background?",
              "answer": "Yes! Data Analytics relies on logic, SQL, and business visual tools. We teach SQL and Python from absolute basics."
          },
          {
              "question": "What is the difference between Data Science and Data Analytics?",
              "answer": "Data Analytics focuses on analyzing historical and current business data to drive operational decisions (using SQL, Power BI, Tableau). Data Science focuses on predictive modeling, machine learning, and advanced algorithms."
          }
      ],
      "relatedSlugs": [
          "data-science",
          "business-analytics-powerbi",
          "azure-data-engineer"
      ]
  },
  {
      "slug": "cyber-security",
      "title": "Cyber Security & Defensive Operations",
      "category": "Emerging & Security",
      "isUpcoming": true,
      "duration": "3 Months",
      "weeklyHours": "8-10 Hours/Week",
      "format": "Live Online + Virtual Lab Access",
      "level": "Beginner to Advanced",
      "gradientBg": "from-slate-950 via-emerald-950 to-slate-900",
      "tags": [
          "Cyber Security",
          "Ethical Hacking",
          "SOC Analysis",
          "Network Security",
          "Cloud Security",
          "SIEM",
          "Splunk"
      ],
      "summary": "Master enterprise cybersecurity defense, penetration testing methodologies, SOC threat hunting, cloud security on Azure/AWS, and Incident Response with live virtual labs.",
      "overview": "In an era of unprecedented cyber threats, organizations require skilled defensive and offensive security engineers. This comprehensive course takes you through computer networking, vulnerability assessment, ethical hacking methodologies, SIEM log monitoring (Splunk), threat intelligence, and cloud security architecture.",
      "intendedLearners": [
          "Aspiring Cybersecurity Analysts, SOC Engineers, and Network Security Specialists",
          "System Administrators and IT Support engineers transitioning to security",
          "Fresh engineering graduates seeking high-demand cybersecurity careers"
      ],
      "prerequisites": [
          "Basic understanding of computers and operating systems (Windows/Linux)",
          "Basic networking concepts (IP addressing, DNS, ports) is helpful but covered in Module 1",
          "Computer with 8GB+ RAM for running virtualized security labs"
      ],
      "quickFacts": {
          "batchDetails": "Upcoming Cohort \u2014 Pre-Registration Open",
          "language": "English",
          "commitment": "8-10 Hours/Week (4 hrs Live Class + 5 hrs Hands-on Virtual Labs)",
          "prerequisiteSummary": "Beginner friendly; Linux & Networking fundamentals included"
      },
      "whatYouWillLearn": [
          "Master Network Defense: Firewalls, VPNs, Wireshark packet analysis, and IDS/IPS",
          "Perform Vulnerability Assessment and Penetration Testing (VAPT) with Kali Linux & Metasploit",
          "Operate Security Operations Center (SOC) tools: SIEM (Splunk), EDR, and log analysis",
          "Implement Cloud Security postures and IAM policies across Microsoft Azure & AWS",
          "Execute Incident Response, Threat Hunting, and Digital Forensics workflows"
      ],
      "curriculum": [
          {
              "module": "Module 1: Networking & Linux Security Foundations",
              "objective": "Build solid fundamentals in TCP/IP networking protocols and Linux administration for security.",
              "topics": [
                  "OSI & TCP/IP Stack Deep Dive",
                  "Wireshark Packet Inspection",
                  "Linux Shell Scripting & Hardening",
                  "Network Scanning with Nmap",
                  "Port Security & Firewalls"
              ],
              "exercise": "Capture and analyze malicious network traffic using Wireshark and Nmap."
          },
          {
              "module": "Module 2: Ethical Hacking & Vulnerability Assessment",
              "objective": "Learn ethical hacking methodologies, web app security (OWASP Top 10), and vulnerability scanning.",
              "topics": [
                  "VAPT Methodologies",
                  "OWASP Top 10 Web Vulnerabilities (SQLi, XSS, CSRF)",
                  "Metasploit & Burp Suite Testing",
                  "Password Cracking Defense",
                  "Remediation Reporting"
              ],
              "exercise": "Perform a simulated penetration test on a vulnerable web application and generate a remediation report."
          },
          {
              "module": "Module 3: SOC Operations & SIEM Threat Monitoring",
              "objective": "Work as a Tier 1/2 SOC analyst using Splunk and SIEM platforms for real-time attack detection.",
              "topics": [
                  "SOC Workflows & MITRE ATT&CK Framework",
                  "Splunk Search Processing Language (SPL)",
                  "Creating SIEM Alerts & Dashboards",
                  "Brute Force & Ransomware Detection",
                  "Threat Intelligence Integration"
              ],
              "exercise": "Configure custom Splunk detection rules to identify an active brute-force intrusion."
          },
          {
              "module": "Module 4: Cloud Security & Incident Response",
              "objective": "Secure enterprise cloud environments (Azure Sentinel, IAM) and execute incident response plans.",
              "topics": [
                  "Azure Security Center & Sentinel",
                  "Cloud IAM & Zero Trust Architecture",
                  "Incident Response Lifecycle (NIST)",
                  "Digital Forensics Basics",
                  "Compliance & CIS Benchmarks"
              ],
              "exercise": "Conduct a live Incident Response triage following a simulated cloud credential compromise."
          }
      ],
      "projects": [
          {
              "title": "Practice Project: Enterprise Network Vulnerability Assessment",
              "type": "Practice Project",
              "problem": "Identify unpatched CVEs and misconfigured network ports in an enterprise test network.",
              "whatYouBuild": "Automated scan pipeline with Nmap and OpenVAS + prioritized risk mitigation report.",
              "tools": [
                  "Kali Linux",
                  "Nmap",
                  "OpenVAS",
                  "Wireshark"
              ],
              "deliverables": [
                  "Vulnerability assessment report",
                  "CVSS risk scoring sheet"
              ],
              "reviewProcess": "Review of vulnerability discovery accuracy and remediation clarity."
          },
          {
              "title": "Simulated Business Project: 24/7 SOC Threat Detection Lab",
              "type": "Simulated Business Project",
              "problem": "A financial client requires centralized log ingestion and automated alerting for advanced persistent threats.",
              "whatYouBuild": "Full Splunk SIEM deployment ingesting multi-server syslog data with 5 custom correlation alert rules.",
              "tools": [
                  "Splunk Enterprise",
                  "Sysmon",
                  "Ubuntu Linux",
                  "Windows Server VM"
              ],
              "deliverables": [
                  "Configured Splunk SIEM",
                  "Incident response playbook",
                  "Executive security briefing"
              ],
              "reviewProcess": "1-on-1 practical SOC scenario defense evaluation."
          }
      ],
      "classExperience": {
          "liveSessions": "Live interactive classes with hands-on demonstrations in dedicated virtual sandboxes.",
          "recordings": "Full HD recordings and downloadable step-by-step lab walk-through guides.",
          "assignments": "Real-world capture-the-flag (CTF) lab exercises and threat analysis reports.",
          "doubtSupport": "Dedicated security mentor support on Discord/Slack."
      },
      "trainer": {
          "name": "Lead Cyber Security Architect",
          "title": "Certified Information Systems Security Professional (CISSP / CEH)",
          "experience": "12+ Years in SOC Management & Enterprise Threat Defense",
          "role": "Lead Security Instructor"
      },
      "scheduleFees": {
          "nextBatchDate": "Upcoming Cohort \u2014 Pre-Registration Open",
          "timings": "Weekend: 6:00 PM \u2013 8:30 PM IST | Weekday Evening: 8:00 PM \u2013 9:30 PM IST",
          "feeStructure": "Early Bird Scholarship Available",
          "paymentTerms": "Reserve your seat with zero upfront commitment."
      },
      "careerSupportDetails": {
          "resumePreparation": "ATS resume tailored for SOC Analyst (L1/L2), Cybersecurity Engineer, and VAPT roles.",
          "mockInterviews": "2 Security mock interviews covering network defense, incident scenarios, and tool triage.",
          "technicalPreparation": "Top 250 Cybersecurity interview questions, scenario playbooks, and certifications guide.",
          "jobReferrals": "Direct referral pipeline to cybersecurity consulting firms, banks, and MNC SOCs.",
          "supportDuration": "6 Months placement assistance.",
          "studentResponsibilities": [
              "Complete all sandbox lab exercises",
              "Submit incident triage reports"
          ]
      },
      "faqs": [
          {
              "question": "Is cybersecurity suitable for fresh graduates?",
              "answer": "Yes! SOC Analyst (L1), Junior Security Engineer, and Cloud Security Associate are high-demand entry-level roles requiring hands-on lab experience which this program delivers."
          },
          {
              "question": "Does this course cover practical hands-on hacking and defense?",
              "answer": "Yes. More than 70% of the course is practical hands-on labs using Kali Linux, Wireshark, Metasploit, Splunk, and Azure Sentinel in isolated virtual cloud sandboxes."
          }
      ],
      "relatedSlugs": [
          "devops-cloud-engineering",
          "azure-data-engineer",
          "fde-engineering"
      ]
  },
  {
      "slug": "quantum-computing",
      "title": "Quantum Computing & Quantum Algorithms",
      "category": "Emerging & Security",
      "isUpcoming": true,
      "duration": "2.5 Months",
      "weeklyHours": "6-8 Hours/Week",
      "format": "Live Online + IBM Quantum Lab Access",
      "level": "Intermediate to Advanced",
      "gradientBg": "from-purple-950 via-indigo-950 to-slate-900",
      "tags": [
          "Quantum Computing",
          "Qiskit",
          "Quantum Algorithms",
          "Quantum Cryptography",
          "Python",
          "IBM Quantum"
      ],
      "summary": "Step into the future of computing. Master quantum mechanics principles, quantum circuits, Qiskit programming, and foundational quantum algorithms (Grover\u2019s, Shor\u2019s, VQE) on real IBM Quantum hardware.",
      "overview": "Quantum computing represents the next massive paradigm shift in computational science, cryptography, drug discovery, and optimization. This pioneering program introduces engineers and researchers to quantum physics principles, qubits, quantum gates, superposition, entanglement, and hands-on coding using IBM Qiskit.",
      "intendedLearners": [
          "Software engineers, mathematicians, and data scientists looking to be first-movers in quantum tech",
          "Researchers and physics/engineering students interested in computational quantum algorithms",
          "Tech professionals preparing for upcoming quantum computing roles in R&D and enterprise labs"
      ],
      "prerequisites": [
          "Basic understanding of Linear Algebra (vectors, matrices, matrix multiplication)",
          "Intermediate Python programming proficiency",
          "Curiosity for emerging computational paradigms"
      ],
      "quickFacts": {
          "batchDetails": "Upcoming Emerging Tech Cohort",
          "language": "English",
          "commitment": "6-8 Hours/Week (3 hrs Live Class + 4 hrs Hands-on Quantum Labs)",
          "prerequisiteSummary": "Linear Algebra & Python basics required"
      },
      "whatYouWillLearn": [
          "Master Quantum Mechanics Essentials: Qubits, Superposition, Entanglement, and Bloch Sphere",
          "Build and simulate quantum circuits using IBM Qiskit in Python",
          "Implement core Quantum Algorithms: Deutsch-Jozsa, Quantum Fourier Transform, Grover\u2019s & Shor\u2019s",
          "Run quantum circuits on actual real-world IBM Quantum cloud quantum hardware",
          "Explore Quantum Cryptography (QKD - BB84) and Post-Quantum Cryptography standards"
      ],
      "curriculum": [
          {
              "module": "Module 1: Foundations of Quantum Information",
              "objective": "Understand qubit states, quantum gates, superposition, and matrix representations.",
              "topics": [
                  "Classical vs Quantum Bits",
                  "Linear Algebra & Dirac Bra-Ket Notation",
                  "Single Qubit Gates (Pauli X, Y, Z, Hadamard, Phase)",
                  "Bloch Sphere Visualization",
                  "Multi-Qubit Systems & Entanglement (CNOT, Bell States)"
              ],
              "exercise": "Construct and simulate a Bell State entangled pair circuit in Qiskit."
          },
          {
              "module": "Module 2: Quantum Circuit Programming with Qiskit",
              "objective": "Write, optimize, and execute quantum circuits on local statevector simulators and cloud backends.",
              "topics": [
                  "Qiskit SDK Architecture",
                  "QuantumCircuit Class & Measurement",
                  "Aer Simulator & Statevector Visualization",
                  "Noise Models & Error Mitigation",
                  "Connecting to IBM Quantum Cloud API"
              ],
              "exercise": "Execute a teleportation protocol circuit on an IBM Quantum 7-qubit cloud processor."
          },
          {
              "module": "Module 3: Core Quantum Algorithms",
              "objective": "Implement foundational quantum algorithms demonstrating quantum speedup over classical systems.",
              "topics": [
                  "Quantum Oracle Design",
                  "Deutsch-Jozsa & Bernstein-Vazirani Algorithms",
                  "Grover\u2019s Search Algorithm & Amplitude Amplification",
                  "Quantum Phase Estimation & Quantum Fourier Transform (QFT)",
                  "Shor\u2019s Factoring Algorithm Overview"
              ],
              "exercise": "Implement Grover's search algorithm to find target elements in an unstructured database."
          },
          {
              "module": "Module 4: Quantum Machine Learning & Cryptography",
              "objective": "Explore Variational Quantum Eigensolvers (VQE), Quantum Key Distribution, and enterprise impact.",
              "topics": [
                  "Variational Quantum Algorithms (VQE & QAOA)",
                  "Quantum Key Distribution (BB84 Protocol)",
                  "Post-Quantum Cryptography (PQC)",
                  "Quantum Chemistry & Optimization Use Cases",
                  "Future Trends in Quantum Advantage"
              ],
              "exercise": "Simulate molecular ground state energy calculation using VQE."
          }
      ],
      "projects": [
          {
              "title": "Practice Project: Quantum Teleportation Protocol Simulator",
              "type": "Practice Project",
              "problem": "Transfer quantum information between two parties using entanglement and classical communication.",
              "whatYouBuild": "3-qubit quantum teleportation circuit in Qiskit with fidelity measurement.",
              "tools": [
                  "Python",
                  "Qiskit",
                  "Jupyter",
                  "IBM Quantum"
              ],
              "deliverables": [
                  "Qiskit circuit script",
                  "Statevector probability distribution plots"
              ],
              "reviewProcess": "Code review on circuit gate depth and simulation fidelity."
          },
          {
              "title": "Simulated Business Project: Grover\u2019s Quantum Search for Cryptographic Key Discovery",
              "type": "Simulated Business Project",
              "problem": "Demonstrate quantum speedup O(sqrt(N)) in searching unstructured cryptographic key spaces.",
              "whatYouBuild": "Parameterized Grover search circuit with custom oracle and diffuser executed on IBM Quantum hardware.",
              "tools": [
                  "Qiskit",
                  "IBM Quantum Platform",
                  "Python",
                  "Matplotlib"
              ],
              "deliverables": [
                  "Quantum circuit code",
                  "Execution trace on real IBM Quantum device",
                  "Speedup analysis report"
              ],
              "reviewProcess": "1-on-1 technical evaluation on quantum algorithm implementation and hardware noise analysis."
          }
      ],
      "classExperience": {
          "liveSessions": "Interactive live lectures covering math derivations and live Qiskit coding.",
          "recordings": "Full HD recordings, mathematical notes, and notebook repositories.",
          "assignments": "Weekly quantum circuit puzzles and algorithm implementations.",
          "doubtSupport": "Direct mentorship from quantum computing researchers and engineers."
      },
      "trainer": {
          "name": "Quantum Computing Researcher",
          "title": "PhD / Lead Quantum Systems Scientist",
          "experience": "8+ Years in Quantum Information & Computational Physics",
          "role": "Lead Quantum Instructor"
      },
      "scheduleFees": {
          "nextBatchDate": "Upcoming Cohort \u2014 Pre-Registration Open",
          "timings": "Weekend Evening: 7:00 PM \u2013 9:00 PM IST",
          "feeStructure": "Early Bird Scholarship Available",
          "paymentTerms": "Reserve your seat with zero upfront commitment."
      },
      "careerSupportDetails": {
          "resumePreparation": "Research and industry-oriented resume emphasizing Qiskit, quantum algorithms, and projects.",
          "mockInterviews": "Technical interview preparation covering quantum algorithms and linear algebra.",
          "technicalPreparation": "Repository of quantum computing interview questions and IBM Quantum Developer certification prep.",
          "jobReferrals": "Referral sharing with quantum tech startups, deep-tech research labs, and enterprise R&D hubs.",
          "supportDuration": "6 Months research & career guidance.",
          "studentResponsibilities": [
              "Complete all weekly Qiskit notebooks",
              "Submit capstone algorithm project"
          ]
      },
      "faqs": [
          {
              "question": "Do I need actual quantum hardware to learn this course?",
              "answer": "No! We use IBM Quantum cloud platforms, which allow you to write Qiskit code on your laptop and submit quantum jobs over the cloud to run on real physical quantum computers located in IBM research labs."
          },
          {
              "question": "What is Qiskit?",
              "answer": "Qiskit is the leading open-source software development kit (SDK) developed by IBM for working with quantum computers at the level of circuits, pulses, and algorithms in Python."
          }
      ],
      "relatedSlugs": [
          "data-science",
          "generative-ai-engineering",
          "cyber-security"
      ]
  },
  {
      "slug": "fde-engineering",
      "title": "Forward Deployed Engineering (FDE)",
      "category": "Software Engineering",
      "isUpcoming": true,
      "duration": "3 Months",
      "weeklyHours": "8-10 Hours/Week",
      "format": "Live Online + Real-World Client Simulation",
      "level": "Intermediate to Advanced",
      "gradientBg": "from-blue-950 via-slate-900 to-indigo-950",
      "tags": [
          "FDE",
          "Forward Deployed",
          "Full Stack",
          "Cloud Architecture",
          "Data Pipelines",
          "Client Delivery",
          "APIs"
      ],
      "summary": "Train for the premier role in modern tech (Palantir/OpenAI style). Master full-stack software architecture, data pipelines, enterprise integration, and client-facing engineering delivery.",
      "overview": "Forward Deployed Engineers (FDEs) sit at the powerful intersection of software engineering, cloud data architecture, and high-stakes client problem solving. This elite training program equips you with full-stack skills, custom API middleware, database integration, containerized cloud deployment, and the consultative problem-solving mindset required to deploy mission-critical software at enterprise client sites.",
      "intendedLearners": [
          "Software Engineers, Solutions Architects, and Full Stack Developers aiming for elite FDE roles",
          "Technical Consultants and Pre-Sales Engineers wanting deep hands-on coding & deployment capability",
          "Engineers aspiring to work at high-growth enterprise software firms and tier-1 product companies"
      ],
      "prerequisites": [
          "Prior programming experience in JavaScript/TypeScript, Python, or Java",
          "Familiarity with web technologies, REST APIs, and relational databases",
          "Strong analytical problem-solving and communication skills"
      ],
      "quickFacts": {
          "batchDetails": "Upcoming Elite Cohort \u2014 Pre-Registration Open",
          "language": "English",
          "commitment": "8-10 Hours/Week (4 hrs Live Class + 5 hrs Enterprise Simulations)",
          "prerequisiteSummary": "Prior coding experience required; intermediate to advanced level"
      },
      "whatYouWillLearn": [
          "Master Full-Stack Platform Engineering: Next.js/React, TypeScript, Node.js, and Python backend services",
          "Build High-Throughput Data Ingestion & Integration Middleware connecting enterprise ERPs and CRMs",
          "Architect Cloud-Native Infrastructure on Azure/AWS with Docker, Kubernetes, and Terraform",
          "Design resilient microservices, secure authentication (OAuth2/SSO), and webhook streaming pipelines",
          "Master FDE Client Delivery: Scoping technical requirements, rapid prototyping, and executive code handovers"
      ],
      "curriculum": [
          {
              "module": "Module 1: Enterprise Full-Stack & System Integration",
              "objective": "Build modern full-stack web applications and robust REST/GraphQL integration layers.",
              "topics": [
                  "TypeScript Full-Stack Architecture",
                  "Next.js App Router & Server Components",
                  "High-Performance Backend APIs in Node/Python",
                  "Database Design (PostgreSQL + Redis Caching)",
                  "Enterprise SSO & OAuth2 Security"
              ],
              "exercise": "Develop an authenticated client management portal with real-time WebSocket updates."
          },
          {
              "module": "Module 2: Data Middleware & Ingestion Pipelines",
              "objective": "Connect diverse client data sources, clean high-velocity streams, and sync to central warehouses.",
              "topics": [
                  "ETL/ELT Data Pipeline Architecture",
                  "Kafka/RabbitMQ Event Streaming",
                  "Handling Legacy SOAP/REST & Database Connectors",
                  "Data Validation & Schema Migration",
                  "PySpark Transformations"
              ],
              "exercise": "Build an automated bi-directional synchronization engine between CRM and SQL database."
          },
          {
              "module": "Module 3: Cloud Infrastructure, Docker & Kubernetes",
              "objective": "Deploy, scale, and monitor client applications in isolated multi-tenant cloud environments.",
              "topics": [
                  "Containerization with Docker & Multi-Stage Builds",
                  "Kubernetes Deployments & Ingress Controllers",
                  "Infrastructure as Code (Terraform Basics)",
                  "CI/CD Automation with GitHub Actions",
                  "Observability (Prometheus, Grafana, OpenTelemetry)"
              ],
              "exercise": "Deploy a containerized microservices stack to Azure Kubernetes Service (AKS) with automated CI/CD."
          },
          {
              "module": "Module 4: The FDE Playbook: Client Scoping & Rapid Prototyping",
              "objective": "Learn the consultative engineering methodologies used by top Forward Deployed teams.",
              "topics": [
                  "Technical Scoping & Architecture Decision Records (ADRs)",
                  "Building 48-Hour Production MVPs",
                  "Handling Client Objections & Code Reviews",
                  "Performance Tuning & Load Testing",
                  "Clean Handover & Technical Documentation"
              ],
              "exercise": "Execute a simulated 7-day client deployment sprint from scoping to live production rollout."
          }
      ],
      "projects": [
          {
              "title": "Practice Project: Multi-Source Enterprise Data Connector",
              "type": "Practice Project",
              "problem": "Integrate disparate customer records from 3 distinct client systems into a unified GraphQL API.",
              "whatYouBuild": "TypeScript integration middleware with Redis caching, rate limiting, and automated health checks.",
              "tools": [
                  "TypeScript",
                  "Node.js",
                  "GraphQL",
                  "PostgreSQL",
                  "Redis"
              ],
              "deliverables": [
                  "Clean source code repo",
                  "Architecture diagram",
                  "Postman test suite"
              ],
              "reviewProcess": "Code review on API performance, error handling, and test coverage."
          },
          {
              "title": "Simulated Business Project: Mission-Critical Client Deployment Simulation",
              "type": "Simulated Business Project",
              "problem": "Deploy an end-to-end intelligent analytics portal at a mock enterprise healthcare client within tight SLAs.",
              "whatYouBuild": "Full-stack application with real-time data streaming, role-based access control, and Kubernetes deployment.",
              "tools": [
                  "Next.js",
                  "Python FastAPI",
                  "PostgreSQL",
                  "Docker",
                  "Kubernetes",
                  "Azure"
              ],
              "deliverables": [
                  "Production web application",
                  "Kubernetes manifests",
                  "Executive handover documentation"
              ],
              "reviewProcess": "1-on-1 simulated client presentation and technical architecture defense."
          }
      ],
      "classExperience": {
          "liveSessions": "Live engineering sprints and architecture deep-dives led by veteran technical architects.",
          "recordings": "Lifetime access to all session recordings, architecture templates, and boilerplate repos.",
          "assignments": "Real-world engineering challenge briefs simulating enterprise client requirements.",
          "doubtSupport": "Direct daily engineering channel support and code review sessions."
      },
      "trainer": {
          "name": "Principal Forward Deployed Architect",
          "title": "Staff Solutions Engineer & Enterprise Architect",
          "experience": "13+ Years in Enterprise Client Deployments & Cloud Architecture",
          "role": "Lead FDE Instructor"
      },
      "scheduleFees": {
          "nextBatchDate": "Upcoming Elite Cohort \u2014 Pre-Registration Open",
          "timings": "Weekend Evening: 7:00 PM \u2013 9:30 PM IST",
          "feeStructure": "Early Bird Scholarship Available (Pay in 2 Easy Installments)",
          "paymentTerms": "Pre-register now to secure priority admission."
      },
      "careerSupportDetails": {
          "resumePreparation": "Custom FDE and Solutions Architect resume highlighting enterprise systems and deployment deliverables.",
          "mockInterviews": "2 Intensive mock interviews: System Design & Live Client Technical Consulting Scenarios.",
          "technicalPreparation": "Comprehensive repository of System Design, API architecture, and behavioral FDE interview guides.",
          "jobReferrals": "Direct referrals to top tier-1 product firms, high-growth SaaS companies, and global consultancies.",
          "supportDuration": "6 Months executive placement & career acceleration support.",
          "studentResponsibilities": [
              "Complete all sprint assignments",
              "Deliver and defend capstone client project"
          ]
      },
      "faqs": [
          {
              "question": "What exactly is a Forward Deployed Engineer (FDE)?",
              "answer": "A Forward Deployed Engineer is an elite hybrid between a Senior Full-Stack/Data Engineer and a Technical Solutions Architect. FDEs work directly with enterprise clients to build, customize, and deploy mission-critical software solutions on the ground."
          },
          {
              "question": "How does FDE compensation compare to standard Software Engineering roles?",
              "answer": "Because FDEs combine deep coding capability with high-value client problem-solving and system architecture, FDE roles often command significantly higher compensation and rapid executive career progression."
          }
      ],
      "relatedSlugs": [
          "python-full-stack",
          "azure-data-engineer-genai",
          "devops-cloud-engineering"
      ]
  }
];