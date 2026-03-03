import Head from 'next/head';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    features: ['7 day free trial', 'Full Access to all tools', '5 Active and 5 Sold listings'],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: '$50',
    period: '/month',
    features: ['Full Access to Tools', 'Unlimited Active and Sold Listings', 'Leads capture'],
    cta: 'Choose Professional',
    featured: true,
  },
  {
    name: 'Expert',
    price: '$500',
    period: '/year',
    features: ['Full Access to Tools', 'Unlimited Active and Sold Listings', 'Leads capture'],
    cta: 'Choose Expert',
  },
];

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing | AgentOS</title>
        <meta
          name="description"
          content="Simple, conversion-focused pricing for real estate agents. Start free, then scale with Professional monthly or Expert yearly plans."
        />
      </Head>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="pricing-layout">
        <header className="site-header">
          <div className="container nav-wrap">
            <a className="brand" href="/" aria-label="Homepage">
              AgentOS
            </a>

            <nav className="main-nav" aria-label="Primary">
            <details className="nav-dropdown">
              <summary>How It Works</summary>
              <div className="nav-dropdown-menu" role="menu" aria-label="How It Works links">
                <a href="/how-it-works#how-title" role="menuitem">The Works & FAQs</a>
                <a href="/rank-real-estate-website-on-google" role="menuitem">Website Ranking Rules</a>
                <a href="/seo-for-realtors" role="menuitem">SEO For Realtors</a>
                <a href="/best-real-estate-website-platform" role="menuitem">Real Estate Website Platform</a>
              </div>
            </details>
            <a href="/pricing">Pricing</a>
            <a href="/#contact">Contact</a>
          </nav>

            <div className="nav-actions">
              <a className="btn btn-primary" href="/#contact">
                Start Building Free
              </a>
            </div>
          </div>
        </header>

        <main id="main-content">
          <section className="pricing-page" aria-labelledby="pricing-title">
            <div className="container pricing-shell">
              <div className="pricing-head">
                <p className="hero-chip">Plans & Pricing</p>
                <h1 id="pricing-title">Choose the Real Estate Website Plan That Fits Your Business Goals</h1>
                <p className="pricing-subtext">
                  AgentOS is the all-in-one real estate marketing platform designed to help agents launch professional
                  websites, capture leads, and scale their business with confidence.
                </p>

              </div>

              <div className="pricing-grid">
                {plans.map((plan) => (
                  <article key={plan.name} className={`pricing-card ${plan.featured ? 'is-featured' : ''}`}>
                    <p className="plan-price">
                      {plan.price}
                      {plan.period && <span>{plan.period}</span>}
                    </p>
                    <h2>{plan.name}</h2>

                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    <a className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`} href="/#contact">
                      {plan.cta}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-wrap">
            <small>© {new Date().getFullYear()} AgentOS. All rights reserved.</small>
          </div>
        </footer>
      </div>
    </>
  );
}
