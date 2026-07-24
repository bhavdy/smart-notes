import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
          <Sparkles size={40} />
        </div>
        
        {!isSubmitted ? (
          <>
            <h2 className="auth-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Reset Password</h2>
            <p className="auth-subtitle" style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', color: 'var(--text-secondary)' }}>
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    className="input" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '35px' }}
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success)', color: 'white', marginBottom: '1.5rem' }}>
              <CheckCircle size={32} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Check your email</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              We have sent a password reset link to <strong>{email}</strong>.
            </p>
          </div>
        )}
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
