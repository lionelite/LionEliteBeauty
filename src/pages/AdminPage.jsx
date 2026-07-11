import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const adminTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'clients', label: 'Clients' },
  { id: 'questionnaires', label: 'Questionnaires' },
  { id: 'settings', label: 'Settings' },
]

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [vipAdminToken, setVipAdminToken] = useState('')
  const [error, setError] = useState('')
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [message, setMessage] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientDetail, setClientDetail] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [editRiskFlags, setEditRiskFlags] = useState('green')

  useEffect(() => { window.scrollTo(0, 0) }, [activeTab])

  async function handleLogin(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', email, password }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setLoading(false); return }
      setToken(data.token)
      setVipAdminToken(data.vipAdminToken || 'lionelite-admin-secret')
      setLoggedIn(true)
      fetchAccounts(data.vipAdminToken || 'lionelite-admin-secret')
    } catch { setError('Connection error'); setLoading(false) }
  }

  async function fetchAccounts(adminToken) {
    const t = adminToken || vipAdminToken
    setLoading(true)
    try {
      const res = await fetch('/api/vip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'list-all', token: t }) })
      const data = await res.json()
      if (data.accounts) setAccounts(data.accounts)
    } catch {}
    setLoading(false)
  }

  async function handleLogout() {
    await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout', token }) }).catch(() => {})
    setLoggedIn(false); setToken(''); setAccounts([])
  }

  async function togglePaid(vipId, email, currentlyPaid) {
    setMessage('')
    try {
      const res = await fetch('/api/vip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update-status', token: vipAdminToken, email, vipId, paid: !currentlyPaid }) })
      if (res.ok) {
        setAccounts(prev => prev.map(a => a.vipId === vipId ? { ...a, paid: !currentlyPaid } : a))
        setMessage(`Payment status updated for ${email}`)
      }
    } catch {}
  }

  async function loadClientDetail(client) {
    setSelectedClient(client)
    try {
      const res = await fetch('/api/vip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'lookup', email: client.email }) })
      if (res.ok) {
        const data = await res.json()
        setClientDetail(data)
        setEditNotes(data.notes || '')
        setEditRiskFlags(data.riskFlags?.level || 'green')
      }
    } catch {}
  }

  async function saveClientNotes() {
    if (!selectedClient) return
    setMessage('')
    try {
      const res = await fetch('/api/vip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update-status', token: vipAdminToken, email: selectedClient.email, vipId: selectedClient.vipId, notes: editNotes }) })
      if (res.ok) {
        setMessage('Notes saved')
        setAccounts(prev => prev.map(a => a.vipId === selectedClient.vipId ? { ...a, notes: editNotes } : a))
        setClientDetail(prev => ({ ...prev, notes: editNotes }))
      }
    } catch {}
  }

  async function saveRiskFlags() {
    if (!selectedClient) return
    setMessage('')
    try {
      await fetch('/api/vip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update-client', email: selectedClient.email, token: vipAdminToken, riskFlags: { level: editRiskFlags, notes: '' } }) })
      setMessage('Risk flags updated')
    } catch {}
  }

  if (!loggedIn) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <SEO title="Admin Login — Lion Elite" />
        <Navbar />
        <div style={{ paddingTop: '140px' }} className="max-w-md mx-auto px-6">
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '48px 40px' }}>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '16px', textAlign: 'center' }} className="uppercase">Admin Portal</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.8rem', textAlign: 'center', marginBottom: '8px' }} className="font-normal">Sign In</h1>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 32px' }}></div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} required />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }} required />
              </div>
              {error && <p style={{ color: '#C0392B', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }} className="uppercase">
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}><Link to="/" style={{ color: '#C9A96E', textDecoration: 'none' }}>← Back to site</Link></p>
        </div>
        <Footer />
      </div>
    )
  }

  const totalClients = accounts.length
  const paidClients = accounts.filter(a => a.paid).length
  const pendingClients = accounts.filter(a => !a.paid).length

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Admin Dashboard — Lion Elite" />
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-4">
              <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }} className="uppercase hover:text-[#C9A96E]">← Site</Link>
              <p style={{ color: '#BABABA', fontSize: '12px' }}>/</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.15em' }} className="uppercase">Admin Dashboard</p>
            </div>
            <button onClick={handleLogout} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.15em', background: 'none', border: '1px solid #E0D5C5', padding: '10px 20px', cursor: 'pointer' }} className="uppercase hover:text-[#C0392B]">Sign Out</button>
          </div>

          {/* Tab nav */}
          <div style={{ borderBottom: '1px solid #E0D5C5', marginBottom: '28px', display: 'flex', gap: '4px' }}>
            {adminTabs.map(t => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setSelectedClient(null) }}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeTab === t.id ? '2px solid #C9A96E' : '2px solid transparent', color: activeTab === t.id ? '#C9A96E' : '#8A8A8A' }} className="uppercase">
                {t.label}
              </button>
            ))}
          </div>

          {/* ═══ DASHBOARD ═══ */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.8rem', marginBottom: '24px' }} className="font-normal">Business Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Active Clients', value: totalClients, accent: '#2A2A2A' },
                  { label: 'Paid', value: paidClients, accent: '#5BA87A' },
                  { label: 'Pending', value: pendingClients, accent: '#C9A96E' },
                  { label: 'Revenue', value: `$${paidClients * 2400}+`, accent: '#7A9FBF' },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '20px 24px' }}>
                    <p style={{ fontFamily: 'Georgia, serif', color: s.accent, fontSize: '28px', margin: '0 0 4px' }}>{s.value}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.15em', margin: 0 }} className="uppercase">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Program breakdown */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', marginBottom: '28px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Program Breakdown</p>
                <div className="space-y-3">
                  {['Muscle & Recovery', 'Neuro / Cognitive', 'Fertility & Hormonal', 'Hair Restoration', 'Weight & Metabolic', 'Longevity & Anti-Aging', 'General Wellness', 'Not specified'].map(prog => {
                    const count = accounts.filter(a => (a.program || 'Not specified') === prog).length
                    if (count === 0) return null
                    return (
                      <div key={prog} className="flex items-center gap-3">
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', minWidth: '160px', margin: 0 }}>{prog}</p>
                        <div style={{ flex: 1, height: '8px', backgroundColor: '#F0EAE0', borderRadius: '4px' }}>
                          <div style={{ width: `${(count / totalClients) * 100}%`, height: '100%', backgroundColor: '#C9A96E', borderRadius: '4px', transition: 'width 0.3s' }}></div>
                        </div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', minWidth: '30px', textAlign: 'right', margin: 0 }}>{count}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick actions */}
              <div style={{ backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '20px 24px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '12px' }} className="uppercase">Quick Actions</p>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => fetchAccounts()} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.1em', backgroundColor: '#C9A96E', color: '#000', border: 'none', padding: '12px 24px', cursor: 'pointer' }} className="uppercase">Refresh Data</button>
                  <button onClick={() => setActiveTab('clients')} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.1em', backgroundColor: '#FFFFFF', color: '#4A4A4A', border: '1px solid #E0D5C5', padding: '12px 24px', cursor: 'pointer' }} className="uppercase">View All Clients</button>
                </div>
              </div>
            </div>
          )}

          {/* ═══ CLIENTS ═══ */}
          {activeTab === 'clients' && (
            <div>
              {selectedClient && clientDetail ? (
                <div>
                  <button onClick={() => setSelectedClient(null)} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', display: 'block' }}>← Back to all clients</button>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Client info */}
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '18px', marginBottom: '4px' }}>{clientDetail.name}</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '16px' }}>{clientDetail.vipId}</p>
                      <div className="space-y-2">
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Email: {clientDetail.email}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Program: {clientDetail.program}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Tier: {clientDetail.tier || '—'}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Payment: {clientDetail.paid ? 'Paid ✓' : 'Pending ○'}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Created: {clientDetail.created ? new Date(clientDetail.created).toLocaleDateString() : '—'}</p>
                        {clientDetail.phone && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Phone: {clientDetail.phone}</p>}
                        {clientDetail.goals?.primary && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', margin: 0 }}>Goal: {clientDetail.goals.primary}</p>}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => togglePaid(clientDetail.vipId, clientDetail.email, clientDetail.paid)}
                          style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.1em', backgroundColor: clientDetail.paid ? '#C0392B' : '#5BA87A', color: '#FFF', border: 'none', padding: '8px 16px', cursor: 'pointer' }} className="uppercase">
                          {clientDetail.paid ? 'Mark Pending' : 'Mark Paid'}
                        </button>
                      </div>
                    </div>
                    {/* Coach notes */}
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Coach Notes</p>
                      <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={8}
                        style={{ width: '100%', padding: '12px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', color: '#2A2A2A', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                      <button onClick={saveClientNotes} style={{ marginTop: '8px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.1em', backgroundColor: '#C9A96E', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer' }} className="uppercase">Save Notes</button>
                    </div>
                    {/* Risk flags */}
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Risk Flags</p>
                      <div className="space-y-3">
                        {['green', 'yellow', 'red'].map(level => (
                          <button key={level} onClick={() => setEditRiskFlags(level)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', border: editRiskFlags === level ? '2px solid' : '1px solid #E0D5C5', borderColor: level === 'green' ? '#5BA87A' : level === 'yellow' ? '#C9A96E' : '#C0392B', backgroundColor: editRiskFlags === level ? (level === 'green' ? '#E8F5E9' : level === 'yellow' ? '#FFF8E1' : '#FFEBEE') : '#FFFFFF', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', color: '#2A2A2A' }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: level === 'green' ? '#5BA87A' : level === 'yellow' ? '#C9A96E' : '#C0392B', marginRight: '8px' }}></span>
                            {level === 'green' ? 'Green — No concern' : level === 'yellow' ? 'Yellow — Coach review required' : 'Red — Pause, refer to professional'}
                          </button>
                        ))}
                        <button onClick={saveRiskFlags} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.1em', backgroundColor: '#C9A96E', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer' }} className="uppercase">Update Flags</button>
                      </div>
                    </div>
                  </div>
                  {/* Progress */}
                  {clientDetail.progress?.length > 0 && (
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '24px', marginTop: '24px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Progress Steps</p>
                      {clientDetail.progress.map((s, i) => (
                        <div key={i} className="flex items-center gap-3" style={{ padding: '8px 0', borderBottom: i < clientDetail.progress.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: s.done ? '#5BA87A' : '#E0D5C5', flexShrink: 0 }}></span>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', margin: 0 }}>{s.label || s.step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem' }} className="font-normal">Client Accounts ({totalClients})</h1>
                    <button onClick={() => fetchAccounts()} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.1em', backgroundColor: '#C9A96E', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer' }} className="uppercase">Refresh</button>
                  </div>
                  {message && <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #5BA87A', padding: '12px 20px', marginBottom: '20px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px' }}>{message}</div>}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', overflow: 'hidden' }}>
                    <div className="overflow-x-auto">
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #E0D5C5', backgroundColor: '#FAF7F2' }}>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">VIP ID</th>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">Name</th>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">Email</th>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">Program</th>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">Tier</th>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">Payment</th>
                            <th style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.15em', textAlign: 'left', fontWeight: 400 }} className="uppercase">Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accounts.length === 0 ? (
                            <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '13px' }}>{loading ? 'Loading...' : 'No client accounts yet.'}</td></tr>
                          ) : (
                            accounts.map((a, i) => (
                              <tr key={a.vipId} style={{ borderBottom: '1px solid #F0EAE0', backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAF8F6', cursor: 'pointer' }} onClick={() => loadClientDetail(a)} className="hover:bg-[#F5F0E8] transition-colors">
                                <td style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.05em' }}>{a.vipId}</td>
                                <td style={{ padding: '14px 18px', fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '14px' }}>{a.name}</td>
                                <td style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px' }}>{a.email}</td>
                                <td style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px' }}>{a.program || '—'}</td>
                                <td style={{ padding: '14px 18px' }}>
                                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.1em', padding: '4px 10px', backgroundColor: a.tier === 'vip' ? '#7A9FBF20' : a.tier === 'foundation' ? '#8A9E8520' : '#F0EAE0', color: a.tier === 'vip' ? '#7A9FBF' : a.tier === 'foundation' ? '#8A9E85' : '#8A8A8A' }} className="uppercase">{a.tier || '—'}</span>
                                </td>
                                <td style={{ padding: '14px 18px' }}>
                                  <div className="flex items-center gap-2">
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: a.paid ? '#5BA87A' : '#C9A96E' }}></span>
                                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: a.paid ? '#5BA87A' : '#C9A96E', fontSize: '11px', letterSpacing: '0.05em' }}>{a.paid ? 'Paid' : 'Pending'}</span>
                                  </div>
                                </td>
                                <td style={{ padding: '14px 18px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px' }}>{a.created ? new Date(a.created).toLocaleDateString() : '—'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ═══ QUESTIONNAIRES ═══ */}
          {activeTab === 'questionnaires' && (
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">Client Questionnaires</h1>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', marginBottom: '24px' }}>View client health screening and lifestyle questionnaire submissions.</p>
              {accounts.length === 0 ? (
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '13px', textAlign: 'center', padding: '40px' }}>No client data yet.</p>
              ) : (
                <div className="space-y-4">
                  {accounts.filter(a => a.notes).map(a => (
                    <div key={a.vipId} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '20px 24px' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '15px', margin: 0 }}>{a.name}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.1em', margin: 0 }}>{a.vipId}</p>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', margin: 0 }}>Program: {a.program} · {a.paid ? 'Paid' : 'Pending'}</p>
                      <button onClick={() => loadClientDetail(a)} style={{ marginTop: '12px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.1em', color: '#C9A96E', background: 'none', border: '1px solid #C9A96E40', padding: '8px 16px', cursor: 'pointer' }} className="uppercase">View Details</button>
                    </div>
                  ))}
                  {accounts.filter(a => a.notes).length === 0 && (
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '13px', textAlign: 'center', padding: '40px' }}>No questionnaire submissions yet.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ═══ SETTINGS ═══ */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '500px' }}>
              <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', marginBottom: '24px' }} className="font-normal">Settings</h1>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Admin Account</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', margin: '0 0 8px' }}>Email: <strong>admin@lionelitebeauty.com</strong></p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', margin: '0 0 8px' }}>Password: <strong>LionElite9903</strong></p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px', margin: '16px 0 0' }}>Data is stored in a JSON file on the server. For production, consider migrating to a database.</p>
              </div>
            </div>
          )}

          <div style={{ marginTop: '80px' }}><Footer /></div>
        </div>
      </div>
    </div>
  )
}