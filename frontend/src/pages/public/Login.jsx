import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(email, password);
      toast.success('Login successful!');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '150px', height: '150px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '200px', height: '200px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
      
      <div className="auth-card card">
        <div className="auth-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
          <Sparkles size={40} />
        </div>
        <h2 className="auth-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Sign in to continue to SmartNotes</p>
        
        <form onSubmit={handleLogin}>
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
            <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              Password
              <Link to="/forgot-password" style={{ color: 'var(--primary)', fontSize: '0.875rem', textDecoration: 'none' }}>Forgot Password?</Link>
            </label>
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
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Remember me</label>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Sign up</Link>
        </p>
        
        <div className="note-card" style={{ marginTop: '2rem', fontSize: '0.875rem' }}>
          <strong>Demo Credentials:</strong><br/>
          User: user@smartnotes.com / User@123<br/>
          Admin: admin@smartnotes.com / Admin@123
        </div>
      </div>
    </div>
  );
};

export default Login;
