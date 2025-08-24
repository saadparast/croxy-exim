import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  Shield, 
  Award, 
  Truck,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Package,
  Users,
  FileCheck,
  Leaf,
  TrendingUp
} from 'lucide-react';
import productsData from '../data/products.json';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Get featured products from the JSON data
  const featuredProducts = productsData.products.filter(product => product.featured).slice(0, 8);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Global Spice Importers, USA',
      text: 'Outstanding quality turmeric and black pepper. Their attention to packaging and documentation makes international trade seamless.',
      rating: 5
    },
    {
      id: 2,
      name: 'Ahmed Al-Rashid',
      company: 'Middle East Trading Co., UAE',
      text: 'We source our entire spice range from this company. Consistent quality, competitive prices, and they can fulfill any custom request.',
      rating: 5
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      company: 'European Health Foods, Spain',
      text: 'Their Moringa powder and Makhana are top-notch. They understood our organic certification requirements perfectly.',
      rating: 5
    },
    {
      id: 4,
      name: 'Chen Wei',
      company: 'Asian Imports Ltd., Singapore',
      text: 'Reliable partner for Basmati rice and lentils. They handle large orders efficiently and always deliver on time.',
      rating: 5
    }
  ];

  const trustIndicators = [
    {
      icon: FileCheck,
      title: 'IEC Licensed',
      subtitle: 'Import Export Code',
      description: 'Government authorized exporter'
    },
    {
      icon: Shield,
      title: 'GSTIN Verified',
      subtitle: '27GXGPP2119L1Z2',
      description: 'GST compliant business'
    },
    {
      icon: Award,
      title: 'UDYAM Registered',
      subtitle: 'UDYAM-MH-18-0434771',
      description: 'MSME certified enterprise'
    }
  ];

  const businessHighlights = [
    {
      icon: Globe,
      title: 'Global Export Network',
      description: 'Shipping to 50+ countries across 6 continents'
    },
    {
      icon: Truck,
      title: 'On-time Delivery',
      description: '98% on-time delivery rate with real-time tracking'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'ISO, FSSAI, and Organic certified products'
    },
    {
      icon: Package,
      title: 'Custom Orders Available',
      description: 'We fulfill on-request products directly from Indian farmers & suppliers'
    }
  ];

  const exportStats = [
    { value: '500+', label: 'Products Available' },
    { value: '50+', label: 'Countries Served' },
    { value: '10,000+', label: 'Tons Exported' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(featuredProducts.length, 4));
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(featuredProducts.length, 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(featuredProducts.length, 4)) % Math.min(featuredProducts.length, 4));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-orange-50 py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("/images/indian-farm-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Delivering India's Rich Harvests<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">
                  to the World
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                We supply premium Indian agricultural products — from spices & grains to fruits & herbs — customized for your order.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-lg px-8 py-6 shadow-lg">
                <Link to="/contact">
                  Request Any Product <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-green-600 text-green-700 hover:bg-green-50">
                <Link to="/products">Explore Our Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Building Section - Certificates */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-8 h-8 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-orange-600 font-medium">{item.subtitle}</p>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Highlights */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessHighlights.map((highlight, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow border-t-4 border-t-orange-500">
                <CardContent className="space-y-3 p-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto">
                    <highlight.icon className="w-7 h-7 text-orange-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Export Statistics */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {exportStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold">{stat.value}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Top Export Products
            </h2>
            <p className="text-lg text-gray-600">
              Premium quality agricultural products sourced directly from Indian farms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">
                      {product.price}
                    </span>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/contact">Request Quote</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/products">
                View Full Catalog <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special On-Request Products Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
              <TrendingUp className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Looking for Something Specific?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We source and export any agricultural product from India based on your request. 
              Just tell us what you need — we deliver.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">We Can Source:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Rare Spices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Seasonal Fruits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Regional Grains</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Organic Products</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Medicinal Herbs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Custom Blends</span>
                </div>
              </div>
            </div>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-lg px-8 py-6">
              <Link to="/contact">
                Request a Product <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* India Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sourcing from India's Agricultural Heartland
            </h2>
            <p className="text-lg text-gray-600">
              Direct partnerships with farmers across India's major agricultural regions
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-orange-50 p-8 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Our Sourcing Regions:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Kerala & Tamil Nadu</p>
                      <p className="text-sm text-gray-600">Spices, Cardamom, Pepper, Vanilla</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Punjab & Haryana</p>
                      <p className="text-sm text-gray-600">Basmati Rice, Wheat, Pulses</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Maharashtra</p>
                      <p className="text-sm text-gray-600">Mangoes, Grapes, Pomegranates, Turmeric</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Gujarat & Rajasthan</p>
                      <p className="text-sm text-gray-600">Cumin, Fennel, Sesame, Groundnuts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Bihar</p>
                      <p className="text-sm text-gray-600">Makhana (Fox Nuts), Lentils</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 bg-white rounded-lg shadow-lg p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                    <p className="text-xl font-bold text-gray-900">Pan-India Sourcing Network</p>
                    <p className="text-gray-600 mt-2">Direct farm partnerships across 15+ states</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Global Importers
            </h2>
            <p className="text-lg text-gray-600">
              Building long-term partnerships with businesses worldwide
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].company}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Start Importing Premium Indian Products Today!
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 500+ satisfied importers worldwide. Get competitive prices, quality assurance, and reliable delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6">
              <Link to="/contact">
                <Mail className="mr-2 w-5 h-5" />
                Get Custom Quote
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91-98765-43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>export@indianharvest.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 9AM-6PM IST</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;