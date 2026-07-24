import React from 'react';
import { Target, Users, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero" style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>About SmartNotes</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          We believe that organizing your thoughts shouldn't be a chore. Our mission is to build the world's most intuitive and powerful note-taking experience.
        </p>
      </section>

      {/* Mission Section */}
      <section className="section" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Started in 2023, SmartNotes was born out of frustration with cluttered, slow, and overly complex note-taking apps. We wanted a tool that got out of the way and let us focus on what matters: our ideas.
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '1rem' }}>
              Today, thousands of users rely on SmartNotes daily to capture inspiration, manage projects, and stay organized.
            </p>
          </div>
          <div className="card glass" style={{ padding: '3rem', background: 'var(--primary-light)' }}>
            <Target size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem' }}>Focus on simplicity without sacrificing power.</h3>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Meet the Team</h2>
          <p>The passionate people behind SmartNotes.</p>
        </div>
        <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
              AJ
            </div>
            <h3>Alex Johnson</h3>
            <p style={{ color: 'var(--primary)', fontWeight: '500' }}>CEO & Founder</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Former product lead with a passion for productivity tools.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--secondary)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
              SM
            </div>
            <h3>Sarah Miller</h3>
            <p style={{ color: 'var(--primary)', fontWeight: '500' }}>CTO</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Engineering veteran who loves building fast, reliable systems.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
              DL
            </div>
            <h3>David Lee</h3>
            <p style={{ color: 'var(--primary)', fontWeight: '500' }}>Head of Design</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Obsessed with creating beautiful, user-centric interfaces.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '6rem 2rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Our Values</h2>
        </div>
        <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="card">
            <Heart size={32} color="var(--danger)" style={{ marginBottom: '1rem' }} />
            <h3>User First</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Every decision we make starts with what's best for our users. We listen, adapt, and improve constantly.</p>
          </div>
          <div className="card">
            <Shield size={32} color="var(--success)" style={{ marginBottom: '1rem' }} />
            <h3>Privacy by Default</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Your notes are yours. We believe in strong encryption and zero-knowledge architecture.</p>
          </div>
          <div className="card">
            <Users size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3>Community Driven</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We build in public and value the feedback of our amazing community to shape our roadmap.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
