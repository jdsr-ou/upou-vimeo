const FX_RATE = 59;

const selfServePlans = [
  {
    label: "Starter",
    value: 12,
    note: "$12/month",
    style: "default",
    storageTb: 2,
    users: "1 user",
    storage: "2TB storage",
    bandwidth: "2TB bandwidth/month (self-serve cap)",
    billing: "Billed annually",
    keyFeatures: [
      "Player customization",
      "Privacy controls",
      "Review workflow",
      "Basic analytics"
    ]
  },
  {
    label: "Standard",
    value: 25,
    note: "$25/month",
    style: "default",
    recommended: true,
    storageTb: 4,
    users: "5 users",
    storage: "4TB storage",
    bandwidth: "2TB bandwidth/month (self-serve cap)",
    billing: "Billed annually",
    keyFeatures: [
      "Starter features",
      "Branding and watermark",
      "Branded galleries",
      "Lead capture and CTAs"
    ]
  },
  {
    label: "Advanced",
    value: 75,
    note: "$75/month",
    style: "default",
    storageTb: 7,
    users: "10 users",
    storage: "7TB storage",
    bandwidth: "2TB bandwidth/month (self-serve cap)",
    billing: "Billed annually",
    keyFeatures: [
      "Standard features",
      "Livestream events",
      "Q&A, polls, and chat",
      "Advanced event analytics"
    ]
  }
];

const enterprisePlan = {
  label: "Enterprise",
  note: "Talk to Vimeo's team for pricing",
  users: "More users",
  storage: "More storage and bandwidth",
  bandwidth: "Custom bandwidth allocation",
  keyFeatures: [
    "Advanced features",
    "SSO and SCIM",
    "Advanced AI and analytics",
    "Event resilience (backup/eCDN)",
    "Dedicated support"
  ]
};

const planFeatureAlignment = [
  {
    feature: "Customizable video player",
    starter: "Included",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Password privacy and unlisted links",
    starter: "Included",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Review and collaboration tools",
    starter: "Included",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Engagement analytics",
    starter: "Included",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Branding in the player",
    starter: "Not listed",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Custom watermark",
    starter: "Not listed",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Lead capture",
    starter: "Not listed",
    standard: "Included",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Hosted livestreamed events",
    starter: "Not listed",
    standard: "Not listed",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Events Q&A, polls, and chat",
    starter: "Not listed",
    standard: "Not listed",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "Marketing automation integrations",
    starter: "Not listed",
    standard: "Not listed",
    advanced: "Included",
    enterprise: "Included"
  },
  {
    feature: "SSO (SAML) and SCIM",
    starter: "Not listed",
    standard: "Not listed",
    advanced: "Not listed",
    enterprise: "Included"
  },
  {
    feature: "Dedicated support",
    starter: "Not listed",
    standard: "Not listed",
    advanced: "Not listed",
    enterprise: "Included"
  }
];

const detailedPlans = [
  {
    label: "Starter",
    price: "$12 per month (billed annually)",
    coverage: "1 user | 2TB storage",
    items: [
      "Customizable video player",
      "Password privacy and unlisted links",
      "Review and collaboration tools",
      "Transfer video files",
      "Engagement analytics"
    ]
  },
  {
    label: "Standard",
    price: "$25 per month (billed annually)",
    coverage: "5 users | 4TB storage",
    items: [
      "Everything in Starter",
      "Branding in the player",
      "Third-party player support",
      "Custom watermark",
      "Branded video galleries",
      "Lead capture",
      "Calls to action and custom cards"
    ]
  },
  {
    label: "Advanced",
    price: "$75 per month (billed annually)",
    coverage: "10 users | 7TB storage",
    items: [
      "Everything in Standard",
      "Hosted livestreamed events",
      "Events Q&A, polls, and chat",
      "Stream to multiple destinations",
      "DVR streaming",
      "Scheduled simulive",
      "Live event-level analytics",
      "Marketing automation integrations"
    ]
  },
  {
    label: "Enterprise",
    price: "Talk to Vimeo for pricing",
    coverage: "More users | More storage and bandwidth",
    items: [
      "Everything in Advanced",
      "Custom permissions",
      "Advanced AI capabilities",
      "SSO (SAML) and SCIM (OKTA, AZURE)",
      "Advanced analytics and marketing integrations",
      "Events with polling and Live Q&A",
      "Quality events (backup streams, eCDN)",
      "Dedicated support"
    ]
  }
];

const enterpriseEstimates = [
  { label: "Low estimate", annualUsd: 6000, style: "alt" },
  { label: "Mid estimate", annualUsd: 10000, style: "default" },
  { label: "High estimate", annualUsd: 15000, style: "alt" }
];

const featureData = {
  lms: {
    icon: "/icons/lms.svg",
    title: "LMS Interoperability (LTI 1.3)",
    desc: "Vimeo uses LTI 1.3 Advantage for integration with Canvas and Moodle. Videos embed directly in courses, and interactive elements like quizzes can sync to the LMS gradebook."
  },
  branding: {
    icon: "/icons/branding.svg",
    title: "Custom Institutional Branding",
    desc: "Vimeo supports white-label player customization. UPOU can apply institutional colors and logo and remove Vimeo marks for a consistent university experience."
  },
  translation: {
    icon: "/icons/translation.svg",
    title: "Global Auto-Translation",
    desc: "Vimeo provides AI-driven transcripts and multilingual captions. This reduces manual production effort and expands reach for international ODeL learners."
  },
  security: {
    icon: "/icons/security.svg",
    title: "Domain-Level Security",
    desc: "Playback can be limited to authorized UPOU domains. If an embed is copied to an unauthorized site, the video can be blocked."
  },
  oer: {
    icon: "/icons/oer.svg",
    title: "Native OER Support (Creative Commons)",
    desc: "Faculty can apply Creative Commons licenses to lectures directly in Vimeo, improving discoverability in global open-education search channels."
  },
  access: {
    icon: "/icons/accessibility.svg",
    title: "Accessibility Compliance",
    desc: "Vimeo supports AI captions, transcripts, and screen-reader-friendly navigation to align with inclusive design requirements."
  }
};

const bandwidthScenarios = [
  {
    scenario: "One popular 1080p lecture",
    duration: "45 minutes",
    streamSize: "0.6 GB/view",
    dailyViews: "300",
    monthly: "5.4 TB/month",
    cap: "~11.1 days"
  },
  {
    scenario: "Three core 720p OER lectures",
    duration: "30 minutes",
    streamSize: "0.35 GB/view",
    dailyViews: "250 each (750 total)",
    monthly: "7.9 TB/month",
    cap: "~7.6 days"
  },
  {
    scenario: "Public event lecture week",
    duration: "90 minutes",
    streamSize: "1.0 GB/view",
    dailyViews: "1,000",
    monthly: "30.0 TB/month",
    cap: "~2.0 days"
  }
];

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

function formatUSD(value) {
  return usdFormatter.format(value);
}

function formatPHP(value) {
  return phpFormatter.format(value);
}

function chartRowClass(style) {
  const classes = ["bar-row"];
  if (style === "alt") classes.push("alt");
  if (style === "good") classes.push("good");
  return classes.join(" ");
}

function inclusionClass(value) {
  return value === "Included" ? "status-pill included" : "status-pill not-listed";
}

function BarChart({ data, maxValue, valueFormatter }) {
  return (
    <div className="bar-chart">
      {data.map((item) => {
        const widthPct = Math.max(2, Math.round((item.value / maxValue) * 100));
        return (
          <div className={chartRowClass(item.style)} key={item.label}>
            <div className="bar-label">{item.label}</div>
            <div className="bar-track">
              <span className="bar-fill" style={{ "--bar-width": `${widthPct}%` }} />
            </div>
            <div className="bar-value">{valueFormatter(item)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const featureItems = Object.values(featureData);

  return (
    <>
      <header className="hero">
        <div className="container">
          <p className="eyebrow">Evaluation Report</p>
          <h1>Vimeo for UPOU&apos;s Video Storage Infrastructure</h1>
          <p className="subtitle">
            Strategic assessment for UP Open University focused on pricing, institutional fit, and
            procurement risk.
          </p>
          <p className="subtitle">
            Assumption: Vimeo will be used for OER distribution and delivery, with course-level usage
            integrated into UPOU&apos;s LMS environments.
          </p>
          <div className="meta-row">
            <span>Date: March 11, 2026</span>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="panel panel-priority" id="vimeo-fit-pricing">
          <h2>Vimeo Features and Pricing Alignment</h2>
          <p>
            Vimeo has strong instructional features, but institutional viability depends on choosing the right
            commercial model.
          </p>

          <h3>Core Features</h3>

          <div className="feature-grid">
            {featureItems.map((feature) => (
              <article key={feature.title}>
                <div className="feature-title-row">
                  <img src={feature.icon} alt="" width="20" height="20" aria-hidden="true" />
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.desc}</p>
              </article>
            ))}
          </div>

          <h3>Pricing Snapshot</h3>
          <div className="visual-legend">
            <article className="legend-card">
              <img src="/icons/storage.svg" alt="" width="18" height="18" aria-hidden="true" />
              <div>
                <strong>Storage</strong>
                <p className="limit">Plan capacity for uploaded content</p>
              </div>
            </article>
            <article className="legend-card">
              <img src="/icons/bandwidth.svg" alt="" width="18" height="18" aria-hidden="true" />
              <div>
                <strong>Bandwidth</strong>
                <p className="limit">Monthly delivery/streaming data usage</p>
              </div>
            </article>
          </div>
          <div className="plan-grid">
            {selfServePlans.map((plan) => (
              <article className="plan-card" key={plan.label}>
                {plan.recommended ? <p className="eyebrow">Recommended</p> : null}
                <h3>{plan.label}</h3>
                <p className="price">{plan.note.replace("/month", "")}/month</p>
                <p className="limit">{plan.billing}</p>
                <p className="limit">{plan.users}</p>
                <div className="capacity-badge">
                  <span className="capacity-label">Storage</span>
                  <strong>{plan.storage}</strong>
                </div>
                <p className="limit bandwidth-note">{plan.bandwidth}</p>
              </article>
            ))}
            <article className="plan-card enterprise-card" key={enterprisePlan.label}>
              <h3>{enterprisePlan.label}</h3>
              <p className="price" style={{ fontSize: "1.1rem" }}>{enterprisePlan.note}</p>
              <p className="limit">{enterprisePlan.users}</p>
              <div className="capacity-badge">
                <span className="capacity-label">Storage</span>
                <strong>{enterprisePlan.storage}</strong>
              </div>
              <p className="limit bandwidth-note">{enterprisePlan.bandwidth}</p>
            </article>
          </div>

          <div className="chart-card">
            <h3>Plan Feature Inclusion</h3>
            <p className="fx-note">
              Source: detailed plan inclusions below, including inheritance from “Everything in Starter/Standard/Advanced”.
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Feature from plan details</th>
                    <th>Starter ($12)</th>
                    <th>Standard ($25)</th>
                    <th>Advanced ($75)</th>
                    <th>Enterprise (Custom)</th>
                  </tr>
                </thead>
                <tbody>
                  {planFeatureAlignment.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td><span className={inclusionClass(row.starter)}>{row.starter}</span></td>
                      <td><span className={inclusionClass(row.standard)}>{row.standard}</span></td>
                      <td><span className={inclusionClass(row.advanced)}>{row.advanced}</span></td>
                      <td><span className={inclusionClass(row.enterprise)}>{row.enterprise}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-card">
            <h3>Detailed Plan Inclusions</h3>
            <p className="fx-note">Expand each plan for full details.</p>
            <div className="details-grid">
              {detailedPlans.map((plan) => (
                <details className="plan-details" key={plan.label}>
                  <summary>
                    <strong>{plan.label}</strong> - {plan.price}
                  </summary>
                  <p className="limit">{plan.coverage}</p>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={`${plan.label}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          <p className="fx-note">
            Enterprise pricing is custom. Planning estimate: <strong>$6,000 to $15,000 annually</strong>{" "}
            at <strong>PHP 59 per USD</strong>.
          </p>
          <p className="fx-note">
            These are planning assumptions, not official Vimeo Enterprise quotes.
          </p>

          <div className="estimate-grid">
            {enterpriseEstimates.map((entry) => {
              const annualPhp = entry.annualUsd * FX_RATE;
              const monthlyUsd = entry.annualUsd / 12;
              const monthlyPhp = annualPhp / 12;

              return (
                <article className="estimate-card" key={entry.label}>
                  <h3>{entry.label}</h3>
                  <p className="estimate-usd">{formatUSD(entry.annualUsd)} / year</p>
                  <p className="estimate-php">{formatPHP(annualPhp)} / year</p>
                  <p className="estimate-php">
                    {formatUSD(monthlyUsd)} / month | {formatPHP(monthlyPhp)} / month
                  </p>
                </article>
              );
            })}
          </div>

        </section>

        <section className="panel" id="bandwidth-constraint">
          <h2>Bandwidth Constraint for OER Use Case</h2>
          <p>
            Vimeo self-serve plans are constrained by a <strong>2 TB monthly bandwidth cap</strong>. For
            UPOU OER delivery, this creates a high likelihood of service disruption.
          </p>
          <div className="warning">
            <strong>Operational concern:</strong> If usage exceeds the cap, Vimeo may trigger account review
            and require migration to Enterprise pricing.
          </div>

          <h3>Practical Bandwidth Scenarios</h3>
          <p>
            A single high-traffic lecture can consume 2 TB quickly. The scenarios below use practical stream
            and view assumptions.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Typical stream time</th>
                  <th>Estimated stream size</th>
                  <th>Estimated daily views</th>
                  <th>Projected monthly bandwidth</th>
                  <th>2 TB cap reached in</th>
                </tr>
              </thead>
              <tbody>
                {bandwidthScenarios.map((scenario) => (
                  <tr key={scenario.scenario}>
                    <td>{scenario.scenario}</td>
                    <td>{scenario.duration}</td>
                    <td>{scenario.streamSize}</td>
                    <td>{scenario.dailyViews}</td>
                    <td>{scenario.monthly}</td>
                    <td>{scenario.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Seat Licensing Consideration</h3>
          <p>
            Beyond bandwidth, seat limits can also affect scale. As faculty and staff usage grows, additional
            user seats may increase recurring costs and should be evaluated together with bandwidth exposure.
          </p>
          <div className="warning">
            <strong>Cost visibility concern:</strong> Seat growth and bandwidth growth can compound total cost,
            especially when public OER traffic and internal authoring demand rise at the same time.
          </div>
        </section>

        <section className="panel" id="pros-cons">
          <h2>Pros and Cons</h2>
          <div className="pros-cons">
            <article>
              <h4>Pros</h4>
              <ul>
                <li>Ad-free professional viewing experience.</li>
                <li>Strong SCORM and LMS integration for graded video learning workflows.</li>
                <li>Excellent support for domain security and OER discoverability.</li>
              </ul>
            </article>
            <article>
              <h4>Cons</h4>
              <ul>
                <li>2 TB cap makes public self-serve tiers operationally unsafe at scale.</li>
                <li>Seat-based licensing can become expensive as user counts expand.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="panel panel-compact" id="fallback-options">
          <h2>Alternatives if Vimeo Is Unacceptable</h2>
          <p>Keep this as a contingency path only, after Vimeo evaluation and negotiation.</p>
          <div className="alt-grid">
            <article>
              <h3>Panopto</h3>
              <p>Education-focused video platform with strong LMS analytics and lecture-capture workflows.</p>
            </article>
            <article>
              <h3>Kaltura</h3>
              <p>Highly configurable enterprise media platform with broad academic deployment patterns.</p>
            </article>
          </div>
        </section>

        <section className="panel panel-conclusion" id="recommendation">
          <h2>Recommendation</h2>
          <p>
            This evaluation indicates that Vimeo self-serve plans have material bandwidth and seat-scaling
            constraints for public OER workloads. UPOU may consider Enterprise, self-serve with hybrid
            architecture, or alternative platforms based on budget, risk tolerance, and operational design.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>Prepared for strategic discussion on institutional video infrastructure and OER delivery at UPOU.</p>
        </div>
      </footer>
    </>
  );
}
