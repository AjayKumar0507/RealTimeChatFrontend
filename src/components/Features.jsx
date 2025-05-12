import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { 
  FaComments, 
  FaVideo, 
  FaUsers, 
  FaLock, 
  FaCloud, 
  FaPalette 
} from 'react-icons/fa';

const features = [
  {
    icon: 'comments',
    title: 'Seamless Messaging',
    description: 'Instantly send messages, photos, files, and more with end-to-end encryption for total privacy.'
  },
  {
    icon: 'video',
    title: 'HD Video Calls',
    description: 'Connect face-to-face with crystal clear HD video and audio that works even on slow networks.'
  },
  {
    icon: 'users',
    title: 'Team Collaboration',
    description: 'Create team spaces with shared files, tasks, and conversations all in one organized place.'
  },
  {
    icon: 'lock',
    title: 'Enterprise Security',
    description: 'Bank-level security with advanced encryption and granular admin controls for your data.'
  },
  {
    icon: 'cloud',
    title: 'Cloud Storage',
    description: 'All your files and messages securely stored in the cloud and available on any device.'
  },
  {
    icon: 'palette',
    title: 'Customizable Interface',
    description: 'Make ChatWave your own with themes, custom backgrounds, and personalized notifications.'
  }
];

const getIcon = (iconName) => {
  switch (iconName) {
    case 'comments': return <FaComments className="text-xl" />;
    case 'video': return <FaVideo className="text-xl" />;
    case 'users': return <FaUsers className="text-xl" />;
    case 'lock': return <FaLock className="text-xl" />;
    case 'cloud': return <FaCloud className="text-xl" />;
    case 'palette': return <FaPalette className="text-xl" />;
    default: return <FaComments className="text-xl" />;
  }
};

export default function Features() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          variants={fadeIn('up')}
          initial="hidden"
          animate={controls}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make communication <span className="gradient-text">effortless</span>
          </h2>
          <p className="text-lg text-gray-600">
            ChatWave combines the best messaging features into one beautiful, easy-to-use app that works across all your devices.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', index * 0.1)}
              initial="hidden"
              animate={controls}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white mb-6">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}