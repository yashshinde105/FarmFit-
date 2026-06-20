import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '@/assets/logo.png';
import { 
  Sprout, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Leaf,
  Heart,
  Globe,
  Shield,
  Award,
  Users,
  Calendar,
  Clock
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/contact", label: "Contact" }
  ];

  const services = [
    "Crop Health Monitoring",
    "Soil Condition Tracking", 
    "Pest Risk Prediction",
    "Spectral Imaging",
    "Climate Analysis",
    "Yield Forecasting"
  ];

  const resources = [
    "Documentation",
    "API Reference",
    "Support Center",
    "Community Forum",
    "Blog",
    "Case Studies"
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Stats Section */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info - Spans 2 columns on large screens */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 rounded-xl bg-white/100 backdrop-blur-sm  border-white/20">
                <img src={logo} alt="FarmFIT Logo" className="h-12 w-auto object-contain" />
              </div>
              <div>
                <p className="text-green-300 text-sm">Precision Agriculture</p>
              </div>
            </motion.div>
            
            <p className="text-white/80 leading-relaxed text-sm">
              Empowering sustainable farming through cutting-edge AI technology, 
              satellite imaging, and precision agriculture solutions. Transform your 
              farm operations with data-driven insights and intelligent automation.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-300" />
                Stay Updated
              </h4>
              <p className="text-white/70 text-sm mb-3">
                Get the latest agricultural insights and platform updates
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/30 rounded-l-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-r-xl transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-white mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.to} 
                    className="text-white/70 hover:text-green-300 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-white mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/70 text-sm hover:text-green-300 transition-colors duration-200 cursor-pointer"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Resources</h3>
              <ul className="space-y-3">
                {resources.slice(0, 4).map((resource, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/70 text-sm hover:text-green-300 transition-colors duration-200 cursor-pointer"
                  >
                    {resource}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-white mb-4 text-lg">Contact</h3>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-start space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-4 w-4 mt-1 text-green-300 flex-shrink-0" />
                  <span className="text-white/70 text-sm">
                    123 AgriTech Lane<br />
                    Farm Valley, CA 94105
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-4 w-4 text-green-300" />
                  <span className="text-white/70 text-sm">+1 (555) 123-4567</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-4 w-4 text-green-300" />
                  <span className="text-white/70 text-sm">support@farmfitai.com</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Bottom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8"
        >
          {/* Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/70 text-sm mb-2">
                © {currentYear} FarmFit AI. All rights reserved.
              </p>
              <p className="text-white/50 text-xs flex items-center justify-center md:justify-start">
                Made with <Heart className="w-3 h-3 mx-1 text-red-400" /> for sustainable agriculture
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-white/50 text-xs">
                <Shield className="w-3 h-3" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center space-x-1 text-white/50 text-xs">
                <Clock className="w-3 h-3" />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="text-white/60 hover:text-green-300 transition-colors duration-200 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Additional Links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-6 pt-6 border-t border-white/10 text-center"
          >
            <div className="flex flex-wrap justify-center items-center space-x-6 text-xs text-white/50">
              <Link to="/privacy" className="hover:text-green-300 transition-colors duration-200">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-green-300 transition-colors duration-200">Terms of Service</Link>
              <span>•</span>
              <Link to="/cookies" className="hover:text-green-300 transition-colors duration-200">Cookie Policy</Link>
              <span>•</span>
              <Link to="/security" className="hover:text-green-300 transition-colors duration-200">Security</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;