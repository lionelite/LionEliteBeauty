import { Link } from 'react-router-dom'

const groups = [
  { title: 'Physique', text: 'Muscle, recovery, weight management and body-composition goals.', links: [['Muscle & Recovery', '/programs/muscle'], ['Weight', '/programs/weight']] },
  { title: 'Performance', text: 'Cognitive focus, recovery capacity and day-to-day performance.', links: [['Neuro', '/programs/neuro'], ['Longevity', '/programs/longevity']] },
  { title: 'Health & Confidence', text: 'Targeted support for fertility, hair and long-term optimization.', links: [['Fertility', '/programs/fertility'], ['Hair', '/programs/hair']] },
]

export default function BrandManifesto() {
  return (
    <section style={{ backgroundColor: '#F3EDE4', padding: '110px 0', borderTop: '1px solid #E5DACD', borderBottom: '1px solid #E5DACD' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <p style={eyebrow}>The Lion Elite Method</p>
            <h2 style={heading}>Private coaching for people who want more than a generic plan.</h2>
            <p style={copy}>Our premium programs bring structure, accountability and personalization together around your goals. The point is not more information. It is a clear plan, ongoing guidance and consistent execution.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/apply" style={primary}>Apply for Private Coaching →</Link>
              <Link to="/programs/optimization" style={secondary}>Explore Programs</Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-3 gap-3">
            {groups.map(group => (
              <div key={group.title} style={card}>
                <p style={eyebrow}>{group.title}</p>
                <p style={{ ...copy, fontSize: '13px', marginBottom: '24px' }}>{group.text}</p>
                <div style={{ marginTop: 'auto' }}>
                  {group.links.map(([label, href]) => (
                    <Link key={href} to={href} style={textLink}>{label} →</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16" style={{ background: '#DED1C2' }}>
          {[
            ['01', 'Assess', 'Start with your goals, context and current baseline.'],
            ['02', 'Build', 'Create a personalized roadmap around the outcome you want.'],
            ['03', 'Implement', 'Turn the plan into practical weekly action.'],
            ['04', 'Refine', 'Adjust as progress, feedback and priorities change.'],
          ].map(([n, title, text]) => (
            <div key={n} style={{ background: '#FAF8F4', padding: '34px 28px' }}>
              <p style={{ ...eyebrow, color: '#B49A73' }}>{n}</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.25rem', marginBottom: '10px' }}>{title}</p>
              <p style={{ ...copy, fontSize: '12px', marginBottom: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.28em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '16px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '2.55rem', lineHeight: 1.15, marginBottom: '22px' }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6F6962', fontSize: '15px', lineHeight: 1.8 }
const card = { background: '#FAF8F4', border: '1px solid #E1D5C8', padding: '30px', display: 'flex', flexDirection: 'column', minHeight: '275px' }
const primary = { background: '#C9AA73', color: '#302E2B', textDecoration: 'none', padding: '14px 22px', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase' }
const secondary = { border: '1px solid #D2C5B5', color: '#6F6962', textDecoration: 'none', padding: '14px 22px', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase' }
const textLink = { display: 'block', color: '#A7895B', textDecoration: 'none', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', marginTop: '10px' }
