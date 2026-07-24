import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 6) score += 33;
    if (password.match(/[A-Z]/) && password.match(/[a-z]/)) score += 33;
    if (password.match(/[0-9!@#$%^&*]/)) score += 34;
    return score;
  };

  const strength = getPasswordStrength();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to register';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '150px', height: '150px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '200px', height: '200px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
      
      <div className="auth-card card">
        <div className="auth-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
          <Sparkles size={40} />
        </div>
        <h2 className="auth-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create an Account</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Join SmartNotes today</p>
        
        <form onSubmit={handleRegister}>
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label className="input-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', color: 'var(--text-secondary)' }}>
                <User size={18} />
              </div>
              <input 
                type="text" 
                className="input" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: '35px' }}
              />
            </div>
          </div>
          
          <div className="input-group" style={{ marginBottom: '1rem' }}>
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
              />
            </div>
          </div>
          
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', color: 'var(--text-secondary)' }}>
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                className="input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '35px', paddingRight: '40px' }}
              />
              <button 
                type="button"
                className="btn-icon"
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '5px', background: 'transparent' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${strength}%`, 
                    background: strength < 50 ? 'var(--danger)' : strength < 80 ? 'var(--warning)' : 'var(--success)',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Password strength</small>
              </div>
            )}
          </div>
          
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label className="input-label">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', color: 'var(--text-secondary)' }}>
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                className="input" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingLeft: '35px' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '0.5rem' }}>
            <input type="checkbox" id="terms" style={{ marginTop: '0.25rem' }} />
            <label htmlFor="terms" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              I agree to the <Link to="/terms" style={{ color: 'var(--primary)' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
