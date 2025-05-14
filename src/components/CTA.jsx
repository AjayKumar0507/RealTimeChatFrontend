import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { FaCalendar } from 'react-icons/fa';

export default function CTA() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          variants={fadeIn('up')}
          initial="hidden"
          animate={controls}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your team's <span className="gradient-text">communication</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of teams already using ChatWave to collaborate better and work faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="px-8 py-4 rounded-full font-medium gradient-bg text-white hover:shadow-xl transition-all duration-300 text-center">
              Get Started Free
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}