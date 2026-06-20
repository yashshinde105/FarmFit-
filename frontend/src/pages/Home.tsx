import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Satellite, 
  TrendingUp, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Eye,
  Thermometer,
  Droplets,
  Bug,
  Users,
  Award,
  Globe,
  Cpu,
  Database,
  Cloud,
  Star,
  Quote
} from "lucide-react";
import heroImage from "@/assets/agri.webp";

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const features = [
    {
      icon: Satellite,
      title: "Spectral Health Maps",
      description: "Real-time crop health monitoring using advanced satellite and drone imaging technology.",
      color: "text-accent"
    },
    {
      icon: Droplets,
      title: "Soil Monitoring",
      description: "Track soil moisture, nutrients, and conditions with precision sensors and AI analysis.",
      color: "text-primary"
    },
    {
      icon: Bug,
      title: "Pest Prediction",
      description: "Early detection and risk assessment for pests and diseases using machine learning.",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "Anomaly Alerts",
      description: "Instant notifications for crop stress, irrigation needs, and environmental changes.",
      color: "text-success"
    }
  ];

  const benefits = [
    "Increase crop yields by up to 25%",
    "Reduce water usage by 30%",
    "Early pest detection saves 15% crop loss",
    "Data-driven decisions for optimal farming"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Farm Owner",
      location: "Iowa, USA",
      content: "FarmFit AI has revolutionized how we manage our 500-acre corn farm. The early pest detection alone saved us 20% of our crop last season.",
      rating: 5
    },
    {
      name: "Miguel Rodriguez",
      role: "Agricultural Manager",
      location: "California, USA",
      content: "The soil monitoring capabilities are incredible. We've reduced water usage by 35% while maintaining higher yields than ever before.",
      rating: 5
    },
    {
      name: "Dr. Emily Chen",
      role: "Research Director",
      location: "Ontario, Canada",
      content: "The AI insights have helped us optimize our experimental plots with precision we never thought possible. Outstanding platform!",
      rating: 5
    }
  ];

  const technologies = [
    {
      icon: Satellite,
      title: "Satellite Imaging",
      description: "Multi-spectral satellite data for comprehensive crop monitoring",
      details: ["NDVI analysis", "Thermal imaging", "Change detection"]
    },
    {
      icon: Cpu,
      title: "Machine Learning",
      description: "Advanced AI models for predictive agriculture insights",
      details: ["Crop disease prediction", "Yield forecasting", "Risk assessment"]
    },
    {
      icon: Database,
      title: "IoT Sensors Data",
      description: "Field data collection and monitoring",
      details: ["Soil moisture", "Weather stations", "Equipment tracking"]
    },
    {
      icon: Cloud,
      title: "Cloud Platform",
      description: "Scalable infrastructure for agricultural data processing",
      details: ["Real-time processing", "Data analytics", "Mobile access"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden -mt-0 -mb-0">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            style={{
              width: '150%',
              height: '150%',
              objectFit: 'cover',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100vw',
              minHeight: '100vh'
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> 
          
          {/* Fallback background image - shows when video fails or doesn't load */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 bg-green-400/20 rounded-full blur-xl z-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-12 h-12 bg-blue-400/20 rounded-full blur-xl z-20"
          animate={{
            y: [0, 15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            AI-powered
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300"
            >
              Precision Agriculture
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your farming with cutting-edge remote sensing, spectral imaging, 
            and AI-driven insights for sustainable, high-yield agriculture.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/about">
                  Learn More
                  <Eye className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Comprehensive Agricultural Intelligence
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Our platform combines satellite imagery, IoT sensors, and machine learning 
              to provide unprecedented insights into your agricultural operations.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="card-gradient hover-lift border-0 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-full bg-primary/10">
                        <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technology Showcase */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Advanced Technology Stack
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Powered by cutting-edge technologies that deliver actionable agricultural insights
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="card-gradient hover-lift border-0 h-full group">
                  <CardContent className="p-6">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <tech.icon className="h-8 w-8 text-primary" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground text-center">
                      {tech.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-center mb-4">
                      {tech.description}
                    </p>
                    <div className="space-y-2">
                      {tech.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Proven Results for Modern Farmers
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of farmers who have transformed their operations 
                with our AI-powered agricultural intelligence platform.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-lg text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button asChild variant="feature" size="lg">
                <Link to="/dashboard">
                  View Dashboard Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-gradient border-0 text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">25%</div>
                  <div className="text-muted-foreground">Yield Increase</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-gradient border-0 text-center p-6">
                  <div className="text-3xl font-bold text-accent mb-2">30%</div>
                  <div className="text-muted-foreground">Water Saved</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-gradient border-0 text-center p-6">
                  <div className="text-3xl font-bold text-warning mb-2">15%</div>
                  <div className="text-muted-foreground">Crop Loss Prevented</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-gradient border-0 text-center p-6">
                  <div className="text-3xl font-bold text-success mb-2">24/7</div>
                  <div className="text-muted-foreground">Monitoring</div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-foreground mb-4"
            >
              What Our Farmers Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Real success stories from farmers who've transformed their operations with FarmFit AI
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="card-gradient hover-lift border-0 h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Quote className="h-8 w-8 text-primary/30" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-accent">{testimonial.location}</p>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 hero-gradient text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Transform Your Farm?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-white/90"
          >
            Start your journey towards precision agriculture with our comprehensive AI platform.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/login">Start Free Trial</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
