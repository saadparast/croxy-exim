import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Globe,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  Shield,
  Users,
  FileText,
  AlertCircle,
  Leaf
} from 'lucide-react';
import productsData from '../data/products.json';
import emailService from '../services/emailService';

const API_URL = 'http://localhost:3001/api';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get('product');
  
  const [formType, setFormType] = useState('general'); // 'general' or 'product-request'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    productInterest: requestedProduct || '',
    customProduct: '',
    quantity: '',
    deliveryPort: '',
    targetPrice: '',
    certifications: [],
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for backend
    const submissionData = {
      ...formData,
      inquiryType: formType,
      timestamp: new Date().toISOString()
    };

    try {
      // Submit to backend API
      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        
        // Also save to localStorage for backward compatibility
        const existingRequests = JSON.parse(localStorage.getItem('clientRequests') || '[]');
        const newRequest = {
          id: result.id || Date.now(),
          ...formData,
          timestamp: new Date().toISOString(),
          status: 'pending'
        };
        const updatedRequests = [...existingRequests, newRequest];
        localStorage.setItem('clientRequests', JSON.stringify(updatedRequests));
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          country: '',
          productInterest: '',
          customProduct: '',
          quantity: '',
          deliveryPort: '',
          targetPrice: '',
          certifications: [],
          message: ''
        });
        
        // Reset submitted state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      
      // Fallback to localStorage if API fails
      const existingRequests = JSON.parse(localStorage.getItem('clientRequests') || '[]');
      const newRequest = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      const updatedRequests = [...existingRequests, newRequest];
      localStorage.setItem('clientRequests', JSON.stringify(updatedRequests));
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        productInterest: '',
        customProduct: '',
        quantity: '',
        deliveryPort: '',
        targetPrice: '',
        certifications: [],
        message: ''
      });
    }
  };
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (requestedProduct) {
      setFormType('product-request');
      setFormData(prev => ({
        ...prev,
        productInterest: requestedProduct
      }));
    }
  }, [requestedProduct]);

  // ...existing code...

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        certifications: checked 
          ? [...prev.certifications, value]
          : prev.certifications.filter(cert => cert !== value)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['export@indianharvest.com', 'sales@indianharvest.com'],
      description: 'Get quotes within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109'],
      description: 'Mon-Sat: 9AM-6PM IST'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: ['Maharashtra, India'],
      description: 'Export processing center'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      details: ['50+ Countries', '6 Continents'],
      description: 'Worldwide shipping network'
    }
  ];

  const certificationOptions = [
    'ISO Certified',
    'FSSAI Approved',
    'Organic Certification',
    'APEDA Registration',
    'Halal Certified',
    'Non-GMO',
    'GlobalGAP',
    'Fair Trade'
  ];

  const faqItems = [
    {
      question: 'Can you source any agricultural product from India?',
      answer: 'Yes! We have an extensive network of farmers and suppliers across India. If you need a specific product not listed in our catalog, we can source it for you. Just tell us your requirements including quantity, quality specifications, and we will provide a competitive quote.'
    },
    {
      question: 'What are your minimum order quantities?',
      answer: 'MOQs vary by product type. For spices: typically 200-500kg. For grains and pulses: 1000kg minimum. For specialty items like saffron: as low as 1kg. We can accommodate smaller quantities for sample orders. Contact us with your specific needs.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping time depends on destination and mode of transport. Sea freight: 15-45 days depending on destination. Air freight: 3-7 days for urgent orders. We handle all export documentation and customs clearance to ensure smooth delivery.'
    },
    {
      question: 'Do you provide product samples?',
      answer: 'Yes, we provide samples for quality evaluation before bulk orders. Sample quantities range from 100g to 1kg depending on the product. Shipping charges apply, which are adjustable against your final order value.'
    },
    {
      question: 'What certifications do your products have?',
      answer: 'Our products come with various certifications including ISO, FSSAI, Organic certification, APEDA registration, and more. We can also arrange specific certifications like Halal, Kosher, or Non-GMO based on your market requirements.'
    },
    {
      question: 'What payment terms do you accept?',
      answer: 'We accept Letter of Credit (LC), Telegraphic Transfer (TT/Wire), and for regular clients, we offer Documents Against Payment (DP) and Documents Against Acceptance (DA). Payment terms are negotiable based on order value and relationship.'
    },
    {
      question: 'Can you do custom packaging and private labeling?',
      answer: 'Absolutely! We offer custom packaging solutions including private labeling with your brand. We can pack in various sizes from retail packs (100g, 500g, 1kg) to bulk bags (25kg, 50kg). Minimum quantities apply for custom packaging.'
    },
    {
      question: 'How do you ensure product quality?',
      answer: 'Quality is our priority. All products undergo strict quality checks including physical, chemical, and microbiological testing. We maintain temperature-controlled storage and use proper fumigation. Third-party inspection services are available upon request.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-orange-600 py-20">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("/images/contact-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Let's Start Your Import Journey
          </h1>
          <p className="text-xl text-green-50 max-w-3xl mx-auto">
            Request any agricultural product from India. We source, process, and deliver worldwide with complete documentation.
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                  <div className="space-y-1 mb-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-700 font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Selection Tabs */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setFormType('general')}
              variant={formType === 'general' ? 'default' : 'outline'}
              className={formType === 'general' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              General Inquiry
            </Button>
            <Button
              onClick={() => setFormType('product-request')}
              variant={formType === 'product-request' ? 'default' : 'outline'}
              className={formType === 'product-request' ? 'bg-orange-600 hover:bg-orange-700' : ''}
            >
              <Package className="w-4 h-4 mr-2" />
              Request Product
            </Button>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">We've received your inquiry and will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formType === 'general' ? 'Get in Touch' : 'Request Agricultural Products'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {formType === 'general' 
                        ? 'Send us your inquiry and we\'ll respond within 24 hours'
                        : 'Tell us what you need - we can source any agricultural product from India'}
                    </p>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g., United States, UAE, United Kingdom"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Product-specific fields */}
                  {formType === 'product-request' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Category *
                        </label>
                        <select
                          name="productInterest"
                          required
                          value={formData.productInterest}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Select a category</option>
                          {productsData.categories.map(cat => (
                            <option key={cat.name} value={cat.name}>
                              {cat.icon} {cat.name}
                            </option>
                          ))}
                          <option value="Custom">🔧 Custom/Other Product</option>
                        </select>
                      </div>

                      {formData.productInterest === 'Custom' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Describe Your Product Requirements *
                          </label>
                          <input
                            type="text"
                            name="customProduct"
                            required
                            value={formData.customProduct}
                            onChange={handleInputChange}
                            placeholder="e.g., Organic quinoa, Pink salt, Bamboo rice, etc."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity Required *
                          </label>
                          <input
                            type="text"
                            name="quantity"
                            required
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder="e.g., 500 kg, 10 tons, 1 container"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery Port/Location
                          </label>
                          <input
                            type="text"
                            name="deliveryPort"
                            value={formData.deliveryPort}
                            onChange={handleInputChange}
                            placeholder="e.g., Port of Los Angeles, Dubai Port"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target Price Range (Optional)
                        </label>
                        <input
                          type="text"
                          name="targetPrice"
                          value={formData.targetPrice}
                          onChange={handleInputChange}
                          placeholder="e.g., $500-700 per ton, Open to negotiation"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Required Certifications (Check all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {certificationOptions.map(cert => (
                            <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                value={cert}
                                checked={formData.certifications.includes(cert)}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                              />
                              <span className="text-sm text-gray-700">{cert}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formType === 'general' ? 'Your Message' : 'Additional Requirements'}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={formType === 'general' 
                        ? "Tell us about your import requirements..."
                        : "Specify packaging preferences, quality standards, delivery timeline, payment terms, etc."}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Quick Response Guarantee</p>
                        <p>We respond to all inquiries within 24 hours with detailed quotations including pricing, shipping costs, and delivery timelines.</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {formType === 'general' ? 'Send Inquiry' : 'Request Product Quote'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Importers Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Export Solution</h3>
              <p className="text-gray-600">From sourcing to shipping, we handle everything including documentation, customs clearance, and logistics.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">All products are tested and certified. We provide complete traceability from farm to port.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Personal export manager for each client. 24/7 support throughout the import process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button asChild>
              <a href="mailto:export@indianharvest.com">
                <Mail className="w-4 h-4 mr-2" />
                Email Us Directly
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;