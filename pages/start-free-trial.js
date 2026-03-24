import Head from 'next/head';
import { useState } from 'react';

const createSocial = () => ({ platform: '', url: '' });
const createPicture = () => ({ url: '' });
const createSaleProperty = () => ({ image: '', address: '', price: '', bedrooms: '', bathrooms: '', description: '', listingLink: '' });
const createSoldProperty = () => ({ image: '', address: '', price: '', bedrooms: '', bathrooms: '' });
const createTestimonial = () => ({ name: '', rating: '', review: '' });

export default function StartFreeTrialPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [billing, setBilling] = useState({ plan: 'free-trial', cardName: '', cardNumber: '', expiry: '', cvc: '' });
  const [form, setForm] = useState({
    accountEmail: '',
    password: '',
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

  const addArrayItem = (arrayKey, factory) => setForm((prev) => ({ ...prev, [arrayKey]: [...prev[arrayKey], factory()] }));
  const removeArrayItem = (arrayKey, index) => setForm((prev) => ({ ...prev, [arrayKey]: prev[arrayKey].filter((_, itemIndex) => itemIndex !== index) }));

  const submitTrial = async () => {
    if (!billing.cardName || !billing.cardNumber || !billing.expiry || !billing.cvc) {
      setStatus({ loading: false, error: 'Payment method details are required to start.', success: '' });
      return;
    }

    setStatus({ loading: true, error: '', success: '' });

    const response = await fetch('/api/trial-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, billing }),
    });

    const result = await response.json();
    if (!response.ok) {
      setStatus({ loading: false, error: result.error || 'Unable to save your trial submission.', success: '' });
      return;
    }

    setStatus({ loading: false, error: '', success: `Saved! Submission ID: ${result.id}` });
  };

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
                <p>Complete setup, preview exactly what your page will look like, then start your trial.</p>
              </div>

              <form className="contact-page-form trial-form" onSubmit={(event) => event.preventDefault()}>
                <h2>Account Setup</h2>
                <div className="trial-grid two-col">
                  <div>
                    <label htmlFor="account-email">Account Email</label>
                    <input id="account-email" type="email" required value={form.accountEmail} onChange={(event) => updateField('accountEmail', event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="account-password">Password</label>
                    <input id="account-password" type="password" required minLength={8} value={form.password} onChange={(event) => updateField('password', event.target.value)} />
                  </div>
                </div>

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
                      <input type="url" placeholder="Profile URL" value={social.url} onChange={(event) => updateArrayField('socials', index, 'url', event.target.value)} />
                      {form.socials.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('socials', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('socials', createSocial)}>Add Social</button>
                </div>

                <div className="trial-group">
                  <h2>Pictures</h2>
                  {form.pictures.map((picture, index) => (
                    <div key={`picture-${index}`} className="trial-row">
                      <input type="url" placeholder="Image URL" value={picture.url} onChange={(event) => updateArrayField('pictures', index, 'url', event.target.value)} />
                      {form.pictures.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('pictures', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('pictures', createPicture)}>Add Picture</button>
                </div>

                <div className="trial-group">
                  <h2>Properties for Sale</h2>
                  {form.propertiesForSale.map((property, index) => (
                    <div key={`sale-${index}`} className="trial-card trial-grid three-col">
                      <input type="url" placeholder="Image URL" value={property.image} onChange={(event) => updateArrayField('propertiesForSale', index, 'image', event.target.value)} />
                      <input type="text" placeholder="Address" value={property.address} onChange={(event) => updateArrayField('propertiesForSale', index, 'address', event.target.value)} />
                      <input type="text" placeholder="Price" value={property.price} onChange={(event) => updateArrayField('propertiesForSale', index, 'price', event.target.value)} />
                      <input type="text" placeholder="Bedrooms" value={property.bedrooms} onChange={(event) => updateArrayField('propertiesForSale', index, 'bedrooms', event.target.value)} />
                      <input type="text" placeholder="Bathrooms" value={property.bathrooms} onChange={(event) => updateArrayField('propertiesForSale', index, 'bathrooms', event.target.value)} />
                      <input type="url" placeholder="Listing link" value={property.listingLink} onChange={(event) => updateArrayField('propertiesForSale', index, 'listingLink', event.target.value)} />
                      <textarea className="trial-full" rows={3} placeholder="Short description" value={property.description} onChange={(event) => updateArrayField('propertiesForSale', index, 'description', event.target.value)} />
                      {form.propertiesForSale.length > 1 && <button type="button" className="btn btn-secondary" onClick={() => removeArrayItem('propertiesForSale', index)}>Remove</button>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('propertiesForSale', createSaleProperty)}>Add Property for Sale</button>
                </div>

                <div className="trial-group">
                  <h2>Sold Properties</h2>
                  {form.soldProperties.map((property, index) => (
                    <div key={`sold-${index}`} className="trial-card trial-grid three-col">
                      <input type="url" placeholder="Image URL" value={property.image} onChange={(event) => updateArrayField('soldProperties', index, 'image', event.target.value)} />
                      <input type="text" placeholder="Address" value={property.address} onChange={(event) => updateArrayField('soldProperties', index, 'address', event.target.value)} />
                      <input type="text" placeholder="Price" value={property.price} onChange={(event) => updateArrayField('soldProperties', index, 'price', event.target.value)} />
                      <input type="text" placeholder="Bedrooms" value={property.bedrooms} onChange={(event) => updateArrayField('soldProperties', index, 'bedrooms', event.target.value)} />
                      <input type="text" placeholder="Bathrooms" value={property.bathrooms} onChange={(event) => updateArrayField('soldProperties', index, 'bathrooms', event.target.value)} />
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
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPreview(true)}>Preview My Page</button>
                </div>

                {showPreview && (
                  <div className="trial-preview">
                    <h2>Preview</h2>
                    <p><strong>{form.agentName || 'Agent Name'}</strong> — {form.agentTitle || 'Agent Title'}</p>
                    <p>{form.headline || 'Headline preview will appear here.'}</p>
                    <p>{form.description || 'Description preview will appear here.'}</p>

                    <h3>Billing & Plan</h3>
                    <div className="trial-grid three-col">
                      <label><input type="radio" name="plan" value="free-trial" checked={billing.plan === 'free-trial'} onChange={(event) => setBilling((prev) => ({ ...prev, plan: event.target.value }))} /> Free Trial</label>
                      <label><input type="radio" name="plan" value="monthly" checked={billing.plan === 'monthly'} onChange={(event) => setBilling((prev) => ({ ...prev, plan: event.target.value }))} /> Monthly</label>
                      <label><input type="radio" name="plan" value="yearly" checked={billing.plan === 'yearly'} onChange={(event) => setBilling((prev) => ({ ...prev, plan: event.target.value }))} /> Yearly</label>
                    </div>

                    {billing.plan === 'free-trial' ? (
                      <p className="billing-note">Credit card is required now, but you will not be charged until the free trial ends.</p>
                    ) : (
                      <p className="billing-note">You selected a paid plan and will be charged today.</p>
                    )}

                    <div className="trial-grid two-col">
                      <input type="text" placeholder="Cardholder Name" value={billing.cardName} onChange={(event) => setBilling((prev) => ({ ...prev, cardName: event.target.value }))} />
                      <input type="text" placeholder="Card Number" value={billing.cardNumber} onChange={(event) => setBilling((prev) => ({ ...prev, cardNumber: event.target.value }))} />
                      <input type="text" placeholder="Expiry (MM/YY)" value={billing.expiry} onChange={(event) => setBilling((prev) => ({ ...prev, expiry: event.target.value }))} />
                      <input type="text" placeholder="CVC" value={billing.cvc} onChange={(event) => setBilling((prev) => ({ ...prev, cvc: event.target.value }))} />
                    </div>

                    {status.error && <p className="form-error">{status.error}</p>}
                    {status.success && <p className="form-success">{status.success}</p>}

                    <div className="trial-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowPreview(false)}>Back to Edit</button>
                      <button type="button" className="btn btn-primary" disabled={status.loading} onClick={submitTrial}>{status.loading ? 'Starting...' : 'Next: Start Trial'}</button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
