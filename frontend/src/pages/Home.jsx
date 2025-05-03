import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Mock data for features section
const features = [
  {
    id: 1,
    title: "Secure Voting",
    description: "End-to-end encryption ensures your vote remains private and tamper-proof.",
    icon: "🔒"
  },
  {
    id: 2,
    title: "Instant Results",
    description: "Real-time counting and transparent tallying for immediate election outcomes.",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Easy Verification",
    description: "Verify your vote was counted correctly with our blockchain technology.",
    icon: "✓"
  },
  {
    id: 4,
    title: "Accessible Everywhere",
    description: "Vote from anywhere, on any device with internet connectivity.",
    icon: "🌐"
  }
];

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Election Commissioner",
    content: "Matdaan has revolutionized how we conduct elections, making them more secure and accessible than ever before.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "University Student Body President",
    content: "We increased voter turnout by 45% using Matdaan for our campus elections.",
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Community Organizer",
    content: "The intuitive interface made it easy for voters of all ages in our community to participate.",
    avatar: "/api/placeholder/40/40"
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'how-it-works', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div 
                className="flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Matdaan</span>
              </motion.div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {['Home', 'Features', 'How It Works', 'Testimonials', 'Contact'].map((item, index) => {
                    const sectionId = item.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <a
                        key={index}
                        href={`#${sectionId}`}
                        className={`${
                          activeSection === sectionId
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } px-3 py-2 rounded-md text-sm font-medium transition-all`}
                      >
                        {item}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 px-4 py-2 rounded-md text-sm font-medium transition-all" onClick={() => navigate('/verify')}>
                  Get Started
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'Features', 'How It Works', 'Testimonials', 'Contact'].map((item, index) => {
                const sectionId = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <a
                    key={index}
                    href={`#${sectionId}`}
                    className={`${
                      activeSection === sectionId
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } block px-3 py-2 rounded-md text-base font-medium`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                );
              })}
              <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 px-4 py-2 rounded-md text-sm font-medium transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block">Democracy</span>
                <span className="block text-blue-400">at your fingertips</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-lg">
                Matdaan makes voting secure, accessible, and transparent for organizations of all sizes. Experience the future of democratic participation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-md bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25" onClick={() => navigate('/verify')}>
                  Get Started
                </button>
                <button className="px-8 py-3 rounded-md border border-gray-600 hover:border-gray-400 hover:bg-gray-800 text-white font-medium transition-all" onClick={() => navigate('/verify')}>
                  Learn More
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(id => (
                      <div key={id} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-400">Trusted by 1000+ organizations</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★★★★★</span>
                  <span className="ml-1 text-sm text-gray-400">4.9/5 Rating</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mx-auto w-full max-w-md">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-800 shadow-2xl">
                  <div className="p-4 h-full flex flex-col">
                    <div className="bg-gray-700 rounded-lg p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-medium">Presidential Election 2025</div>
                        <div className="bg-blue-500 text-xs px-2 py-1 rounded-full">Live</div>
                      </div>
                      <div className="space-y-4 flex-1">
                        {['Candidate A', 'Candidate B', 'Candidate C'].map((candidate, i) => (
                          <div key={i} className="bg-gray-800 p-3 rounded-lg flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                              {i === 0 && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                            </div>
                            <div className="flex-1">{candidate}</div>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors" onClick={() => navigate('/verify')}>
                        Submit Vote
                      </button>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our platform is designed to make electronic voting secure, transparent, and accessible to everyone.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all hover:shadow-lg hover:shadow-blue-500/10 border border-gray-700"
                variants={fadeInUp}
              >
                <div className="text-3xl mb-4 bg-gray-700 w-12 h-12 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A simple three-step process to revolutionize your voting experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: "Register", description: "Create your account with secure identity verification", icon: "🔐" },
              { id: 2, title: "Vote", description: "Cast your ballot securely from anywhere, on any device", icon: "📱" },
              { id: 3, title: "Verify", description: "Confirm your vote was counted correctly with our transparent system", icon: "✅" }
            ].map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 h-full">
                  <div className="absolute -top-4 left-8 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.id}
                  </div>
                  <div className="text-3xl mb-6 mt-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 text-blue-500 text-2xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Trusted by organizations and individuals worldwide.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.content}"</p>
                <div className="mt-4 text-yellow-400">★★★★★</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-xl p-8 md:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your voting experience?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join thousands of organizations that have made their voting process secure, transparent, and accessible with Matdaan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/25" onClick={() => navigate('/verify')}>
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Matdaan</h3>
              <p className="text-gray-400 mb-4">
                Making democracy accessible and secure for everyone.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-700 rounded-full" />
                  </a>
                ))}
              </div>
            </div>
            {['Product', 'Company', 'Resources'].map((category) => (
              <div key={category}>
                <h4 className="font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {category} Link {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Matdaan. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}