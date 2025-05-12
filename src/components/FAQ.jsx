import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { FaChevronDown } from 'react-icons/fa';

const faqItems = [
  {
    id: 'faq-1',
    question: 'How secure is ChatWave?',
    answer: 'ChatWave uses bank-level encryption for all communications. We implement end-to-end encryption for messages, secure file storage with advanced access controls, and regular security audits. Your data is never sold or shared with third parties, and we comply with major security standards like GDPR, HIPAA, and SOC2.'
  },
  {
    id: 'faq-2',
    question: 'Can I integrate ChatWave with other tools?',
    answer: 'Yes, ChatWave integrates with over 100 popular business tools including Google Workspace, Microsoft 365, Slack, Trello, Jira, Asana, and many more. We also offer an API for custom integrations, allowing you to connect ChatWave with your existing systems and workflows.'
  },
  {
    id: 'faq-3',
    question: 'How many people can join a video call?',
    answer: 'Free plans support 1:1 video calls. Pro plans support up to 30 participants in a group video call with high-quality video and screen sharing. Enterprise plans support up to 100 participants with additional features like breakout rooms, call recording, and transcription services.'
  },
  {
    id: 'faq-4',
    question: 'Do you offer customer support?',
    answer: 'All plans include access to our comprehensive help center and community forums. Pro plans include email support with a 24-hour response time. Enterprise plans include priority support with a dedicated account manager and 24/7 phone support for critical issues.'
  },
  {
    id: 'faq-5',
    question: 'Can I try ChatWave before purchasing?',
    answer: 'Absolutely! You can start with our Free plan which has no time limit, or sign up for a 14-day free trial of our Pro or Enterprise plans with full access to all features. No credit card is required for the trial, and you can downgrade to the Free plan anytime if you decide not to continue with a paid subscription.'
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);
  const { ref, controls } = useScrollAnimation();

  const toggleItem = (id) => {
    setOpenItem(prevId => prevId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          variants={fadeIn('up')}
          initial="hidden"
          animate={controls}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h5 className="text-primary font-semibold mb-2">FAQ</h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about ChatWave and how it can help your team.
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto space-y-6"
        >
          {faqItems.map((item, index) => (
            <motion.div 
              key={item.id}
              variants={fadeIn('up', index * 0.1)}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button 
                className="w-full py-5 px-6 text-left font-semibold flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItem === item.id}
                aria-controls={`content-${item.id}`}
              >
                <span>{item.question}</span>
                <FaChevronDown 
                  className={`text-gray-400 transition-transform duration-300 ${
                    openItem === item.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div 
                    id={`content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 overflow-hidden"
                  >
                    <div className="pb-5">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}