import Head from 'next/head';

const demoListings = [
  { address: '1284 Palm Ave, Miami, FL', status: 'Active', price: '$885,000' },
  { address: '421 Ocean Park Dr, Tampa, FL', status: 'Pending', price: '$642,500' },
  { address: '77 Harbor View Ln, Scottsdale, AZ', status: 'Sold', price: '$1,020,000' },
];

export default function LiveDemoPage() {
  return (
    <>
      <Head>
        <title>Live Demo | AgentOS</title>
        <meta
          name="description"
          content="Preview a live example of an AgentOS real estate website dashboard with listings, lead capture, and performance snapshots."
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
              <a href="/">Home</a>
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
              <a href="/contact">Contact</a>
            </nav>

            <div className="nav-actions">
              <a className="btn btn-primary" href="/pricing">
                Start Building Free
              </a>
            </div>
          </div>
        </header>

        <main id="main-content" className="live-demo-page">
          <section className="live-demo-shell container" aria-labelledby="live-demo-title">
            <p className="hero-chip">Product Preview</p>
            <h1 id="live-demo-title">AgentOS Live Demo</h1>
            <p className="section-intro">
              Temporary demo data preview showing how your dashboard and listing pipeline could look after launch.
            </p>

            <div className="demo-stats">
              <article className="demo-stat-card">
                <h2>24</h2>
                <p>Active Listings</p>
              </article>
              <article className="demo-stat-card">
                <h2>67</h2>
                <p>New Leads (30 days)</p>
              </article>
              <article className="demo-stat-card">
                <h2>3.8s</h2>
                <p>Avg. Response Time</p>
              </article>
            </div>

            <div className="demo-table-wrap" role="region" aria-label="Recent listing activity">
              <table className="demo-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {demoListings.map((row) => (
                    <tr key={row.address}>
                      <td>{row.address}</td>
                      <td>{row.status}</td>
                      <td>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
