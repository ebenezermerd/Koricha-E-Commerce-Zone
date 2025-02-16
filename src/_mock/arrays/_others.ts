import _mock from '../_mock';

// ----------------------------------------------------------------------

export const _categories = [
  { label: 'Marketing', path: '' },
  { label: 'Community', path: '' },
  { label: 'Tutorials', path: '' },
  { label: 'Business', path: '' },
  { label: 'Management', path: '' },
];

// ----------------------------------------------------------------------

export const _tags = [
  { label: 'Marketing', path: '' },
  { label: 'Development', path: '' },
  { label: 'Banking', path: '' },
  { label: 'HR & Recruting', path: '' },
  { label: 'Design', path: '' },
  { label: 'Management', path: '' },
  { label: 'Business', path: '' },
  { label: 'Community', path: '' },
  { label: 'Tutorials', path: '' },
];

// ----------------------------------------------------------------------

export const _testimonials = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
  avatar: _mock.image.avatar(index),
  postDate: _mock.time(index),
  rating: 5,
  review:
    'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    label: 'FaceBook',
    icon: 'carbon:logo-facebook',
    color: '#1877F2',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: 'carbon:logo-instagram',
    color: '#E02D69',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    icon: 'carbon:logo-linkedin',
    color: '#007EBB',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    icon: 'carbon:logo-twitter',
    color: '#00AAEC',
  },
];

// ----------------------------------------------------------------------

const LAT_LONG = [
  [33, 65],
  [-12.5, 18.5],
  [20.96, 26.27],
];

export const _offices = ['Jordan', 'Canada', 'Portugal'].map((office, index) => ({
  id: _mock.id(index),
  country: office,
  address: _mock.address.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  email: _mock.email(index),
  photo: _mock.image.travel(index + 4),
  latlng: LAT_LONG[index],
}));

// ----------------------------------------------------------------------

const BRANDS_NAME = [
  'airbnb',
  'dropbox',
  'facebook',
  'google',
  'heroku',
  'lenovo',
  'microsoft',
  'netflix',
  'slack',
  'spotify',
  'tripadvisor',
  'vimeo',
];

export const _brands = BRANDS_NAME.map((brand, index) => ({
  id: _mock.id(index),
  name: brand,
  image: `/assets/logo/${brand}.svg`,
}));

export const _brandsColor = BRANDS_NAME.map((brand, index) => ({
  id: _mock.id(index),
  name: brand,
  image: `/assets/logo/${brand}_original.svg`,
}));

// ----------------------------------------------------------------------

export const _faqs = [
  'Sed augue ipsum, egestas nec, vestibulum et',
  'alesuada adipiscing, dui vestibulum suscipit nulla quis orci.',
  'Ut varius tincidunt libero',
  'In ut quam vitae odio lacinia tincidunt.',
  'Fusce vel dui Morbi nec metus.',
].map((question, index) => ({
  id: _mock.id(index),
  question,
  answer:
    'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));

export const _faqsSupport = [
  'How do I create an account on Korecha E-Commerce?',
  'What payment methods are accepted on Korecha?',
  'How can I track my order status?',
  'What is the return and refund policy?',
  'How do I leave a product review?',
  'Is my personal and payment information secure?',
  'What should I do if I receive a damaged product?',
  'How can I contact customer support?',
  'Do you offer international shipping?',
  'What are the delivery timeframes?'
].map((question, index) => ({
  id: _mock.id(index),
  question,
  answer: {
    0: 'Creating an account is simple! Click "Sign Up" at the top of the page, enter your email, create a password, and fill in your basic information. You\'ll receive a verification email to confirm your account.',
    1: 'We accept major credit/debit cards (Visa, Mastercard), PayPal, mobile money transfers, and bank transfers. All payments are processed securely through our payment gateway.',
    2: 'Once your order is confirmed, you\'ll receive a tracking number via email. You can use this number in the "Track Order" section of your account to monitor your delivery status in real-time.',
    3: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Once we receive the return, refunds are processed within 5-7 business days.',
    4: 'After receiving your order, you can leave a review by going to your order history, finding the product, and clicking "Write a Review". You can rate the product and share your experience.',
    5: 'Yes! We use industry-standard SSL encryption for all transactions. Your personal data is protected and never shared with third parties without your consent.',
    6: 'Please take photos of the damaged product and contact our support team immediately. We\'ll arrange a return and replacement at no additional cost to you.',
    7: 'Our support team is available 24/7 through live chat, email at support@korecha.com, or by phone at +1-XXX-XXX-XXXX.',
    8: 'Yes, we currently ship to select countries. International shipping rates and delivery times vary by location. Check our shipping policy for details.',
    9: 'Local deliveries typically arrive within 2-5 business days. Express shipping options are available for faster delivery. Delivery times may vary for international orders.'
  }[index],
}));
