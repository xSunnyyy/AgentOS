import Head from 'next/head';
import { useEffect, useState } from 'react';

const detailedSteps = [
  {
    number: 'Step 1',
    title: 'Sign Up',
    description:
      'Create your free account to begin building your custom real estate website. No payment required to start — explore the platform risk-free while setting up your online presence.',
    note: 'No credit card required',
  },
  {
    number: 'Step 2',
    title: 'Provide Information',
    description:
      'Enter your brokerage details, service areas, specialties, and brand preferences so your website is tailored to your real estate business and local market.',
  },
  {
    number: 'Step 3',
    title: 'Submit Listing Data',
    description:
      'Upload property listings, photos, and descriptions through a simple guided workflow. We automatically structure your content for optimized property pages and search visibility.',
  },
  {
    number: 'Step 4',
    title: 'Preview',
    description:
      'Review your fully generated real estate website before publishing. Explore your pages, test your listings, and make sure everything looks exactly how you want.',
  },
  {
    number: 'Step 5',
    title: 'Publish & Activate',
    description:
      "When you're ready to launch, choose your plan and publish your site instantly. Start capturing buyer and seller leads with a polished, SEO-optimized real estate website.",
  },
];

export default function HowItWorksPage() {
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
        <title>How It Works | AgentOS</title>
        <meta
          name="description"
          content="Learn how AgentOS helps real estate agents launch a fully optimized website in days with a simple five-step process."
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
              <a href="/how-it-works" aria-current="page">
                How It Works
              </a>
              <a href="/pricing">Pricing</a>
              <a href="/#contact">Contact</a>
            </nav>

            <div className="nav-actions">
              <a className="btn btn-primary" href="/pricing">
                Start Building Free
              </a>
            </div>
          </div>
        </header>

        <main id="main-content">
          <section className="how-page" aria-labelledby="how-title">
            <div className="container">
              <div className="how-heading">
                <h1 id="how-title">How Our Real Estate Agent Website Platform Works</h1>
                <p>
                  A step-by-step guide to launching a fully optimized real estate website in days — no coding required.
                </p>
              </div>

              <div className="flow-row row-two">
                {[detailedSteps[0], detailedSteps[1]].map((step, index) => (
                  <div key={step.number} className="flow-item">
                    <article className="flow-card">
                      <span className="flow-step">{step.number}</span>
                      <h2>{step.title}</h2>
                      <p>{step.description}</p>
                      {step.note && <p className="step-note">{step.note}</p>}
                    </article>
                    {index === 0 && <span className="flow-arrow" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>

              <div className="flow-row row-three">
                {[detailedSteps[2], detailedSteps[3], detailedSteps[4]].map((step, index) => (
                  <div key={step.number} className="flow-item">
                    <article className="flow-card">
                      <span className="flow-step">{step.number}</span>
                      <h2>{step.title}</h2>
                      <p>{step.description}</p>
                    </article>
                    {index < 2 && <span className="flow-arrow" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="faq-placeholder" aria-labelledby="faq-title">
            <div className="container faq-shell">
              <h2 id="faq-title">FAQ</h2>
              <p className="section-intro">Questions and answers coming soon. Share your FAQs and I’ll drop them in here.</p>
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
