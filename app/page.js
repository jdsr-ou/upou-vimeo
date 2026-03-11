const FX_RATE = 59;

const selfServePlans = [
  {
    label: "Starter",
    value: 12,
    note: "$12/month",
    style: "default",
    users: "1 user",
    storage: "2TB storage",
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
    users: "5 users",
    storage: "4TB storage",
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
    users: "10 users",
    storage: "7TB storage",
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
  note: "Talk to our team for pricing",
  users: "More users",
  storage: "More storage and bandwidth",
  keyFeatures: [
    "Advanced features",
    "SSO and SCIM",
    "Advanced AI and analytics",
    "Event resilience (backup/eCDN)",
    "Dedicated support"
  ]
};

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
    title: "LMS Interoperability (LTI 1.3)",
    desc: "Vimeo uses LTI 1.3 Advantage for integration with Canvas and Moodle. Videos embed directly in courses, and interactive elements like quizzes can sync to the LMS gradebook."
  },
  branding: {
    title: "Custom Institutional Branding",
    desc: "Vimeo supports white-label player customization. UPOU can apply institutional colors and logo and remove Vimeo marks for a consistent university experience."
  },
  translation: {
    title: "Global Auto-Translation",
    desc: "Vimeo provides AI-driven transcripts and multilingual captions. This reduces manual production effort and expands reach for international ODeL learners."
  },
  security: {
    title: "Domain-Level Security",
    desc: "Playback can be limited to authorized UPOU domains. If an embed is copied to an unauthorized site, the video can be blocked."
  },
  oer: {
    title: "Native OER Support (Creative Commons)",
    desc: "Faculty can apply Creative Commons licenses to lectures directly in Vimeo, improving discoverability in global open-education search channels."
  },
  access: {
    title: "Accessibility Compliance",
    desc: "Vimeo supports AI captions, transcripts, and screen-reader-friendly navigation to align with inclusive design requirements."
  }
};

const featureScorecard = [
  { label: "LMS interoperability", value: 5.0, note: "5.0 / 5", style: "good" },
  { label: "Custom branding", value: 4.6, note: "4.6 / 5", style: "good" },
  { label: "Auto-translation", value: 4.5, note: "4.5 / 5", style: "good" },
  { label: "Domain-level security", value: 5.0, note: "5.0 / 5", style: "good" },
  { label: "OER discoverability", value: 4.8, note: "4.8 / 5", style: "good" },
  { label: "Accessibility support", value: 4.7, note: "4.7 / 5", style: "good" },
  { label: "Self-serve cost predictability", value: 1.0, note: "1.0 / 5", style: "alt" },
  { label: "Enterprise cost predictability", value: 3.0, note: "3.0 / 5", style: "default" }
];

const bandwidthScenarios = [
  {
    scenario: "One popular 1080p lecture",
    streamSize: "1.5 GB/view",
    dailyViews: "300",
    monthly: "13.5 TB/month",
    cap: "~4.6 days"
  },
  {
    scenario: "Three core 720p OER lectures",
    streamSize: "0.8 GB/view",
    dailyViews: "250 each (750 total)",
    monthly: "18.0 TB/month",
    cap: "~3.4 days"
  },
  {
    scenario: "Public event lecture week",
    streamSize: "2.0 GB/view",
    dailyViews: "1,000",
    monthly: "60.0 TB/month",
    cap: "~1.0 day"
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
  const enterpriseChartData = enterpriseEstimates.map((item) => ({
    label: item.label,
    value: item.annualUsd,
    style: item.style
  }));
  const featureItems = Object.values(featureData);

  return (
    <>
      <header className="hero">
        <div className="container">
          <p className="eyebrow">Strategic Evaluation Report</p>
          <h1>Vimeo for UPOU OER Video Infrastructure</h1>
          <p className="subtitle">
            Strategic assessment for UP Open University focused on pricing, institutional fit, and
            procurement risk.
          </p>
          <div className="meta-row">
            <span>Institution: UP Open University</span>
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
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </article>
            ))}
          </div>

          <div className="chart-card">
            <h3>Feature and Risk Scorecard (1 low - 5 high)</h3>
            <BarChart
              data={featureScorecard}
              maxValue={5}
              valueFormatter={(item) => item.note}
            />
          </div>

          <h3>Pricing Snapshot</h3>
          <div className="plan-grid">
            {selfServePlans.map((plan) => (
              <article className="plan-card" key={plan.label}>
                {plan.recommended ? <p className="eyebrow">Recommended</p> : null}
                <h3>{plan.label}</h3>
                <p className="price">{plan.note.replace("/month", "")}/month</p>
                <p className="limit">{plan.billing}</p>
                <p className="limit">{plan.users}</p>
                <p className="limit">{plan.storage}</p>
                <div className="feature-tags">
                  {plan.keyFeatures.map((feature) => (
                    <span className="tag" key={`${plan.label}-${feature}`}>{feature}</span>
                  ))}
                </div>
              </article>
            ))}
            <article className="plan-card" key={enterprisePlan.label}>
              <h3>{enterprisePlan.label}</h3>
              <p className="price" style={{ fontSize: "1.1rem" }}>{enterprisePlan.note}</p>
              <p className="limit">{enterprisePlan.users}</p>
              <p className="limit">{enterprisePlan.storage}</p>
              <div className="feature-tags">
                {enterprisePlan.keyFeatures.map((feature) => (
                  <span className="tag" key={`${enterprisePlan.label}-${feature}`}>{feature}</span>
                ))}
              </div>
            </article>
          </div>

          <div className="chart-card">
            <h3>Self-Serve Price Snapshot (USD)</h3>
            <BarChart
              data={selfServePlans}
              maxValue={75}
              valueFormatter={(item) => item.note}
            />
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

          <div className="chart-card">
            <h3>Enterprise Annual Estimate (USD)</h3>
            <BarChart
              data={enterpriseChartData}
              maxValue={15000}
              valueFormatter={(item) => `${formatUSD(item.value)} / year`}
            />
          </div>
        </section>

        <section className="panel" id="bandwidth-constraint">
          <h2>Bandwidth Constraint for Public OER</h2>
          <p>
            Vimeo self-serve plans are constrained by a <strong>2 TB monthly bandwidth cap</strong>. For
            UPOU public OER delivery, this creates a high likelihood of service disruption.
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

        <section className="panel" id="procurement-guardrails">
          <h2>Procurement Guardrails</h2>
          <ul>
            <li>Negotiate Enterprise directly; do not onboard through self-serve tiers.</li>
            <li>Demand multi-year price locks and protect against renewal shocks.</li>
            <li>Target education/non-profit discounts in the 20% to 25% range.</li>
          </ul>

          <h3>Pros and Cons</h3>
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
                <li>Post-acquisition pricing pressure is a material renewal risk.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="panel" id="strategic-risk">
          <h2>Strategic Risk</h2>
          <p>
            Following Vimeo&apos;s late-2025 acquisition by Bending Spoons, UPOU should treat renewal price
            inflation as a high-probability risk.
          </p>
          <div className="risk-box">
            <h3>Required Safeguards</h3>
            <ol>
              <li>Enterprise only: avoid self-serve onboarding paths.</li>
              <li>Multi-year price lock with explicit renewal cap mechanics.</li>
              <li>Local master-file archive for all lectures to preserve migration readiness.</li>
              <li>Documented export and migration protocol before contract signing.</li>
            </ol>
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
            Vimeo can fit UPOU only through a defensible Enterprise contract. Self-serve tiers are not
            suitable for public OER scale because of the 2 TB cap and service risk.
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
