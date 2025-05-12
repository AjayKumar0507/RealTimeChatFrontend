import { motion } from 'framer-motion';
import { fadeIn, floatingAnimation, floatingSlowAnimation, floatingSlowerAnimation } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { 
  FaLayerGroup, 
  FaFileAlt, 
  FaTasks, 
  FaArrowRight,
  FaLaptopCode,
  FaMobileAlt,
  FaChartPie,
  FaChevronDown,
  FaFilePdf
} from 'react-icons/fa';

export default function AppShowcase() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-50 to-transparent opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <motion.div 
              ref={ref}
              variants={floatingAnimation}
              initial="initial"
              animate={controls}
              className="relative w-full h-full flex justify-center lg:justify-start"
            >
              <div className="w-[300px] sm:w-[400px] h-[500px] bg-white rounded-[40px] shadow-2xl p-6 relative overflow-hidden z-20">
                <div className="rounded-[32px] bg-gray-50 h-full overflow-hidden relative">
                  <div className="h-16 gradient-bg px-4 flex items-center justify-between">
                    <h3 className="text-white font-semibold">Team Dashboard</h3>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <i className="fas fa-bell text-white text-sm"></i>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-sm">Active Projects</h4>
                        <span className="text-xs text-gray-500">View All</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                              <FaLaptopCode className="text-xs" />
                            </div>
                            <span className="text-sm">Website Redesign</span>
                          </div>
                          <span className="text-xs text-green-500">On Track</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-purple-500">
                              <FaMobileAlt className="text-xs" />
                            </div>
                            <span className="text-sm">Mobile App</span>
                          </div>
                          <span className="text-xs text-yellow-500">At Risk</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-pink-100 flex items-center justify-center text-pink-500">
                              <FaChartPie className="text-xs" />
                            </div>
                            <span className="text-sm">Analytics Platform</span>
                          </div>
                          <span className="text-xs text-green-500">On Track</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-sm">Team Performance</h4>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span>This Week</span>
                          <FaChevronDown />
                        </div>
                      </div>
                      <div className="h-32 w-full flex items-end justify-between px-2">
                        <div className="w-[12%] h-[30%] rounded-t bg-indigo-200"></div>
                        <div className="w-[12%] h-[45%] rounded-t bg-indigo-300"></div>
                        <div className="w-[12%] h-[65%] rounded-t bg-indigo-400"></div>
                        <div className="w-[12%] h-[90%] rounded-t bg-indigo-500"></div>
                        <div className="w-[12%] h-[70%] rounded-t bg-indigo-600"></div>
                        <div className="w-[12%] h-[80%] rounded-t bg-indigo-700"></div>
                        <div className="w-[12%] h-[60%] rounded-t gradient-bg"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-sm">Recent Messages</h4>
                        <span className="text-xs text-gray-500">View All</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="User avatar" />
                          <div>
                            <h5 className="text-xs font-medium">Sophie Chen</h5>
                            <p className="text-xs text-gray-500 truncate w-48">Let's review the design files...</p>
                          </div>
                          <span className="text-xs text-gray-400 ml-auto">2m</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="User avatar" />
                          <div>
                            <h5 className="text-xs font-medium">Mark Wilson</h5>
                            <p className="text-xs text-gray-500 truncate w-48">Updated the project timeline...</p>
                          </div>
                          <span className="text-xs text-gray-400 ml-auto">5m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around the main phone */}
              <motion.div 
                variants={floatingSlowAnimation}
                initial="initial"
                animate={controls}
                className="absolute -top-5 right-0 w-40 h-28 bg-white rounded-2xl shadow-lg p-3 opacity-90"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-500">
                      <FaFilePdf className="text-sm" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">Project Brief.pdf</h4>
                      <p className="text-xs text-gray-500">2.4 MB</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Shared with team</span>
                    <button className="text-xs text-indigo-500">View</button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={floatingSlowerAnimation}
                initial="initial"
                animate={controls}
                className="absolute -bottom-10 -right-5 w-48 h-24 bg-white rounded-2xl shadow-lg p-3 opacity-90"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-semibold">Today's Tasks</h4>
                    <span className="text-xs text-orange-500">3 left</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <i className="fas fa-check text-[8px] text-white"></i>
                      </div>
                      <span className="text-xs text-gray-500">Review wireframes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-indigo-500 bg-indigo-500 flex items-center justify-center">
                        <i className="fas fa-check text-[8px] text-white"></i>
                      </div>
                      <span className="text-xs line-through text-gray-400">Team meeting</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            ref={ref}
            variants={fadeIn('left')}
            initial="hidden"
            animate={controls}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <h5 className="text-primary font-semibold mb-2">TEAM COLLABORATION</h5>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Create, collaborate, and <span className="gradient-text">organize</span> effortlessly
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                ChatWave brings all your team communications and workflows together in one place, making collaboration seamless and more productive.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white shrink-0">
                  <FaLayerGroup />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Organized Projects</h3>
                  <p className="text-gray-600">
                    Keep everything structured with dedicated channels for each project, topic, or team.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white shrink-0">
                  <FaFileAlt />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">File Sharing & Storage</h3>
                  <p className="text-gray-600">
                    Share files of any size with your team and access them anytime, anywhere.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white shrink-0">
                  <FaTasks />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Task Management</h3>
                  <p className="text-gray-600">
                    Assign tasks, set deadlines, and track progress all within your conversations.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors">
                Learn more about our collaboration features
                <FaArrowRight />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}