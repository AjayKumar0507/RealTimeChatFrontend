import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, phoneAnimation, floatingAnimation, floatingSlowAnimation, floatingSlowerAnimation } from '@/utils/animations';
import { FaPlayCircle, FaArrowLeft, FaPhone, FaPaperPlane, FaPlus } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 overflow-hidden relative" id="hero">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-violet-50 to-transparent opacity-70 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-50 to-transparent opacity-70 -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.h1 
              variants={fadeIn('up')}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Connect <span className="gradient-text">instantly</span> with your team
            </motion.h1>
            
            <motion.p 
              variants={fadeIn('up', 0.1)}
              className="text-lg text-gray-600 max-w-lg"
            >
              ChatWave brings your conversations to life with seamless messaging, voice calls, and collaborative features in one beautiful app.
            </motion.p>
            
            <motion.div 
              variants={fadeIn('up', 0.2)}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="px-8 py-4 rounded-full font-medium gradient-bg text-white hover:shadow-xl transition-all duration-300 text-center">
                Get Started Free
              </button>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 0.3)}
              className="flex items-center gap-4 pt-6"
            >
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User avatar" />
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User avatar" />
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User avatar" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600">
                  +5k
                </div>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">5,000+</span> teams already joined
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={phoneAnimation}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="relative w-full h-full flex justify-center">
              <motion.div 
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="w-[280px] sm:w-[320px] h-[600px] bg-white rounded-[40px] shadow-2xl p-4 relative overflow-hidden z-20"
              >
                <div className="rounded-[32px] bg-gray-50 h-full overflow-hidden relative">
                  <div className="h-20 gradient-bg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <FaArrowLeft className="text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" alt="Chat profile" />
                      <div>
                        <h3 className="text-white font-semibold">Alex Johnson</h3>
                        <p className="text-white/80 text-xs">Online • Typing...</p>
                      </div>
                    </div>
                    <div className="ml-auto w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <FaPhone className="text-white" />
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4 h-[calc(100%-80px)] overflow-auto">
                    <div className="flex justify-start mb-4">
                      <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[70%]">
                        <p className="text-sm">Hey, just checking in about the project. How's progress?</p>
                        <p className="text-xs text-gray-400 text-right mt-1">10:24 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mb-4 text-black ">
                      <div className="bg-white  rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[70%]">
                        <p className="text-sm">Almost done with the first milestone! Just wrapping up the documentation.</p>
                        <p className="text-xs text-white/70 text-right mt-1">10:26 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start mb-4">
                      <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[70%]">
                        <p className="text-sm">That's great news! Can you share the current status in our meeting later?</p>
                        <p className="text-xs text-gray-400 text-right mt-1">10:28 AM</p>
                      </div>
                    </div>
                    
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-100">
                    <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                      <FaPlus className="text-gray-400 mr-2" />
                      <input type="text" placeholder="Type a message..." className="bg-transparent outline-none flex-1 text-sm" />
                      <FaPaperPlane className="text-primary ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating elements around the main phone */}
              <motion.div 
                variants={floatingSlowAnimation}
                initial="initial"
                animate="animate"
                className="absolute top-[15%] -left-10 w-48 h-32 bg-white rounded-2xl shadow-lg p-3 opacity-90"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-500">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">New Message</h3>
                    <p className="text-xs text-gray-500">Sarah sent you a file</p>
                    <div className="mt-2 flex gap-2">
                      <button className="bg-violet-100 text-violet-500 text-xs px-3 py-1 rounded-full">View</button>
                      <button className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">Later</button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={floatingSlowerAnimation}
                initial="initial"
                animate="animate"
                className="absolute top-[60%] -right-5 w-36 h-36 bg-white rounded-2xl shadow-lg p-3 opacity-90"
              >
                <div className="h-full flex flex-col justify-between">
                  <h3 className="font-semibold text-sm text-gray-700">Team Activity</h3>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg w-[75%]"></div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg w-[45%]"></div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg w-[90%]"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">+24% from last week</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="absolute -bottom-5 -left-10 w-40 h-24 bg-white rounded-2xl shadow-lg p-3 opacity-90"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-xs">Online Users</h3>
                    <span className="text-xs text-green-500">12</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-500 text-xs">
                      MJ
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-pink-500 text-xs">
                      KL
                    </div>
                    <div className="w-8 h-8 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center text-violet-500 text-xs">
                      AB
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-500 text-xs">
                      +9
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        variants={fadeIn('up', 0.5)}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 mt-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center justify-center py-6">
            <img src="https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80&q=80" alt="Company logo" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
          <div className="flex items-center justify-center py-6">
            <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80&q=80" alt="Company logo" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
          <div className="flex items-center justify-center py-6">
            <img src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80&q=80" alt="Company logo" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
          <div className="flex items-center justify-center py-6">
            <img src="https://images.unsplash.com/photo-1611162616305-c69b3396004b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=80&q=80" alt="Company logo" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}