import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useEnquire } from '../context/EnquireContext';
import { CONFIG } from '../config';
import './EnquireModal.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.3, ease: EASE } },
};

export default function EnquireModal() {
  const { isOpen, close, productName } = useEnquire();
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  /* Reset form when modal opens */
  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setError('');
      setFields({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => firstInputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

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
          subject: `Artific Product Enquiry: ${productName}`,
          from_name: "Artific Product Enquiry",
          replyto: fields.email,
          "Product Name": productName,
          name: fields.name,
          email: fields.email,
          phone: fields.phone || 'Not provided',
          message: fields.message
        })
      });
      const data = await response.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || 'Failed to send enquiry. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="eq-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={close}
          aria-modal="true"
          role="dialog"
          aria-label={`Enquire about ${productName}`}
        >
          <motion.div
            className="eq-panel"
            variants={panelVariants}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="eq-panel__head">
              <div>
                <span className="eyebrow eq-panel__eyebrow">Enquire</span>
                <h2 className="eq-panel__title">{productName}</h2>
              </div>
              <button className="eq-panel__close" onClick={close} aria-label="Close">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            {sent ? (
              <div className="eq-success">
                <motion.span
                  className="eq-success__mark"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  ✦
                </motion.span>
                <h3 className="eq-success__title">Enquiry received.</h3>
                <p className="eq-success__body">
                  Thank you for your interest in <em>{productName}</em>. Our team will be in touch within one business day.
                </p>
                <button className="btn-outline eq-success__btn" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <form className="eq-form" onSubmit={handleSubmit} noValidate>
                <div className="eq-form__row">
                  <div className="eq-field">
                    <label className="eq-label" htmlFor="eq-name">Full Name</label>
                    <div className="eq-input-wrap">
                      <input
                        ref={firstInputRef}
                        id="eq-name"
                        className="eq-input"
                        type="text"
                        placeholder="Your name"
                        required
                        value={fields.name}
                        onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="eq-field">
                    <label className="eq-label" htmlFor="eq-email">Email Address</label>
                    <div className="eq-input-wrap">
                      <input
                        id="eq-email"
                        className="eq-input"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={fields.email}
                        onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="eq-field">
                  <label className="eq-label" htmlFor="eq-phone">Phone <span className="eq-label--opt">(optional)</span></label>
                  <div className="eq-input-wrap">
                    <input
                      id="eq-phone"
                      className="eq-input"
                      type="tel"
                      placeholder="+1 000 000 0000"
                      value={fields.phone}
                      onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="eq-field">
                  <label className="eq-label" htmlFor="eq-message">Message</label>
                  <div className="eq-input-wrap">
                    <textarea
                      id="eq-message"
                      className="eq-input eq-textarea"
                      placeholder="Custom dimensions, finish, lead time questions…"
                      required
                      rows={4}
                      value={fields.message}
                      onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="eq-form__foot">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
                    <p className="eq-note">We respond to every enquiry within one business day.</p>
                    {error && (
                      <p style={{ color: '#e05d5d', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.04em' }}>
                        {error}
                      </p>
                    )}
                  </div>
                  <button type="submit" className="btn-primary eq-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Enquiry'} <ArrowRight size={15} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
