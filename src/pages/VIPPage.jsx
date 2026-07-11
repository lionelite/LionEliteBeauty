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
  muscle: '#C9A96E', neuro: '#8A9E85', fertility: '#B8A4D4', hair: '#C4A265',
  weight: '#5BA87A', longevity: '#7A9FBF', skin: '#C9A96E', general: '#8A9E85',
}

const tabs = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'plan', label: 'My Plan', icon: '☰' },
  { id: 'progress', label: 'Progress', icon: '↗' },
  { id: 'checkins', label: 'Check-ins', icon: '☐' },
  { id: 'coach', label: 'AI Coach', icon: '✦' },
  { id: 'education', label: 'Education', icon: '○' },
  { id: 'profile', label: 'Profile', icon: '◎' },
  { id: 'calls', label: 'Calls', icon: '◉' },
]

export default function VIPPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginVipId, setLoginVipId] = useState('')
  const [useVipIdLogin, setUseVipIdLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [account, setAccount] = useState(null)
  const [activeTab, setActiveTab] = useState('home')
  const [programContent, setProgramContent] = useState(null)
  const [programKey, setProgramKey] = useState(null)
  const [adminToken, setAdminToken] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [activeTab])

  // ── Login ──
  async function handleLogin(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const body = useVipIdLogin
        ? { action: 'login', email: loginEmail, vipId: loginVipId }
        : { action: 'login', email: loginEmail, password: loginPassword }
      const res = await fetch('/api/vip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) {
        if (data.paymentPending) {
          setError('Your account is pending payment confirmation. If you paid via Zelle or CashApp, we\'ll activate your account once payment is confirmed. If you paid by card, please contact orders@lionelitebeauty.com.')
        } else {
          setError(data.error || 'Invalid credentials')
        }
        setLoading(false)
        return
      }
      setAccount(data)
      setLoggedIn(true)
      const key = programKeyMap[data.program]
      if (key) {
        setProgramKey(key)
        try {
          const contentRes = await fetch(`/api/programs?program=${key}`)
          if (contentRes.ok) { const cd = await contentRes.json(); setProgramContent(cd) }
        } catch {}
      }
    } catch { setError('Connection error'); setLoading(false) }
  }

  function handleLogout() {
    setLoggedIn(false); setAccount(null); setProgramContent(null); setProgramKey(null)
    setLoginEmail(''); setLoginVipId(''); setLoginPassword(''); setError(''); setActiveTab('home')
  }

  // ── Save client data helper ──
  async function saveClientData(data) {
    setSaving(true); setSaveMsg('')
    try {
      await fetch('/api/vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update-client', email: account.email, token: 'lionelite-admin-secret', ...data }),
      })
      setSaveMsg('Saved')
      setTimeout(() => setSaveMsg(''), 2000)
    } catch {}
    setSaving(false)
  }

  // ── Login screen ──
  if (!loggedIn) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <SEO title="Client Portal — Lion Elite" />
        <Navbar />
        <div style={{ paddingTop: '140px' }} className="max-w-lg mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Client Portal</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', marginBottom: '8px' }} className="font-normal">Sign In</h1>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.7' }}>
              {useVipIdLogin ? 'Enter your VIP ID and email.' : 'Sign in with your email and password.'}
            </p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '40px' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">Email</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="you@email.com" required
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              {useVipIdLogin ? (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">VIP ID</label>
                  <input type="text" value={loginVipId} onChange={e => setLoginVipId(e.target.value)}
                    placeholder="e.g. LEV-XXXXXXXX" required
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', letterSpacing: '0.12em', boxSizing: 'border-box' }} />
                </div>
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">Password</label>
                  <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Your password" required
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              )}
              <button type="button" onClick={() => { setUseVipIdLogin(!useVipIdLogin); setError('') }}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', display: 'block', textDecoration: 'underline' }}>
                {useVipIdLogin ? 'Sign in with password →' : 'Sign in with VIP ID →'}
              </button>
              {error && <p style={{ color: '#C0392B', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
              <button type="submit" disabled={loading}
                style={{ width: '100%', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }} className="uppercase">
                {loading ? 'Verifying...' : 'Sign In →'}
              </button>
            </form>
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}>
            Don't have an account? <Link to="/apply" style={{ color: '#C9A96E', textDecoration: 'none' }}>Enroll →</Link>
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  const tierLabel = account.tier === 'foundation' ? 'Foundation Coaching' : account.tier === 'vip' ? 'VIP Transformation Program' : account.tier || '—'
  const accentColor = programAccents[programKey] || '#C9A96E'
  const progressSteps = account.progress || []
  const checkins = account.checkins || []
  const todayCheckin = checkins.find(c => c.type === 'daily' && new Date(c.date).toDateString() === new Date().toDateString())

  // ── Dashboard ──
  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="My Portal — Lion Elite" />
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* ── Top bar ── */}
          <div className="flex items-center gap-4 mb-6" style={{ flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }} className="uppercase hover:text-[#C9A96E]">← Home</Link>
            <p style={{ color: '#BABABA', fontSize: '12px' }}>/</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.15em' }} className="uppercase">My Portal</p>
            <div style={{ flex: 1 }}></div>
            {saveMsg && <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '11px' }}>{saveMsg}</span>}
            <button onClick={handleLogout}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.15em', background: 'none', border: '1px solid #E0D5C5', padding: '10px 20px', cursor: 'pointer' }} className="uppercase hover:text-[#C0392B]">
              Sign Out
            </button>
          </div>

          {/* ── Tab navigation ── */}
          <div style={{ borderBottom: '1px solid #E0D5C5', marginBottom: '32px', overflowX: 'auto', whiteSpace: 'nowrap' }} className="flex gap-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{
                  fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em',
                  padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: activeTab === t.id ? `2px solid ${accentColor}` : '2px solid transparent',
                  color: activeTab === t.id ? accentColor : '#8A8A8A', transition: 'all 0.15s',
                }} className="uppercase">
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════════════════════════════════
             HOME TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'home' && (
            <div>
              {/* Welcome header */}
              <div style={{ borderBottom: '1px solid #E0D5C5', paddingBottom: '28px', marginBottom: '32px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', marginBottom: '4px' }} className="font-normal">
                  Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {account.name.split(' ')[0]}
                </h1>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px' }}>
                  Program: <strong style={{ color: accentColor }}>{account.program}</strong> · Tier: {tierLabel}
                </p>
              </div>

              {/* Progress ring + stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: accentColor, fontSize: '28px', margin: '0 0 4px' }}>
                    {progressSteps.length > 0 ? Math.round(progressSteps.filter(s => s.done).length / progressSteps.length * 100) : 0}%
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em' }} className="uppercase">Program Progress</p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: account.paid ? '#5BA87A' : accentColor, fontSize: '28px', margin: '0 0 4px' }}>{account.paid ? '✓' : '○'}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em' }} className="uppercase">{account.paid ? 'Active' : 'Pending'}</p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: accentColor, fontSize: '28px', margin: '0 0 4px' }}>{checkins.filter(c => c.type === 'daily').length}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em' }} className="uppercase">Daily Check-ins</p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: accentColor, fontSize: '28px', margin: '0 0 4px' }}>
                    {account.callSchedule?.nextCall ? new Date(account.callSchedule.nextCall).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em' }} className="uppercase">Next Call</p>
                </div>
              </div>

              {/* Today's priorities + quick actions */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Today's Priorities</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Hydration', done: todayCheckin?.responses?.water || false },
                      { label: 'Movement', done: todayCheckin?.responses?.movement || false },
                      { label: 'Meals', done: todayCheckin?.responses?.meals || false },
                      { label: 'Sleep prep', done: todayCheckin?.responses?.sleep || false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3" style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid #F0EAE0' : 'none' }}>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                          backgroundColor: item.done ? '#5BA87A' : 'transparent',
                          border: item.done ? 'none' : '2px solid #E0D5C5',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '10px', color: '#FFF',
                        }}>{item.done ? '✓' : ''}</div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: item.done ? '#5BA87A' : '#4A4A4A', fontSize: '13px', margin: 0 }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Quick Actions</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setActiveTab('checkins')}
                      style={{ textAlign: 'left', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', color: '#2A2A2A', padding: '12px 16px', backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', cursor: 'pointer' }}>
                      {todayCheckin ? '✓ Daily check-in done' : '☐ Complete today\'s check-in'}
                    </button>
                    <button onClick={() => setActiveTab('coach')}
                      style={{ textAlign: 'left', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', color: '#2A2A2A', padding: '12px 16px', backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', cursor: 'pointer' }}>
                      ✦ Ask your AI Coach
                    </button>
                    <button onClick={() => setActiveTab('calls')}
                      style={{ textAlign: 'left', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', color: '#2A2A2A', padding: '12px 16px', backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', cursor: 'pointer' }}>
                      ◉ Book monthly call
                    </button>
                    <button onClick={() => setActiveTab('profile')}
                      style={{ textAlign: 'left', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', color: '#2A2A2A', padding: '12px 16px', backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', cursor: 'pointer' }}>
                      ◎ Update your profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Program timeline preview */}
              {programContent && programContent.phases && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '28px' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">Current Phase</p>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#F0EAE0' }}></div>
                  </div>
                  {programContent.phases.slice(0, 2).map((phase, i) => {
                    const pm = progressSteps.find(s => s.step?.toLowerCase() === phase.id?.toLowerCase())
                    const complete = pm?.done || false
                    return (
                      <div key={phase.id} style={{ padding: '12px 0 12px 28px', position: 'relative', borderBottom: i < 1 ? '1px solid #F0EAE0' : 'none' }}>
                        <div style={{ position: 'absolute', left: '0', top: '14px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: complete ? '#5BA87A' : '#E0D5C5' }}></div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: complete ? '#5BA87A' : '#2A2A2A', fontSize: '13px', margin: '0 0 2px' }}>{phase.label}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', margin: 0 }}>{phase.items[0]}</p>
                      </div>
                    )
                  })}
                  {programContent.phases.length > 2 && (
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px', textAlign: 'center', marginTop: '12px' }}>
                      +{programContent.phases.length - 2} more phases — <button onClick={() => setActiveTab('plan')} style={{ background: 'none', border: 'none', color: accentColor, cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}>View full plan</button>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════
             MY PLAN TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'plan' && (
            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">My Plan</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Primary Goal</p>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px', margin: 0 }}>{account.goals?.primary || account.program || '—'}</p>
                  {account.goals?.secondary?.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '6px' }} className="uppercase">Secondary Goals</p>
                      {account.goals.secondary.map((g, i) => <p key={i} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', margin: '0 0 2px 12px' }}>· {g}</p>)}
                    </div>
                  )}
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Current Phase</p>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px', margin: 0 }}>{account.plan?.phase || programContent?.phases?.[0]?.label || 'Starting soon'}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', marginTop: '8px' }}>
                    {progressSteps.filter(s => s.done).length} of {progressSteps.length} steps completed
                  </p>
                </div>
              </div>

              {/* Full timeline */}
              {programContent && programContent.phases && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px', marginBottom: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '24px' }} className="uppercase">Program Timeline</p>
                  {programContent.phases.map((phase, i) => {
                    const pm = progressSteps.find(s => s.step?.toLowerCase() === phase.id?.toLowerCase())
                    const complete = pm?.done || false
                    const isLast = i === programContent.phases.length - 1
                    return (
                      <div key={phase.id} style={{ paddingLeft: '32px', position: 'relative', paddingBottom: isLast ? '0' : '24px' }}>
                        {!isLast && <div style={{ position: 'absolute', left: '11px', top: '22px', width: '2px', height: 'calc(100% - 8px)', backgroundColor: complete ? '#5BA87A40' : '#E0D5C5' }}></div>}
                        <div style={{ position: 'absolute', left: '0', top: '4px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: complete ? '#5BA87A' : '#FFFFFF', border: complete ? '2px solid #5BA87A' : '2px solid #E0D5C5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: complete ? '#FFF' : 'transparent' }}>{complete ? '✓' : ''}</div>
                        <div>
                          <h3 style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: complete ? '#5BA87A' : '#2A2A2A', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 500 }}>{phase.label}</h3>
                          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                            {phase.items.map((item, j) => (
                              <li key={j} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: complete ? '#8A8A8A' : '#6A6A6A', fontSize: '12px', lineHeight: '1.6', paddingLeft: '14px', position: 'relative', textDecoration: complete ? 'line-through' : 'none' }}>
                                <span style={{ position: 'absolute', left: '0', top: '8px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: complete ? '#5BA87A60' : '#C0B5A5' }}></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Nutrition / Training / Recovery cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Nutrition</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', lineHeight: '1.7', margin: 0 }}>
                    {account.plan?.nutrition || 'Your nutrition plan is being prepared by your coach.'}
                  </p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Training</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', lineHeight: '1.7', margin: 0 }}>
                    {account.plan?.training || 'Your training program is being designed for your specific goals.'}
                  </p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Recovery</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', lineHeight: '1.7', margin: 0 }}>
                    {account.plan?.recovery || 'Recovery protocols are being tailored to your program.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════
             PROGRESS TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'progress' && (
            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">Progress</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Weight</p>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '22px', margin: 0 }}>{account.measurements?.weight || '—'}</p>
                  {account.measurements?.updated && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '10px', marginTop: '4px' }}>Last updated: {new Date(account.measurements.updated).toLocaleDateString()}</p>}
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Body Fat</p>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '22px', margin: 0 }}>{account.measurements?.bodyFat || '—'}</p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Height</p>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '22px', margin: 0 }}>{account.measurements?.height || '—'}</p>
                </div>
              </div>

              {/* Check-in adherence trend */}
              {checkins.length > 0 && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Check-in Adherence</p>
                  <div className="flex gap-1 items-end" style={{ height: '80px' }}>
                    {checkins.slice(-14).map((c, i) => (
                      <div key={i} style={{
                        flex: 1, height: `${Math.min(100, (c.adherence || 0) * 100)}%`,
                        backgroundColor: (c.adherence || 0) > 0.7 ? '#5BA87A' : (c.adherence || 0) > 0.4 ? accentColor : '#E0D5C5',
                        minWidth: '12px', borderRadius: '2px 2px 0 0', transition: 'height 0.3s',
                      }} title={`${Math.round((c.adherence || 0) * 100)}%`}></div>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '10px', marginTop: '8px', textAlign: 'center' }}>Last 14 check-ins</p>
                </div>
              )}

              {/* Expected outcomes */}
              {programContent?.outcomes?.length > 0 && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Expected Outcomes</p>
                  <div className="grid md:grid-cols-2 gap-y-3 gap-x-6">
                    {programContent.outcomes.map((o, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span style={{ color: '#5BA87A', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{o}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════
             CHECK-INS TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'checkins' && (
            <CheckInTab account={account} accentColor={accentColor} onSave={saveClientData} saving={saving} />
          )}

          {/* ════════════════════════════════════════════════════════════════
             AI COACH TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'coach' && (
            <CoachTab account={account} accentColor={accentColor} programContent={programContent} />
          )}

          {/* ════════════════════════════════════════════════════════════════
             EDUCATION TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'education' && (
            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">Education</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { title: 'Nutrition Basics', desc: 'Understanding macronutrients, meal timing, and how to build a balanced plate for your goals.', icon: '🥗' },
                  { title: 'Training Fundamentals', desc: 'Progressive overload, recovery, and how to structure your workouts for maximum results.', icon: '💪' },
                  { title: 'Habit Building', desc: 'How to build lasting habits that stick — the science of behavior change.', icon: '🔄' },
                  { title: 'Recovery & Sleep', desc: 'Why recovery matters and how to optimize your sleep for better results.', icon: '😴' },
                  { title: 'Peptide Education', desc: 'Understanding how peptides support your goals — approved educational content.', icon: '🧬' },
                  { title: 'FAQ', desc: 'Common questions about your program, protocols, and what to expect.', icon: '❓' },
                ].map((m, i) => (
                  <div key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', cursor: 'pointer' }} className="hover:bg-[#F9F7F4] transition-colors">
                    <p style={{ fontSize: '24px', marginBottom: '8px' }}>{m.icon}</p>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '15px', marginBottom: '6px' }}>{m.title}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>{m.desc}</p>
                  </div>
                ))}
              </div>
              {programContent?.resources?.length > 0 && (
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Program Resources</p>
                  <div className="flex flex-wrap gap-3">
                    {programContent.resources.map((r, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '14px 18px' }}>
                        <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.15em', backgroundColor: '#FFFFFF', border: '1px solid #C9A96E30', padding: '4px 8px' }} className="uppercase">{r.type}</span>
                        <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '12px' }}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════
             PROFILE TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'profile' && (
            <ProfileTab account={account} accentColor={accentColor} onSave={saveClientData} saving={saving} />
          )}

          {/* ════════════════════════════════════════════════════════════════
             CALLS TAB
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'calls' && (
            <CallsTab account={account} accentColor={accentColor} />
          )}

          <p style={{ textAlign: 'center', margin: '40px 0', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}>
            Questions? <a href="mailto:orders@lionelitebeauty.com" style={{ color: accentColor, textDecoration: 'none' }}>orders@lionelitebeauty.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHECK-IN TAB
// ═══════════════════════════════════════════════════════════════════════════════
function CheckInTab({ account, accentColor, onSave, saving }) {
  const [water, setWater] = useState(0)
  const [meals, setMeals] = useState(0)
  const [sleep, setSleep] = useState(7)
  const [energy, setEnergy] = useState(3)
  const [stress, setStress] = useState(3)
  const [mood, setMood] = useState(3)
  const [movement, setMovement] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const adherence = (water >= 6 ? 0.2 : 0) + (meals >= 3 ? 0.2 : 0) + (sleep >= 7 ? 0.2 : 0) + (energy >= 3 ? 0.2 : 0) + (movement ? 0.2 : 0)
    await onSave({
      checkin: { type: 'daily', responses: { water, meals, sleep, energy, stress, mood, movement }, adherence, date: new Date().toISOString() },
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '24px', marginBottom: '8px' }}>✓</p>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.3rem', marginBottom: '8px' }} className="font-normal">Check-in recorded</h2>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', marginBottom: '20px' }}>Great work staying on track.</p>
        <button onClick={() => setSubmitted(false)}
          style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em', backgroundColor: '#C9A96E', color: '#000', border: 'none', padding: '12px 28px', cursor: 'pointer' }} className="uppercase">
          Submit another
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '8px' }} className="font-normal">Daily Check-in</h2>
      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', marginBottom: '24px' }}>Quick daily check-in to track your progress. Takes 30 seconds.</p>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Water (glasses)</p>
              <div className="flex gap-2">
                {[2, 4, 6, 8].map(v => (
                  <button key={v} type="button" onClick={() => setWater(v)}
                    style={{ flex: 1, padding: '10px', backgroundColor: water === v ? accentColor : '#F9F7F4', border: water === v ? 'none' : '1px solid #E0D5C5', color: water === v ? '#000' : '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Meals</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(v => (
                  <button key={v} type="button" onClick={() => setMeals(v)}
                    style={{ flex: 1, padding: '10px', backgroundColor: meals === v ? accentColor : '#F9F7F4', border: meals === v ? 'none' : '1px solid #E0D5C5', color: meals === v ? '#000' : '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Sleep (hours)</p>
              <div className="flex gap-2">
                {[5, 6, 7, 8, 9].map(v => (
                  <button key={v} type="button" onClick={() => setSleep(v)}
                    style={{ flex: 1, padding: '10px', backgroundColor: sleep === v ? accentColor : '#F9F7F4', border: sleep === v ? 'none' : '1px solid #E0D5C5', color: sleep === v ? '#000' : '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Energy (1-5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} type="button" onClick={() => setEnergy(v)}
                    style={{ flex: 1, padding: '10px', backgroundColor: energy === v ? accentColor : '#F9F7F4', border: energy === v ? 'none' : '1px solid #E0D5C5', color: energy === v ? '#000' : '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Stress (1-5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} type="button" onClick={() => setStress(v)}
                    style={{ flex: 1, padding: '10px', backgroundColor: stress === v ? accentColor : '#F9F7F4', border: stress === v ? 'none' : '1px solid #E0D5C5', color: stress === v ? '#000' : '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Movement today</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setMovement(true)}
                  style={{ flex: 1, padding: '10px', backgroundColor: movement ? '#5BA87A' : '#F9F7F4', border: movement ? 'none' : '1px solid #E0D5C5', color: movement ? '#FFF' : '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>Yes</button>
                <button type="button" onClick={() => setMovement(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: !movement && movement !== false ? '#F9F7F4' : movement === false ? '#E0D5C5' : '#F9F7F4', border: '1px solid #E0D5C5', color: '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px' }}>No</button>
              </div>
            </div>
          </div>
          <button type="submit" disabled={saving}
            style={{ marginTop: '24px', width: '100%', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '14px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }} className="uppercase">
            {saving ? 'Saving...' : 'Submit Check-in'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// AI COACH TAB
// ═══════════════════════════════════════════════════════════════════════════════
function CoachTab({ account, accentColor, programContent }) {
  const [messages, setMessages] = useState([
    { role: 'coach', text: `Good ${new Date().getHours() < 12 ? 'morning' : 'afternoon'}, ${account.name.split(' ')[0]}. I'm your Lion Elite coaching assistant. How can I support you today?` },
  ])
  const [input, setInput] = useState('')
  const [coachLoading, setCoachLoading] = useState(false)

  const quickActions = [
    { label: 'Adjust today\'s workout', action: 'I need to adjust my workout for today' },
    { label: 'Help with a meal', action: 'Can you help me plan a meal?' },
    { label: 'Review my progress', action: 'How is my progress looking?' },
    { label: 'Prepare for travel', action: 'I have travel coming up, how should I adjust?' },
    { label: 'Report a problem', action: 'I need to report an issue' },
  ]

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setCoachLoading(true)

    // Simulate AI coach response
    setTimeout(() => {
      const response = generateCoachResponse(userMsg, account, programContent)
      setMessages(prev => [...prev, { role: 'coach', text: response }])
      setCoachLoading(false)
    }, 800)
  }

  function handleQuickAction(action) {
    setInput(action)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '8px' }} className="font-normal">AI Coach</h2>
      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', marginBottom: '24px' }}>Your personal Lion Elite coaching assistant.</p>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickActions.map((q, i) => (
          <button key={i} onClick={() => handleQuickAction(q.action)}
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', color: accentColor, backgroundColor: '#FFFFFF', border: `1px solid ${accentColor}40`, padding: '10px 18px', cursor: 'pointer' }}
            className="hover:bg-[#F9F7F4] transition-colors">
            {q.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', marginBottom: '16px' }}>
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '24px' }} className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3" style={{ flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: m.role === 'coach' ? accentColor : '#E0D5C5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: m.role === 'coach' ? '#FFF' : '#6A6A6A',
              }}>
                {m.role === 'coach' ? '✦' : 'U'}
              </div>
              <div style={{
                maxWidth: '80%', padding: '14px 18px',
                backgroundColor: m.role === 'coach' ? '#F9F7F4' : accentColor + '15',
                border: m.role === 'coach' ? '1px solid #E0D5C5' : 'none',
              }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{m.text}</p>
              </div>
            </div>
          ))}
          {coachLoading && (
            <div className="flex items-center gap-3">
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#FFF' }}>✦</div>
              <div style={{ padding: '14px 18px', backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', margin: 0 }}>Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} style={{ borderTop: '1px solid #E0D5C5', display: 'flex' }}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask your coach anything..."
            style={{ flex: 1, padding: '14px 18px', border: 'none', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none', backgroundColor: '#FAF7F2' }} />
          <button type="submit" disabled={!input.trim() || coachLoading}
            style={{ padding: '14px 24px', backgroundColor: '#C9A96E', color: '#000', border: 'none', cursor: !input.trim() || coachLoading ? 'not-allowed' : 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em', opacity: !input.trim() || coachLoading ? 0.5 : 1 }} className="uppercase">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

function generateCoachResponse(query, account, programContent) {
  const q = query.toLowerCase()
  const lines = []

  // What I see
  lines.push('What I see:')
  if (q.includes('workout') || q.includes('train') || q.includes('exercise')) {
    lines.push(`You're asking about training. Based on your ${account.program || 'current'} program, you're in the ${account.plan?.phase || 'early'} phase.`)
  } else if (q.includes('meal') || q.includes('eat') || q.includes('food') || q.includes('nutrition') || q.includes('diet')) {
    lines.push(`You're looking for nutrition guidance. Your program focuses on supporting your ${account.goals?.primary || 'overall'} goals with proper nutrition.`)
  } else if (q.includes('progress') || q.includes('result') || q.includes('improve')) {
    const checkins = account.checkins?.length || 0
    lines.push(`You've completed ${checkins} check-ins so far. Consistency is what drives results.`)
  } else if (q.includes('travel') || q.includes('trip') || q.includes('vacation')) {
    lines.push('You have travel coming up. Travel can disrupt routine, but it doesn\'t have to derail progress.')
  } else if (q.includes('issue') || q.includes('problem') || q.includes('help')) {
    lines.push('You\'d like to report an issue. Let me understand what\'s going on.')
  } else {
    lines.push(`I understand you're asking about "${query.substring(0, 60)}". Let me address this based on your ${account.program || 'current'} program.`)
  }

  lines.push('')
  lines.push('What this means:')
  if (q.includes('workout')) {
    lines.push('Your training plan is designed around progressive overload and recovery. Adjustments should maintain the stimulus without compromising recovery.')
  } else if (q.includes('meal') || q.includes('food')) {
    lines.push('Proper nutrition supports your training, recovery, and overall results. The Lion Elite approach focuses on nutrient-dense whole foods.')
  } else if (q.includes('progress')) {
    lines.push('Progress isn\'t always linear. Small, consistent actions compound over time into significant results.')
  } else if (q.includes('travel')) {
    lines.push('The key during travel is maintaining the habits that matter most: hydration, protein intake, and at least some movement.')
  } else {
    lines.push('Every question is an opportunity to refine your approach and get closer to your goals.')
  }

  lines.push('')
  lines.push('Your next move:')
  if (q.includes('workout')) {
    lines.push('1. Prioritize your key lifts this week\n2. Reduce volume by 20% if you feel fatigued\n3. Focus on form over load')
  } else if (q.includes('meal') || q.includes('food')) {
    lines.push('1. Start with protein at every meal\n2. Include vegetables at lunch and dinner\n3. Stay hydrated — aim for 8+ glasses of water')
  } else if (q.includes('progress')) {
    lines.push('1. Keep up your daily check-ins\n2. Focus on this week\'s habits\n3. Your next monthly call is the perfect time for a deeper review')
  } else if (q.includes('travel')) {
    lines.push('1. Pack protein bars and electrolytes\n2. Book a hotel with a gym or plan bodyweight workouts\n3. Set a water reminder on your phone')
  } else {
    lines.push('1. Stay consistent with your daily habits\n2. Complete your check-in today\n3. Let your coach know if anything feels off')
  }

  lines.push('')
  lines.push('Coach escalation:')
  lines.push('This guidance is based on general Lion Elite methodology. Your human coach will review your specific situation during your next monthly call.')

  return lines.join('\n')
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE TAB
// ═══════════════════════════════════════════════════════════════════════════════
function ProfileTab({ account, accentColor, onSave, saving }) {
  const [phone, setPhone] = useState(account.phone || '')
  const [dob, setDob] = useState(account.dob || '')
  const [timezone, setTimezone] = useState(account.timezone || '')
  const [primaryGoal, setPrimaryGoal] = useState(account.goals?.primary || '')
  const [weight, setWeight] = useState(account.measurements?.weight || '')
  const [height, setHeight] = useState(account.measurements?.height || '')
  const [saved, setSaved] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    await onSave({ phone, dob, timezone, goals: { ...(account.goals || {}), primary: primaryGoal }, measurements: { weight, height, bodyFat: account.measurements?.bodyFat || '', updated: new Date().toISOString() } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">My Profile</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Personal Details</p>
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              <div>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Full Name</label>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '14px', padding: '10px 0', borderBottom: '1px solid #F0EAE0' }}>{account.name}</p>
              </div>
              <div>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Email</label>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '14px', padding: '10px 0', borderBottom: '1px solid #F0EAE0' }}>{account.email}</p>
              </div>
              <div>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (000) 000-0000"
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Date of Birth</label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Time Zone</label>
                <select value={timezone} onChange={e => setTimezone(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none' }}>
                  <option value="">Select time zone</option>
                  <option value="EST">Eastern (EST)</option>
                  <option value="CST">Central (CST)</option>
                  <option value="MST">Mountain (MST)</option>
                  <option value="PST">Pacific (PST)</option>
                  <option value="AKST">Alaska (AKST)</option>
                  <option value="HST">Hawaii (HST)</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={saving}
              style={{ marginTop: '24px', width: '100%', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '14px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }} className="uppercase">
              {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Health & Measurements</p>
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              <div>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Primary Goal</label>
                <input type="text" value={primaryGoal} onChange={e => setPrimaryGoal(e.target.value)} placeholder="e.g. Fat loss, muscle gain, overall health"
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Weight</label>
                  <input type="text" value={weight} onChange={e => setWeight(e.target.value)} placeholder="lbs"
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }} className="uppercase">Height</label>
                  <input type="text" value={height} onChange={e => setHeight(e.target.value)} placeholder="ft/in"
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '10px' }} className="uppercase">Account Info</p>
                <div style={{ backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '14px 18px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', margin: '0 0 4px' }}>VIP ID: <strong style={{ color: accentColor, letterSpacing: '0.1em' }}>{account.vipId}</strong></p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', margin: '0 0 4px' }}>Program: {account.program}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', margin: 0 }}>Tier: {tierLabel} · Created: {account.created ? new Date(account.created).toLocaleDateString() : '—'}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALLS TAB
// ═══════════════════════════════════════════════════════════════════════════════
function CallsTab({ account, accentColor }) {
  const cs = account.callSchedule || {}
  const hasCredit = cs.credits > 0
  const nextCall = cs.nextCall

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">Monthly Coaching Calls</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Call Entitlement</p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '22px', margin: '0 0 4px' }}>{hasCredit ? '1 call available' : '0 calls'}</p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', margin: 0 }}>1 monthly coaching call per active billing month</p>
          <div style={{ marginTop: '20px' }}>
            {hasCredit ? (
              <a href="https://calendly.com/a-ringfield-trustetc" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '14px 32px', textDecoration: 'none' }} className="uppercase">
                Book Your Call →
              </a>
            ) : (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '12px' }}>Your next call credit will be issued at the start of your next billing month.</p>
            )}
          </div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Next Scheduled Call</p>
          {nextCall ? (
            <>
              <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '18px', margin: '0 0 4px' }}>{new Date(nextCall).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', margin: '0 0 16px' }}>{new Date(nextCall).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              <div className="flex gap-3">
                <a href="https://calendly.com/a-ringfield-trustetc" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: accentColor, border: '1px solid accentColor40', padding: '10px 20px', textDecoration: 'none', cursor: 'pointer' }} className="uppercase">
                  Reschedule
                </a>
                <button style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: '#C0392B', border: '1px solid #E0D5C5', padding: '10px 20px', background: 'none', cursor: 'pointer' }} className="uppercase">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '14px', margin: '0 0 8px' }}>No call scheduled yet</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
                Book your monthly call using the Calendly link. Your coach will review your progress and adjust your plan.
              </p>
            </>
          )}
        </div>
      </div>
      {cs.history?.length > 0 && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: accentColor, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Call History</p>
          {cs.history.map((h, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < cs.history.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', margin: '0 0 2px' }}>{h.date ? new Date(h.date).toLocaleDateString() : '—'}</p>
              {h.notes && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', margin: 0 }}>{h.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}