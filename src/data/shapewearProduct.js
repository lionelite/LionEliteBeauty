// Shapewear prelaunch product configuration.
//
// Every value the owner still has to supply or verify is marked
// `verified: false` (or left null). The page renders a visible
// "Pending product validation" badge next to anything unverified, and the
// purchase controls stay disabled while `status` is 'prelaunch'.
//
// See docs/SHAPEWEAR-PRELAUNCH-HANDOFF.md for the full list of owner inputs
// and the steps to switch this product to a purchasable state.

export const SHAPEWEAR_STATUS = {
  PRELAUNCH: 'prelaunch',
  PURCHASABLE: 'purchasable',
}

export const shapewearProduct = {
  // 'prelaunch' keeps purchase controls disabled and the page out of search
  // results. Do not change this until every item in the handoff doc is done.
  status: SHAPEWEAR_STATUS.PRELAUNCH,

  slug: 'easy-off-bodysuit',
  route: '/shapewear',

  // Placeholder name. Replace with the final product name.
  name: { value: 'The Easy-Off Bodysuit', verified: false },
  category: 'Tummy-control bodysuit',
  tagline: 'An everyday base layer designed to be easy to wear and easy to take off.',

  // Retail price is not set. $34.99 is a modeling hypothesis from the launch
  // brief only, and is intentionally NOT rendered on the page.
  price: { value: null, currency: 'USD', verified: false },
  modelingPriceHypothesis: 34.99,

  sku: { value: null, verified: false },
  supplier: { value: null, verified: false },

  features: [
    {
      id: 'comfort',
      title: 'Comfort for all-day wear',
      body: 'Designed to be comfortable enough to wear from morning to evening. Fabric, stretch and breathability will be confirmed on samples before launch.',
      verified: false,
    },
    {
      id: 'fit',
      title: 'Fit that stays in place',
      body: 'Designed to smooth the midsection under everyday outfits without rolling or shifting. Hold and stay-put performance will be tested on several body types before launch.',
      verified: false,
    },
    {
      id: 'easy-off',
      title: 'Bathroom-friendly design',
      body: 'Designed with a gusset or closure so you do not have to take the whole bodysuit off. The exact construction will be confirmed with the supplier before launch.',
      verified: false,
    },
  ],

  // Placeholder size list. Real sizes, measurements and availability come
  // from tested samples. Nothing here implies a size is in stock.
  sizes: {
    verified: false,
    options: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  },
  // Columns: size, waist, hips. Values are blank until measured on samples.
  sizeChart: {
    verified: false,
    unit: 'in',
    rows: [
      { size: 'XS', waist: null, hips: null },
      { size: 'S', waist: null, hips: null },
      { size: 'M', waist: null, hips: null },
      { size: 'L', waist: null, hips: null },
      { size: 'XL', waist: null, hips: null },
      { size: '2XL', waist: null, hips: null },
      { size: '3XL', waist: null, hips: null },
    ],
  },

  colors: { verified: false, options: [] },

  fabric: { value: null, verified: false },
  care: { value: null, verified: false },

  shipping: {
    verified: false,
    origin: null,
    processingTime: null,
    deliveryEstimate: null,
  },
  returns: {
    verified: false,
    window: null,
    conditions: null,
  },

  // Photos and videos. Each entry is a placeholder until the owner supplies
  // final assets with commercial usage rights.
  media: [
    { id: 'front', src: null, alt: 'Front view of the bodysuit on a model', placeholderLabel: 'Product photo: front view' },
    { id: 'back', src: null, alt: 'Back view of the bodysuit on a model', placeholderLabel: 'Product photo: back view' },
    { id: 'closure', src: null, alt: 'Close-up of the bathroom-friendly closure', placeholderLabel: 'Detail photo: closure' },
    { id: 'outfit', src: null, alt: 'The bodysuit worn under an everyday outfit', placeholderLabel: 'Styling photo: under an outfit' },
  ],

  contactEmail: 'info@lionelitebeauty.com',
}

export function isPurchasable(product = shapewearProduct) {
  return product.status === SHAPEWEAR_STATUS.PURCHASABLE
}
