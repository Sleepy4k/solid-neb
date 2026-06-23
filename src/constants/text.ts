/**
 * Application Text Constants
 * Single source of truth for all text content
 */

export const text = {
  // Navbar
  nav: {
    home: "Home",
    services: "Services",
    tutorial: "Tutorial",
    contact: "Contact",
    startFree: "Get Started",
  },

  // Hero Section
  hero: {
    badge: "Free & Unlimited",
    badgeText: "No Payment Required",
    title1: "Get your answers",
    title2: "quickly and safely",
    subtitle:
      "Access your online exams without browser restrictions. Upload your config, get instant bypass, and take exams freely.",
    ctaPrimary: "Try It Now",
    ctaSecondary: "View Tutorial",
  },

  // Main Service Section
  mainService: {
    label: "Featured Service",
    title: "Safe Exam Browser Bypasser",
    description:
      "Upload your Safe Exam Browser config file and get instant access to bypass browser restrictions. Take your exams freely without limitations.",
    cta: "Upload Config",
    learnMore: "Learn More",
    demoStatus: "Ready",
    feature1: "Upload Config File",
    feature1Desc: "Upload your .seb config file to the system",
    feature2: "Get Bypass Access",
    feature2Desc: "System processes and provides instant bypass headers",
    feature3: "Take Exam Freely",
    feature3Desc: "Use headers for full access without restrictions",
    step1: "Upload",
    step1Desc: "Upload your config",
    step2: "Process",
    step2Desc: "Get bypass headers",
    step3: "Access",
    step3Desc: "Take exam freely",
  },

  // Benefits Section
  benefits: {
    instant: "Instant",
    instantDesc: "Process",
    seamless: "Seamless",
    seamlessDesc: "Experience",
    secure: "Secure",
    secureDesc: "Process",
    available: "24/7",
    availableDesc: "Available",
  },

  // FAQ Section
  faq: {
    title: "Frequently Asked Questions",
    subtitle:
      "Find answers to common questions about our exam bypass services.",
  },

  // CTA Section
  cta: {
    title: "Ready to Get Started?",
    subtitle: "Join thousands of students who trust our exam bypass service.",
    primaryBtn: "Start Now",
    secondaryBtn: "Contact Us",
  },

  // Services Page
  services: {
    badge: "Our Services",
    title: "3 Exam Bypass Services",
    subtitle:
      "Nach Exam Bypasser (NEB) provides 3 exam bypass services that allow you to access online exams without restrictions. Upload config, get access, and take exams freely.",
    mainBadge: "Popular",
    sebTagline: "Safe Exam Browser Bypasser",
    sebDescription: "Bypass Safe Exam Browser restrictions instantly",
    feature1Title: "Instant Bypass",
    feature1Desc: "Get bypass headers in seconds",
    feature2Title: "Full Access",
    feature2Desc: "Copy-paste, multi-tab, screenshot enabled",
    feature3Title: "All Platforms",
    feature3Desc: "Works on all SEB platforms",
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Simple 3-step process",
    step1Title: "Upload Config",
    step1Desc: "Upload your .seb config file",
    step2Title: "Get Headers",
    step2Desc: "Receive bypass headers instantly",
    step3Title: "Access Exam",
    step3Desc: "Use headers to access exam freely",
    ctaTitle: "Ready to Start?",
    ctaSubtitle: "Upload your config now",
    ctaUpload: "Upload Config",
    helpCta: "Need Help?",
  },

  // Upload Page
  upload: {
    title: "Upload Config File",
    subtitle:
      "Upload your Safe Exam Browser config to get instant bypass access",
    redeemCodeLabel: "Redeem Token",
    redeemCodePlaceholder: "Enter your token code",
    redeemCodeError: "Token is required",
    fileNameLabel: "Config Name",
    fileNamePlaceholder: "My Exam Config",
    fileNameError: "Config name is required",
    fileLabel: "Config File",
    filePlaceholder: "Select .seb file",
    fileError: "Config file is required",
    fileTypeError: "Only .seb files are allowed",
    submitBtn: "Upload & Process",
    submitting: "Processing...",
    successTitle: "Success!",
    successMessage: "Your config has been processed. Copy the URL below:",
    errorTitle: "Error",
    downloadBtn: "Download JSON File",
    backBtn: "Upload Again",
    dragDropText: "Drag & drop file here",
    orText: "or",
    chooseFile: "Choose File",
    maxFileSize: "Maximum file size: 10MB",
    supportedFormat: "Supported format: .seb",
  },

  // Tutorial Page
  tutorial: {
    title: "Tutorial & Guide",
    subtitle:
      "Learn how to set up and use Safe Exam Bypasser with our step-by-step guide.",
    needHelp: "Need Help?",
    needHelpDesc: "Contact us if you have any questions or encounter issues.",
    contactUs: "Contact Us",
    // Tab Labels
    installTab: "Install ModHeader",
    redeemTab: "Redeem Token",
    useTab: "How to Use",
    // Tab 1: Install ModHeader
    installStep1: "Open your browser and search for the ModHeader Extension.",
    installStep2: "Install the ModHeader Extension.",
    installStep3:
      "Once installed, you should see a screen like this, indicating the installation is complete.",
    installNote:
      "Be cautious when using ModHeader. Avoid modifying critical headers.",
    // Tab 2: Redeem Token
    redeemStep1: "Go to the service page and select Safe Exam Browser.",
    redeemStep2:
      "Fill out the form with config name and upload the config.seb file.",
    redeemStep3:
      "Click the Upload button and wait for a notification confirming the config creation.",
    redeemStep4: "Download the generated config.json file.",
    redeemNote: "Tokens can only be used once. Handle them carefully.",
    // Tab 3: How to Use
    useIntro:
      "Make sure you have downloaded the JSON file after redeeming your token.",
    useStep1: "Open the ModHeader extension in your browser.",
    useStep2: "Follow the steps shown below.",
    useStep3:
      "After loading the JSON file, your ModHeader should look like this. Check all the boxes.",
    useFinal:
      "Now, open your Quiz/Exam page and refresh it. Congratulations! You can now take the quiz without using Safe Exam Browser.",
    useNote:
      "Be cautious when using ModHeader. Avoid modifying critical headers.",
  },

  // Contact Page
  contact: {
    title: "Contact",
    subtitle: "Have questions or need help? Get in touch with us.",
    formTitle: "Send us a message",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    nameError: "Name is required",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    emailError: "Email is required",
    emailInvalid: "Please enter a valid email address",
    subjectLabel: "Subject",
    subjectPlaceholder: "Select a subject",
    subjectError: "Subject is required",
    messageLabel: "Message",
    messagePlaceholder: "Your message...",
    messageError: "Message is required",
    messageMinLength: "Message must be at least 10 characters",
    submitBtn: "Send Message",
    submitting: "Sending...",
    successMessage:
      "Your message has been sent successfully! We will get back to you soon.",
    // Subject options
    subjectGeneral: "General Inquiry",
    subjectSupport: "Technical Support",
    subjectBug: "Report a Bug",
    subjectFeature: "Feature Request",
    subjectOther: "Other",
  },

  // Footer
  footer: {
    tagline: "Free exam bypass service for students",
    product: "Product",
    company: "Company",
    connect: "Connect",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "© 2026 Nach Exam Bypasser. All rights reserved.",
  },

  // FAQ Data (fallback if API fails)
  faqData: {
    aboutQ: "What is NEB?",
    aboutA:
      "NEB (Nach Exam Bypasser) is a free service that helps students bypass exam browser restrictions.",
    paymentQ: "Is it really free?",
    paymentA: "Yes! Our service is completely free. No credit card required.",
    simplifyQ: "How does it work?",
    simplifyA:
      "Upload your config file, get bypass headers, and use them to access your exam freely.",
    securityQ: "Is it safe to use?",
    securityA:
      "Yes, we use secure processing and do not store your exam data permanently.",
  },
} as const;

export type TextKeys = typeof text;
