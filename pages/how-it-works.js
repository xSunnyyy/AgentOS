import Head from 'next/head';
import { useEffect, useState } from 'react';

const timelineSteps = [
  {
    title: 'Create Your Real Estate Agent Website Account',
    description:
      'Start building your real estate agent website in minutes — no coding or technical setup required. Create your account and access a guided platform designed specifically for Realtors who want a professional online presence without hiring a developer. Launch confidently with a system built for simplicity and speed.',
  },
  {
    title: 'Customize Your Real Estate Website Platform',
    description:
      'Enter your branding, brokerage information, service areas, and specialties to tailor your real estate website to your local market. Our platform automatically structures your content using SEO best practices for Realtors, helping position you for better search visibility from day one.',
  },
  {
    title: 'Add Listings & Power Your IDX Real Estate Website',
    description:
      'Upload property listings, photos, and descriptions through a streamlined workflow. Your listings are structured into optimized property pages designed to support lead generation for real estate agents and improve search performance across Google and mobile devices.',
  },
  {
    title: 'Preview Your Mobile-Responsive Real Estate Website',
    description:
      'Before you launch, review your fully generated website across desktop and mobile. Every real estate website is built to be fast, modern, and mobile responsive — ensuring buyers and sellers have a seamless experience no matter how they find you.',
  },
  {
    title: 'Launch Your SEO-Optimized Real Estate Agent Website',
    description:
      'Publish your website instantly and start capturing buyer and seller leads. Your real estate agent website goes live with built-in SEO structure, clean page hierarchy, and performance optimization — so you can focus on selling homes while your website works for you.',
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>How It Works | AgentOS</title>
        <meta
          name="description"
          content="Follow a five-step path to launch your SEO-optimized real estate website with AgentOS in as little as 48-72 hours."
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
            <div className="container how-wrap">
              <div className="how-heading">
                <h1 id="how-title">How Our Real Estate Agent Website Platform Works</h1>
                <p>
                  A step-by-step guide to launching a fully optimized real estate website in days — no coding required.
                </p>
              </div>

              <div className="timeline" id="timeline">
                {timelineSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className={`timeline-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
                    aria-labelledby={`step-title-${index + 1}`}
                  >
                    <span className="timeline-dot" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="flow-step">Step {index + 1}</span>
                    <h2 id={`step-title-${index + 1}`}>{step.title}</h2>
                    <p>{step.description}</p>
                  </article>
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
