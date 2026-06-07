import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { ArrowRight, MapPin, Mail } from 'lucide-react';
import Footer from '../components/Footer';
import { CONFIG } from '../config';
import './ContactPage.css';

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
    Icon: Mail,
    label: 'Email',
    lines: ['Artificfurniture2023@gmail.com'],
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

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
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="contact-page-hero" ref={heroRef}>
        <div className="container">
          <motion.span
            className="eyebrow contact-page-hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            Get in Touch
          </motion.span>

          <motion.h1
            className="contact-page-hero__title"
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
          >
            Begin your<br /><em>project with us.</em>
          </motion.h1>

          <motion.p
            className="contact-page-hero__desc"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
          >
            Visit one of our showrooms or reach out directly.
            We respond to every enquiry within one business day.
          </motion.p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────── */}
      <section className="contact-page-body">
        <div className="container">
          <div className="contact-page-body__grid">

            {/* Left — details */}
            <motion.div
              className="contact-page-details"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              <ul className="contact-page-details__list">
                {details.map(({ Icon, label, lines }, i) => (
                  <motion.li
                    key={label}
                    className="contact-page-detail"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  >
                    <span className="contact-page-detail__icon">
                      <Icon size={14} strokeWidth={1.5} />
                    </span>
                    <div>
                      <span className="contact-page-detail__label">{label}</span>
                      {lines.map(line => (
                        <span key={line} className="contact-page-detail__value">{line}</span>
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right — form */}
            <motion.div
              className="contact-page-form-wrap"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
            >
              {sent ? (
                <div className="contact-page-success">
                  <motion.span
                    className="contact-page-success__mark"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    ✦
                  </motion.span>
                  <h3 className="contact-page-success__title">Message received.</h3>
                  <p className="contact-page-success__body">
                    Thank you for reaching out. We'll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form className="contact-page-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-page-form__row">
                    <div className="contact-page-form__field">
                      <label className="contact-page-form__label" htmlFor="cp-name">Full Name</label>
                      <div className="contact-page-form__input-wrap">
                        <input
                          id="cp-name"
                          className="contact-page-form__input"
                          type="text"
                          placeholder="Your name"
                          required
                          value={fields.name}
                          onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="contact-page-form__field">
                      <label className="contact-page-form__label" htmlFor="cp-email">Email Address</label>
                      <div className="contact-page-form__input-wrap">
                        <input
                          id="cp-email"
                          className="contact-page-form__input"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={fields.email}
                          onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="contact-page-form__field">
                    <label className="contact-page-form__label" htmlFor="cp-subject">Subject</label>
                    <div className="contact-page-form__input-wrap">
                      <input
                        id="cp-subject"
                        className="contact-page-form__input"
                        type="text"
                        placeholder="Bespoke commission, showroom visit…"
                        value={fields.subject}
                        onChange={e => setFields(f => ({ ...f, subject: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="contact-page-form__field">
                    <label className="contact-page-form__label" htmlFor="cp-message">Message</label>
                    <div className="contact-page-form__input-wrap">
                      <textarea
                        id="cp-message"
                        className="contact-page-form__input contact-page-form__textarea"
                        placeholder="Tell us about your project or enquiry…"
                        required
                        rows={6}
                        value={fields.message}
                        onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="contact-page-form__footer">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <p className="contact-page-form__note">
                        We respect your privacy and never share your information.
                      </p>
                      {error && (
                        <p style={{ color: '#e05d5d', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.04em' }}>
                          {error}
                        </p>
                      )}
                    </div>
                    <button type="submit" className="btn-primary contact-page-form__submit" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
