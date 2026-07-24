import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in required fields');
      return;
    }
    // Simulate send
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="hero" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Have questions? We'd love to hear from you.</p>
      </section>

      <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem' }}>
          
          {/* Contact Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Your Name *</label>
                  <input type="text" className="input" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address *</label>
                  <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Subject</label>
                <input type="text" className="input" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
              </div>
              <div className="input-group" style={{ marginBottom: '2rem' }}>
                <label className="input-label">Message *</label>
                <textarea className="input" name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="Your message here..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: 'var(--primary-light)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="btn-icon" style={{ background: 'white', color: 'var(--primary)' }}><Mail /></div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Email Us</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Our team is here to help.</p>
                  <a href="mailto:support@smartnotes.com" style={{ color: 'var(--primary)', fontWeight: '500', textDecoration: 'none' }}>support@smartnotes.com</a>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', marginBottom: '2rem', background: 'var(--bg-secondary)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="btn-icon" style={{ background: 'white', color: 'var(--secondary)' }}><Phone /></div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Call Us</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15550000000" style={{ color: 'var(--secondary)', fontWeight: '500', textDecoration: 'none' }}>+1 (555) 000-0000</a>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="btn-icon" style={{ background: 'white', color: 'var(--accent)' }}><MapPin /></div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Visit Us</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Come say hello at our HQ.</p>
                  <address style={{ fontStyle: 'normal', color: 'var(--text-secondary)' }}>
                    123 Innovation Drive<br/>
                    San Francisco, CA 94107
                  </address>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
