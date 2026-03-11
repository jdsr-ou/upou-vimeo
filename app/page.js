const FX_RATE = 58.309;

const selfServePlans = [
  { label: "Starter", value: 12, note: "$12/month", style: "default" },
  { label: "Standard", value: 33, note: "$33/month", style: "default" },
  { label: "Advanced", value: 75, note: "$75/month", style: "default" }
];

const enterpriseEstimates = [
  { label: "Low estimate", annualUsd: 30000, style: "alt" },
  { label: "Mid estimate", annualUsd: 45000, style: "default" },
  { label: "High estimate", annualUsd: 90000, style: "alt" }
];

const featureScorecard = [
  { label: "LMS interoperability", value: 5.0, note: "5.0 / 5", style: "good" },
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

  return (
    <>
      <header className="hero">
        <div className="container">
          <p className="eyebrow">Strategic Evaluation Report</p>
          <h1>Vimeo for UPOU OER Video Infrastructure</h1>
          <p className="subtitle">
            Assessment for UP Open University as an ODeL institution, with emphasis on pricing reality,
            institutional fit, and long-term procurement risk.
          </p>
          <div className="meta-row">
            <span>Institution: UP Open University</span>
            <span>Date: March 11, 2026</span>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="panel panel-priority" id="pricing-first">
          <h2>1) Pricing First: Why Vimeo Self-Serve Is a No-Go for UPOU</h2>
          <p>
            Vimeo self-serve plans appear affordable, but all non-Enterprise accounts are constrained by a{" "}
            <strong>2 TB monthly bandwidth cap</strong>. For open educational resources (OER), this is
            operationally unsafe.
          </p>

          <div className="plan-grid">
            {selfServePlans.map((plan) => (
              <article className="plan-card" key={plan.label}>
                <h3>{plan.label}</h3>
                <p className="price">{plan.note.replace("/month", "")}/month</p>
                <p className="limit">Bandwidth limit: 2 TB/month</p>
              </article>
            ))}
          </div>

          <div className="warning">
            <strong>Practical risk:</strong> Once high-traffic OER usage exceeds the cap, Vimeo can trigger
            account review, freeze uploads, and pressure immediate migration to Enterprise pricing.
          </div>

          <div className="chart-card">
            <h3>Self-Serve Monthly Price (USD)</h3>
            <BarChart
              data={selfServePlans}
              maxValue={75}
              valueFormatter={(item) => item.note}
            />
          </div>

          <h3>Bandwidth Trap: Practical Examples</h3>
          <p>
            Even one widely used lecture can burn through 2 TB quickly. Estimates below use realistic stream
            sizes and public OER viewing behavior.
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

        <section className="panel" id="enterprise-estimates">
          <h2>2) Enterprise Cost Envelope (Planning Estimates)</h2>
          <p>
            For institutional traffic, UPOU should plan for Enterprise-only procurement. Working estimate:{" "}
            <strong>$30,000 to $90,000 annually</strong>, depending on seats, support, and bandwidth
            allocation.
          </p>
          <p className="fx-note">
            FX planning basis: <strong>1 USD = PHP 58.309</strong> (BSP reference exchange bulletin,
            March 4, 2026).
          </p>
          <p className="fx-note">
            These are planning estimates for budget defense and negotiation strategy, not official vendor
            quotations.
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
            <h3>Annual Cost Envelope (USD)</h3>
            <BarChart
              data={enterpriseChartData}
              maxValue={90000}
              valueFormatter={(item) => `${formatUSD(item.value)} / year`}
            />
          </div>

          <h3>Procurement Guardrails</h3>
          <ul>
            <li>Negotiate Enterprise directly; do not onboard through self-serve tiers.</li>
            <li>Demand multi-year price locks and protect against renewal shocks.</li>
            <li>Target education/non-profit discounts in the 20% to 25% range.</li>
          </ul>
        </section>

        <section className="panel" id="feature-fit">
          <h2>3) Vimeo Institutional Fit for ODeL Delivery</h2>
          <p>Vimeo remains technically strong for instructional delivery when contracted correctly.</p>

          <div className="feature-grid">
            <article>
              <h3>LMS Interoperability</h3>
              <p>
                LTI 1.3 Advantage support for Canvas and Moodle, including quiz and gradebook workflows.
              </p>
            </article>
            <article>
              <h3>Domain-Level Security</h3>
              <p>Playback restrictions by authorized UPOU domains reduce risk of unauthorized sharing.</p>
            </article>
            <article>
              <h3>Native OER Support</h3>
              <p>Creative Commons tagging supports public discoverability of open educational materials.</p>
            </article>
            <article>
              <h3>Accessibility Compliance</h3>
              <p>AI captions, transcripts, and screen-reader-friendly experience support inclusive design.</p>
            </article>
          </div>

          <div className="chart-card">
            <h3>Feature and Risk Scorecard (1 low - 5 high)</h3>
            <BarChart
              data={featureScorecard}
              maxValue={5}
              valueFormatter={(item) => item.note}
            />
          </div>

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
          <h2>4) Strategic Risk: Post-Acquisition Exposure</h2>
          <p>
            Following Vimeo&apos;s late-2025 acquisition by Bending Spoons, UPOU should treat renewal
            inflation risk as high-probability. Contract design and data portability become mandatory, not
            optional.
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
          <h2>5) Fallback Options (If Vimeo Becomes Unacceptable)</h2>
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
            Vimeo can be a strong institutional fit for UPOU, but only under a defensive Enterprise
            contract. Self-serve tiers should be treated as unsuitable for public OER scale because of the
            2 TB cap and outage risk.
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
