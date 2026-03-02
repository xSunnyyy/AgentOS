import Head from 'next/head';
import { useEffect, useState } from 'react';

const PRICE = 97;

const faqs = [
  {
    q: 'How quickly can I get started?',
    a: 'Placeholder answer: Most agents can start the same day once onboarding is complete.',
  },
  {
    q: 'Can I use this for multiple listings?',
    a: 'Placeholder answer: Yes, this can be structured for one or many listings based on your plan.',
  },
  {
    q: 'Do I need technical experience?',
    a: 'Placeholder answer: No. The process is guided and designed for non-technical users.',
  },
  {
    q: 'Is support included?',
    a: 'Placeholder answer: Support options are available to help you launch smoothly.',
  },
];

const steps = [
  ['Sign Up', 'Create your account in under a minute.'],
  ['Provide Information', 'Enter your business and branding details.'],
  ['Submit Listing Data', 'Upload property information and media in one place.'],
  ['Preview', 'Review and approve your content before launch.'],
  ['Publish', 'Go live and start attracting more qualified leads.'],
];

export default function HomePage() {
  const [theme, setTheme] = useState('light');
  const [openFaq, setOpenFaq] = useState(-1);

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
        <title>Best Real Estate Agent Websites Built to Rank and Convert</title>
        <meta
          name="description"
          content="Modern, conversion-focused real estate agent websites with a frictionless onboarding flow, clear pricing CTA, FAQ, and contact form."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#" aria-label="Homepage">
            AgentLaunch
          </a>

          <nav className="main-nav" aria-label="Primary">
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faqs">FAQs</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <button
              id="theme-toggle"
              className="theme-toggle"
              type="button"
              aria-label="Toggle light and dark mode"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a className="btn btn-primary" href="#pricing">
              Start for ${PRICE}
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="pricing" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-chip">SEO-First Real Estate Websites</p>
              <h1 id="hero-title">Best Real Estate Agent Websites Built to Rank and Convert.</h1>
              <p className="hero-subcopy">
                Launch a search-optimized website that helps local buyers and sellers find you first. Publish quickly,
                edit anytime, and grow your pipeline without hiring a developer.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href="#pricing">
                  Start for ${PRICE}
                </a>
                <a className="btn btn-secondary btn-lg" href="#contact">
                  Get in Contact
                </a>
              </div>
            </div>

            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1400&q=80"
                alt="Modern downtown high-rise buildings viewed from below"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section className="wizard" id="how-it-works" aria-labelledby="wizard-title">
          <div className="container wizard-box">
            <h2 id="wizard-title">How It Works</h2>
            <p className="section-intro">Simple onboarding in five clear steps—built for busy agents.</p>
            <ol className="wizard-steps">
              {steps.map(([title, description], idx) => (
                <li key={title}>
                  <span className="step-number">{idx + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="faq" id="faqs" aria-labelledby="faq-title">
          <div className="container section-head">
            <h2 id="faq-title">Frequently Asked Questions</h2>
            <p className="section-intro">Quick answers to common questions from agents.</p>
          </div>
          <div className="container faq-list">
            {faqs.map((item, idx) => (
              <details
                key={item.q}
                open={openFaq === idx}
                onToggle={(event) => {
                  if (event.currentTarget.open) {
                    setOpenFaq(idx);
                  } else if (openFaq === idx) {
                    setOpenFaq(-1);
                  }
                }}
              >
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-wrap">
            <div className="contact-copy">
              <h2 id="contact-title">Contact Us</h2>
              <p>
                Have questions before you start? We’re happy to help you choose the best option for your business.
                Send a message and we’ll get back to you soon.
              </p>
            </div>
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
          <small>© {new Date().getFullYear()} AgentLaunch. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}
