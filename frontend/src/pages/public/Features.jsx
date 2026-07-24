import React from 'react';
import { 
  FileText, 
  Tag, 
  Clock, 
  Search, 
  Moon, 
  Shield, 
  Share2, 
  Cloud,
  Smartphone,
  Zap
} from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: <FileText size={32} />,
      title: 'Rich Text Formatting',
      desc: 'Bold, italicize, create lists, and structure your thoughts beautifully with our powerful rich text editor.'
    },
    {
      icon: <Tag size={32} />,
      title: 'Smart Organization',
      desc: 'Use custom tags, nested folders, and color-coded labels to keep everything exactly where it belongs.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Integrated Reminders',
      desc: 'Never forget an important task. Set time-based or location-based reminders directly on your notes.'
    },
    {
      icon: <Search size={32} />,
      title: 'Lightning Fast Search',
      desc: 'Find what you need instantly. Our search engine indexes every word so you can locate notes in milliseconds.'
    },
    {
      icon: <Moon size={32} />,
      title: 'Beautiful Dark Mode',
      desc: 'Work comfortably at night. Our meticulously designed dark mode reduces eye strain and looks stunning.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Enterprise-Grade Security',
      desc: 'Your data is encrypted at rest and in transit. Rest easy knowing your private thoughts stay private.'
    },
    {
      icon: <Share2 size={32} />,
      title: 'Seamless Collaboration',
      desc: 'Share notes with friends, family, or colleagues. Work together in real-time with granular permissions.'
    },
    {
      icon: <Cloud size={32} />,
      title: 'Auto-Sync Everywhere',
      desc: 'Start writing on your phone, finish on your laptop. Your notes sync automatically across all your devices.'
    }
  ];

  return (
    <div className="features-page">
      {/* Hero */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-light) 100%)', padding: '6rem 2rem', textAlign: 'center' }}>
        <div className="badge" style={{ margin: '0 auto 1rem auto' }}>
          <Zap size={16} />
          <span>Powerful Capabilities</span>
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Features that Empower You</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Discover all the tools we've built to help you capture, organize, and access your ideas seamlessly.
        </p>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {featuresList.map((f, i) => (
            <div key={i} className="feature-card card" style={{ padding: '2rem', transition: 'transform 0.2s', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              <div className="btn-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '64px', height: '64px', marginBottom: '1.5rem' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
