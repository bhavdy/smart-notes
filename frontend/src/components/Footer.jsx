import React from 'react';
import { Link } from 'react-router-dom';
import { GitFork, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand footer-col">
            <Link to="/" className="nav-logo">
              Smart<span>Notes</span>
            </Link>
            <p>Capture your thoughts, organize your life. The smartest note-taking app on the web.</p>
            <div className="flex gap-4 mt-4">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                style={{ color: 'rgba(255,255,255,0.5)', transition: 'var(--transition-fast)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--clr-primary-400)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                aria-label="GitHub">
                <GitFork size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                style={{ color: 'rgba(255,255,255,0.5)', transition: 'var(--transition-fast)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--clr-primary-400)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                aria-label="Twitter">
                <MessageCircle size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                style={{ color: 'rgba(255,255,255,0.5)', transition: 'var(--transition-fast)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--clr-primary-400)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                aria-label="LinkedIn">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h6>Product</h6>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h6>Company</h6>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">Help Center</Link>
            <Link to="/contact">Careers</Link>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h6>Legal</h6>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Cookie Policy</Link>
            <Link to="/contact">Security</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SmartNotes. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy</Link>
            <Link to="/terms" style={{ color: 'rgba(255,255,255,0.5)' }}>Terms</Link>
            <Link to="/contact" style={{ color: 'rgba(255,255,255,0.5)' }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
