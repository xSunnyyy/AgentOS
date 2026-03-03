import Head from 'next/head';

const allFaqItems = [
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

      <main id="main-content" className="all-faq-page">
        <section className="all-faq-section" aria-labelledby="all-faq-title">
          <div className="container all-faq-shell">
            <h1 id="all-faq-title">All Frequently Asked Questions</h1>
            <p className="section-intro">Explore the full list of AgentOS FAQ answers for real estate agents.</p>

            <div className="faq-list">
              {allFaqItems.map((item, index) => (
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

            <a className="btn btn-secondary" href="/how-it-works">
              Back to How It Works
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
