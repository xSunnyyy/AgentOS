import Head from 'next/head';

export default function BestRealEstateWebsitePlatformPage() {
  return (
    <>
      <Head>
        <title>Best Real Estate Website Platform for Agents (2026 Comparison)</title>
        <meta
          name="description"
          content="Compare website platform options for real estate agents and learn what matters for SEO, lead generation, and long-term growth."
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
              <a className="btn btn-primary" href="/pricing">
                Start Building Free
              </a>
            </div>
          </div>
        </header>

        <main id="main-content" className="article-page">
          <article className="container article-shell" aria-labelledby="article-title">
            <p className="hero-chip">Platform Guide</p>
            <h1 id="article-title">Choosing the Best Real Estate Website Platform</h1>
            <p className="article-lead">
              This pillar page is set up and ready. Next we can drop in your full comparison copy and conversion CTA.
            </p>
            <p>
              For now, this page exists so your new navigation dropdown has a valid destination and users can move through your content funnel
              cleanly.
            </p>
          </article>
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
