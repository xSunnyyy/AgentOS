import Head from 'next/head';
import { useEffect, useState } from 'react';

const PRICE = 50;

const steps = [
  {
    title: 'Sign Up',
    description:
      'Create your free account to begin building your custom real estate website. No payment required to start — explore the platform risk-free while setting up your online presence.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    title: 'Provide Information',
    description:
      'Enter your brokerage details, service areas, specialties, and brand preferences so your website is tailored to your real estate business and local market.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 5h12M6 10h12M6 15h8M4 5h.01M4 10h.01M4 15h.01" />
      </svg>
    ),
  },
  {
    title: 'Submit Listing Data',
    description:
      'Upload property listings, photos, and descriptions through a simple guided workflow. We automatically structure your content for optimized property pages and search visibility.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 15V5m0 0 4 4m-4-4-4 4M5 16v3h14v-3" />
      </svg>
    ),
  },
  {
    title: 'Preview',
    description:
      'Review your fully generated real estate website before publishing. Explore your pages, test your listings, and make sure everything looks exactly how you want.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Publish & Activate',
    description:
      "When you're ready to launch, choose your plan and publish your site instantly. Start capturing buyer and seller leads with a polished, SEO-optimized real estate website.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 12h16M13 6l7 6-7 6" />
      </svg>
    ),
  },
];

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentOS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'SEO-first real estate agent website builder for IDX listings and lead generation with a guided done-for-you setup.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Start building free and launch when ready.',
  },
};

export default function HomePage() {
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
        <title>Real Estate Agent Website Builder | SEO & IDX</title>
        <meta
          name="description"
          content="Launch a fully branded MLS-ready real estate agent website builder designed for local SEO, your listings, and lead generation."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      </Head>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#" aria-label="Homepage">
            AgentOS
          </a>

          <nav className="main-nav" aria-label="Primary">
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <a className="btn btn-primary" href="#pricing">
              Start Building Free
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="pricing" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-chip">SEO-First Real Estate Agent Website Builder</p>
              <h1 id="hero-title">Real Estate Agent Websites Built for Local SEO, your Listings & Lead Generation</h1>
              <p className="hero-subcopy">
                Launch a fully branded, MLS-ready real estate website designed to rank on Google and convert local
                buyers and sellers into qualified leads. Publish in minutes, edit anytime, and grow your real estate
                business — no developer required.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href="#contact">
                  Start Building Free
                </a>
                <a className="btn btn-secondary btn-lg" href="#how-it-works">
                  View Live Demo
                </a>
              </div>
            </div>

            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1400&q=80"
                alt="Real estate website dashboard preview showing listings and lead capture widgets"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section className="wizard" id="how-it-works" aria-labelledby="wizard-title">
          <div className="container wizard-shell">
            <h2 id="wizard-title">How It Works</h2>
            <p className="section-intro wizard-intro">
              Launch your professional real estate website in minutes with a guided, done-for-you setup — from account
              creation to publishing your fully branded agent website.
            </p>

            <ol className="wizard-flow" aria-label="Five-step onboarding flow">
              {steps.map((step, index) => (
                <li key={step.title} className="wizard-step-card">
                  <div className="icon-badge">{step.icon}</div>
                  <span className="step-pill">Step {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index === 0 && <p className="step-note">No credit card required</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-shell">
            <h2 id="contact-title">Contact Us</h2>
            <p className="contact-subtitle">
              Have questions before you start? Send us a quick message and we’ll help you choose the best option for
              your business.
            </p>

            <form className="contact-form" action="#" method="post">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required />

              <button className="btn btn-primary" type="submit">
                Send Message
              </button>
            </form>
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
    </>
  );
}
