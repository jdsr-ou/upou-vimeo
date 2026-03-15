"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
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
      { label: "Self-serve catch", value: "Strict bandwidth exposure", tone: "negative" },
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
        tone: "negative"
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
        tone: "negative"
      },
      {
        title: "Budget impact",
        summary:
          "Seat growth and bandwidth growth can compound total cost, especially if public delivery and internal authoring expand at the same time.",
        tone: "negative"
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
        tone: "success"
      },
      {
        title: "Best fit",
        summary:
          "Panopto is not the absolute easiest platform to stand up, but it is the simplest serious academic fit once Moodle depth is non-negotiable.",
        tone: "signal"
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
      { label: "Tradeoff", value: "Weakest on cost predictability and admin overhead", tone: "negative" }
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
        tone: "negative"
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
        tone: "negative"
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
        ["Active Unique IDs", "$0.55 / ID / month", "Active-user count is metered"],
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
        tone: "success"
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
      vimeo: { pill: "Bandwidth cap", text: "Low entry pricing but strict bandwidth exposure.", tone: "negative" },
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
      kaltura: { pill: "Heaviest", text: "Needs dedicated technical ownership and closer oversight.", tone: "negative" }
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
    tone: "negative"
  }
];

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
        tone === "warning" && styles.statusPillWarning,
        tone === "negative" && styles.statusPillNegative
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

  if (tone === "negative") {
    return styles.toneNegative;
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
                      : signal.tone === "negative"
                        ? "Downside"
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
                  <td key={`${row[0]}-${cell}`}>{cell}</td>
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
          <h3>{item.title}</h3>
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

function ProviderPanel({ slide, reducedMotion }) {
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

        <BlueprintPanel title={slide.blueprintTitle} rows={slide.blueprintRows} />

        {slide.extra === "vimeo" ? <VimeoDetailPanels /> : null}
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
            <p>Hover a provider column to isolate its value proposition. Non-active columns dim to 40% opacity.</p>
          </div>

          <div className={styles.comparisonColumns}>
            {providerSlides.map((column) => {
              const dimmed = hoveredColumn && hoveredColumn !== column.id;

              return (
                <motion.article
                  initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.34, ease: EASE, delay: reducedMotion ? 0 : 0.08 + providerSlides.indexOf(column) * 0.05 }}
                  key={column.id}
                  onMouseEnter={() => setHoveredColumn(column.id)}
                  onMouseLeave={() => setHoveredColumn(null)}
                  className={joinClasses(
                    styles.comparisonColumn,
                    getProviderThemeClass(column.id),
                    dimmed && styles.comparisonColumnDimmed,
                    column.id === "panopto" && styles.comparisonColumnRecommended
                  )}
                >
                  <div className={styles.comparisonColumnHeader}>
                    <span>{column.strap}</span>
                    <h3>{column.title}</h3>
                    <p>{column.summary}</p>
                  </div>

                  <div className={styles.comparisonRows}>
                    {comparisonRows.map((row) => (
                      <div className={styles.comparisonRow} key={`${column.id}-${row.label}`}>
                        <span className={styles.comparisonRowLabel}>{row.label}</span>
                        <StatusPill tone={row.values[column.id].tone || "default"}>
                          {row.values[column.id].pill}
                        </StatusPill>
                        <p>{row.values[column.id].text}</p>
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.panelHeading}>
            <span>Main takeaways</span>
            <h3>Best fit by priority</h3>
          </div>
          <OutlookGrid items={comparisonTakeaways} />
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
  const activeSlide = providerSlides.find((slide) => slide.id === activeGroup);

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
            <ProviderPanel key={activeGroup} slide={activeSlide} reducedMotion={reducedMotion} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
