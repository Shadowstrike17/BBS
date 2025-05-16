
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button.jsx';
    import { Zap, LayoutDashboard, Edit3, Share2, Palette, Users } from 'lucide-react';

    const FeatureCard = ({ icon, title, description, delay }) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-700/50 hover:border-purple-500/70 transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-purple-600/30 text-purple-400 rounded-full mb-4 border border-purple-500/50">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </motion.div>
    );

    const LandingPage = () => {
      const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
      
      const logoUrl = "https://media.licdn.com/dms/image/v2/C510BAQFVN8zctlTmHw/company-logo_200_200/company-logo_200_200/0/1630600060771?e=2147483647&v=beta&t=vsdD8cfLASh0vlSQ8oNL7nUsDBwXb7km4vxoa6BnmYA";

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white overflow-x-hidden">
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            className="sticky top-0 z-50 py-4 px-6 sm:px-12 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800/50"
          >
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold flex items-center">
                <img src={logoUrl} alt="BBS Logo" className="h-8 w-auto mr-2 rounded-sm" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                  BBS Portfolio Builder
                </span>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 text-sm sm:text-base">
                  Get Started <Zap className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.nav>

          <main>
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="py-20 sm:py-32 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-700/30 rounded-full filter blur-3xl opacity-40 animate-pulse-slow animation-delay-2000"></div>
              </div>

              <div className="container mx-auto px-6">
                <motion.div variants={itemVariants}>
                  <img 
                    alt="Abstract representation of creativity and portfolios"
                    class="w-full max-w-lg mx-auto mb-10 rounded-lg shadow-2xl opacity-90"
                    src="https://images.unsplash.com/photo-1700941019917-731dc64ce685" />
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 leading-tight"
                >
                  Craft Your Digital Showcase
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Unleash your creativity with the BBS Portfolio Builder. Design stunning student portfolios with intuitive tools, share your achievements, and make your mark.
                </motion.p>
                <motion.div variants={itemVariants}>
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-xl hover:shadow-purple-500/60 transition-all duration-300 transform hover:scale-105 text-lg">
                      Start Building Now <Edit3 className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="py-16 sm:py-24 bg-slate-900/30"
            >
              <div className="container mx-auto px-6">
                <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-100">Why Choose BBS Portfolio Builder?</motion.h2>
                <motion.p variants={itemVariants} className="text-center text-slate-400 mb-12 sm:mb-16 max-w-xl mx-auto">Everything you need to create a professional and engaging student portfolio, tailored for BBS.</motion.p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeatureCard icon={<LayoutDashboard size={24}/>} title="Intuitive Dashboard" description="Manage all your portfolios in one place with a clean, easy-to-use interface." delay={0.1} />
                  <FeatureCard icon={<Edit3 size={24}/>} title="Drag & Drop Editor" description="Effortlessly design your pages. Add text, images, shapes, and more with simple drag and drop." delay={0.2} />
                  <FeatureCard icon={<Palette size={24}/>} title="Theme Customization" description="Personalize your portfolio's look and feel with theme options and color choices." delay={0.3} />
                  <FeatureCard icon={<Share2 size={24}/>} title="Easy Sharing" description="Generate shareable links for your portfolios to showcase your work to the world." delay={0.4} />
                  <FeatureCard icon={<Zap size={24}/>} title="Student Focused Templates" description="Get started quickly with pre-designed templates perfect for student achievements." delay={0.5} />
                   <FeatureCard icon={<Users size={24}/>} title="Built for BBS" description="A dedicated platform for Belvedere British School students to shine." delay={0.6} />
                </div>
              </div>
            </motion.section>
            
            <motion.section 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="py-20 sm:py-32"
            >
              <div className="container mx-auto px-6 text-center">
                  <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold mb-6 text-slate-100">Ready to Showcase Your Talents?</motion.h2>
                  <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-md mx-auto mb-10">Join fellow BBS students in creating beautiful digital portfolios. It's free, easy, and powerful.</motion.p>
                  <motion.div variants={itemVariants}>
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 text-lg">
                        Create Your Portfolio
                      </Button>
                    </Link>
                  </motion.div>
              </div>
            </motion.section>
          </main>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="py-8 border-t border-slate-800/50 text-center"
          >
            <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Belvedere British School. All Rights Reserved.</p>
            <p className="text-slate-600 text-xs mt-1">Portfolio Builder by Hostinger Horizons</p>
          </motion.footer>
        </div>
      );
    };

    export default LandingPage;
  