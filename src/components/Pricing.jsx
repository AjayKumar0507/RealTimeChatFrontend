import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { FaCheck, FaTimes } from 'react-icons/fa';

const pricingPlans = [
  {
    title: 'Free',
    description: 'For small teams getting started',
    price: '$0',
    period: '/month',
    features: [
      { included: true, text: 'Up to 10 team members' },
      { included: true, text: '5GB storage' },
      { included: true, text: 'Basic messaging' },
      { included: true, text: '1:1 video calls' },
      { included: false, text: 'Group video calls' },
      { included: false, text: 'Advanced security' }
    ],
    ctaText: 'Start for Free',
    ctaLink: '#'
  },
  {
    title: 'Pro',
    description: 'For growing teams and businesses',
    price: '$12',
    period: '/user/month',
    popular: true,
    features: [
      { included: true, text: 'Unlimited team members' },
      { included: true, text: '100GB storage' },
      { included: true, text: 'Advanced messaging' },
      { included: true, text: 'Group video calls (up to 30)' },
      { included: true, text: 'Basic security' },
      { included: false, text: 'Admin controls' }
    ],
    ctaText: 'Get Started',
    ctaLink: '#'
  },
  {
    title: 'Enterprise',
    description: 'For large organizations',
    price: '$29',
    period: '/user/month',
    features: [
      { included: true, text: 'Unlimited team members' },
      { included: true, text: 'Unlimited storage' },
      { included: true, text: 'Advanced messaging & integrations' },
      { included: true, text: 'Group video calls (up to 100)' },
      { included: true, text: 'Enterprise security' },
      { included: true, text: 'Advanced admin controls' }
    ],
    ctaText: 'Contact Sales',
    ctaLink: '#'
  }
];

export default function Pricing() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          variants={fadeIn('up')}
          initial="hidden"
          animate={controls}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h5 className="text-primary font-semibold mb-2">PRICING</h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that's right for your team, from small startups to large enterprises.
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col md:flex-row gap-8 justify-center"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={fadeIn('up', index * 0.1)}
              className={`w-full md:w-80 bg-white rounded-2xl ${
                plan.popular 
                  ? 'shadow-xl border border-transparent relative z-10' 
                  : 'shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300'
              } p-8`}
            >
              {plan.popular && (
                <>
                  <div className="absolute inset-0 gradient-bg opacity-10 rounded-2xl -z-10"></div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <>
                        <FaCheck className="text-green-500" />
                        <span>{feature.text}</span>
                      </>
                    ) : (
                      <>
                        <FaTimes className="text-gray-400" />
                        <span className="text-gray-400">{feature.text}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <a 
                href={plan.ctaLink} 
                className={`block text-center px-6 py-3 rounded-full font-medium ${
                  plan.popular 
                    ? 'gradient-bg text-white hover:shadow-lg' 
                    : 'border border-gray-200 hover:border-primary hover:text-primary'
                } transition-all duration-300`}
              >
                {plan.ctaText}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}