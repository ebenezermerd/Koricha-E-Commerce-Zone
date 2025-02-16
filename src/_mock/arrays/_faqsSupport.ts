import _mock from '../_mock';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  title: string;
  icon: string;
  faqs: FaqItem[];
};

export const SUPPORT_FAQS: Record<string, FaqItem[]> = {
  Account: [
    {
      id: _mock.id(0),
      question: 'How do I create an account on Korecha E-Commerce?',
      answer: 'Creating an account is simple! Click "Sign Up" at the top of the page, enter your email, create a password, and fill in your basic information. You\'ll receive a verification email to confirm your account.',
    },
    {
      id: _mock.id(6),
      question: 'How do I reset my password?',
      answer: 'To reset your password, click "Forgot Password" on the login page. Enter your email address and follow the reset instructions sent to your inbox.',
    },
    {
      id: _mock.id(7), 
      question: 'Can I have multiple shipping addresses?',
      answer: 'Yes, you can save multiple shipping addresses in your account settings. During checkout, you can select which address to use for that order.',
    },
    {
      id: _mock.id(8),
      question: 'How do I update my account information?',
      answer: 'Log into your account, go to "Account Settings" or "Profile", and you can update your personal information, email, phone number and other details.',
    },
    {
      id: _mock.id(9),
      question: 'How can I view my order history?',
      answer: 'Your complete order history is available in your account dashboard under "Order History" or "My Orders". You can view details of past purchases and track current orders.',
    },
    {
      id: _mock.id(10),
      question: 'Can I change my email address?',
      answer: 'Yes, you can change your email address in your account settings. You\'ll need to verify the new email address before the change takes effect.',
    },
    {
      id: _mock.id(11),
      question: 'How do I delete my account?',
      answer: 'To delete your account, please contact our customer support team. They will guide you through the account deletion process and handle any remaining orders or refunds.',
    },
    {
      id: _mock.id(12),
      question: 'What happens to my loyalty points if I close my account?',
      answer: 'Loyalty points are forfeited when an account is closed. We recommend redeeming your points before requesting account deletion.',
    },
    {
      id: _mock.id(13),
      question: 'Can I merge multiple accounts?',
      answer: 'For security reasons, we cannot merge multiple accounts. Please contact customer support if you need help managing multiple accounts.',
    },
    {
      id: _mock.id(14),
      question: 'How do I subscribe to your newsletter?',
      answer: 'You can subscribe to our newsletter during account creation or by visiting your account settings. Look for the "Newsletter Preferences" section.',
    },
    {
      id: _mock.id(15),
      question: 'What should I do if I forget my username?',
      answer: 'Your username is typically your email address. If you\'ve forgotten it, click "Forgot Username" on the login page and follow the recovery steps.',
    },
    {
      id: _mock.id(16),
      question: 'How can I change my notification settings?',
      answer: 'Go to "Account Settings" and look for "Notification Preferences". You can customize email, SMS, and push notification settings there.',
    },
    {
      id: _mock.id(17),
      question: 'Is there a mobile app available?',
      answer: 'Yes, our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.',
    },
    {
      id: _mock.id(18),
      question: 'How do I link my social media accounts?',
      answer: 'In your account settings, look for "Connected Accounts" or "Social Media Links". You can connect various social platforms for easier login.',
    },
    {
      id: _mock.id(19),
      question: 'Can I have multiple users on one account?',
      answer: 'No, each account should be used by a single user. For business accounts with multiple users, please contact our business support team.',
    },
    {
      id: _mock.id(20),
      question: 'How secure is my account?',
      answer: 'We use industry-standard security measures including two-factor authentication, encrypted passwords, and regular security audits to protect your account.',
    },
    {
      id: _mock.id(21),
      question: 'What information is visible on my public profile?',
      answer: 'By default, only your username and review history are public. You can adjust your privacy settings to control what information is visible to others.',
    },
    {
      id: _mock.id(22),
      question: 'How often should I update my password?',
      answer: 'We recommend updating your password every 3-6 months. Always use strong passwords with a mix of letters, numbers, and special characters.',
    }
  ],
  Payment: [
    {
      id: _mock.id(1),
      question: 'What payment methods are accepted on Korecha?',
      answer: 'We accept major credit/debit cards (Visa, Mastercard), PayPal, mobile money transfers, and bank transfers. All payments are processed securely through our payment gateway.',
    },
    {
      id: _mock.id(35),
      question: 'Is it safe to save my payment information?',
      answer: 'Yes, we use industry-standard encryption to protect your payment information. Your card details are tokenized and stored securely for future purchases.',
    },
    {
      id: _mock.id(36),
      question: 'How do I add or remove a payment method?',
      answer: 'Go to "Payment Methods" in your account settings. You can add new cards or delete existing ones. For security, you\'ll need to verify your identity when making changes.',
    },
    {
      id: _mock.id(37),
      question: 'What currencies do you accept?',
      answer: 'We accept payments in USD, EUR, GBP, and several other major currencies. The price will be converted to your local currency at checkout.',
    },
    {
      id: _mock.id(38),
      question: 'Do you offer installment payments?',
      answer: 'Yes, we partner with several buy-now-pay-later services. Eligible purchases can be split into installments at checkout.',
    }
  ],
  Delivery: [
    {
      id: _mock.id(2),
      question: 'How can I track my order status?',
      answer: 'Once your order is confirmed, you\'ll receive a tracking number via email. You can use this number in the "Track Order" section of your account to monitor your delivery status in real-time.',
    },
    {
      id: _mock.id(39),
      question: 'What are the shipping costs?',
      answer: 'Shipping costs vary based on location and delivery speed. Free shipping is available for orders over $50. You can calculate exact costs at checkout.',
    },
    {
      id: _mock.id(40),
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping times and costs vary by location. Check our shipping calculator for specific details.',
    },
    {
      id: _mock.id(41),
      question: 'How long will delivery take?',
      answer: 'Standard domestic delivery takes 3-5 business days. Express shipping (1-2 days) is available in select areas. International shipping typically takes 7-14 business days.',
    },
    {
      id: _mock.id(42),
      question: 'Can I change my delivery address after ordering?',
      answer: 'You can modify your delivery address if the order hasn\'t been shipped yet. Contact customer support immediately to request an address change.',
    }
  ],
  Product: [
    {
      id: _mock.id(4),
      question: 'How do I leave a product review?',
      answer: 'After receiving your order, you can leave a review by going to your order history, finding the product, and clicking "Write a Review". You can rate the product and share your experience.',
    },
    {
      id: _mock.id(43),
      question: 'Are all products authentic?',
      answer: 'Yes, we only sell authentic products sourced directly from manufacturers or authorized distributors. Each product comes with a guarantee of authenticity.',
    },
    {
      id: _mock.id(44),
      question: 'What if the product is out of stock?',
      answer: 'You can click "Notify Me" on out-of-stock items to receive an email when they\'re available. We regularly restock popular items.',
    },
    {
      id: _mock.id(45),
      question: 'Do products come with warranty?',
      answer: 'Most products include manufacturer warranties. Warranty details are listed on product pages. We also offer extended warranty options for eligible items.',
    },
    {
      id: _mock.id(46),
      question: 'Can I request product customization?',
      answer: 'Some products offer customization options. Look for the "Customize" button on eligible product pages. Custom orders may take longer to process.',
    }
  ],
  'Return & Refund': [
    {
      id: _mock.id(3),
      question: 'What is the return and refund policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Once we receive the return, refunds are processed within 5-7 business days.',
    },
    {
      id: _mock.id(28),
      question: 'How long do I have to return an item?',
      answer: 'You have 30 days from the date of delivery to initiate a return. The item must be unused, in its original packaging, and include all accessories and documentation.',
    },
    {
      id: _mock.id(29),
      question: 'How do I start a return?',
      answer: 'To start a return, log into your account, go to "Order History", select the item you want to return, and click "Return Item". Follow the prompts to print your return label and shipping instructions.',
    },
    {
      id: _mock.id(30),
      question: 'When will I receive my refund?',
      answer: 'Once we receive and inspect your return, we\'ll process your refund within 5-7 business days. The time it takes for the money to appear in your account depends on your payment method and financial institution.',
    }
  ],
  Assurances: [
    {
      id: _mock.id(5),
      question: 'Is my personal and payment information secure?',
      answer: 'Yes! We use industry-standard SSL encryption for all transactions. Your personal data is protected and never shared with third parties without your consent.',
    },
    {
      id: _mock.id(31),
      question: 'What if I receive a damaged product?',
      answer: 'Please contact our customer support team immediately. We\'ll arrange a return and replacement at no additional cost to you.',
    },
    {
      id: _mock.id(32), 
      question: 'Do you have a buyer protection program?',
      answer: 'Yes, all purchases are covered by our Buyer Protection Program which guarantees authentic products, secure transactions, and hassle-free returns if items don\'t match the description.',
    },
    {
      id: _mock.id(33),
      question: 'How do you verify sellers on your platform?',
      answer: 'We have a rigorous seller verification process that includes business documentation checks, quality control inspections, and regular performance monitoring to ensure high standards.',
    },
    {
      id: _mock.id(34),
      question: 'What security measures are in place for transactions?',
      answer: 'We employ multiple security measures including SSL encryption, secure payment gateways, fraud detection systems, and regular security audits to protect all transactions.',
    }
  ],
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Account',
    icon: '/assets/icons/faq/ic_faq_account.svg',
    faqs: SUPPORT_FAQS.Account,
  },
  {
    title: 'Payment',
    icon: '/assets/icons/faq/ic_faq_payment.svg',
    faqs: SUPPORT_FAQS.Payment,
  },
  {
    title: 'Delivery',
    icon: '/assets/icons/faq/ic_faq_delivery.svg',
    faqs: SUPPORT_FAQS.Delivery,
  },
  {
    title: 'Product',
    icon: '/assets/icons/faq/ic_faq_package.svg',
    faqs: SUPPORT_FAQS.Product,
  },
  {
    title: 'Return & Refund',
    icon: '/assets/icons/faq/ic_faq_refund.svg',
    faqs: SUPPORT_FAQS['Return & Refund'],
  },
  {
    title: 'Assurances',
    icon: '/assets/icons/faq/ic_faq_assurances.svg',
    faqs: SUPPORT_FAQS.Assurances,
  },
]; 