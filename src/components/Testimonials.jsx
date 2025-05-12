import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { FaStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    author: {
      name: 'Robert Chen',
      title: 'CTO, TechFlow',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
    },
    rating: 5,
    text: '"ChatWave has completely transformed how our engineering teams collaborate. The seamless integration between messaging, file sharing, and task management has boosted our productivity by at least 30%."'
  },
  {
    id: 2,
    author: {
      name: 'Michelle Parker',
      title: 'Marketing Director, BrandEx',
      avatar: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
    },
    rating: 5,
    text: '"As a company with remote teams across 5 different time zones, ChatWave has been essential in keeping everyone connected and aligned. The video call quality is exceptional even with our team members in low-bandwidth areas."'
  },
  {
    id: 3,
    author: {
      name: 'James Wilson',
      title: 'Founder, Startup Hub',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
    },
    rating: 4.5,
    text: '"The security features in ChatWave give us peace of mind when discussing sensitive projects. For a startup handling proprietary information, this level of encryption and control is invaluable."'
  },
  {
    id: 4,
    author: {
      name: 'Sarah Martinez',
      title: 'Project Manager, DesignFirm',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80'
    },
    rating: 5,
    text: '"The UI is absolutely beautiful and intuitive. My design team loves how we can customize the interface to match our brand while still maintaining the excellent usability that ChatWave provides."'
  }
];

const RatingStars = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }
  
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" />);
  }

  return <div className="flex text-yellow-400 mb-2">{stars}</div>;
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef(null);
  const { ref, controls } = useScrollAnimation();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const slides = containerRef.current.children;
        if (slides.length > 0) {
          setSlideWidth(slides[0].offsetWidth);
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          variants={fadeIn('up')}
          initial="hidden"
          animate={controls}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h5 className="text-primary font-semibold mb-2">TESTIMONIALS</h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="gradient-text">thousands</span> of teams
          </h2>
          <p className="text-lg text-gray-600">
            See what our users are saying about how ChatWave has transformed their team communication.
          </p>
        </motion.div>
        
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex overflow-x-hidden"
            style={{ 
              transform: `translateX(-${currentIndex * slideWidth}px)`,
              transition: 'transform 0.5s ease' 
            }}
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                variants={fadeIn('up')}
                initial="hidden"
                animate={controls}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonial.author.avatar} 
                      className="w-14 h-14 rounded-full object-cover" 
                      alt={`${testimonial.author.name} avatar`} 
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.author.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.author.title}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <RatingStars rating={testimonial.rating} />
                    <p className="text-gray-600 italic">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 focus:outline-none hover:bg-gray-50 z-10"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 focus:outline-none hover:bg-gray-50 z-10"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex 
                    ? 'bg-primary opacity-100' 
                    : 'bg-gray-300 opacity-50'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}