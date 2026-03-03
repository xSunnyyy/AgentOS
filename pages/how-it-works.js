import Head from 'next/head';

const timelineSteps = [
  {
    title: 'Create Your Account',
    description: 'Sign up in minutes and access your guided setup dashboard right away.',
    highlights: ['No coding needed', 'No technical setup', 'No credit card required'],
  },
  {
    title: 'Customize Your Website',
    description: 'Add your branding and business details so your site matches your market and goals.',
    highlights: ['Brokerage + contact info', 'Service areas + specialties', 'Brand colors and style'],
  },
  {
    title: 'Add Listings & Content',
    description: 'Upload listings, photos, and descriptions with a simple, step-by-step workflow.',
    highlights: ['Property pages auto-formatted', 'Built for mobile browsing', 'SEO-ready structure'],
  },
  {
    title: 'Preview Before Launch',
    description: 'Review every page on desktop and mobile before you publish.',
    highlights: ['Check listings and forms', 'Test page flow', 'Make quick edits'],
  },
  {
    title: 'Publish & Start Capturing Leads',
    description: 'Go live instantly with an optimized website built to attract buyers and sellers.',
    highlights: ['Fast page performance', 'Built-in SEO foundation', 'Lead capture ready'],
  },
];

const faqPreviewItems = [
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
];

export default function HowItWorksPage() {
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
                    <ul className="timeline-highlights" aria-label={`Step ${index + 1} highlights`}>
                      {step.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="faq-placeholder" aria-labelledby="faq-title">
            <div className="container faq-shell">
              <h2 id="faq-title">Frequently Asked Questions</h2>
              <p className="section-intro">Everything agents ask before launching with AgentOS.</p>

              <div className="faq-list">
                {faqPreviewItems.map((item, index) => (
                  <details key={item.question} className="faq-item">
                    <summary>
                      <span>
                        {index + 1}. {item.question}
                      </span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>

              <a className="btn btn-secondary faq-view-all" href="/faqs">
                View All FAQs
              </a>
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
