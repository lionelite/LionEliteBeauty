import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const peptideOptions = ['Retatrutide','CJC-1295 / Ipamorelin','KLOW Blend','BPC-157 / TB-500','NAD+','MOTS-C','GHK-Cu','KPV','Tesamorelin','Semax','Selank','DSIP','Other']

const initialForm = {
  email: '',
  name: '',
  peptide: '',
  strength: '',
  startDate: '',
  scheduleNotes: '',
  goal: '',
  energy: 5,
  sleep: 5,
  recovery: 5,
  appetite: 5,
  mood: 5,
  adherence: 5,
  weight: '',
  positiveEffects: '',
  concerns: '',
  lifestyleChanges: '',
  questions: '',
  urgentSymptoms: false,
}

function buildResponse(form) {
  const low = []
  const strong = []
  ;['energy','sleep','recovery','appetite','mood','adherence'].forEach(key => {
    if (Number(form[key]) <= 4) low.push(key)
    if (Number(form[key]) >= 8) strong.push(key)
  })

  let headline = 'Thank you for completing your Lion Elite Beauty check-in.'
  let message = `We have added this update to your ongoing client profile. Your current feedback for ${form.peptide || 'your program'} gives us another data point to compare with your previous responses.`

  if (strong.length) message += ` Your strongest reported areas are ${strong.join(', ')}.`
  if (low.length) message += ` We will pay closer attention to ${low.join(', ')} as we review your pattern over time.`
  if (form.concerns.trim()) message += ' Your reported concerns have been clearly flagged for coach review.'
  if (form.urgentSymptoms) {
    headline = 'Your check-in has been flagged for prompt review.'
    message += ' Because you marked a potentially urgent concern, please do not rely on this form for emergency guidance. Contact a qualified healthcare professional or emergency services when appropriate.'
  }

  return { headline, message }
}

const card = { background: '#121212', border: '1px solid #2B2925', padding: '28px', borderRadius: '2px' }
const label = { display: 'block', color: '#C9A96E', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '9px' }
const input = { width: '100%', boxSizing: 'border-box', background: '#0B0B0B', color: '#F7F2E8', border: '1px solid #35312B', padding: '14px', fontSize: '14px', outline: 'none' }

export default function PeptideCheckInPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [response, setResponse] = useState(null)

  const scores = useMemo(() => ['energy','sleep','recovery','appetite','mood','adherence'], [])
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!form.email.trim() || !form.name.trim() || !form.peptide || !form.goal.trim()) {
      setError('Please complete your name, email, peptide, and primary goal.')
      return
    }

    setStatus('sending')
    const checkin = {
      type: 'peptide-response',
      peptide: form.peptide,
      strength: form.strength,
      startDate: form.startDate,
      scheduleNotes: form.scheduleNotes,
      goal: form.goal,
      scores: Object.fromEntries(scores.map(key => [key, Number(form[key])])),
      weight: form.weight,
      positiveEffects: form.positiveEffects,
      concerns: form.concerns,
      lifestyleChanges: form.lifestyleChanges,
      questions: form.questions,
      urgentSymptoms: form.urgentSymptoms,
      source: 'Lion Elite Beauty Interactive Check-In',
    }

    try {
      const res = await fetch('/api/vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add-checkin', email: form.email, checkin }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to save your check-in.')
      setResponse(buildResponse(form))
      setStatus('complete')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  if (status === 'complete' && response) {
    return <div style={{ minHeight: '100vh', background: '#080808', color: '#F7F2E8' }}>
      <SEO title="Check-In Received | Lion Elite Beauty" description="Your personalized Lion Elite Beauty check-in has been securely received." />
      <Navbar />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '150px 24px 100px', textAlign: 'center' }}>
        <p style={{ color: '#C9A96E', letterSpacing: '.28em', fontSize: '10px', textTransform: 'uppercase' }}>Lion Elite Beauty</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', lineHeight: 1.05 }}>{response.headline}</h1>
        <div style={{ width: 60, height: 1, background: '#C9A96E', margin: '30px auto' }} />
        <p style={{ color: '#CFC8BC', lineHeight: 1.9, fontSize: '17px' }}>{response.message}</p>
        <div style={{ ...card, marginTop: 38, textAlign: 'left' }}>
          <p style={{ ...label, marginBottom: 14 }}>What happens next</p>
          <p style={{ color: '#D7D0C5', lineHeight: 1.8, margin: 0 }}>Your submission is stored with your client history. Lion Elite Beauty can compare future check-ins against this entry to identify trends, prepare more informed coaching feedback, and better understand how you are responding over time.</p>
        </div>
        <button onClick={() => { setForm(initialForm); setStatus('idle'); setResponse(null) }} style={{ marginTop: 28, background: '#C9A96E', color: '#090909', border: 0, padding: '16px 30px', letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Complete Another Check-In</button>
      </main>
      <Footer />
    </div>
  }

  return <div style={{ minHeight: '100vh', background: '#080808', color: '#F7F2E8' }}>
    <SEO title="Client Peptide Check-In | Lion Elite Beauty" description="Track your experience and help Lion Elite Beauty personalize your coaching support." />
    <Navbar />
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '135px 22px 90px' }}>
      <header style={{ maxWidth: '720px', marginBottom: 44 }}>
        <p style={{ color: '#C9A96E', letterSpacing: '.28em', fontSize: '10px', textTransform: 'uppercase' }}>Your response becomes intelligence</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.02, margin: '16px 0' }}>Personal Peptide Response Check-In</h1>
        <p style={{ color: '#BEB7AC', lineHeight: 1.8, fontSize: '16px' }}>Tell us what you are using and how you feel. Each completed check-in strengthens your personal response history so Lion Elite Beauty can deliver increasingly informed coaching support.</p>
      </header>

      <form onSubmit={submit}>
        <section style={{ ...card, marginBottom: 18 }}>
          <p style={label}>Client Identity</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            <div><label style={label}>Full Name *</label><input style={input} value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div><label style={label}>Account Email *</label><input type="email" style={input} value={form.email} onChange={e => set('email', e.target.value)} /></div>
          </div>
        </section>

        <section style={{ ...card, marginBottom: 18 }}>
          <p style={label}>Current Peptide</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16 }}>
            <div><label style={label}>Product *</label><select style={input} value={form.peptide} onChange={e => set('peptide', e.target.value)}><option value="">Select product</option>{peptideOptions.map(x => <option key={x}>{x}</option>)}</select></div>
            <div><label style={label}>Strength / Label</label><input style={input} placeholder="Example: 10 mg" value={form.strength} onChange={e => set('strength', e.target.value)} /></div>
            <div><label style={label}>Start Date</label><input type="date" style={input} value={form.startDate} onChange={e => set('startDate', e.target.value)} /></div>
          </div>
          <div style={{ marginTop: 16 }}><label style={label}>Schedule or Use Notes</label><textarea style={{ ...input, minHeight: 90 }} value={form.scheduleNotes} onChange={e => set('scheduleNotes', e.target.value)} placeholder="Record what you want your coach to know. Do not include anything you are uncomfortable storing." /></div>
          <div style={{ marginTop: 16 }}><label style={label}>Primary Goal *</label><textarea style={{ ...input, minHeight: 90 }} value={form.goal} onChange={e => set('goal', e.target.value)} placeholder="What outcome are you working toward?" /></div>
        </section>

        <section style={{ ...card, marginBottom: 18 }}>
          <p style={label}>How You Feel Today</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px 28px' }}>
            {scores.map(key => <div key={key}><label style={{ ...label, display: 'flex', justifyContent: 'space-between' }}><span>{key}</span><span>{form[key]}/10</span></label><input type="range" min="1" max="10" value={form[key]} onChange={e => set(key, e.target.value)} style={{ width: '100%' }} /></div>)}
          </div>
          <div style={{ marginTop: 20 }}><label style={label}>Current Weight (Optional)</label><input style={{ ...input, maxWidth: 260 }} value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="Example: 201.2 lb" /></div>
        </section>

        <section style={{ ...card, marginBottom: 18 }}>
          <p style={label}>Your Response</p>
          {[['positiveEffects','Positive changes noticed'],['concerns','Concerns or unwanted effects'],['lifestyleChanges','Nutrition, training, sleep, or lifestyle changes'],['questions','Questions for Lion Elite Beauty']].map(([key,text]) => <div key={key} style={{ marginBottom: 16 }}><label style={label}>{text}</label><textarea style={{ ...input, minHeight: 95 }} value={form[key]} onChange={e => set(key, e.target.value)} /></div>)}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: '#D5CEC2', lineHeight: 1.55 }}><input type="checkbox" checked={form.urgentSymptoms} onChange={e => set('urgentSymptoms', e.target.checked)} style={{ marginTop: 4 }} /><span>I am reporting a potentially urgent or severe reaction that may require prompt professional medical attention.</span></label>
        </section>

        <div style={{ background: '#15120D', border: '1px solid #473A26', padding: 20, color: '#BFB5A5', fontSize: 12, lineHeight: 1.7, marginBottom: 20 }}>This check-in supports coaching, education, and pattern tracking. It does not diagnose, prescribe, replace medical care, or provide emergency services. Seek qualified medical care for serious, worsening, or urgent symptoms.</div>
        {error && <p style={{ color: '#E7A8A8', border: '1px solid #683B3B', padding: 14 }}>{error}</p>}
        <button disabled={status === 'sending'} style={{ width: '100%', background: '#C9A96E', color: '#080808', border: 0, padding: '18px', textTransform: 'uppercase', letterSpacing: '.18em', fontWeight: 700, cursor: 'pointer', opacity: status === 'sending' ? .65 : 1 }}>{status === 'sending' ? 'Saving Your Check-In…' : 'Submit to Lion Elite Beauty'}</button>
      </form>
    </main>
    <Footer />
  </div>
}
