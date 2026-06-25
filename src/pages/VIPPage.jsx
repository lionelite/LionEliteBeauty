import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

// ── Program label → API key mapping ──────────────────────────────────────────
const programKeyMap = {
  'Muscle & Recovery': 'muscle',
  'Neuro / Cognitive': 'neuro',
  'Fertility & Hormonal': 'fertility',
  'Hair Restoration': 'hair',
  'Weight & Metabolic': 'weight',
  'Longevity & Anti-Aging': 'longevity',
  'Skin Improvement': 'skin',
  'General Wellness': 'general',
}

const programAccents = {
  muscle: '#C9A96E',
  neuro: '#8A9E85',
  fertility: '#B8A4D4',
  hair: '#C4A265',
  weight: '#5BA87A',
  longevity: '#7A9FBF',
  skin: '#C9A96E',
  general: '#8A9E85',
}

export default function VIPPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [vipId, setVipId] = useState('')
  const [vipEmail, setVipEmail] = useState('')
  const [loginVipId, setLoginVipId] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [account, setAccount] = useState(null)

  // ── Program content ──
  const [programContent, setProgramContent] = useState(null)
  const [programKey, setProgramKey] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email: loginEmail, vipId: loginVipId }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid credentials'); setLoading(false); return }
      setAccount(data)
      setVipId(data.vipId)
      setVipEmail(data.email)
      setLoggedIn(true)

      // Fetch program content
      const key = programKeyMap[data.program]
      if (key) {
        setProgramKey(key)
        try {
          const contentRes = await fetch(`/api/programs?program=${key}`)
          if (contentRes.ok) {
            const contentData = await contentRes.json()
            setProgramContent(contentData)
          }
        } catch { /* silently fail — portal works without content */ }
      }
    } catch { setError('Connection error'); setLoading(false) }
  }

  function handleLogout() {
    setLoggedIn(false)
    setAccount(null)
    setProgramContent(null)
    setProgramKey(null)
    setLoginEmail('')
    setLoginVipId('')
    setError('')
  }

  if (!loggedIn) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <SEO title="VIP Account Access — Lion Elite" />
        <Navbar />
        <div style={{ paddingTop: '140px' }} className="max-w-lg mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Customer Portal</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', marginBottom: '8px' }} className="font-normal">Access Your VIP Account</h1>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.7' }}>
              Enter the VIP ID and email address you received after enrolling to view your program details.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '40px' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">VIP ID</label>
                <input type="text" value={loginVipId} onChange={e => setLoginVipId(e.target.value)}
                  placeholder="e.g. LEO-123ABC"
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', letterSpacing: '0.12em', boxSizing: 'border-box' }}
                  required />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">Email Address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }}
                  required />
              </div>
              {error && <p style={{ color: '#C0392B', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
              <button type="submit" disabled={loading}
                style={{ width: '100%', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }} className="uppercase">
                {loading ? 'Verifying...' : 'Access My Account \u2192'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}>
            Don\u2019t have a VIP ID yet?{' '}
            <Link to="/apply" style={{ color: '#C9A96E', textDecoration: 'none' }}>Enroll in a program \u2192</Link>
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  const tierLabel = account.tier === 'foundation' ? 'Foundation Coaching' : account.tier === 'vip' ? 'VIP Transformation Program' : account.tier || '\u2014'
  const paidLabel = account.paid ? 'Paid' : 'Pending'
  const accentColor = programAccents[programKey] || '#C9A96E'
  const progressSteps = account.progress || []

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="My VIP Account \u2014 Lion Elite" />
      <Navbar />
      <div style={{ paddingTop: '120px' }}>
        <div className="max-w-3xl mx-auto px-6">

          {/* ── Top bar ── */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }} className="uppercase hover:text-[#C9A96E] transition-colors">
              \u2190 Home
            </Link>
            <p style={{ color: '#BABABA', fontSize: '12px' }}>/</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.15em' }} className="uppercase">My VIP Account</p>
            <button onClick={handleLogout}
              style={{ marginLeft: 'auto', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.15em', background: 'none', border: '1px solid #E0D5C5', padding: '10px 20px', cursor: 'pointer' }}
              className="uppercase hover:text-[#C0392B] transition-colors">
              Sign Out
            </button>
          </div>

          {/* ── Welcome header ── */}
          <div style={{ borderBottom: '1px solid #E0D5C5', paddingBottom: '28px', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', marginBottom: '4px' }} className="font-normal">
              Welcome, {account.name}
            </h1>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', marginBottom: '4px' }}>
              VIP ID: <strong style={{ color: accentColor, letterSpacing: '0.15em' }}>{account.vipId}</strong>
              {' \u00B7 '}
              Program: <strong style={{ color: accentColor }}>{account.program}</strong>
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: account.paid ? '#5BA87A' : accentColor }}></span>
              <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: account.paid ? '#5BA87A' : accentColor, fontSize: '12px', letterSpacing: '0.1em' }} className="uppercase">
                {account.paid ? '\u2713 Payment Confirmed' : 'Payment Pending'}
              </span>
            </div>
          </div>

          {/* ── Quick info cards ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '10px' }} className="uppercase">Program</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '18px', marginBottom: '2px' }}>{account.program || '\u2014'}</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', margin: 0 }}>
                Tier: <span style={{ color: '#2A2A2A' }}>{tierLabel}</span>
              </p>
              {programContent && (
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', marginTop: '6px', fontStyle: 'italic' }}>
                  {programContent.tagline}
                </p>
              )}
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '10px' }} className="uppercase">Payment Status</p>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: account.paid ? '#5BA87A' : accentColor }}></span>
                <p style={{ fontFamily: 'Georgia, serif', color: account.paid ? '#5BA87A' : accentColor, fontSize: '18px', margin: 0 }}>{paidLabel}</p>
              </div>
              {account.paid
                ? <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', margin: '8px 0 0' }}>Your enrollment is confirmed and your spot is secured.</p>
                : <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', margin: '8px 0 0' }}>Payment pending. We\u2019ll confirm once received.</p>
              }
            </div>
          </div>

          {/* ── Program Timeline ── */}
          {programContent && programContent.phases && programContent.phases.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px', marginBottom: '28px' }}>
              <div className="flex items-center gap-3 mb-6">
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">Program Timeline</p>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#F0EAE0' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.05em' }}>
                  {progressSteps.filter(s => s.done).length} of {progressSteps.length} steps completed
                </p>
              </div>

              {/* Phase-by-phase timeline */}
              <div className="space-y-0" style={{ position: 'relative' }}>
                {programContent.phases.map((phase, i) => {
                  const progressMatch = progressSteps.find(s =>
                    s.step && phase.label && s.step.toLowerCase() === phase.id.toLowerCase()
                  )
                  const isComplete = progressMatch?.done || false
                  const isLast = i === programContent.phases.length - 1

                  return (
                    <div key={phase.id} style={{ paddingLeft: '32px', position: 'relative', paddingBottom: isLast ? '0' : '24px' }}>
                      {/* Timeline line */}
                      {!isLast && (
                        <div style={{
                          position: 'absolute', left: '11px', top: '22px',
                          width: '2px', height: 'calc(100% - 8px)',
                          backgroundColor: isComplete ? '#5BA87A40' : '#E0D5C5',
                        }}></div>
                      )}
                      {/* Timeline dot */}
                      <div style={{
                        position: 'absolute', left: '0', top: '4px',
                        width: '24px', height: '24px', borderRadius: '50%',
                        backgroundColor: isComplete ? '#5BA87A' : '#FFFFFF',
                        border: isComplete ? '2px solid #5BA87A' : '2px solid #E0D5C5',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: isComplete ? '#FFF' : 'transparent',
                      }}>
                        {isComplete ? '\u2713' : ''}
                      </div>

                      <div>
                        <h3 style={{
                          fontFamily: 'Helvetica Neue, Arial, sans-serif',
                          color: isComplete ? '#5BA87A' : '#2A2A2A',
                          fontSize: '13px', letterSpacing: '0.05em',
                          marginBottom: '6px', fontWeight: 500,
                        }}>{phase.label}</h3>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                          {phase.items.map((item, j) => (
                            <li key={j} style={{
                              fontFamily: 'Helvetica Neue, Arial, sans-serif',
                              color: isComplete ? '#8A8A8A' : '#6A6A6A',
                              fontSize: '12px', lineHeight: '1.6',
                              paddingLeft: '14px', position: 'relative',
                              textDecoration: isComplete ? 'line-through' : 'none',
                            }}>
                              <span style={{
                                position: 'absolute', left: '0', top: '8px',
                                width: '4px', height: '4px', borderRadius: '50%',
                                backgroundColor: isComplete ? '#5BA87A60' : '#C0B5A5',
                              }}></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Fallback progress display (if no program content) ── */}
          {(!programContent || !programContent.phases) && progressSteps.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Program Progress</p>
              <div className="space-y-3">
                {progressSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3" style={{ padding: '12px 0', borderBottom: i < progressSteps.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, marginTop: '4px',
                      backgroundColor: step.done ? '#5BA87A' : '#E0D5C5',
                    }}></div>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: step.done ? '#5BA87A' : '#4A4A4A', fontSize: '13px', marginBottom: '2px' }}>{step.label || step.step}</p>
                      {step.note && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px' }}>{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Expected Outcomes ── */}
          {programContent && programContent.outcomes && programContent.outcomes.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Expected Outcomes</p>
              <div className="grid md:grid-cols-2 gap-y-3 gap-x-6">
                {programContent.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: '#5BA87A', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>\u2713</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Resources ── */}
          {programContent && programContent.resources && programContent.resources.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Program Resources</p>
              <div className="flex flex-wrap gap-3">
                {programContent.resources.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5',
                    padding: '14px 18px',
                  }}>
                    <span style={{
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      color: accentColor, fontSize: '9px', letterSpacing: '0.15em',
                      backgroundColor: '#FFFFFF', border: '1px solid #C9A96E30',
                      padding: '4px 8px',
                    }} className="uppercase">{r.type}</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '12px' }}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Notes from your Specialist ── */}
          {account.notes && (
            <div style={{ backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '24px', marginBottom: '28px' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '12px', fontFamily: 'Georgia, serif' }}>
                  {account.name?.charAt(0) || '?'}
                </div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">Notes from Your Specialist</p>
              </div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{account.notes}</p>
            </div>
          )}

          {/* ── Customer Info ── */}
          <div style={{ backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '24px', marginBottom: '28px' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '14px' }} className="uppercase">Account Details</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }} className="uppercase">Name</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', margin: 0 }}>{account.name}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }} className="uppercase">Email</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', margin: 0 }}>{account.email}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }} className="uppercase">VIP ID</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '13px', margin: 0, letterSpacing: '0.12em' }}>{account.vipId}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }} className="uppercase">Program</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', margin: 0 }}>{account.program || '\u2014'}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }} className="uppercase">Tier</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', margin: 0 }}>{tierLabel}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em', marginBottom: '2px' }} className="uppercase">Enrolled</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', margin: 0 }}>{account.created ? new Date(account.created).toLocaleDateString() : '\u2014'}</p>
              </div>
            </div>
          </div>

          {/* ── Quick links ── */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {programKey && (
              <Link to={`/programs/${programKey}`}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '11px', letterSpacing: '0.15em', textDecoration: 'none', border: '1px solid accentColor40', padding: '12px 24px' }}
                className="uppercase hover:bg-[#C9A96E10] transition-colors">
                View Program Details \u2192
              </Link>
            )}
            {!account.paid && (
              <Link to="/apply"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.15em', textDecoration: 'none', border: '1px solid #E0D5C5', padding: '12px 24px' }}
                className="uppercase hover:text-[#C0392B] transition-colors">
                Complete Payment \u2192
              </Link>
            )}
          </div>

          <p style={{ textAlign: 'center', marginBottom: '60px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}>
            Questions? Email <a href="mailto:orders@lionelitebeauty.com" style={{ color: accentColor, textDecoration: 'none' }}>orders@lionelitebeauty.com</a>
          </p>

        </div>
      </div>
      <Footer />
    </div>
  )
}