// ── Program Content API ─────────────────────────────────────────────────────
// GET /api/programs
// Returns program content per program type — steps, timeline, resources.

const programs = {
  neuro: {
    label: 'Neuro / Cognitive',
    accent: '#8A9E85',
    tagline: 'Cognitive performance optimization',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Baseline & Setup', items: [
        'Cognitive baseline markers established',
        'Sleep & recovery patterns reviewed',
        'Neurotransmitter and inflammation markers noted',
        'Protocol designed around your specific presentation',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Protocol Launch', items: [
        'Personalized neuro peptide protocol begins',
        'Focus and mental clarity shifts begin',
        'Sleep quality improvements commonly reported',
        'Baseline cognitive load feeling lighter',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Cognitive Shift', items: [
        'Sustained focus during high-demand tasks',
        'Reduction in afternoon energy crashes',
        'Memory recall and processing speed improving',
        'Mental stamina under pressure noticeably better',
      ]},
      { id: 'wk9+', label: 'Week 9+: Optimized Performance', items: [
        'Peak cognitive output becoming consistent',
        'Stress resilience and mental clarity stable',
        'Protocol refined for long-term maintenance',
        'High-performance baseline locked in',
      ]},
    ],
    outcomes: [
      'Mental clarity — the fog lifts',
      'Sustained focus through long work sessions',
      'Memory & recall improvements',
      'Stress resilience under pressure',
      'Energy consistency throughout the day',
    ],
    resources: [
      { label: 'Protocol Guide', type: 'pdf' },
      { label: 'Supplement Schedule', type: 'pdf' },
      { label: 'Progress Tracker', type: 'link' },
    ],
  },
  muscle: {
    label: 'Muscle & Recovery',
    accent: '#C9A96E',
    tagline: 'Strength, recovery & performance',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Foundation', items: [
        'Baseline strength and recovery markers established',
        'Nutrition and training review',
        'Initial peptide protocol introduction',
        'Recovery metrics baseline',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Adaptation', items: [
        'Protocol ramping up',
        'Recovery improvements becoming noticeable',
        'Training intensity adjustments',
        'First progress assessment',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Progression', items: [
        'Strength gains becoming consistent',
        'Recovery times improving between sessions',
        'Body composition changes visible',
        'Protocol refined based on response',
      ]},
      { id: 'wk9+', label: 'Week 9+: Peak Performance', items: [
        'Sustained strength and recovery gains',
        'Optimized training load management',
        'Long-term protocol maintenance',
        'Peak physical output consistent',
      ]},
    ],
    outcomes: [
      'Improved strength and power output',
      'Faster recovery between training sessions',
      'Enhanced body composition',
      'Better sleep quality and recovery',
      'Reduced inflammation and joint discomfort',
    ],
    resources: [
      { label: 'Training Protocol', type: 'pdf' },
      { label: 'Nutrition Guide', type: 'pdf' },
      { label: 'Recovery Tracker', type: 'link' },
    ],
  },
  fertility: {
    label: 'Fertility & Hormonal',
    accent: '#B8A4D4',
    tagline: 'Reproductive health optimization',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Assessment', items: [
        'Complete hormonal panel review',
        'Fertility biomarker baseline established',
        'Nutritional and lifestyle assessment',
        'Personalized protocol design begins',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Protocol Initiation', items: [
        'Hormonal peptide protocol begins',
        'Cycle and biomarker tracking starts',
        'Nutritional support introduced',
        'Initial response monitoring',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Optimization', items: [
        'Hormonal markers re-assessed',
        'Protocol adjustments based on response',
        'Lifestyle and nutrition refinements',
        'Progress toward reproductive goals',
      ]},
      { id: 'wk9+', label: 'Week 9+: Sustained Support', items: [
        'Ongoing hormonal balance maintenance',
        'Long-term fertility optimization',
        'Protocol fine-tuning for sustained results',
        'Continued monitoring and support',
      ]},
    ],
    outcomes: [
      'Improved hormonal balance',
      'Enhanced reproductive health markers',
      'Better cycle regularity and function',
      'Reduced hormonal symptoms',
      'Optimized fertility window',
    ],
    resources: [
      { label: 'Hormone Guide', type: 'pdf' },
      { label: 'Cycle Tracker', type: 'link' },
      { label: 'Nutrition Protocol', type: 'pdf' },
    ],
  },
  hair: {
    label: 'Hair Restoration',
    accent: '#C4A265',
    tagline: 'Hair density & scalp health',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Baseline', items: [
        'Hair density and scalp assessment',
        'Nutritional and hormonal markers reviewed',
        'Inflammation and DHT pathway analysis',
        'Personalized protocol design',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Protocol Start', items: [
        'Targeted peptide protocol begins',
        'Scalp care routine introduced',
        'Nutritional support for hair health',
        'Early response monitoring',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Visible Change', items: [
        'Hair texture and shine improvements',
        'Reduced shedding commonly reported',
        'Scalp health improvements visible',
        'Protocol adjustments as needed',
      ]},
      { id: 'wk9+', label: 'Week 9+: Density Building', items: [
        'Sustained hair density improvements',
        'Long-term hair health maintenance',
        'Protocol refined for continued results',
        'Ongoing progress tracking',
      ]},
    ],
    outcomes: [
      'Improved hair density and thickness',
      'Reduced hair shedding',
      'Healthier scalp and hair follicles',
      'Better hair texture and shine',
      'Sustained hair health long-term',
    ],
    resources: [
      { label: 'Hair Health Guide', type: 'pdf' },
      { label: 'Scalp Care Protocol', type: 'pdf' },
      { label: 'Progress Photo Tracker', type: 'link' },
    ],
  },
  weight: {
    label: 'Weight & Metabolic',
    accent: '#5BA87A',
    tagline: 'Fat loss & metabolic optimization',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Metabolic Baseline', items: [
        'Metabolic and body composition assessment',
        'Blood sugar and insulin sensitivity markers',
        'Thyroid and hormone panel review',
        'Personalized protocol design',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Protocol Launch', items: [
        'Metabolic peptide protocol begins',
        'Nutrition strategy implemented',
        'Activity and movement optimization',
        'Initial metabolic response monitoring',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Transformation', items: [
        'Visible body composition changes',
        'Energy levels and metabolic rate improving',
        'Appetite and craving regulation',
        'Protocol adjustments based on progress',
      ]},
      { id: 'wk9+', label: 'Week 9+: Metabolic Reset', items: [
        'Sustained metabolic improvements',
        'Long-term weight management strategy',
        'Habit integration for lasting results',
        'Ongoing optimization and support',
      ]},
    ],
    outcomes: [
      'Improved body composition',
      'Better metabolic rate and energy',
      'Reduced cravings and appetite control',
      'Stable blood sugar levels',
      'Sustained weight management',
    ],
    resources: [
      { label: 'Metabolic Guide', type: 'pdf' },
      { label: 'Meal Plan Template', type: 'pdf' },
      { label: 'Progress Tracker', type: 'link' },
    ],
  },
  longevity: {
    label: 'Longevity & Anti-Aging',
    accent: '#7A9FBF',
    tagline: 'Cellular repair & age management',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Cellular Baseline', items: [
        'Comprehensive biomarker panel',
        'Cellular health and inflammation markers',
        'Telomere and biological age assessment',
        'Personalized longevity protocol design',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Protocol Start', items: [
        'Longevity peptide protocol begins',
        'NAD+ and mitochondrial support introduced',
        'Anti-inflammatory protocol initiated',
        'Early response tracking',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Cellular Renewal', items: [
        'Energy and vitality improvements',
        'Cognitive and physical resilience building',
        'Skin and tissue health visible changes',
        'Protocol refinement based on markers',
      ]},
      { id: 'wk9+', label: 'Week 9+: Long-Term Optimization', items: [
        'Sustained cellular health improvements',
        'Biological age marker progress',
        'Long-term anti-aging protocol maintenance',
        'Ongoing biomarker monitoring',
      ]},
    ],
    outcomes: [
      'Improved energy and vitality',
      'Better cellular health markers',
      'Enhanced cognitive function',
      'Improved skin and tissue health',
      'Reduced inflammation markers',
    ],
    resources: [
      { label: 'Longevity Guide', type: 'pdf' },
      { label: 'Supplement Protocol', type: 'pdf' },
      { label: 'Biomarker Tracker', type: 'link' },
    ],
  },
  skin: {
    label: 'Skin Improvement',
    accent: '#C9A96E',
    tagline: 'Advanced peptide skincare',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Skin Assessment', items: [
        'Skin condition and concern assessment',
        'Current routine review',
        'Product protocol introduction',
        'Morning and evening routine establishment',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Adaptation', items: [
        'Skin beginning to respond to protocol',
        'Texture and tone improvements starting',
        'Hydration levels improving',
        'Routine becoming habitual',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Visible Results', items: [
        'Visible improvements in skin appearance',
        'Fine lines appearing less pronounced',
        'Skin tone more even and radiant',
        'Protocol adjustments as needed',
      ]},
      { id: 'wk9+', label: 'Week 9+: Sustained Results', items: [
        'Continued skin health improvements',
        'Long-term maintenance protocol',
        'Seasonal adjustments',
        'Ongoing progress documentation',
      ]},
    ],
    outcomes: [
      'Improved skin texture and tone',
      'Reduced appearance of fine lines',
      'Better hydration and skin barrier',
      'More even complexion',
      'Radiant, healthy-looking skin',
    ],
    resources: [
      { label: 'Skincare Protocol', type: 'pdf' },
      { label: 'Product Usage Guide', type: 'pdf' },
      { label: 'Progress Photo Tracker', type: 'link' },
    ],
  },
  general: {
    label: 'General Wellness',
    accent: '#8A9E85',
    tagline: 'Foundational health optimization',
    phases: [
      { id: 'wk1-2', label: 'Week 1-2: Foundation', items: [
        'Comprehensive wellness assessment',
        'Baseline biomarker panel',
        'Current health and lifestyle review',
        'Personalized wellness protocol design',
      ]},
      { id: 'wk3-4', label: 'Week 3-4: Implementation', items: [
        'Wellness protocol begins',
        'Nutrition and lifestyle adjustments',
        'Supplement and peptide introduction',
        'Early progress tracking',
      ]},
      { id: 'wk5-8', label: 'Week 5-8: Optimization', items: [
        'Energy and well-being improving',
        'Health markers trending positively',
        'Protocol refinements based on response',
        'Habit consolidation',
      ]},
      { id: 'wk9+', label: 'Week 9+: Maintenance', items: [
        'Sustained wellness improvements',
        'Long-term health optimization',
        'Protocol maintenance and adjustments',
        'Ongoing health monitoring',
      ]},
    ],
    outcomes: [
      'Improved energy and well-being',
      'Better health biomarker scores',
      'Enhanced sleep quality',
      'Reduced stress and better resilience',
      'Overall health optimization',
    ],
    resources: [
      { label: 'Wellness Guide', type: 'pdf' },
      { label: 'Supplement Protocol', type: 'pdf' },
      { label: 'Health Tracker', type: 'link' },
    ],
  },
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { program } = req.query

  if (program) {
    const content = programs[program]
    if (!content) return res.status(404).json({ error: 'Program not found' })
    return res.status(200).json(content)
  }

  return res.status(200).json(programs)
}