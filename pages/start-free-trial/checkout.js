import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

const formatDate = (value) => value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export default function TrialCheckoutPage() {
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [form, setForm] = useState(null);
  const [account, setAccount] = useState({ email: '', password: '' });
  const [billing, setBilling] = useState({ plan: 'free-trial', cardName: '', cardNumber: '', expiry: '', cvc: '' });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const raw = window.sessionStorage.getItem('trialDraft');
    if (!raw) {
      return;
    }

    try {
      setForm(JSON.parse(raw));
    } catch {
      setForm(null);
    }
  }, []);

  const pricingDetails = useMemo(() => {
    const today = new Date();
    const trialChargeDate = addDays(today, 7);
    const monthlyNextCharge = addDays(today, 30);
    const yearlyNextCharge = addDays(today, 365);

    return {
      todayLabel: formatDate(today),
      trialChargeDate: formatDate(trialChargeDate),
      monthlyNextCharge: formatDate(monthlyNextCharge),
      yearlyNextCharge: formatDate(yearlyNextCharge),
    };
  }, []);

  const submitTrial = async () => {
    setStatus({ loading: true, error: '', success: '' });

    const response = await fetch('/api/trial-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        account,
        billing,
      }),
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
        <title>Checkout | AgentOS</title>
        <meta name="description" content="Create account and select your AgentOS service plan before starting your trial." />
      </Head>

      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="pricing-layout">
        <main id="main-content" className="contact-page trial-page">
          <section className="contact-page-layer" aria-labelledby="checkout-title">
            <div className="container contact-page-shell">
              <div className="contact-page-copy">
                <p className="hero-chip">Checkout</p>
                <h1 id="checkout-title">Create Account & Choose Plan</h1>
                <p>Today is {pricingDetails.todayLabel}. Create your account, choose plan, and add billing details.</p>
              </div>

              <div className="contact-page-form trial-form trial-checkout-form">
                {!form && (
                  <div className="trial-preview">
                    <p>We could not find your page draft. Please return to the builder and click Preview again.</p>
                    <div className="trial-actions">
                      <a className="btn btn-secondary" href="/start-free-trial">Back to Builder</a>
                    </div>
                  </div>
                )}

                {form && (
                  <>
                    <div className="trial-group">
                      <h2>Account Creation (Firebase)</h2>
                      <p>Use Firebase sign-in options below (Google, Apple, or create your own account).</p>
                      <div className="trial-actions">
                        <button type="button" className="btn btn-secondary">Continue with Google</button>
                        <button type="button" className="btn btn-secondary">Continue with Apple</button>
                      </div>
                      <div className="trial-grid two-col">
                        <input type="text" placeholder="Email for account creation" value={account.email} onChange={(event) => setAccount((prev) => ({ ...prev, email: event.target.value }))} />
                        <input type="password" placeholder="Create password" value={account.password} onChange={(event) => setAccount((prev) => ({ ...prev, password: event.target.value }))} />
                      </div>
                    </div>

                    <div className="trial-group">
                      <h2>Service Plan</h2>
                      <div className="trial-grid three-col">
                        <label><input type="radio" name="plan" value="free-trial" checked={billing.plan === 'free-trial'} onChange={(event) => setBilling((prev) => ({ ...prev, plan: event.target.value }))} /> Free Trial</label>
                        <label><input type="radio" name="plan" value="monthly" checked={billing.plan === 'monthly'} onChange={(event) => setBilling((prev) => ({ ...prev, plan: event.target.value }))} /> Monthly</label>
                        <label><input type="radio" name="plan" value="yearly" checked={billing.plan === 'yearly'} onChange={(event) => setBilling((prev) => ({ ...prev, plan: event.target.value }))} /> Yearly</label>
                      </div>

                      {billing.plan === 'free-trial' && (
                        <p className="billing-note">No charge today. You will be charged in 7 days on {pricingDetails.trialChargeDate} (+ local tax).</p>
                      )}
                      {billing.plan === 'monthly' && (
                        <p className="billing-note">You will be charged $50 today (+ local tax). Your next charge date is {pricingDetails.monthlyNextCharge}.</p>
                      )}
                      {billing.plan === 'yearly' && (
                        <p className="billing-note">You will be charged $500 today (+ local tax). Your next charge date is {pricingDetails.yearlyNextCharge}.</p>
                      )}
                    </div>

                    <div className="trial-group">
                      <h2>Billing Information (Stripe-ready section)</h2>
                      <div className="trial-grid two-col">
                        <input type="text" placeholder="Cardholder Name" value={billing.cardName} onChange={(event) => setBilling((prev) => ({ ...prev, cardName: event.target.value }))} />
                        <input type="text" placeholder="Card Number" value={billing.cardNumber} onChange={(event) => setBilling((prev) => ({ ...prev, cardNumber: event.target.value }))} />
                        <input type="text" placeholder="Expiry (MM/YY)" value={billing.expiry} onChange={(event) => setBilling((prev) => ({ ...prev, expiry: event.target.value }))} />
                        <input type="text" placeholder="CVC" value={billing.cvc} onChange={(event) => setBilling((prev) => ({ ...prev, cvc: event.target.value }))} />
                      </div>
                    </div>

                    {status.error && <p className="form-error">{status.error}</p>}
                    {status.success && <p className="form-success">{status.success}</p>}

                    <div className="trial-actions">
                      <a className="btn btn-secondary" href="/start-free-trial">Back to Builder</a>
                      <button type="button" className="btn btn-primary" disabled={status.loading} onClick={submitTrial}>{status.loading ? 'Starting...' : 'Start Trial'}</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
