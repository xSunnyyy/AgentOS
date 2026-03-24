import Head from 'next/head';
import { useRef, useState } from 'react';

const createSocial = () => ({ platform: '', url: '' });
const createPicture = () => ({ image: '', alt: '' });
const createSaleProperty = () => ({ image: '', address: '', price: '', bedrooms: '', bathrooms: '', description: '', listingLink: '' });
const createSoldProperty = () => ({ image: '', address: '', price: '', bedrooms: '', bathrooms: '', closed: '' });
const createTestimonial = () => ({ name: '', rating: '', review: '' });

const defaultGallery = ['/listings/listing-01.svg', '/listings/listing-02.svg', '/listings/listing-03.svg'];

const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
  reader.onerror = () => reject(new Error('Unable to read uploaded file.'));
  reader.readAsDataURL(file);
});

export default function StartFreeTrialPage() {
  const formRef = useRef(null);
  const [step, setStep] = useState('form');
  const [saleStartIndex, setSaleStartIndex] = useState(0);
  const [soldStartIndex, setSoldStartIndex] = useState(0);
  const [form, setForm] = useState({
    location: '',
    agentName: '',
    agentTitle: '',
    headline: '',
    description: '',
    languages: '',
    awards: '',
    designations: '',
    specializations: '',
    associatedCompany: '',
    socials: [createSocial()],
    pictures: [createPicture()],
    propertiesForSale: [createSaleProperty()],
    soldProperties: [createSoldProperty()],
    testimonials: [createTestimonial()],
  });

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateArrayField = (arrayKey, index, field, value) => {
    setForm((prev) => {
      const next = [...prev[arrayKey]];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, [arrayKey]: next };
    });
  };

  const updateArrayFile = async (arrayKey, index, field, file) => {
    if (!file) {
      updateArrayField(arrayKey, index, field, '');
      return;
    }

    const image = await fileToDataUrl(file);
    updateArrayField(arrayKey, index, field, image);
  };

  const addArrayItem = (arrayKey, factory) => setForm((prev) => ({ ...prev, [arrayKey]: [...prev[arrayKey], factory()] }));
  const removeArrayItem = (arrayKey, index) => setForm((prev) => ({ ...prev, [arrayKey]: prev[arrayKey].filter((_, itemIndex) => itemIndex !== index) }));

  const openPreview = () => {
    formRef.current?.reportValidity();
    setStep('preview');
  };

  const openCheckoutPage = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('trialDraft', JSON.stringify(form));
      window.location.href = '/start-free-trial/checkout';
    }
  };

  const profileSections = [
    { heading: 'Languages', content: form.languages },
    { heading: 'Awards', content: form.awards },
    { heading: 'Designations', content: form.designations },
    { heading: 'Specializations', content: form.specializations },
    { heading: 'Associated Company', content: form.associatedCompany },
  ];

  const galleryImages = [...form.pictures.map((item) => item.image).filter(Boolean), ...defaultGallery].slice(0, 6);
  const visiblePropertyCount = 3;
  const getVisibleProperties = (items, startIndex) =>
    Array.from({ length: Math.min(visiblePropertyCount, items.length) }, (_, offset) => items[(startIndex + offset) % items.length]);

  const cycleProperties = (type, direction) => {
    const items = type === 'sale' ? form.propertiesForSale : form.soldProperties;
    const setter = type === 'sale' ? setSaleStartIndex : setSoldStartIndex;

    if (!items.length) {
      return;
    }

    setter((current) => {
      if (direction === 'next') {
        return (current + 1) % items.length;
      }
      return current === 0 ? items.length - 1 : current - 1;
    });
  };

  if (step === 'preview') {
    return (
      <>
        <Head>
          <title>Preview Your Page | AgentOS</title>
          <meta name="description" content="Full live preview of your personalized AgentOS page before selecting service and payment." />
        </Head>

        <a className="skip-link" href="#main-content">Skip to content</a>

        <div className="pricing-layout">
          <main id="main-content" className="live-demo-page trial-preview-page">
            <section className="live-demo-shell container" aria-labelledby="live-demo-title">
              <div className="agent-hero">
                <div>
                  <p className="hero-chip">{form.location || 'Your Market'}</p>
                  <h1 id="live-demo-title">{form.agentName || 'Agent Name'}</h1>
                  <p className="agent-subtitle"><strong>{form.agentTitle || 'Professional Title'}</strong></p>
                  <a className="btn btn-primary message-cta" href="#contact-me-title">Send Message</a>

                  <div className="agent-socials" aria-label="Agent social links">
                    {form.socials.filter((item) => item.platform).map((social, index) => (
                      <a key={`${social.platform}-${index}`} href={social.url || '#'} className="social-chip" aria-label={social.platform}>
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="agent-headshot-wrap">
                  <img className="agent-headshot" src={galleryImages[0] || defaultGallery[0]} alt={form.agentName ? `${form.agentName} headshot` : 'Agent headshot'} />
                </div>
              </div>

              <div className="featured-showcase">
                <div className="featured-media-card trial-preview-gallery">
                  <div className="featured-media-view" role="region" aria-label="Featured property images">
                    <img src={galleryImages[1] || galleryImages[0] || defaultGallery[1]} alt="Featured media" />
                  </div>
                </div>

                <aside className="headline-card">
                  <p>{form.headline || 'Your headline will appear here in the final page.'}</p>
                </aside>
              </div>

              <section className="profile-resume" aria-label="Agent profile details">
                <div className="profile-left-column">
                  {profileSections.map((section) => (
                    <article key={section.heading} className="profile-item">
                      <h3>{section.heading}</h3>
                      <p>{section.content || 'To be added'}</p>
                    </article>
                  ))}
                </div>

                <article className="profile-item description-item">
                  <h3>Description</h3>
                  <p>{form.description || 'Add your description in the previous step and click Preview again.'}</p>
                </article>
              </section>

              <section aria-labelledby="for-sale-title">
                <div className="section-heading-row property-heading-row">
                  <h2 id="for-sale-title">Properties for Sale</h2>
                  <div className="inline-arrows" aria-label="Properties for sale navigation">
                    <button type="button" className="media-arrow" onClick={() => cycleProperties('sale', 'previous')} aria-label="Show previous properties for sale">←</button>
                    <button type="button" className="media-arrow" onClick={() => cycleProperties('sale', 'next')} aria-label="Show next properties for sale">→</button>
                  </div>
                </div>
                <div className="property-cards-grid" role="region" aria-label="Properties currently for sale">
                  {getVisibleProperties(form.propertiesForSale, saleStartIndex).map((property, index) => (
                    <article key={`${property.address || 'sale'}-${index}`} className="property-card listing-card active-listing">
                      <div className="property-image-wrap">
                        {property.image ? (
                          <img className="property-image" src={property.image} alt={`Property at ${property.address || 'Address'}`} />
                        ) : (
                          <div className="property-image property-image-fallback">No Images Avaliable</div>
                        )}
                        <span className="listing-status">For Sale</span>
                      </div>
                      <div className="property-details">
                        <h3>{property.address || 'Address'}</h3>
                        <div className="property-spec-grid">
                          <div>
                            <span>Price</span>
                            <strong>{property.price || 'Price'}</strong>
                          </div>
                          <div>
                            <span>Bedrooms</span>
                            <strong>{property.bedrooms || '-'}</strong>
                          </div>
                          <div>
                            <span>Bathrooms</span>
                            <strong>{property.bathrooms || '-'}</strong>
                          </div>
                        </div>
                        <p className="property-description">{(property.description || 'Property description.').slice(0, 300)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section aria-labelledby="sold-title">
                <div className="section-heading-row property-heading-row">
                  <h2 id="sold-title">Sold Properties</h2>
                  <div className="inline-arrows" aria-label="Sold properties navigation">
                    <button type="button" className="media-arrow" onClick={() => cycleProperties('sold', 'previous')} aria-label="Show previous sold properties">←</button>
                    <button type="button" className="media-arrow" onClick={() => cycleProperties('sold', 'next')} aria-label="Show next sold properties">→</button>
                  </div>
                </div>
                <div className="property-cards-grid" role="region" aria-label="Recently sold properties">
                  {getVisibleProperties(form.soldProperties, soldStartIndex).map((property, index) => (
                    <article key={`${property.address || 'sold'}-${index}`} className="property-card listing-card sold-listing">
                      <div className="property-image-wrap">
                        {property.image ? (
                          <img className="property-image" src={property.image} alt={`Sold property at ${property.address || 'Address'}`} />
                        ) : (
                          <div className="property-image property-image-fallback">No Images Avaliable</div>
                        )}
                        <span className="listing-status">Sold</span>
                      </div>
                      <div className="property-details">
                        <h3>{property.address || 'Address'}</h3>
                        <div className="property-spec-grid">
                          <div>
                            <span>Price</span>
                            <strong>{property.price || 'Price'}</strong>
                          </div>
                          <div>
                            <span>Bedrooms</span>
                            <strong>{property.bedrooms || '-'}</strong>
                          </div>
                          <div>
                            <span>Bathrooms</span>
                            <strong>{property.bathrooms || '-'}</strong>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section aria-labelledby="testimonial-title">
                <h2 id="testimonial-title">Testimonials</h2>
                <div className="testimonial-grid">
                  {form.testimonials.map((testimonial, index) => (
                    <article key={`testimonial-preview-${index}`} className="testimonial-card">
                      <p>{testimonial.review || 'Client review appears here.'}</p>
                      <p><strong>{testimonial.name || 'Client Name'}</strong> {testimonial.rating ? `• ${testimonial.rating}/5` : ''}</p>
                    </article>
                  ))}
                </div>
              </section>
            </section>

            <div className="container trial-preview-cta">
              <button type="button" className="btn btn-secondary" onClick={() => setStep('form')}>Back to Edit</button>
              <button type="button" className="btn btn-primary" onClick={openCheckoutPage}>Next: Checkout</button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Start Free Trial | AgentOS</title>
        <meta name="description" content="Create your AgentOS page by submitting profile details, socials, properties, and testimonials." />
      </Head>

      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="pricing-layout">
        <header className="site-header">
          <div className="container nav-wrap">
            <a className="brand" href="/" aria-label="Homepage">AgentOS</a>
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
              <details className="nav-dropdown">
                <summary>Contact</summary>
                <div className="nav-dropdown-menu" role="menu" aria-label="Contact links">
                  <a href="/contact" role="menuitem">Contact</a>
                  <a href="/live-demo" role="menuitem">Live Demo</a>
                </div>
              </details>
            </nav>
            <div className="nav-actions">
              <a className="btn btn-primary" href="/start-free-trial">Start Building Free</a>
            </div>
          </div>
        </header>

        <main id="main-content" className="contact-page trial-page">
          <section className="contact-page-layer" aria-labelledby="trial-title">
            <div className="container contact-page-shell">
              <div className="contact-page-copy">
                <p className="hero-chip">Start Free Trial</p>
                <h1 id="trial-title">Build Your Agent Page</h1>
                <p>
                  Upload your media, fill in property details under each image, preview the full page,
                  then continue to checkout.
                </p>
              </div>

              <form ref={formRef} className="contact-page-form trial-form" onSubmit={(event) => event.preventDefault()}>
                <h2>Agent Profile</h2>
                <div className="trial-grid two-col">
                  <div><label htmlFor="location">Location</label><input id="location" type="text" value={form.location} onChange={(event) => updateField('location', event.target.value)} /></div>
                  <div><label htmlFor="agent-name">Name</label><input id="agent-name" type="text" value={form.agentName} onChange={(event) => updateField('agentName', event.target.value)} /></div>
                  <div><label htmlFor="agent-title">Title</label><input id="agent-title" type="text" value={form.agentTitle} onChange={(event) => updateField('agentTitle', event.target.value)} /></div>
                  <div><label htmlFor="headline">Headline</label><input id="headline" type="text" value={form.headline} onChange={(event) => updateField('headline', event.target.value)} /></div>
                </div>

                <label htmlFor="description">Description</label>
                <textarea id="description" rows={5} value={form.description} onChange={(event) => updateField('description', event.target.value)} />

                <div className="trial-grid two-col">
                  <div><label htmlFor="languages">Languages</label><input id="languages" type="text" value={form.languages} onChange={(event) => updateField('languages', event.target.value)} /></div>
                  <div><label htmlFor="awards">Awards</label><input id="awards" type="text" value={form.awards} onChange={(event) => updateField('awards', event.target.value)} /></div>
                  <div><label htmlFor="designations">Designations</label><input id="designations" type="text" value={form.designations} onChange={(event) => updateField('designations', event.target.value)} /></div>
                  <div><label htmlFor="specializations">Specializations</label><input id="specializations" type="text" value={form.specializations} onChange={(event) => updateField('specializations', event.target.value)} /></div>
                </div>

                <label htmlFor="associated-company">Associated Company</label>
                <input id="associated-company" type="text" value={form.associatedCompany} onChange={(event) => updateField('associatedCompany', event.target.value)} />

                <div className="trial-group">
                  <h2>Socials</h2>
                  {form.socials.map((social, index) => (
                    <div key={`social-${index}`} className="trial-row">
                      <input type="text" placeholder="Platform" value={social.platform} onChange={(event) => updateArrayField('socials', index, 'platform', event.target.value)} />
                      <input type="text" placeholder="Profile handle or URL" value={social.url} onChange={(event) => updateArrayField('socials', index, 'url', event.target.value)} />
                      {form.socials.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('socials', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('socials', createSocial)}>Add Social</button>
                </div>

                <div className="trial-group">
                  <h2>Gallery Pictures</h2>
                  {form.pictures.map((picture, index) => (
                    <div key={`picture-${index}`} className="trial-card">
                      <label>Upload Image {index + 1}</label>
                      <input type="file" accept="image/*" onChange={async (event) => updateArrayFile('pictures', index, 'image', event.target.files?.[0])} />
                      <input type="text" placeholder="Image alt text" value={picture.alt} onChange={(event) => updateArrayField('pictures', index, 'alt', event.target.value)} />
                      {picture.image && <img className="trial-upload-preview" src={picture.image} alt={picture.alt || `Upload ${index + 1}`} />}
                      {form.pictures.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('pictures', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('pictures', createPicture)}>Add Picture</button>
                </div>

                <div className="trial-group">
                  <h2>Properties for Sale</h2>
                  {form.propertiesForSale.map((property, index) => (
                    <div key={`sale-${index}`} className="trial-card">
                      <label>Property Image {index + 1}</label>
                      <input type="file" accept="image/*" onChange={async (event) => updateArrayFile('propertiesForSale', index, 'image', event.target.files?.[0])} />
                      {property.image && <img className="trial-upload-preview" src={property.image} alt={property.address || `Property ${index + 1}`} />}

                      <div className="trial-grid two-col">
                        <input type="text" placeholder="Address" value={property.address} onChange={(event) => updateArrayField('propertiesForSale', index, 'address', event.target.value)} />
                        <input type="text" placeholder="Price" value={property.price} onChange={(event) => updateArrayField('propertiesForSale', index, 'price', event.target.value)} />
                        <input type="text" placeholder="Bedrooms" value={property.bedrooms} onChange={(event) => updateArrayField('propertiesForSale', index, 'bedrooms', event.target.value)} />
                        <input type="text" placeholder="Bathrooms" value={property.bathrooms} onChange={(event) => updateArrayField('propertiesForSale', index, 'bathrooms', event.target.value)} />
                        <input className="trial-full" type="text" placeholder="Listing handle/link" value={property.listingLink} onChange={(event) => updateArrayField('propertiesForSale', index, 'listingLink', event.target.value)} />
                        <textarea className="trial-full" rows={3} placeholder="Short description" value={property.description} onChange={(event) => updateArrayField('propertiesForSale', index, 'description', event.target.value)} />
                      </div>

                      {form.propertiesForSale.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('propertiesForSale', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('propertiesForSale', createSaleProperty)}>Add Property for Sale</button>
                </div>

                <div className="trial-group">
                  <h2>Sold Properties</h2>
                  {form.soldProperties.map((property, index) => (
                    <div key={`sold-${index}`} className="trial-card">
                      <label>Sold Property Image {index + 1}</label>
                      <input type="file" accept="image/*" onChange={async (event) => updateArrayFile('soldProperties', index, 'image', event.target.files?.[0])} />
                      {property.image && <img className="trial-upload-preview" src={property.image} alt={property.address || `Sold property ${index + 1}`} />}

                      <div className="trial-grid two-col">
                        <input type="text" placeholder="Address" value={property.address} onChange={(event) => updateArrayField('soldProperties', index, 'address', event.target.value)} />
                        <input type="text" placeholder="Price" value={property.price} onChange={(event) => updateArrayField('soldProperties', index, 'price', event.target.value)} />
                        <input type="text" placeholder="Bedrooms" value={property.bedrooms} onChange={(event) => updateArrayField('soldProperties', index, 'bedrooms', event.target.value)} />
                        <input type="text" placeholder="Bathrooms" value={property.bathrooms} onChange={(event) => updateArrayField('soldProperties', index, 'bathrooms', event.target.value)} />
                        <input className="trial-full" type="text" placeholder="Closed note (e.g. Closed in 12 days)" value={property.closed} onChange={(event) => updateArrayField('soldProperties', index, 'closed', event.target.value)} />
                      </div>

                      {form.soldProperties.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('soldProperties', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('soldProperties', createSoldProperty)}>Add Sold Property</button>
                </div>

                <div className="trial-group">
                  <h2>Testimonials / Reviews</h2>
                  {form.testimonials.map((testimonial, index) => (
                    <div key={`testimonial-${index}`} className="trial-card trial-grid two-col">
                      <input type="text" placeholder="Client name" value={testimonial.name} onChange={(event) => updateArrayField('testimonials', index, 'name', event.target.value)} />
                      <input type="number" min={1} max={5} placeholder="Rating (1-5)" value={testimonial.rating} onChange={(event) => updateArrayField('testimonials', index, 'rating', event.target.value)} />
                      <textarea className="trial-full" rows={3} placeholder="Review" value={testimonial.review} onChange={(event) => updateArrayField('testimonials', index, 'review', event.target.value)} />
                      {form.testimonials.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('testimonials', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('testimonials', createTestimonial)}>Add Testimonial</button>
                </div>

                <div className="trial-actions">
                  <button type="button" className="btn btn-primary" onClick={openPreview}>Preview Full Page</button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
