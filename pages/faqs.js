import Head from 'next/head';

const allFaqItems = [
  {
    question: 'How long does it take to launch my real estate agent website?',
    answer:
      'Most agents can launch their real estate website in 1–3 days. Our guided platform walks you through setup step-by-step, so you can build and publish a professional, SEO-optimized real estate agent website without waiting weeks for a developer.',
  },
  {
    question: 'Do I need technical skills or coding experience?',
    answer:
      'No. Our real estate website platform is designed specifically for Realtors who want to build a real estate website without coding. Everything is structured through a simple dashboard — just enter your information, add listings, and publish.',
  },
  {
    question: 'Is the website optimized for SEO?',
    answer:
      'Yes. Every website is built using SEO best practices for Realtors, including clean page structure, optimized property pages, fast load speeds, and mobile responsiveness. This helps improve visibility on Google and supports long-term lead generation.',
  },
  {
    question: 'Will my website work on mobile devices?',
    answer:
      'Yes. Every real estate website we generate is fully mobile responsive, ensuring buyers and sellers have a seamless experience across desktop, tablet, and smartphone devices.',
  },
  {
    question: 'Can I connect my own domain name?',
    answer:
      'Absolutely. You can launch on a subdomain immediately and connect your custom domain at any time. This allows you to establish your brand while maintaining flexibility as your business grows.',
  },
  {
    question: 'How does this help generate leads?',
    answer:
      'Your website includes built-in lead capture forms, optimized property pages, and structured content designed to support real estate lead generation. Combined with SEO optimization, this helps turn website visitors into buyer and seller inquiries.',
  },
  {
    question: 'What makes this different from WordPress or Wix?',
    answer:
      'Unlike generic website builders, this real estate website platform is built specifically for agents. You don’t need to manage plugins, themes, or technical updates — everything is structured for performance, compliance, and SEO from the start.',
  },
  {
    question: 'Is hosting included?',
    answer:
      'Yes. Hosting, security, and performance optimization are included so you don’t have to manage technical infrastructure. Your focus stays on selling homes — not managing servers.',
  },
  {
    question: 'Can I update my website after it goes live?',
    answer:
      'Yes. You can log in at any time to update branding, service areas, content, and listings. Your real estate website grows with your business.',
  },
  {
    question: 'How much does a real estate website cost?',
    answer:
      'Traditional real estate websites can cost thousands in development fees. Our platform provides a streamlined, affordable solution that allows agents to launch a professional real estate website without large upfront investment.',
  },
  {
    question: 'Will my website rank on Google?',
    answer:
      'Ranking depends on competition and content strategy, but your site is built with SEO-friendly architecture to give you a strong foundation. Agents who consistently add local content and optimize service pages improve their visibility over time.',
  },
];

export default function FaqsPage() {
  return (
    <>
      <Head>
        <title>All FAQs | AgentOS</title>
        <meta
          name="description"
          content="Answers to common questions about launching and growing your AgentOS real estate website."
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
            <a href="/contact">Contact</a>
          </nav>

            <div className="nav-actions">
              <a className="btn btn-primary" href="/pricing">
                Start Building Free
              </a>
            </div>
          </div>
        </header>

        <main id="main-content" className="all-faq-page">
          <section className="all-faq-section" aria-labelledby="all-faq-title">
            <div className="container all-faq-shell">
              <h1 id="all-faq-title">All Frequently Asked Questions</h1>
              <p className="section-intro">Explore the full list of AgentOS FAQ answers for real estate agents.</p>

              <div className="faq-list">
                {allFaqItems.map((item) => (
                  <details key={item.question} className="faq-item">
                    <summary>
                      <span>
                        {item.question}
                      </span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
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
