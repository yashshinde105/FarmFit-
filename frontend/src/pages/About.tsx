import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Target, 
  Users, 
  Award, 
  Globe, 
  Leaf, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Calendar,
  Rocket,
  Heart,
  Zap
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promoting environmentally responsible farming practices through intelligent resource management."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Leveraging cutting-edge AI and remote sensing technology to revolutionize agriculture."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Supporting farmers worldwide to increase productivity while preserving our planet."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering precision agriculture solutions with unmatched accuracy and reliability."
    }
  ];

  const teamMembers = [
    {
      name: "Bhumika",
      role: "Chief Technology Officer",
      expertise: "AI & Machine Learning",
      description: "15+ years in agricultural AI research",
      icon: Zap
    },
    {
      name: "Vehan",
      role: "Head of Remote Sensing",
      expertise: "Satellite & Drone Technology",
      description: "Former NASA research scientist",
      icon: Globe
    },
    {
      name: "Vinay",
      role: "Agricultural Scientist",
      expertise: "Crop Science & Agronomy",
      description: "PhD in Sustainable Agriculture",
      icon: Leaf
    },
    {
      name: "Vivek",
      role: "Product Director",
      expertise: "AgTech Solutions",
      description: "20+ years in agricultural technology",
      icon: Target
    },
    {
      name: "Yash",
      role: "Head of Data Science",
      expertise: "Predictive Analytics",
      description: "MIT PhD in Machine Learning",
      icon: TrendingUp
    },
    {
      name: "Yashas",
      role: "VP of Engineering",
      expertise: "Software Architecture",
      description: "Former Google senior engineer",
      icon: Rocket
    }
  ];

  const achievements = [
    "50,000+ acres monitored globally",
    "95% accuracy in pest prediction",
    "30% average water savings",
    "25% average yield increase"
  ];

  const stats = [
    { number: "50K+", label: "Acres Monitored", icon: Globe, color: "text-green-600" },
    { number: "95%", label: "Prediction Accuracy", icon: Target, color: "text-blue-600" },
    { number: "10K+", label: "Farmers Supported", icon: Users, color: "text-purple-600" },
    { number: "6", label: "Continents", icon: Award, color: "text-orange-600" }
  ];

  const timeline = [
    {
      year: "2020",
      title: "FarmFit AI Founded",
      description: "Started with a vision to revolutionize agriculture through AI"
    },
    {
      year: "2021",
      title: "First AI Model Released",
      description: "Launched crop disease detection with 85% accuracy"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Extended services to farmers across 3 continents"
    },
    {
      year: "2023",
      title: "Precision Agriculture Suite",
      description: "Introduced complete farm management platform"
    },
    {
      year: "2024",
      title: "50K Acres Milestone",
      description: "Reached 50,000+ acres under monitoring"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-gradient text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              About FarmFit AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              We're transforming agriculture through artificial intelligence, 
              remote sensing, and precision farming technologies to create a 
              more sustainable and productive future for farmers worldwide.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                To empower farmers with intelligent, data-driven insights that optimize 
                crop yields, reduce environmental impact, and ensure food security for 
                growing global populations.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Through advanced satellite imagery, IoT sensors, and machine learning 
                algorithms, we provide real-time agricultural intelligence that helps 
                farmers make informed decisions about irrigation, fertilization, pest 
                control, and harvest timing.
              </p>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-lg text-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="card-gradient border-0 p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Vision</h3>
                    <p className="text-muted-foreground">
                      A world where every farmer has access to intelligent agricultural 
                      insights, enabling sustainable farming practices that feed the 
                      planet while protecting our environment.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-gradient border-0 p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Impact</h3>
                    <p className="text-muted-foreground">
                      Supporting over 10,000 farmers across 6 continents with 
                      AI-powered agricultural solutions that increase productivity 
                      while reducing resource consumption.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-green-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground"
            >
              Driving measurable results for farmers worldwide
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="card-gradient hover-lift border-0 p-6 h-full">
                  <CardContent className="p-0">
                    <div className="mb-4 flex justify-center">
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className={`text-3xl font-bold mb-2 ${stat.color}`}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      
      {/* Values Section */}
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
              Our Core Values
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              The principles that guide our commitment to revolutionizing agriculture 
              through responsible innovation and sustainable practices.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="card-gradient hover-lift border-0 text-center h-full">
                  <CardContent className="p-6">
                    <motion.div 
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-full bg-primary/10">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
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
              Leadership Team
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Meet the experts behind FarmFit AI - a diverse team of agricultural 
              scientists, AI researchers, and technology innovators.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="card-gradient hover-lift border-0 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <member.icon className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-accent mb-2 font-medium">
                      {member.expertise}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
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
            Join the Agricultural Revolution
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-white/90"
          >
            Ready to transform your farming operations with AI-powered insights? 
            Get started today and see the difference precision agriculture can make.
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
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;