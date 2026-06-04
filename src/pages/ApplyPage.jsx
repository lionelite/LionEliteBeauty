import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SERVICE_ID   = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TMPL_ADMIN   = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN
const TMPL_CLIENT  = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT
const PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const programs = [
  { value: 'muscle', label: 'Muscle & Recovery', accent: '#C9A96E' },
  { value: 'neuro', label: 'Neuro / Cognitive', accent: '#8A9E85' },
  { value: 'fertility', label: 'Fertility & Hormonal', accent: '#B8A4D4' },
  { value: 'hair', label: 'Hair Restoration', accent: '#C4A265' },
  { value: 'weight', label: 'Weight & Metabolic', accent: '#5BA87A' },
  { value: 'longevity', label: 'Longevity & Anti-Aging', accent: '#7A9FBF' },
  { value: 'skin', label: 'Skin Improvement', accent: '#C9A96E' },
  { value: 'general', label: 'General Wellness', accent: '#8A9E85' },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  goal: '',
  experience: '',
  struggle: '',
  timeline: '',
  investment: '',
  commitment: '',
  health: '',
}

export default function ApplyPage() {
  const [searchParams] = useSearchParams()
  const programTag = searchParams.get('program') || ''
  const [form, setForm] = useState({ ...initialForm, goal: programTag })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.goal) e.goal = 'Please select a goal'
    if (!form.experience) e.experience = 'Please select one'
    if (!form.timeline) e.timeline = 'Please select one'
    if (!form.investment) e.investment = 'Please select one'
    if (!form.commitment) e.commitment = 'Please select one'
    return e
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)
    setSendError(false)

    const goalLabel = programs.find(p => p.value === form.goal)?.label || form.goal

    const templateVars = {
      from_name:   form.name,
      from_email:  form.email,
      phone:       form.phone || 'Not provided',
      program:     goalLabel,
      experience:  form.experience,
      struggle:    form.struggle || 'Not provided',
      timeline:    form.timeline,
      investment:  form.investment,
      commitment:  form.commitment,
      health:      form.health || 'Not provided',
      reply_to:    form.email,
    }

    try {
      // 1. Notify admin (info@lionelitebeauty.com receives full application)
      await emailjs.send(SERVICE_ID, TMPL_ADMIN, templateVars, PUBLIC_KEY)
      // 2. Send confirmation to applicant
      await emailjs.send(SERVICE_ID, TMPL_CLIENT, templateVars, PUBLIC_KEY)
      setSubmitted(true)
      window.scrollTo(0, 0)
    } catch (err) {
      console.error('Submission error:', err)
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px' }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div style={{ width: '56px', height: '56px', border: '1px solid #C9A96E44', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <span style={{ color: '#C9A96E', fontSize: '22px' }}>✔</span>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }}
              className="uppercase">Application Received</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.12', marginBottom: '20px' }}
              className="font-normal">
              We've received<br />your application.
            </h1>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '16px', lineHeight: '1.9', marginBottom: '48px' }}>
              We review every application personally. You'll hear from us within <strong style={{ color: '#FAFAF8' }}>24–48 hours</strong> with next steps tailored to your goals.
            </p>

            <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '40px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }}
                className="uppercase">Want to move faster?</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.3', marginBottom: '12px' }}
                className="font-normal">Book a consultation call directly.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '14px', lineHeight: '1.8', marginBottom: '24px' }}>
                Skip the wait — schedule a 20-minute call and we'll walk through your goals and the right protocol for you.
              </p>
              <a href="https://calendly.com/a-ringfield-trustetc" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '16px 40px', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                Book Your Call →
              </a>
            </div>

            <Link to="/"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">
              ← Return to Home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #111' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }}
            className="uppercase">Program Application</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3rem', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}
            className="font-normal">
            Apply for a Personalized<br />Peptide Optimization Program.
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '16px', lineHeight: '1.9', maxWidth: '560px', marginBottom: '16px' }}>
            This short application helps us understand your goals and determine the best protocol for you. Every response is reviewed personally before we reach out.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', padding: '10px 16px' }}>
            <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '12px', letterSpacing: '0.08em' }}>We only take on a limited number of clients at a time.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <form onSubmit={handleSubmit} noValidate>

            {/* ── 1. Basic Info ── */}
            <FormBlock label="01" title="Your Details" subtitle="Keep it brief — just the basics.">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name *" error={errors.name}>
                  <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)}
                    placeholder="Your full name" style={inputStyle(errors.name)} />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                    placeholder="you@email.com" style={inputStyle(errors.email)} />
                </Field>
              </div>
              <Field label="Phone Number (optional)">
                <input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)}
                  placeholder="+1 (000) 000-0000" style={inputStyle()} />
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 2. Primary Goal ── */}
            <FormBlock label="02" title="Primary Goal" subtitle="What are you looking to achieve? Select the one that fits best.">
              <Field label="What is your main goal? *" error={errors.goal}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {programs.map(p => (
                    <button key={p.value} type="button"
                      onClick={() => handleChange('goal', p.value)}
                      style={{
                        padding: '12px 8px',
                        backgroundColor: form.goal === p.value ? '#0F0F0F' : '#0A0A0A',
                        border: form.goal === p.value ? `1px solid ${p.accent}` : '1px solid #1A1A1A',
                        color: form.goal === p.value ? '#FAFAF8' : '#4A4A4A',
                        fontFamily: 'Helvetica Neue, Arial, sans-serif',
                        fontSize: '11px', letterSpacing: '0.08em',
                        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
                        lineHeight: '1.4',
                      }}>
                      {p.label}
                    </button>
                  ))}
                </div>
                {errors.goal && <p style={{ color: '#E05A5A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', marginTop: '8px' }}>{errors.goal}</p>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 3. Current Situation ── */}
            <FormBlock label="03" title="Your Current Situation" subtitle="This helps us calibrate the right starting point.">
              <Field label="Where are you currently at? *" error={errors.experience}>
                <div className="space-y-2">
                  {[
                    { value: 'beginner', label: 'Beginner', sub: 'New to peptides or optimization protocols' },
                    { value: 'some', label: 'Some Experience', sub: 'I\'ve tried a few supplements or protocols before' },
                    { value: 'advanced', label: 'Advanced', sub: 'I\'ve used structured peptide protocols previously' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.experience === opt.value}
                      onClick={() => handleChange('experience', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.experience && <ErrorMsg>{errors.experience}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 4. Pain Points ── */}
            <FormBlock label="04" title="What You're Struggling With" subtitle="Be specific — this is where we start building your protocol.">
              <Field label="What are you currently struggling with?">
                <textarea value={form.struggle} onChange={e => handleChange('struggle', e.target.value)}
                  rows={4} placeholder="E.g. Low energy despite good sleep, early signs of skin aging, difficulty with body composition, brain fog..."
                  style={{ ...inputStyle(), resize: 'vertical', minHeight: '100px' }} />
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 5. Timeline ── */}
            <FormBlock label="05" title="Your Timeline" subtitle="How urgent is this for you?">
              <Field label="How soon are you looking to start? *" error={errors.timeline}>
                <div className="space-y-2">
                  {[
                    { value: 'asap', label: 'As soon as possible', sub: 'I\'m ready to commit and get started now' },
                    { value: '2-4weeks', label: 'Within 2–4 weeks', sub: 'I want to start soon but need a little time to prepare' },
                    { value: 'exploring', label: 'Just exploring', sub: 'I\'m researching options and not ready to commit yet' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.timeline === opt.value}
                      onClick={() => handleChange('timeline', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.timeline && <ErrorMsg>{errors.timeline}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 6. Investment ── */}
            <FormBlock label="06" title="Investment Level"
              subtitle="This helps us recommend the right tier of program for your goals.">
              <Field label="What level of investment are you comfortable with for a personalized program? *" error={errors.investment}>
                <div className="space-y-2">
                  {[
                    { value: '100-300', label: '$100–300 / month', sub: 'Entry-level protocol with core support' },
                    { value: '300-700', label: '$300–700 / month', sub: 'Full protocol with check-ins and adjustments' },
                    { value: '700+', label: '$700+ / month', sub: 'Premium, fully personalized and managed protocol' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.investment === opt.value}
                      onClick={() => handleChange('investment', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.investment && <ErrorMsg>{errors.investment}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 7. Commitment ── */}
            <FormBlock label="07" title="Commitment Level" subtitle="Peptide optimization requires consistency. Be honest with yourself.">
              <Field label="How committed are you to following a structured protocol? *" error={errors.commitment}>
                <div className="space-y-2">
                  {[
                    { value: 'very', label: 'Very committed', sub: 'I\'ll follow the protocol as prescribed — no excuses' },
                    { value: 'somewhat', label: 'Somewhat committed', sub: 'I\'ll do my best but life happens' },
                    { value: 'exploring', label: 'Still deciding', sub: 'I\'m not sure I\'m ready to fully commit yet' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.commitment === opt.value}
                      onClick={() => handleChange('commitment', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.commitment && <ErrorMsg>{errors.commitment}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 8. Health Background ── */}
            <FormBlock label="08" title="Health Background" subtitle="Optional — only share what you're comfortable with.">
              <Field label="Any relevant health conditions or concerns we should be aware of?">
                <textarea value={form.health} onChange={e => handleChange('health', e.target.value)}
                  rows={3} placeholder="E.g. thyroid condition, recent surgery, allergies, ongoing medication..."
                  style={{ ...inputStyle(), resize: 'vertical' }} />
              </Field>
            </FormBlock>

            <Divider />

            {/* ── Submit ── */}
            <div style={{ paddingTop: '48px' }}>
              <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '40px', marginBottom: '32px' }}>
                <div className="flex items-start gap-3 mb-4">
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.8' }}>
                    Your application is reviewed personally. We'll follow up within <span style={{ color: '#FAFAF8' }}>24–48 hours</span> with a tailored response and next steps.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.8' }}>
                    After submitting, you'll have the option to book a direct consultation call to accelerate the process.
                  </p>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px', marginBottom: '20px', letterSpacing: '0.05em' }}>
                  Please complete all required fields before submitting.
                </p>
              )}

              {sendError && (
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px', marginBottom: '20px', lineHeight: '1.7' }}>
                  Something went wrong sending your application. Please try again or email us directly at{' '}
                  <a href="mailto:orders@lionelitebeauty.com" style={{ color: '#C9A96E', textDecoration: 'none' }}>orders@lionelitebeauty.com</a>.
                </p>
              )}

              <button type="submit"
                disabled={sending}
                style={{
                  width: '100%', backgroundColor: sending ? '#6A5A3A' : '#C9A96E', color: '#000',
                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                  fontSize: '13px', letterSpacing: '0.2em',
                  padding: '20px', border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase', transition: 'background-color 0.2s',
                }}
                className="hover:opacity-90 transition-opacity">
                {sending ? 'Sending…' : 'Submit My Application →'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FormBlock({ label, title, subtitle, children }) {
  return (
    <div style={{ marginBottom: '0' }}>
      <div className="flex items-start gap-6 mb-8">
        <div style={{ width: '40px', height: '40px', border: '1px solid #C9A96E44', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '12px' }}>{label}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.2rem', marginBottom: '4px' }}>{title}</h3>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '13px' }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ paddingLeft: '0' }}>{children}</div>
    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid #111', margin: '52px 0' }}></div>
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }}
          className="uppercase">
          {label}
        </label>
      )}
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  )
}

function ErrorMsg({ children }) {
  return (
    <p style={{ color: '#E05A5A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', marginTop: '6px' }}>{children}</p>
  )
}

function RadioCard({ selected, onClick, label, sub }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', padding: '16px 20px',
        backgroundColor: selected ? '#0F0F0F' : '#0A0A0A',
        border: selected ? '1px solid #C9A96E44' : '1px solid #141414',
        cursor: 'pointer', transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}>
      <div style={{
        width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0,
        border: selected ? '1px solid #C9A96E' : '1px solid #2A2A2A',
        backgroundColor: selected ? '#C9A96E' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected && <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#000' }}></div>}
      </div>
      <div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: selected ? '#FAFAF8' : '#5A5A5A', fontSize: '13px', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '11px' }}>{sub}</p>
      </div>
    </button>
  )
}

function inputStyle(error) {
  return {
    width: '100%', backgroundColor: '#0A0A0A',
    border: error ? '1px solid #E05A5A' : '1px solid #141414',
    color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif',
    fontSize: '14px', padding: '14px 16px',
    outline: 'none',
  }
}
