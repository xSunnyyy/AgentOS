import Head from 'next/head';
import { useEffect, useState } from 'react';

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
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

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
              <a href="/#how-it-works">How It Works</a>
              <a href="/pricing" aria-current="page">
                Pricing
              </a>
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

                <div className="billing-toggle" aria-label="Subscription type">
                  <span className="billing-btn is-active">Monthly</span>
                </div>
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
            <button
              id="theme-toggle"
              className="theme-toggle theme-toggle-footer"
              type="button"
              aria-label="Toggle light and dark mode"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
