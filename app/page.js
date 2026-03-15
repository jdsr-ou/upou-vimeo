"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import styles from "./page.module.css";

const EASE = [0.16, 1, 0.3, 1];
const FX_RATE = 59;

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const phpFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0
});

const vimeoPlans = [
  {
    label: "Starter",
    price: "$12/mo",
    scope: "1 seat, 2 TB lifetime storage",
    note: "2 TB monthly bandwidth cap still applies"
  },
  {
    label: "Standard",
    price: "$25/mo",
    scope: "5 seats, 4 TB lifetime storage",
    note: "Adds branding, galleries, and lead capture"
  },
  {
    label: "Advanced",
    price: "$75/mo",
    scope: "10 seats, 7 TB lifetime storage",
    note: "Adds live events, polls, chat, and webinars"
  },
  {
    label: "Enterprise",
    price: "Custom",
    scope: "Negotiated seats, bandwidth, governance, and DRM",
    note: "The viable path if public OER traffic is expected to scale"
  }
];

const vimeoPlanMatrix = [
  ["Customizable player", "Included", "Included", "Included", "Included"],
  ["Privacy and review tools", "Included", "Included", "Included", "Included"],
  ["Branding and watermark", "Not listed", "Included", "Included", "Included"],
  ["Lead capture and CTAs", "Not listed", "Included", "Included", "Included"],
  ["Hosted livestream events", "Not listed", "Not listed", "Included", "Included"],
  ["Q&A, polls, and chat", "Not listed", "Not listed", "Included", "Included"],
  ["SSO and SCIM", "Not listed", "Not listed", "Not listed", "Included"],
  ["Dedicated support", "Not listed", "Not listed", "Not listed", "Included"]
];

const enterpriseEstimates = [
  { label: "Low estimate", annualUsd: 6000 },
  { label: "Median estimate", annualUsd: 10000, recommended: true },
  { label: "High estimate", annualUsd: 15000 }
];

const panoptoEstimates = [
  { label: "Typical range (low)", annualUsd: 7126 },
  { label: "Median estimate", annualUsd: 10000, recommended: true },
  { label: "Typical range (high)", annualUsd: 10891 }
];

const bandwidthScenarios = [
  {
    scenario: "Single popular 1080p lecture",
    streamSize: "0.6 GB / view",
    dailyViews: "300",
    monthly: "5.4 TB / month",
    cap: "2 TB cap in ~11 days"
  },
  {
    scenario: "Three 720p OER lectures",
    streamSize: "0.35 GB / view",
    dailyViews: "250 each",
    monthly: "7.9 TB / month",
    cap: "2 TB cap in ~8 days"
  },
  {
    scenario: "Public event week",
    streamSize: "1.0 GB / view",
    dailyViews: "1,000",
    monthly: "30.0 TB / month",
    cap: "2 TB cap in ~2 days"
  }
];

const providerSlides = [
  {
    id: "vimeo",
    number: "01",
    title: "Vimeo",
    subtitle: "Easy deployment and polished delivery",
    strap: "Easy deployment",
    summary:
      "Vimeo is the most presentation-ready option in the briefing. It is also the simplest platform overall to deploy and manage, but public OER success can trigger contract pressure because the self-serve model is tightly bandwidth-capped.",
    heroSignals: [
      { label: "Deployment model", value: "Fastest rollout", tone: "success" },
      { label: "Self-serve catch", value: "Strict bandwidth exposure", tone: "warning" },
      { label: "Best use", value: "Public-facing delivery" }
    ],
    capabilityBlocks: [
      {
        category: "Compliance",
        title: "Enterprise-gated control",
        summary:
          "Password protection, secure embeds, domain restriction, and HIPAA-capable tiers exist, but institutional confidence rises meaningfully only at Enterprise level.",
        pills: ["Tiered controls", "Domain restriction"],
        tone: "signal"
      },
      {
        category: "Scalability",
        title: "Self-serve bandwidth cap",
        summary:
          "Self-serve plans are limited to 2 TB monthly bandwidth. Viral OER usage can force immediate movement into a custom contract.",
        pills: ["2 TB cap", "Forced upgrade pressure"],
        tone: "warning"
      },
      {
        category: "UX",
        title: "Highest polish",
        summary:
          "Ad-free 4K playback, branded players, CTAs, and direct-to-social publishing make Vimeo strongest for public reach and aesthetic delivery.",
        pills: ["4K player", "White-label branding"],
        tone: "success"
      },
      {
        category: "Admin load",
        title: "Lightest operating load",
        summary:
          "Vimeo is the least demanding platform operationally because the infrastructure decision is already made and rollout is fast.",
        pills: ["Simplest deployment", "SaaS only"],
        tone: "success"
      }
    ],
    pricing: {
      title: "Tiered pricing",
      description:
        "The base sticker price is attractive, but bandwidth behavior matters more than seat cost when UPOU evaluates public OER delivery.",
      headers: ["Offer", "Price", "Institutional scope", "What it means"],
      rows: vimeoPlans.map((plan) => [plan.label, plan.price, plan.scope, plan.note])
    },
    operatingFrames: [
      {
        title: "Bandwidth reality",
        summary:
          "Even moderate public usage can exceed Vimeo’s self-serve cap quickly.",
        tone: "warning",
        noteTag: "2 TB cap",
        note:
          "Self-serve plans are capped at 2 TB per month and can trigger forced enterprise contracting after repeated overages."
      },
      {
        title: "Budget impact",
        summary:
          "Seat growth and bandwidth growth can compound total cost, especially if public delivery and internal authoring expand at the same time.",
        tone: "warning"
      },
      {
        title: "Best fit",
        summary:
          "Vimeo is strongest when brand impact outranks deep academic workflow control.",
        tone: "success"
      }
    ],
    blueprintTitle: "Vimeo Cost Basis",
    blueprintRows: [
      ["Enterprise planning range", "$6,000 to $15,000 annually is the practical estimate used in the current site"],
      ["PHP conversion basis", `Current planning uses PHP ${FX_RATE} per USD`],
      ["Best-fit scenario", "Public OER showcase, institutional marketing, and external communication"],
      ["Main downside", "Self-serve success can trigger enterprise escalation"]
    ],
    extra: "vimeo"
  },
  {
    id: "panopto",
    number: "02",
    title: "Panopto",
    subtitle: "Educational premium option",
    strap: "Educational premium option",
    summary:
      "Panopto is the strongest institutional fit for UPOU because it is built for education, integrates deeply with Moodle, and adds learning-focused capabilities like Smart Video Search and Elai-assisted production.",
    heroSignals: [
      {
        label: "Educational premium option",
        value: "Best institutional fit for Moodle and learning workflows",
        tone: "signal",
        note: "The report states Panopto is used by 21 of the world's top 25 universities.",
        noteTag: "21 of 25"
      },
      { label: "Deployment model", value: "Managed service with deep Moodle workflows" },
      {
        label: "Standout",
        value: "Smart Video Search and Elai expansion directly support learning accessibility",
        tone: "success"
      }
    ],
    capabilityBlocks: [
      {
        category: "Compliance",
        title: "Governed academic security",
        summary:
          "AES-256 at rest, TLS 1.3 in transit, RBAC, retention policies, and institutional governance controls align with managed academic delivery.",
        pills: ["AES-256", "TLS 1.3", "ISO/GDPR posture"],
        tone: "success"
      },
      {
        category: "Scalability",
        title: "Predictable hours model",
        summary:
          "Pricing follows created, stored, archived, and delivered hours rather than public-traffic spikes, which is safer for institutional budgeting.",
        pills: ["Hours-based", "Unlimited authenticated viewing"],
        tone: "success"
      },
      {
        category: "UX",
        title: "Search-first learning experience",
        summary:
          "AI Smart Search reaches spoken words, slides, and on-screen text. That makes long lecture libraries usable rather than merely stored.",
        pills: ["OCR + ASR", "Lecture capture"],
        tone: "success"
      },
      {
        category: "Admin load",
        title: "Moderate but legible",
        summary:
          "Panopto needs configuration, but it avoids the infrastructure ownership and modular complexity attached to Kaltura.",
        pills: ["Managed service", "99.99% uptime"],
        tone: "signal"
      }
    ],
    pricing: {
      title: "Predictable pricing",
      description:
        "Panopto’s pricing model is designed for predictability and broad authenticated use rather than metered public delivery.",
      headers: ["Category", "What is billed", "What it means"],
      rows: [
        ["Created Hours", "Recorded or uploaded content during the term", "Caps reconcile against the license agreement"],
        ["Stored Hours", "Active library hours outside archive", "Peak over-quota storage can trigger renewal billing"],
        ["Archived Hours", "Low-cost retained content", "Controls cost while preserving aging lecture material"],
        ["Public Delivered Hours", "Anonymous viewing load", "Usually capped only for extreme open use"],
        ["Authenticated Delivered Hours", "Logged-in institutional viewing", "Unlimited for most organizations"]
      ]
    },
    operatingFrames: [
      {
        title: "Uptime",
        summary:
          "The report ties Panopto to a cloud-native AWS architecture with 99.99% uptime and regional hosting options.",
        tone: "success"
      },
      {
        title: "Elai expansion",
        summary:
          "The Elai acquisition extends Panopto from lecture management into AI-assisted text-to-video production.",
        tone: "success",
        noteTag: "Elai",
        note:
          "Elai supports text-to-video, voice cloning, and multilingual output; in Moodle contexts this helps teachers produce learning materials faster and gives students more accessible content formats."
      },
      {
        title: "Best fit",
        summary:
          "Panopto is not the absolute easiest platform to stand up, but it is the simplest serious academic fit once Moodle depth is non-negotiable.",
        tone: "signal",
        noteTag: "Moodle",
        note:
          "Panopto Block, deep linking, and gradebook-linked workflows support both teacher publishing and student assignment/video review flows."
      }
    ],
    blueprintTitle: "Panopto LTI 1.3 setup",
    blueprintRows: [
      ["Issuer", "Use the issuer configured by UPOU Moodle"],
      ["OIDC Login URL", "Taken from the Panopto identity provider page"],
      ["Redirection URI", "https://{organization}.hosted.panopto.com/Panopto/LTI/OIDCAuth"],
      ["Public JWK URL", "Taken from the Panopto identity provider page"],
      ["Placements", "Course navigation, editor button, assignment selection"],
      ["Message type", "LtiDeepLinkingRequest"]
    ]
  },
  {
    id: "kaltura",
    number: "03",
    title: "Kaltura",
    subtitle: "Best for customization",
    strap: "Best for customization",
    summary:
      "Kaltura is the most configurable platform in the briefing. It is appropriate when UPOU wants sovereignty, modular APIs, and custom Moodle-connected workflows, but it carries the heaviest implementation and governance burden.",
    heroSignals: [
      { label: "Customization", value: "Most modular and API-driven option" },
      { label: "Deployment model", value: "SaaS, private cloud, on-premise, or hybrid" },
      { label: "Tradeoff", value: "Weakest on cost predictability and admin overhead", tone: "warning" }
    ],
    capabilityBlocks: [
      {
        category: "Compliance",
        title: "Deep policy control",
        summary:
          "Access control profiles, privacy contexts, geo- and IP-restrictions, and HYOK support make Kaltura the strongest option for custom entitlement models.",
        pills: ["HYOK", "Access profiles", "Geo/IP controls"],
        tone: "signal"
      },
      {
        category: "Scalability",
        title: "Usage-based elasticity",
        summary:
          "Kaltura scales across multiple deployment models, but bandwidth, storage, streams, and live delivery all carry explicit cost signals.",
        pills: ["VPaaS", "$0.17/GB bandwidth", "$0.25/GB storage"],
        tone: "warning"
      },
      {
        category: "UX",
        title: "Interactive and agentic",
        summary:
          "The platform combines MediaSpace, KMC, in-video quizzes, and emerging agentic AI avatars for interactive support and training experiences.",
        pills: ["Agentic AI", "MediaSpace", "Video quizzes"],
        tone: "success"
      },
      {
        category: "Admin load",
        title: "Maximum ownership",
        summary:
          "Kaltura assumes a technical owner. Without one, complexity spreads into billing, integrations, plugins, and maintenance overhead.",
        pills: ["Highest admin load", "API-first"],
        tone: "warning"
      }
    ],
    pricing: {
      title: "Usage-based pricing",
      description:
        "Kaltura trades predictability for flexibility. It is powerful, but finance and IT need to watch usage closely.",
      headers: ["Unit", "Price", "What it means"],
      rows: [
        ["Outbound Bandwidth", "$0.17 / GB", "Primary delivery meter"],
        ["Managed Storage", "$0.25 / GB / month", "Monthly library growth cost"],
        ["Transcoding Output", "$2.25 / Output GB", "Each rendition adds billable usage"],
        [
          "Active Unique IDs",
          "$0.55 / ID / month",
          "Unique active user accounts per month (students, faculty, and admins) are metered"
        ],
        ["Delivered Video Streams", "$0.001 / stream", "Every playback start adds cost"],
        ["Live Viewing", "$1.00 / viewer / hour", "Large live events scale quickly"]
      ]
    },
    operatingFrames: [
      {
        title: "Infrastructure choice",
        summary:
          "Kaltura is the only option here where infrastructure choice itself is part of the platform decision.",
        tone: "signal"
      },
      {
        title: "AI direction",
        summary:
          "Agentic avatars, conversational SDKs, and screen-aware assistance point toward a more interactive model than standard video hosting.",
        tone: "success",
        noteTag: "Agentic AI",
        note:
          "Kaltura’s agentic stack includes conversational avatars and SDK-driven embedding, enabling custom support/training workflows that can be integrated into Moodle-connected experiences."
      },
      {
        title: "Best fit",
        summary:
          "Kaltura is justified only when extensibility and policy control are strategic requirements, not when the goal is fast operational clarity.",
        tone: "negative"
      }
    ],
    blueprintTitle: "Kaltura LTI 1.3 setup",
    blueprintRows: [
      ["authMethod", "lti1.3 in the KAF Hosted module"],
      ["OIDC authorize URL", "Use the authorize redirect endpoint from UPOU Moodle"],
      ["OAuth token URL", "Use the token endpoint from UPOU Moodle"],
      ["JWKS URL", "Use the JWKS endpoint exposed by UPOU Moodle"],
      ["Extensions", "AGS, Deep Linking, and NRPS"],
      ["Client ID", "Generated during Moodle registration and pasted into KMC"]
    ]
  }
];

const comparisonRows = [
  {
    label: "Deployment model",
    values: {
      vimeo: { pill: "SaaS only", text: "Fastest rollout with the least infrastructure choice.", tone: "success" },
      panopto: { pill: "Managed service", text: "Cloud-native institutional deployment with regional hosting." },
      kaltura: { pill: "Most flexible", text: "SaaS, private cloud, on-premise, and hybrid remain open." }
    }
  },
  {
    label: "Moodle fit",
    values: {
      vimeo: { pill: "Embed ready", text: "Good for LTI embedding and grade-linked activity." },
      panopto: {
        pill: "Deep workflow",
        text: "Best fit for searchable libraries, folders, assignments, and teaching workflows.",
        tone: "signal"
      },
      kaltura: { pill: "Custom tooling", text: "Strongest when UPOU wants configurable media patterns." }
    }
  },
  {
    label: "Pricing model",
    values: {
      vimeo: { pill: "Bandwidth cap", text: "Low entry pricing but strict bandwidth exposure.", tone: "warning" },
      panopto: { pill: "Predictable", text: "Hours-based licensing aligns with institutional budgeting.", tone: "success" },
      kaltura: { pill: "Variable", text: "Usage-based billing rewards control but raises volatility.", tone: "warning" }
    }
  },
  {
    label: "AI and accessibility",
    values: {
      vimeo: { pill: "Assistive", text: "AI editing, captions, and translation support." },
      panopto: {
        pill: "Search native",
        text: "Smart Video Search and Elai expansion directly support learning accessibility.",
        tone: "success"
      },
      kaltura: { pill: "Conversational", text: "Agentic AI avatars enable real-time interactive guidance." }
    }
  },
  {
    label: "Admin load",
    values: {
      vimeo: { pill: "Lightest", text: "Simplest platform overall to deploy and manage.", tone: "success" },
      panopto: { pill: "Moderate", text: "More setup than Vimeo, but easier to govern than Kaltura." },
      kaltura: { pill: "Heaviest", text: "Needs dedicated technical ownership and closer oversight.", tone: "warning" }
    }
  }
];

const comparisonTakeaways = [
  {
    label: "Panopto",
    title: "Educational premium option",
    summary:
      "Strongest overall fit because it is built for teaching workflows, works deeply with Moodle, and adds Smart Video Search plus Elai-assisted production.",
    tone: "signal"
  },
  {
    label: "Vimeo",
    title: "Easy deployment",
    summary:
      "Fastest to launch and easiest to manage, but the tradeoff is strict bandwidth exposure and weaker academic workflow depth.",
    tone: "success"
  },
  {
    label: "Kaltura",
    title: "Best for customization",
    summary:
      "Best when UPOU needs modular APIs and deployment choice, but it is the weakest option for pricing predictability and admin simplicity.",
    tone: "warning"
  }
];

const comparisonDetailCards = [
  {
    id: "panopto",
    ecosystem: "Panopto ecosystem",
    title: "Education-centric workflow depth",
    points: [
      "Smart Search indexes spoken words, slides, and on-screen text for faster student review.",
      "Moodle workflows support folder provisioning, deep linking, and assignment/gradebook-aligned usage.",
      "Elai extends production with text-to-video and multilingual support for teachers and course teams."
    ]
  },
  {
    id: "vimeo",
    ecosystem: "Vimeo ecosystem",
    title: "Fast rollout and strong external presentation",
    points: [
      "The cleanest launch path with low operational overhead and polished public playback.",
      "High-quality player branding and external communication controls are strong for outreach content.",
      "Commercial planning needs close tracking when public views grow due to self-serve bandwidth limits."
    ]
  },
  {
    id: "kaltura",
    ecosystem: "Kaltura ecosystem",
    title: "Maximum customization and deployment choice",
    points: [
      "Supports SaaS, private cloud, on-premise, and hybrid deployment decisions.",
      "API-first architecture enables custom media patterns in complex institutional environments.",
      "Usage-based billing and implementation complexity demand stronger technical and finance oversight."
    ]
  }
];

const ecosystemFeatureCatalog = {
  vimeo: [
    {
      id: "vimeo-player-branding",
      category: "Delivery",
      title: "4K player and brand controls",
      summary: "Ad-free 4K delivery, white-label player settings, CTAs, and social distribution for external OER reach.",
      moodleImpact: "Strong for polished embedded playback and controlled distribution into Moodle-linked pages.",
      studentImpact: "Clean playback experience with fewer distractions.",
      teacherImpact: "Faster publishing for outreach or course intro materials.",
      adminImpact: "Simple publishing governance with fewer moving parts."
    },
    {
      id: "vimeo-fast-rollout",
      category: "Operations",
      title: "Fastest rollout path",
      summary: "SaaS-only model is straightforward to deploy and operate with lower platform management overhead.",
      moodleImpact: "Quick integration for embedding workflows without heavy infrastructure setup.",
      studentImpact: "Faster access to uploaded resources.",
      teacherImpact: "Low-friction publishing and update cycle.",
      adminImpact: "Lower day-to-day platform operations burden."
    },
    {
      id: "vimeo-privacy-security",
      category: "Governance",
      title: "Privacy and enterprise security controls",
      summary: "Password protection, domain restriction, and enterprise controls including HIPAA-ready tiers.",
      moodleImpact: "Domain restrictions help keep playback scoped to approved institutional contexts.",
      studentImpact: "Improved privacy for course-restricted media.",
      teacherImpact: "More confidence when sharing protected learning materials.",
      adminImpact: "Governance strength rises significantly in enterprise tiers."
    },
    {
      id: "vimeo-ai-assist",
      category: "AI",
      title: "AI-assisted editing and captions",
      summary: "Supports captioning, editing assistance, and translation-oriented workflows for faster publishing.",
      moodleImpact: "Useful for accessibility improvements on embedded learning assets.",
      studentImpact: "Better accessibility through captioned and translated media.",
      teacherImpact: "Less manual editing effort for course videos.",
      adminImpact: "Supports accessibility programs with lighter production workflows."
    },
    {
      id: "vimeo-bandwidth-policy",
      category: "Commercial",
      title: "Self-serve bandwidth policy",
      summary: "2 TB monthly cap on self-serve plans can escalate cost and force enterprise movement on high traffic.",
      moodleImpact: "High-demand OER hosted through Vimeo can trigger operational and budget pressure.",
      studentImpact: "Potential disruption risk if traffic spikes and limits are reached.",
      teacherImpact: "Popular public-facing lectures can outgrow self-serve quickly.",
      adminImpact: "Needs active bandwidth monitoring and contract planning."
    }
  ],
  panopto: [
    {
      id: "panopto-smart-search",
      category: "Learning",
      title: "AI Smart Search (ASR + OCR + slides)",
      summary: "Searches spoken words, slide text, and on-screen content to make lecture libraries discoverable.",
      moodleImpact: "Improves Moodle-linked lecture retrieval and revision workflows.",
      studentImpact: "Find exact moments quickly for exam review and remediation.",
      teacherImpact: "Recorded lectures remain usable over time instead of becoming hard-to-search archives.",
      adminImpact: "Higher content utility from existing media inventory."
    },
    {
      id: "panopto-moodle-lti",
      category: "Integration",
      title: "Moodle LTI and course workflows",
      summary: "Supports Panopto Block, deep linking, assignment integration, and gradebook-aligned usage patterns.",
      moodleImpact: "Directly aligns with structured course delivery and assignment flows in Moodle.",
      studentImpact: "Cleaner submission and viewing flows inside course spaces.",
      teacherImpact: "Streamlined embedding, folder sync, and graded video interactions.",
      adminImpact: "More predictable LMS-video governance and support patterns."
    },
    {
      id: "panopto-lecture-capture",
      category: "Capture",
      title: "Lecture capture and recording depth",
      summary: "Remote hardware integration and multi-cam recording support synchronized learning delivery.",
      moodleImpact: "Supports richer lecture capture workflows feeding directly into Moodle courses.",
      studentImpact: "Higher-quality recorded sessions for asynchronous learning.",
      teacherImpact: "Better capture options for complex instructional formats.",
      adminImpact: "Scalable recording operations for teaching-heavy terms."
    },
    {
      id: "panopto-elai",
      category: "AI",
      title: "Elai-assisted production",
      summary: "Text-to-video, voice options, and multilingual generation expand content production capacity.",
      moodleImpact: "Useful for rapid localized material creation for Moodle-based courses.",
      studentImpact: "More accessible formats and language coverage.",
      teacherImpact: "Faster conversion of notes/scripts into publishable learning video.",
      adminImpact: "Supports wider content output without proportional studio expansion."
    },
    {
      id: "panopto-security",
      category: "Governance",
      title: "Security and reliability posture",
      summary: "AES-256 at rest, TLS 1.3 in transit, RBAC, and a 99.99% uptime reliability profile.",
      moodleImpact: "Supports stable and policy-aligned institutional delivery.",
      studentImpact: "More consistent playback availability during peak periods.",
      teacherImpact: "Reduced disruption risk during teaching cycles.",
      adminImpact: "Stronger compliance alignment and operational confidence."
    },
    {
      id: "panopto-pricing-model",
      category: "Commercial",
      title: "Hours-based licensing model",
      summary: "Created, stored, archived, and delivered hours model gives more predictable planning than pure usage spikes.",
      moodleImpact: "Better fit for course-centric, authenticated delivery models.",
      studentImpact: "Lower risk of sudden access constraints from metered spikes.",
      teacherImpact: "Supports consistent publishing expectations across terms.",
      adminImpact: "Improves annual budgeting and renewal predictability."
    }
  ],
  kaltura: [
    {
      id: "kaltura-agentic-ai",
      category: "AI",
      title: "Agentic AI avatars and conversational SDK",
      summary: "Real-time conversational avatars and SDK tooling enable advanced interactive experiences.",
      moodleImpact: "Can power custom interactive learning/support surfaces around Moodle content.",
      studentImpact: "Potential for guided, conversational learning assistance.",
      teacherImpact: "New pathways for interactive training and support content.",
      adminImpact: "Requires stronger technical ownership to deploy safely."
    },
    {
      id: "kaltura-modular-stack",
      category: "Architecture",
      title: "KMC + MediaSpace + KAF modular stack",
      summary: "Backend console, portal layer, and integration framework support highly customized media ecosystems.",
      moodleImpact: "Flexible enough for complex Moodle integration patterns.",
      studentImpact: "Can deliver richer, customized portal experiences.",
      teacherImpact: "Supports varied publishing models and learning activities.",
      adminImpact: "Greater flexibility paired with higher implementation complexity."
    },
    {
      id: "kaltura-lti-toolkit",
      category: "Integration",
      title: "Deep LTI toolkit and identity mapping",
      summary: "My Media, Media Gallery, quizzes, and LTI 1.3 user-claim mapping for precise LMS identity control.",
      moodleImpact: "Strong fit when UPOU needs custom Moodle role/identity behavior.",
      studentImpact: "Supports richer in-course media interactions.",
      teacherImpact: "More configurable placement and grading-linked media workflows.",
      adminImpact: "Needs careful setup to avoid role/claim misconfiguration."
    },
    {
      id: "kaltura-governance",
      category: "Governance",
      title: "Advanced entitlement and key management",
      summary: "Access control profiles, geo/IP rules, and HYOK options for deep policy control.",
      moodleImpact: "Useful when institutional policy requires tighter entitlement boundaries.",
      studentImpact: "Policy-aware access controls in restricted contexts.",
      teacherImpact: "Supports specialized compliance requirements.",
      adminImpact: "Adds governance power with more policy-management overhead."
    },
    {
      id: "kaltura-deployment-modes",
      category: "Deployment",
      title: "SaaS, private cloud, on-prem, hybrid",
      summary: "Multiple deployment modes allow infrastructure decisions to remain institutional.",
      moodleImpact: "Can align with specific infrastructure and data-governance constraints.",
      studentImpact: "Delivery experience depends on institutional implementation quality.",
      teacherImpact: "Can be tailored to institutional teaching models.",
      adminImpact: "Highest infrastructure planning responsibility among the three."
    },
    {
      id: "kaltura-vpaas-pricing",
      category: "Commercial",
      title: "VPaaS metered pricing",
      summary: "Bandwidth, storage, streams, and active IDs are billed per usage unit.",
      moodleImpact: "Budget outcomes vary with learning demand and viewing behavior.",
      studentImpact: "Scale is possible, but budget governance is crucial.",
      teacherImpact: "Heavy usage scenarios should be forecast in advance.",
      adminImpact: "Finance and platform teams need continuous usage monitoring."
    }
  ]
};

const navGroups = [
  ...providerSlides.map(({ id, number, title, subtitle }) => ({ id, number, title, subtitle })),
  { id: "comparison", number: "04", title: "Comparison", subtitle: "Decision matrix" }
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatUSD(value) {
  return usdFormatter.format(value);
}

function formatPHP(value) {
  return phpFormatter.format(value);
}

function StatusPill({ children, tone = "default" }) {
  return (
    <span
      className={joinClasses(
        styles.statusPill,
        tone === "signal" && styles.statusPillSignal,
        tone === "success" && styles.statusPillSuccess,
        tone === "warning" && styles.statusPillWarning
      )}
    >
      {children}
    </span>
  );
}

function getToneClass(tone) {
  if (tone === "signal") {
    return styles.toneSignal;
  }

  if (tone === "success") {
    return styles.toneSuccess;
  }

  if (tone === "warning") {
    return styles.toneWarning;
  }

  return "";
}

function getProviderThemeClass(id) {
  if (id === "vimeo") {
    return styles.providerVimeo;
  }

  if (id === "panopto") {
    return styles.providerPanopto;
  }

  if (id === "kaltura") {
    return styles.providerKaltura;
  }

  return styles.providerComparison;
}

function TopNavBar({ items, activeGroup, onNavigate, theme, onToggleTheme }) {
  return (
    <header className={joinClasses(styles.topBar, getProviderThemeClass(activeGroup))}>
      <nav className={styles.topRail} aria-label="Briefing categories">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={joinClasses(styles.railItem, activeGroup === item.id && styles.railItemActive)}
          >
            <span className={styles.railNumber}>{item.number}</span>
            <span className={styles.railLabel}>{item.title}</span>
          </button>
        ))}
      </nav>

      <button type="button" className={styles.themeToggle} onClick={onToggleTheme}>
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </header>
  );
}

function PanelShell({ panelKey, reducedMotion, children }) {
  return (
    <motion.section
      key={panelKey}
      className={styles.groupPanel}
      initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.46, ease: EASE }}
    >
      <div className={styles.groupScroll}>
        <div className={styles.groupContent}>{children}</div>
      </div>
    </motion.section>
  );
}

function GroupHeader({ slide, reducedMotion }) {
  return (
    <header className={styles.groupHeader}>
      <motion.div
        className={styles.groupTitleBlock}
        initial={reducedMotion ? false : { opacity: 0, x: -18 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <span className={styles.slideNumber}>{slide.number}</span>
        <div>
          <p className={styles.slideKicker}>{slide.strap}</p>
          <h2>{slide.title}</h2>
        </div>
      </motion.div>

      <motion.div
        className={styles.groupSummaryBlock}
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: EASE, delay: reducedMotion ? 0 : 0.04 }}
      >
        <p>{slide.summary}</p>
        <div className={styles.signalRow}>
          {slide.heroSignals.map((signal, index) => (
            <motion.article
              initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.32, ease: EASE, delay: reducedMotion ? 0 : 0.08 + index * 0.05 }}
              className={joinClasses(styles.signalCard, getToneClass(signal.tone))}
              key={`${slide.id}-${signal.label}`}
            >
              <div className={styles.signalCardTop}>
                <span>{signal.label}</span>
                {signal.note ? (
                  <span
                    className={styles.signalNote}
                    tabIndex={0}
                    title={signal.note}
                    data-note={signal.note}
                  >
                    {signal.noteTag || "Info"}
                  </span>
                ) : null}
              </div>
              <strong>{signal.value}</strong>
              {signal.tone ? (
                <StatusPill tone={signal.tone}>
                  {signal.tone === "success"
                    ? "Positive"
                    : signal.tone === "warning"
                      ? "Watch"
                      : "Priority"}
                </StatusPill>
              ) : null}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </header>
  );
}

function CapabilityGrid({ blocks }) {
  return (
    <div className={styles.capabilityGrid}>
      {blocks.map((block, index) => (
        <motion.article
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.34, ease: EASE, delay: index * 0.05 }}
          className={joinClasses(styles.capabilityCard, getToneClass(block.tone))}
          key={`${block.category}-${block.title}`}
        >
          <div className={styles.cardTopline}>
            <span>{block.category}</span>
            <div className={styles.pillRow}>
              {block.pills.map((pill) => (
                <StatusPill key={`${block.title}-${pill}`}>{pill}</StatusPill>
              ))}
            </div>
          </div>
          <h3>{block.title}</h3>
          <p>{block.summary}</p>
        </motion.article>
      ))}
    </div>
  );
}

function DataTable({ title, description, headers, rows }) {
  return (
    <section className={styles.dataPanel}>
      <div className={styles.panelHeading}>
        <span>Pricing</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell) => (
                  <td key={`${row[0]}-${cell}`}>
                    {typeof cell === "string" && cell.includes("$") ? <span className={styles.priceValue}>{cell}</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OutlookGrid({ items }) {
  return (
    <div className={styles.outlookGrid}>
      {items.map((item, index) => (
        <motion.article
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.34, ease: EASE, delay: index * 0.05 }}
          className={joinClasses(styles.outlookCard, getToneClass(item.tone))}
          key={item.title}
        >
          <div className={styles.outlookCardTop}>
            <h3>{item.title}</h3>
            {item.note ? (
              <span className={styles.signalNote} tabIndex={0} title={item.note} data-note={item.note}>
                {item.noteTag || "Info"}
              </span>
            ) : null}
          </div>
          <p>{item.summary}</p>
        </motion.article>
      ))}
    </div>
  );
}

function BlueprintPanel({ title, rows }) {
  return (
    <section className={styles.blueprintPanel}>
      <div className={styles.panelHeading}>
        <span>Setup details</span>
        <h3>{title}</h3>
      </div>

      <div className={styles.blueprintGrid}>
        {rows.map(([label, value]) => (
          <article className={styles.blueprintItem} key={`${title}-${label}`}>
            <span>{label}</span>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function VimeoDetailPanels() {
  return (
    <div className={styles.providerExtras}>
      <section className={styles.extraPanel}>
        <div className={styles.panelHeading}>
          <span>Included by plan</span>
          <h3>What changes across tiers</h3>
          <p>The original main-branch Vimeo evaluation compared plan inclusions across self-serve and enterprise tiers. That detail is preserved here.</p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Capability</th>
                <th>Starter</th>
                <th>Standard</th>
                <th>Advanced</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {vimeoPlanMatrix.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  {row.slice(1).map((cell) => (
                    <td key={`${row[0]}-${cell}`}>
                      <StatusPill tone={cell === "Included" ? "success" : "warning"}>{cell}</StatusPill>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.extraPanel}>
        <div className={styles.panelHeading}>
          <span>Self-serve cap</span>
          <h3>How quickly the self-serve cap can fail</h3>
          <p>The original site emphasized that OER popularity is the main downside on Vimeo self-serve plans.</p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Typical stream size</th>
                <th>Estimated daily views</th>
                <th>Projected monthly bandwidth</th>
                <th>Cap outcome</th>
              </tr>
            </thead>
            <tbody>
              {bandwidthScenarios.map((scenario) => (
                <tr key={scenario.scenario}>
                  <td>{scenario.scenario}</td>
                  <td>{scenario.streamSize}</td>
                  <td>{scenario.dailyViews}</td>
                  <td>{scenario.monthly}</td>
                  <td>{scenario.cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.estimatePanel}>
        <div className={styles.panelHeading}>
          <span>Budget planning</span>
          <h3>Estimated enterprise budget</h3>
        </div>
        <div className={styles.estimateGrid}>
          {enterpriseEstimates.map((entry) => (
            <article
              key={entry.label}
              className={joinClasses(styles.estimateCard, entry.recommended && styles.estimateCardRecommended)}
            >
              <span>{entry.label}</span>
              <strong>{formatUSD(entry.annualUsd)} / year</strong>
              <p>{formatPHP(entry.annualUsd * FX_RATE)} / year</p>
              <StatusPill tone={entry.recommended ? "signal" : "default"}>
                {formatUSD(entry.annualUsd / 12)} / month
              </StatusPill>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function PanoptoEstimatePanel() {
  return (
    <section className={styles.estimatePanel}>
      <div className={styles.panelHeading}>
        <span>Budget planning</span>
        <h3>Panopto estimate range from report</h3>
        <p>The report does not publish a single fixed list price for institutional licensing, but it provides a practical annual range and median.</p>
      </div>
      <div className={styles.estimateGrid}>
        {panoptoEstimates.map((entry) => (
          <article
            key={entry.label}
            className={joinClasses(styles.estimateCard, entry.recommended && styles.estimateCardRecommended)}
          >
            <span>{entry.label}</span>
            <strong>{formatUSD(entry.annualUsd)} / year</strong>
            <p>{formatPHP(entry.annualUsd * FX_RATE)} / year</p>
            <StatusPill tone={entry.recommended ? "signal" : "default"}>
              {formatUSD(entry.annualUsd / 12)} / month
            </StatusPill>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureDiveSection({ slideId, onOpenFeature }) {
  const features = ecosystemFeatureCatalog[slideId] || [];

  return (
    <section className={styles.sectionBlock}>
      <div className={styles.panelHeading}>
        <span>Feature deep dive</span>
        <h3>Ecosystem feature library</h3>
        <p>Select any card to open full details for Moodle relevance and role impact.</p>
      </div>

      <div className={styles.featureDiveGrid}>
        {features.map((feature) => (
          <article key={`${slideId}-${feature.id}`} className={joinClasses(styles.featureDiveCard, getProviderThemeClass(slideId))}>
            <span>{feature.category}</span>
            <h4>{feature.title}</h4>
            <p>{feature.summary}</p>
            <button type="button" className={styles.featureOpenButton} onClick={() => onOpenFeature(slideId, feature)}>
              Open detail
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureModal({ featureState, onClose }) {
  if (!featureState) {
    return null;
  }

  const { slideId, feature } = featureState;

  return (
    <div className={styles.featureModalOverlay} role="dialog" aria-modal="true" aria-label={feature.title}>
      <button type="button" className={styles.featureModalBackdrop} aria-label="Close feature detail" onClick={onClose} />
      <div className={joinClasses(styles.featureModalCard, getProviderThemeClass(slideId))}>
        <div className={styles.featureModalHeader}>
          <span>{feature.category}</span>
          <button type="button" className={styles.featureModalClose} onClick={onClose}>
            Close
          </button>
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.summary}</p>
        <div className={styles.featureModalGrid}>
          <article>
            <h4>Moodle relevance</h4>
            <p>{feature.moodleImpact}</p>
          </article>
          <article>
            <h4>Students</h4>
            <p>{feature.studentImpact}</p>
          </article>
          <article>
            <h4>Teachers</h4>
            <p>{feature.teacherImpact}</p>
          </article>
          <article>
            <h4>Admins</h4>
            <p>{feature.adminImpact}</p>
          </article>
        </div>
      </div>
    </div>
  );
}

function ProviderPanel({ slide, reducedMotion, onOpenFeature }) {
  return (
    <PanelShell panelKey={slide.id} reducedMotion={reducedMotion}>
      <div className={joinClasses(styles.panelSurface, getProviderThemeClass(slide.id))}>
        <GroupHeader slide={slide} reducedMotion={reducedMotion} />

        <section className={styles.sectionBlock}>
          <div className={styles.panelHeading}>
            <span>Key points</span>
            <h3>What matters most</h3>
            <p>Each provider is organized by compliance, scalability, user experience, and admin load for quicker review.</p>
          </div>
          <CapabilityGrid blocks={slide.capabilityBlocks} />
        </section>

        <div className={styles.twoColumnPanels}>
          <DataTable {...slide.pricing} />

          <section className={styles.dataPanel}>
            <div className={styles.panelHeading}>
              <span>Main takeaways</span>
              <h3>What this means</h3>
            </div>
            <OutlookGrid items={slide.operatingFrames} />
          </section>
        </div>

        <FeatureDiveSection slideId={slide.id} onOpenFeature={onOpenFeature} />

        <BlueprintPanel title={slide.blueprintTitle} rows={slide.blueprintRows} />

        {slide.extra === "vimeo" ? <VimeoDetailPanels /> : null}
        {slide.id === "panopto" ? <PanoptoEstimatePanel /> : null}
      </div>
    </PanelShell>
  );
}

function ComparisonPanel({ reducedMotion, hoveredColumn, setHoveredColumn }) {
  return (
    <PanelShell panelKey="comparison" reducedMotion={reducedMotion}>
      <div className={joinClasses(styles.panelSurface, getProviderThemeClass("comparison"))}>
        <GroupHeader
          slide={{
            id: "comparison",
            number: "04",
            title: "Comparison",
            subtitle: "Quick decision guide",
            strap: "Comparison",
            summary:
              "Use this view to compare deployment, Moodle fit, pricing model, AI support, and admin load across the three options.",
            heroSignals: comparisonTakeaways.map((takeaway) => ({
              label: takeaway.label,
              value: takeaway.title,
              tone: takeaway.tone
            }))
          }}
          reducedMotion={reducedMotion}
        />

        <section className={styles.comparisonPanel}>
          <div className={styles.panelHeading}>
            <span>Matrix</span>
            <h3>Comparison matrix</h3>
          </div>

          <div className={styles.comparisonMatrix}>
            <div className={styles.matrixMetricHeader}>Metric</div>
            {providerSlides.map((column) => (
              <div
                key={`header-${column.id}`}
                onMouseEnter={() => setHoveredColumn(column.id)}
                onMouseLeave={() => setHoveredColumn(null)}
                className={joinClasses(
                  styles.matrixHeaderCell,
                  getProviderThemeClass(column.id),
                  hoveredColumn && hoveredColumn !== column.id && styles.comparisonColumnDimmed
                )}
              >
                <span>{column.strap}</span>
                <h3>{column.title}</h3>
              </div>
            ))}

            {comparisonRows.map((row) => (
              <Fragment key={row.label}>
                <div className={styles.matrixMetricLabel}>
                  {row.label}
                </div>
                {providerSlides.map((column) => {
                  const cell = row.values[column.id];

                  return (
                    <motion.div
                      key={`${row.label}-${column.id}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      onMouseEnter={() => setHoveredColumn(column.id)}
                      onMouseLeave={() => setHoveredColumn(null)}
                      className={joinClasses(
                        styles.matrixValueCell,
                        getProviderThemeClass(column.id),
                        hoveredColumn && hoveredColumn !== column.id && styles.comparisonColumnDimmed
                      )}
                    >
                      <StatusPill tone={cell.tone || "default"}>{cell.pill}</StatusPill>
                      <p>{cell.text}</p>
                    </motion.div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.panelHeading}>
            <span>Ecosystem detail</span>
            <h3>Detailed context from the report</h3>
          </div>

          <div className={styles.comparisonDetailGrid}>
            {comparisonDetailCards.map((card, index) => (
              <motion.article
                key={card.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: EASE, delay: reducedMotion ? 0 : 0.05 + index * 0.05 }}
                className={joinClasses(styles.comparisonDetailCard, getProviderThemeClass(card.id))}
              >
                <span>{card.ecosystem}</span>
                <h3>{card.title}</h3>
                <ul>
                  {card.points.map((point) => (
                    <li key={`${card.id}-${point}`}>{point}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.panelHeading}>
            <span>Main takeaways</span>
            <h3>Best fit by priority</h3>
          </div>
          <div className={styles.takeawayFloatGrid}>
            {comparisonTakeaways.map((item, index) => (
              <motion.article
                key={item.label}
                initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.34, ease: EASE, delay: reducedMotion ? 0 : 0.08 + index * 0.05 }}
                className={joinClasses(styles.takeawayFloatCard, getProviderThemeClass(item.label.toLowerCase()), getToneClass(item.tone))}
              >
                <span>{item.label} ecosystem</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </PanelShell>
  );
}

export default function Home() {
  const reducedMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState(navGroups[0].id);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [activeFeature, setActiveFeature] = useState(null);
  const activeSlide = providerSlides.find((slide) => slide.id === activeGroup);

  useEffect(() => {
    if (!activeFeature) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveFeature(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeFeature]);

  return (
    <main className={joinClasses(styles.pageShell, theme === "light" ? styles.themeLight : styles.themeDark)}>
      <TopNavBar
        items={navGroups}
        activeGroup={activeGroup}
        onNavigate={setActiveGroup}
        theme={theme}
        onToggleTheme={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
      />

      <div className={styles.viewportFrame}>
        <AnimatePresence mode="wait" initial={false}>
          {activeGroup === "comparison" ? (
            <ComparisonPanel
              key="comparison"
              reducedMotion={reducedMotion}
              hoveredColumn={hoveredColumn}
              setHoveredColumn={setHoveredColumn}
            />
          ) : (
            <ProviderPanel
              key={activeGroup}
              slide={activeSlide}
              reducedMotion={reducedMotion}
              onOpenFeature={(slideId, feature) => setActiveFeature({ slideId, feature })}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeFeature ? <FeatureModal featureState={activeFeature} onClose={() => setActiveFeature(null)} /> : null}
      </AnimatePresence>
    </main>
  );
}
