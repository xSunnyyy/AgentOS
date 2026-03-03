import Head from 'next/head';
import { useState } from 'react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern luxury home exterior at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bright open concept living room with large windows',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    alt: 'Contemporary kitchen with island and pendant lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Backyard pool and patio staging for a listed property',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Elegant primary bedroom with neutral decor',
  },
];

const saleProperties = [
  {
    address: '742 Glenview Lane, Austin, TX',
    price: '$1,150,000',
    beds: '4',
    baths: '3 Full',
    image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    address: '88 Ocean Crest Blvd, San Diego, CA',
    price: '$2,080,000',
    beds: '5',
    baths: '4 Full',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
  },
  { address: '619 Maple Grove Dr, Nashville, TN', price: '$815,000', beds: '3', baths: '2 Full', image: null },
  {
    address: '37 Cedar Ridge Way, Charlotte, NC',
    price: '$699,000',
    beds: '4',
    baths: '2 Full 1 Partial',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    address: '415 Summit View Rd, Denver, CO',
    price: '$1,320,000',
    beds: '4',
    baths: '3 Full 1 Partial',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80',
  },
];

const soldProperties = [
  {
    address: '101 Harbor Point, Seattle, WA',
    price: '$1,440,000',
    beds: '4',
    baths: '3 Full',
    closed: 'Closed in 14 days',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
  },
  { address: '34 Canyon Oak Ct, Phoenix, AZ', price: '$972,000', beds: '3', baths: '2 Full 1 Partial', closed: 'Closed over asking', image: null },
  {
    address: '502 Magnolia Ave, Atlanta, GA',
    price: '$764,000',
    beds: '3',
    baths: '2 Full',
    closed: 'Closed in 9 days',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
  },
  {
    address: '209 Lakefront Dr, Orlando, FL',
    price: '$1,025,000',
    beds: '5',
    baths: '4 Full 1 Partial',
    closed: 'Closed cash offer',
    image: 'https://images.unsplash.com/photo-1600607687641-62f0f36d9f0f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    address: '66 Pine Terrace, Portland, OR',
    price: '$689,000',
    beds: '4',
    baths: '3 Full',
    closed: 'Closed in 12 days',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=80',
  },
];

const testimonials = [
  {
    quote:
      'Alex made the entire experience seamless. We found our dream home in two weekends and closed ahead of schedule.',
    author: 'Priya & Jonah, Buyers',
  },
  {
    quote:
      'From staging to negotiation, every step was proactive and professional. We sold for well above list price.',
    author: 'Marcus L., Seller',
  },
  {
    quote:
      'The communication was exceptional and we always felt informed. I would absolutely work with this team again.',
    author: 'Dana R., Investor',
  },
];

const profileSections = [
  { heading: 'Languages', content: 'English, Spanish, Mandarin' },
  { heading: 'Awards', content: 'Top Producer 2023, Client Choice Excellence Award' },
  { heading: 'Designations', content: 'CRS, ABR, SRES' },
  { heading: 'Specializations', content: 'Luxury Homes, Relocation, First-Time Buyers' },
  { heading: 'Associated Company', content: 'Northshore Premier Realty Group' },
];

const VISIBLE_PROPERTY_COUNT = 3;

const getVisibleProperties = (items, startIndex) =>
  Array.from({ length: Math.min(VISIBLE_PROPERTY_COUNT, items.length) }, (_, offset) => items[(startIndex + offset) % items.length]);

export default function LiveDemoPage() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [saleStartIndex, setSaleStartIndex] = useState(0);
  const [soldStartIndex, setSoldStartIndex] = useState(0);
  const activeMediaItem = galleryImages[activeMediaIndex];

  const showPreviousMedia = () => {
    setActiveMediaIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  };

  const showNextMedia = () => {
    setActiveMediaIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  };

  const cycleProperties = (type, direction) => {
    const items = type === 'sale' ? saleProperties : soldProperties;
    const setter = type === 'sale' ? setSaleStartIndex : setSoldStartIndex;

    setter((current) => {
      if (direction === 'next') {
        return (current + 1) % items.length;
      }
      return current === 0 ? items.length - 1 : current - 1;
    });
  };

  return (
    <>
      <Head>
        <title>Live Demo | AgentOS</title>
        <meta
          name="description"
          content="Preview a front-end focused real estate agent profile experience with galleries, listings, testimonials, and contact tools."
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
            <div className="agent-hero">
              <div>
                <p className="hero-chip">Austin, Texas</p>
                <h1 id="live-demo-title">Alex Morgan</h1>
                <p className="agent-subtitle"><strong>Luxury Residential Specialist</strong></p>

                <a className="btn btn-primary message-cta" href="#contact-me-title">Send Message</a>

                <div className="agent-socials" aria-label="Agent social links">
                  {['YouTube', 'Instagram', 'Facebook', 'TikTok', 'X', 'LinkedIn', 'Pinterest'].map((network) => (
                    <a key={network} href="#" className="social-chip" aria-label={network}>
                      {network}
                    </a>
                  ))}
                </div>
              </div>

              <div className="agent-headshot-wrap">
                <img
                  className="agent-headshot"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                  alt="Agent headshot"
                />
              </div>
            </div>

            <div className="featured-showcase">
              <div className="featured-media-card">
                <div className="featured-media-view" role="region" aria-label="Featured property images">
                  <img src={activeMediaItem.src} alt={activeMediaItem.alt} />
                  <div className="media-overlay-controls">
                    <button type="button" className="media-arrow" onClick={showPreviousMedia} aria-label="View previous featured image">←</button>
                    <button type="button" className="media-arrow" onClick={showNextMedia} aria-label="View next featured image">→</button>
                  </div>
                </div>
                <p className="media-position">Image {activeMediaIndex + 1} of {galleryImages.length}</p>
              </div>

              <aside className="headline-card">
                <p>
                  Helping clients move with confidence through strategic pricing, premium marketing, and white-glove support from first showing to final signature.
                </p>
              </aside>
            </div>

            <section className="profile-resume" aria-label="Agent profile details">
              <div className="profile-left-column">
                {profileSections.map((section) => (
                  <article key={section.heading} className="profile-item">
                    <h3>{section.heading}</h3>
                    <p>{section.content}</p>
                  </article>
                ))}
              </div>

              <article className="profile-item description-item">
                <h3>Description</h3>
                <div className={`description-content ${isDescriptionExpanded ? 'expanded' : ''}`}>
                  <p>
                    Alex has spent more than a decade advising families, relocation clients, and investors throughout competitive metro markets. Her process blends local market insight, tailored marketing strategy, and high-touch service so every client feels informed and supported.
                  </p>
                  <p>
                    With a background in design and negotiation, Alex helps sellers position homes for maximum impact while guiding buyers through smart, data-driven offers. She collaborates with trusted lenders, inspectors, and legal professionals to keep each transaction moving efficiently.
                  </p>
                  <p>
                    Outside of real estate, Alex mentors new agents and hosts monthly neighborhood spotlight events featuring local businesses. Her mission is simple: create a clear path to your next chapter while delivering an exceptional client experience.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsDescriptionExpanded((value) => !value)}
                >
                  {isDescriptionExpanded ? 'Show less' : 'Read full description'}
                </button>
              </article>
            </section>

            <section aria-labelledby="properties-for-sale">
              <div className="section-heading-row property-heading-row">
                <h2 id="properties-for-sale">Properties for Sale</h2>
                <div className="inline-arrows" aria-label="Properties for sale navigation">
                  <button type="button" className="media-arrow" onClick={() => cycleProperties('sale', 'previous')} aria-label="Show previous properties for sale">←</button>
                  <button type="button" className="media-arrow" onClick={() => cycleProperties('sale', 'next')} aria-label="Show next properties for sale">→</button>
                </div>
              </div>
              <div className="property-cards-grid" role="region" aria-label="Properties currently for sale">
                {getVisibleProperties(saleProperties, saleStartIndex).map((property) => (
                  <article key={`${property.address}-sale`} className="property-card listing-card active-listing">
                    <div className="property-image-wrap">
                      {property.image ? (
                        <img className="property-image" src={property.image} alt={`Property at ${property.address}`} />
                      ) : (
                        <div className="property-image property-image-fallback">No Images Avaliable</div>
                      )}
                      <span className="listing-status">For Sale</span>
                    </div>
                    <div className="property-details">
                      <h3>{property.address}</h3>
                      <div className="property-spec-grid">
                        <div>
                          <span>Price</span>
                          <strong>{property.price}</strong>
                        </div>
                        <div>
                          <span>Bedrooms</span>
                          <strong>{property.beds}</strong>
                        </div>
                        <div>
                          <span>Bathrooms</span>
                          <strong>{property.baths}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="sold-properties">
              <div className="section-heading-row property-heading-row">
                <h2 id="sold-properties">Sold Properties</h2>
                <div className="inline-arrows" aria-label="Sold properties navigation">
                  <button type="button" className="media-arrow" onClick={() => cycleProperties('sold', 'previous')} aria-label="Show previous sold properties">←</button>
                  <button type="button" className="media-arrow" onClick={() => cycleProperties('sold', 'next')} aria-label="Show next sold properties">→</button>
                </div>
              </div>
              <div className="property-cards-grid" role="region" aria-label="Recently sold properties">
                {getVisibleProperties(soldProperties, soldStartIndex).map((property) => (
                  <article key={`${property.address}-sold`} className="property-card listing-card sold-listing">
                    <div className="property-image-wrap">
                      {property.image ? (
                        <img className="property-image" src={property.image} alt={`Sold property at ${property.address}`} />
                      ) : (
                        <div className="property-image property-image-fallback">No Images Avaliable</div>
                      )}
                      <span className="listing-status">Sold</span>
                    </div>
                    <div className="property-details">
                      <h3>{property.address}</h3>
                      <div className="property-spec-grid">
                        <div>
                          <span>Price</span>
                          <strong>{property.price}</strong>
                        </div>
                        <div>
                          <span>Bedrooms</span>
                          <strong>{property.beds}</strong>
                        </div>
                        <div>
                          <span>Bathrooms</span>
                          <strong>{property.baths}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="testimonials-title">
              <h2 id="testimonials-title">Testimonials & Reviews</h2>
              <div className="testimonial-grid">
                {testimonials.map((item) => (
                  <article key={item.author} className="testimonial-card">
                    <p>“{item.quote}”</p>
                    <span>{item.author}</span>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="contact-me-title" className="contact-me-section">
              <h2 id="contact-me-title">Contact Me</h2>
              <div className="contact-me-grid">
                <article className="contact-identity-card">
                  <h3>Alex Morgan</h3>
                  <p><strong>Title:</strong> Luxury Residential Specialist</p>
                  <p><strong>Phone:</strong> (512) 555-0187</p>
                  <p><strong>Email:</strong> alex@northshorepremier.com</p>
                  <p><strong>Office Locations:</strong></p>
                  <ul>
                    <li>Downtown Office: 210 Congress Ave, Austin, TX</li>
                    <li>North Office: 8900 Burnet Rd, Austin, TX</li>
                  </ul>
                </article>

                <form className="contact-page-form live-demo-contact-form" aria-label="Contact Alex Morgan">
                  <label htmlFor="first-name">First Name</label>
                  <input id="first-name" name="firstName" type="text" required />

                  <label htmlFor="last-name">Last Name</label>
                  <input id="last-name" name="lastName" type="text" required />

                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />

                  <label htmlFor="contact-number">Contact Number (Optional)</label>
                  <input id="contact-number" name="contactNumber" type="tel" />

                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} required />

                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </section>
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
