const services = [
  {
    icon: '◈',
    category: 'Medical Aesthetics',
    title: 'Injectables & Wellness',
    items: ['Tirzepatide Weight Management', 'Semaglutide Programs', 'Peptide Therapy', 'IV Nutrient Infusions'],
    accent: '#C9A96E',
    bg: '#F5F0E8',
  },
  {
    icon: '◇',
    category: 'Skin Treatments',
    title: 'Advanced Skin Care',
    items: ['Microneedling with GHK-Cu', 'Chemical Peels', 'LED Phototherapy', 'Post-Procedure Repair'],
    accent: '#8A9E85',
    bg: '#F0EEE9',
  },
  {
    icon: '◉',
    category: 'Peptide Skincare',
    title: 'GHK-Cu Product Line',
    items: ['Peptide Face Wash', 'Regenerating Serum', 'Anti-Aging Cream', 'Recovery Kit'],
    accent: '#C9A96E',
    bg: '#F5F0E8',
  },
]

export default function Services() {
  return (
    <section id="services" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">
            Our Expertise
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.01em' }}
            className="font-normal">
            Comprehensive Aesthetic &<br />Wellness Solutions
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title}
              style={{ backgroundColor: service.bg, border: '1px solid #E8DDD0' }}
              className="p-10 hover:shadow-lg transition-shadow duration-300">
              {/* Icon */}
              <span style={{ color: service.accent, fontSize: '1.5rem' }} className="block mb-6">
                {service.icon}
              </span>

              {/* Category */}
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: service.accent, letterSpacing: '0.2em', fontSize: '10px' }}
                className="uppercase tracking-widest mb-3">
                {service.category}
              </p>

              {/* Title */}
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.3rem' }}
                className="font-normal mb-6">
                {service.title}
              </h3>

              <div style={{ width: '32px', height: '1px', backgroundColor: service.accent }} className="mb-6"></div>

              {/* Items */}
              <ul className="space-y-3">
                {service.items.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: service.accent, marginTop: '4px' }} className="text-xs">—</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '14px', lineHeight: '1.6' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#consultation"
                style={{ color: service.accent, fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '11px', borderBottom: `1px solid ${service.accent}` }}
                className="inline-block mt-8 uppercase tracking-widest pb-0.5 hover:opacity-70 transition-opacity">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
