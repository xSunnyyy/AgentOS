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
        <title>Launch-Ready Real Estate Agent Marketing Service</title>
        <meta
          name="description"
          content="A modern conversion-focused website template where real estate agents can quickly purchase your digital service and launch listing-ready content in minutes."
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
        <section className="hero" id="pricing">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Built for busy real estate agents</p>
              <h1>Turn more listing traffic into qualified leads with a done-for-you digital package.</h1>
              <p>
                Launch polished marketing assets faster, capture seller and buyer interest, and keep your brand
                looking professional without spending hours on setup.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  Start for ${PRICE}
                </a>
                <a className="btn btn-secondary" href="#how-it-works">
                  Learn How It Works
                </a>
              </div>
              <p className="trust-note">No technical skills needed. Set up in minutes.</p>
            </div>
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="Real estate agent showing a modern home to clients"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section className="wizard" id="how-it-works" aria-labelledby="wizard-title">
          <div className="container wizard-box">
            <h2 id="wizard-title">How It Works</h2>
            <p className="section-intro">A frictionless 5-step flow designed to get your listing content live quickly.</p>
            <ol className="wizard-steps">
              {[
                ['Sign Up', 'Create your account in under a minute.'],
                ['Provide Information', 'Enter your business and branding details.'],
                ['Submit Listing Data', 'Upload property information and media in one place.'],
                ['Preview', 'Review and approve your content before launch.'],
                ['Publish', 'Go live and start attracting more qualified leads.'],
              ].map(([title, description], idx) => (
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
          <div className="container">
            <h2 id="faq-title">Frequently Asked Questions</h2>
            <p className="section-intro">Quick answers to common questions from agents.</p>
            <div className="faq-list">
              {faqs.map((item, idx) => (
                <details key={item.q} open={openFaq === idx} onToggle={() => setOpenFaq((prev) => (prev === idx ? -1 : idx))}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
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
