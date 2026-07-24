import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="card" style={{ marginBottom: '1rem', cursor: 'pointer', border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border)' }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{question}</h3>
        <div style={{ color: isOpen ? 'var(--primary)' : 'var(--text-secondary)' }}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <div style={{ 
        maxHeight: isOpen ? '500px' : '0', 
        overflow: 'hidden', 
        transition: 'max-height 0.3s ease-in-out',
        padding: isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem'
      }}>
        <p style={{ color: 'var(--text-secondary)', margin: 0, borderTop: isOpen ? '1px solid var(--border)' : 'none', paddingTop: isOpen ? '1rem' : '0' }}>
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is SmartNotes?",
      a: "SmartNotes is a modern, intuitive note-taking application designed to help you capture ideas, organize your thoughts, and manage your tasks efficiently across all your devices."
    },
    {
      q: "Is SmartNotes free to use?",
      a: "Yes! We offer a generous Free plan that includes up to 100 notes and basic formatting. For advanced features like unlimited notes, cloud sync, and collaboration, you can upgrade to our Pro or Enterprise plans."
    },
    {
      q: "How does cloud sync work?",
      a: "With our Pro and Enterprise plans, your notes are automatically synchronized across all your devices (web, desktop, and mobile) in real-time. Any change you make on one device will instantly reflect on others."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We take privacy and security very seriously. All your data is encrypted both in transit (using TLS) and at rest. We never sell your personal information to third parties."
    },
    {
      q: "Can I collaborate with others?",
      a: "Yes, collaboration features are available on our Enterprise plan. You can share specific notes or entire folders with colleagues, set read/write permissions, and edit documents together in real-time."
    },
    {
      q: "Can I export my notes?",
      a: "Yes, you can easily export your notes at any time in various formats including Markdown, PDF, and HTML, ensuring you always have access to your data."
    },
    {
      q: "Is there a dark mode?",
      a: "Yes! SmartNotes comes with a beautifully designed dark mode that can be toggled manually or set to sync automatically with your system preferences."
    },
    {
      q: "How can I contact support?",
      a: "You can reach our support team by visiting the Contact page, sending an email to support@smartnotes.com, or using the in-app chat widget if you are a Pro or Enterprise user."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-page">
      <section className="hero" style={{ padding: '5rem 2rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Everything you need to know about the product and billing.
        </p>
      </section>

      <section className="section" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        {faqs.map((faq, i) => (
          <FAQItem 
            key={i} 
            question={faq.q} 
            answer={faq.a} 
            isOpen={openIndex === i} 
            onClick={() => handleToggle(i)} 
          />
        ))}
        
        <div className="note-card" style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Still have questions?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="/contact" className="btn btn-primary">Get in touch</a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
