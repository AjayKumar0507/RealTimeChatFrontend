export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  rating: number;
  text: string;
}

export interface PricingPlan {
  title: string;
  description: string;
  price: string;
  period: string;
  popular?: boolean;
  features: Array<{
    included: boolean;
    text: string;
  }>;
  ctaText: string;
  ctaLink: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}
