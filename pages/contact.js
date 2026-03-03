import Head from 'next/head';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AgentOS',
  url: 'https://yourdomain.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@yourdomain.com',
  },
};

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Our Real Estate Website Platform | AgentOS</title>
        <meta
          name="description"
          content="Have questions about launching your real estate agent website? Contact our team to learn about pricing, SEO features, and platform support."
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
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
                  <a href="/how-it-works#how-title" role="menuitem">
                    The Works & FAQs
                  </a>
                  <a href="/rank-real-estate-website-on-google" role="menuitem">
                    Website Ranking Rules
                  </a>
                  <a href="/seo-for-realtors" role="menuitem">
                    SEO For Realtors
                  </a>
                  <a href="/best-real-estate-website-platform" role="menuitem">
                    Real Estate Website Platform
                  </a>
                </div>
              </details>
              <a href="/pricing">Pricing</a>
              <a href="/contact" aria-current="page">
                Contact
              </a>
            </nav>

            <div className="nav-actions">
              <a className="btn btn-primary" href="/pricing">
                Start Building Free
              </a>
            </div>
          </div>
        </header>

        <main id="main-content" className="contact-page">
          <section className="contact-page-layer" aria-labelledby="contact-page-title">
            <div className="container contact-page-shell">
              <div className="contact-page-copy">
                <p className="hero-chip">Contact</p>
                <h1 id="contact-page-title">Get in Touch With Our Real Estate Website Experts</h1>
                <p>
                  Have questions about launching your real estate agent website? Our team specializes in building
                  SEO-optimized real estate websites designed for lead generation and long-term growth. Whether you're
                  exploring pricing, platform features, or custom domain setup, we’re here to help.
                </p>
              </div>

              <form className="contact-page-form" action="#" method="post">
                <label htmlFor="inquiry-type">What can we help you with?</label>
                <select id="inquiry-type" name="inquiry-type" defaultValue="" required>
                  <option value="" disabled>
                    Select an inquiry type
                  </option>
                  <option value="pricing">Pricing questions</option>
                  <option value="features">Platform features</option>
                  <option value="support">Technical support</option>
                  <option value="domain">Custom domain setup</option>
                  <option value="partnership">Partnership inquiry</option>
                </select>

                <label htmlFor="full-name">Full Name</label>
                <input id="full-name" name="full-name" type="text" autoComplete="name" required />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />

                <label htmlFor="brokerage-name">Brokerage Name</label>
                <input id="brokerage-name" name="brokerage-name" type="text" autoComplete="organization" />

                <label htmlFor="website">Website (if existing)</label>
                <input id="website" name="website" type="url" placeholder="https://" />

                <label htmlFor="stage">What stage are you in?</label>
                <select id="stage" name="stage" defaultValue="" required>
                  <option value="" disabled>
                    Select your stage
                  </option>
                  <option value="researching">Just researching</option>
                  <option value="ready">Ready to launch</option>
                  <option value="switching">Switching from another platform</option>
                </select>

                <p className="contact-microcopy">We respond to most inquiries within one business day.</p>

                <button type="submit" className="btn btn-primary">
                  Send Inquiry
                </button>
              </form>
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
