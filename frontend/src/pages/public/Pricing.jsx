import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pricing-page">
      <section className="hero" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Choose the plan that best fits your needs.
        </p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '50px', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className={`btn ${!annual ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ borderRadius: '50px', padding: '0.5rem 1.5rem' }}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button 
            className={`btn ${annual ? 'btn-primary' : 'btn-ghost'}`} 
            style={{ borderRadius: '50px', padding: '0.5rem 1.5rem' }}
            onClick={() => setAnnual(true)}
          >
            Annually <span className="badge" style={{ marginLeft: '0.5rem', background: 'var(--success)', color: 'white', padding: '2px 6px', fontSize: '0.7rem' }}>Save 20%</span>
          </button>
        </div>
      </section>

      <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem 2rem' }}>
        <div className="grid-3" style={{ alignItems: 'center' }}>
          
          {/* Free Plan */}
          <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Free</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Perfect for getting started</p>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              $0<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/mo</span>
            </div>
            <Link to="/register" className="btn btn-ghost" style={{ width: '100%', marginBottom: '2rem', border: '1px solid var(--border)' }}>Get Started</Link>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Up to 100 Notes</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Basic Formatting</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Web Access</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}><X size={20} /> Cloud Sync</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}><X size={20} /> Collaboration</div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="card" style={{ padding: '3rem', border: '2px solid var(--primary)', transform: 'scale(1.05)', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.875rem' }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>For power users and professionals</p>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--primary)' }}>
              ${annual ? '9' : '12'}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/mo</span>
            </div>
            <Link to="/register" className="btn btn-primary" style={{ width: '100%', marginBottom: '2rem' }}>Start Free Trial</Link>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Unlimited Notes</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Advanced Formatting</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Cross-device Sync</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Smart Labels & Tags</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Priority Support</div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>For teams and businesses</p>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              ${annual ? '29' : '39'}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/mo</span>
            </div>
            <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', marginBottom: '2rem' }}>Contact Sales</Link>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Everything in Pro</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Real-time Collaboration</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Admin Dashboard</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> Custom Domain</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={20} color="var(--success)" /> 24/7 Dedicated Support</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Pricing;
