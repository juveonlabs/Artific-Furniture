import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { CONFIG } from '../config';
import './ContactSection.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const details = [
  {
    Icon: MapPin,
    label: 'Showrooms',
    lines: [
      'Artific Furniture, Mokila — 24,000 sq.ft',
      'Metilli, Gachibowli — 24,000 sq.ft',
      'Artific Extension, Toli Chowki — Opening Soon',
    ],
  },
  {
    Icon: Phone,
    label: 'Phone',
    lines: ['+91 99595 02020', '+91 63016 15247', '+91 99893 56785'],
  },
  {
    Icon: Mail,
    label: 'Email',
    lines: ['Artificfurniture2023@gmail.com'],
  },
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: CONFIG.WEB3FORMS_ACCESS_KEY,
          subject: `New Artific Contact: ${fields.subject || 'Inquiry'}`,
          from_name: "Artific Website Form",
          replyto: fields.email,
          name: fields.name,
          email: fields.email,
          user_subject: fields.subject || 'Inquiry',
          message: fields.message
        })
      });
      const data = await response.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">

        {/* Header */}
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="eyebrow">Contact</span>
          <h2 className="contact__title">
            Have something<br />
            <em>in mind?</em>
          </h2>
        </motion.div>

        {/* Two-column body */}
        <div className="contact__body">

          {/* Left — info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          >
            <p className="contact__intro">
              Visit one of our showrooms or reach out directly. We respond to every enquiry within one business day.
            </p>

            <ul className="contact__details">
              {details.map(({ Icon, label, lines }, i) => (
                <motion.li
                  key={label}
                  className="contact__detail"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
                >
                  <span className="contact__detail-icon">
                    <Icon size={14} strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="contact__detail-label">{label}</span>
                    {lines.map(line => (
                      <span key={line} className="contact__detail-value">{line}</span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            {sent ? (
              <div className="contact__success">
                <motion.span
                  className="contact__success-mark"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  ✦
                </motion.span>
                <h3 className="contact__success-title">Message received.</h3>
                <p className="contact__success-body">
                  Thank you for reaching out. We'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="c-name">Full Name</label>
                    <div className="contact__input-wrap">
                      <input
                        id="c-name"
                        className="contact__input"
                        type="text"
                        placeholder="Your name"
                        required
                        value={fields.name}
                        onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="c-email">Email Address</label>
                    <div className="contact__input-wrap">
                      <input
                        id="c-email"
                        className="contact__input"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={fields.email}
                        onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="c-subject">Subject</label>
                  <div className="contact__input-wrap">
                    <input
                      id="c-subject"
                      className="contact__input"
                      type="text"
                      placeholder="Bespoke commission, showroom visit…"
                      value={fields.subject}
                      onChange={e => setFields(f => ({ ...f, subject: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="c-message">Message</label>
                  <div className="contact__input-wrap">
                    <textarea
                      id="c-message"
                      className="contact__input contact__textarea"
                      placeholder="Tell us about your project or enquiry…"
                      required
                      rows={5}
                      value={fields.message}
                      onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="contact__footer">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <p className="contact__note">
                      We respect your privacy and never share your information.
                    </p>
                    {error && (
                      <p style={{ color: '#e05d5d', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.04em' }}>
                        {error}
                      </p>
                    )}
                  </div>
                  <button type="submit" className="btn-primary contact__submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={15} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
