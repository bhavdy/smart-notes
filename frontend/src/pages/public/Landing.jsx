import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  Tag, 
  Clock, 
  Search, 
  Moon, 
  Shield,
  Star,
  CheckCircle,
  Zap,
  Layout,
  Users
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '150px', height: '150px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '200px', height: '200px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
        
        <div className="badge">
          <Sparkles size={16} />
          <span>✨ The Smartest Way to Take Notes</span>
        </div>
        
        <h1>Organize Your Thoughts with <span className="highlight">SmartNotes</span></h1>
        
        <p>Capture ideas, organize effortlessly, and never lose track of your thoughts again. Join thousands of users who have transformed their productivity.</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/register" className="btn btn-primary">Get Started Free</Link>
          <Link to="/features" className="btn btn-ghost">See Features</Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '2rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0' }}>50K+</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0' }}>Users</p>
        </div>
        <div style={{ width: '1px', background: 'var(--border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0' }}>2M+</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0' }}>Notes</p>
        </div>
        <div style={{ width: '1px', background: 'var(--border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0' }}>99.9%</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0' }}>Uptime</p>
        </div>
        <div style={{ width: '1px', background: 'var(--border)' }}></div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0' }}>4.9★</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0' }}>Rating</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-header">
          <h2>Everything you need to stay organized</h2>
          <p>Powerful features designed to help you work smarter, not harder.</p>
        </div>
        
        <div className="grid-3">
          <div className="feature-card card">
            <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
              <FileText />
            </div>
            <h3>Rich Text Editor</h3>
            <p>Format your notes exactly how you want with our intuitive WYSIWYG editor.</p>
          </div>
          <div className="feature-card card">
            <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Tag />
            </div>
            <h3>Smart Labels</h3>
            <p>Organize notes with tags and labels to find them instantly.</p>
          </div>
          <div className="feature-card card">
            <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Clock />
            </div>
            <h3>Reminders</h3>
            <p>Set custom reminders so you never miss an important task or idea.</p>
          </div>
          <div className="feature-card card">
            <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Search />
            </div>
            <h3>Powerful Search</h3>
            <p>Find any note instantly with our blazing fast full-text search.</p>
          </div>
          <div className="feature-card card">
            <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Moon />
            </div>
            <h3>Dark Mode</h3>
            <p>Easy on the eyes with a beautiful dark mode that automatically syncs with your system.</p>
          </div>
          <div className="feature-card card">
            <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Shield />
            </div>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and stored securely. We never sell your personal information.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in three simple steps</p>
        </div>
        <div className="grid-3">
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="badge" style={{ fontSize: '1.5rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1rem auto' }}>1</div>
            <h3>Sign Up</h3>
            <p>Create your free account in seconds with just an email and password.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="badge" style={{ fontSize: '1.5rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1rem auto' }}>2</div>
            <h3>Create Notes</h3>
            <p>Start jotting down ideas, lists, or full documents with our rich editor.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="badge" style={{ fontSize: '1.5rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1rem auto' }}>3</div>
            <h3>Stay Organized</h3>
            <p>Use labels, folders, and search to keep everything structured perfectly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="section-header">
          <h2>Loved by thousands</h2>
          <p>Here's what our users have to say about SmartNotes.</p>
        </div>
        <div className="grid-3">
          <div className="glass card">
            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
              <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"SmartNotes completely changed how I manage my daily tasks and long-term projects. It's incredibly fast and reliable."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>JD</div>
              <div>
                <h4 style={{ margin: 0 }}>John Doe</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Product Manager</p>
              </div>
            </div>
          </div>
          <div className="glass card">
            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
              <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"The minimalist design combined with powerful features like smart labels makes this my go-to app for everything."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>AS</div>
              <div>
                <h4 style={{ margin: 0 }}>Alice Smith</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Freelance Writer</p>
              </div>
            </div>
          </div>
          <div className="glass card">
            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
              <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"I've tried every note app out there. SmartNotes is the perfect balance of simplicity and capability. 10/10."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>MJ</div>
              <div>
                <h4 style={{ margin: 0 }}>Mike Johnson</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: 'white' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Ready to get started?</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>Join thousands of users organizing their lives with SmartNotes.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>Create Free Account</Link>
          <Link to="/contact" className="btn btn-ghost" style={{ border: '1px solid white', color: 'white' }}>Contact Sales</Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
