import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Package,
  MapPin,
  Shield,
  Truck,
  Calendar,
  Award,
  CheckCircle,
  Globe,
  Factory,
  Leaf,
  FileText,
  Download,
  Share2,
  Mail,
  MessageCircle,
  Camera,
  Info,
  Clock
} from 'lucide-react';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const foundProduct = productsData.products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      // Add detailed manufacturing process to each product
      const enhancedProduct = {
        ...foundProduct,
        images: [
          foundProduct.image,
          `/images/${foundProduct.name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-')}.jpg`,
          `/images/${foundProduct.name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-')}-2.jpg`,
          `/images/${foundProduct.name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-')}-3.jpg`
        ],
        manufacturingProcess: getManufacturingProcess(foundProduct.category),
        qualityChecks: [
          'Physical inspection for color and size',
          'Moisture content analysis',
          'Microbiological testing',
          'Pesticide residue testing',
          'Heavy metals testing',
          'Aflatoxin testing (where applicable)',
          'Third-party lab verification'
        ],
        exportDocuments: [
          'Commercial Invoice',
          'Packing List',
          'Certificate of Origin',
          'Phytosanitary Certificate',
          'Health Certificate',
          'Quality Certificate',
          'Bill of Lading',
          'Insurance Certificate'
        ]
      };
      setProduct(enhancedProduct);
    }
  }, [id]);

  const getManufacturingProcess = (category) => {
    const processes = {
      'Spices': [
        {
          step: 1,
          title: 'Sourcing & Selection',
          description: 'Direct sourcing from certified organic farms across India. Farmers are selected based on sustainable farming practices and quality standards.',
          duration: '1-2 days'
        },
        {
          step: 2,
          title: 'Cleaning & Sorting',
          description: 'Raw spices undergo mechanical cleaning to remove foreign materials, stones, and dust. Manual sorting ensures only premium quality products proceed.',
          duration: '1 day'
        },
        {
          step: 3,
          title: 'Drying Process',
          description: 'Scientific drying using solar dryers or low-temperature dehydrators to preserve essential oils and active compounds. Moisture reduced to optimal 8-10%.',
          duration: '2-3 days'
        },
        {
          step: 4,
          title: 'Grinding & Processing',
          description: 'Temperature-controlled grinding in stainless steel mills to prevent heat damage. Multiple sieving for uniform particle size.',
          duration: '1 day'
        },
        {
          step: 5,
          title: 'Quality Testing',
          description: 'Laboratory testing for curcumin content, volatile oil percentage, microbiology, and adulterants. FSSAI and ISO compliance verification.',
          duration: '1-2 days'
        },
        {
          step: 6,
          title: 'Packaging & Sealing',
          description: 'Hygienic packaging in food-grade materials with nitrogen flushing for extended shelf life. Batch coding and labeling as per international standards.',
          duration: '1 day'
        }
      ],
      'Agriculture': [
        {
          step: 1,
          title: 'Farm Collection',
          description: 'Direct procurement from farmer cooperatives ensuring traceability. GPS mapping of source farms for quality assurance.',
          duration: '2-3 days'
        },
        {
          step: 2,
          title: 'Pre-cleaning & Destoning',
          description: 'Removal of stones, mud balls, and other impurities using advanced destoning machines and air separators.',
          duration: '1 day'
        },
        {
          step: 3,
          title: 'Grading & Sorting',
          description: 'Optical color sorting and size grading to ensure uniformity. Removal of broken, discolored, or damaged grains.',
          duration: '1 day'
        },
        {
          step: 4,
          title: 'Polishing (if required)',
          description: 'Gentle polishing for lentils and rice using modern milling technology. Retention of nutritional bran layer in semi-polished varieties.',
          duration: '1 day'
        },
        {
          step: 5,
          title: 'Fumigation & Treatment',
          description: 'Eco-friendly phosphine fumigation in sealed chambers. Heat treatment option available for organic products.',
          duration: '2-3 days'
        },
        {
          step: 6,
          title: 'Final Packaging',
          description: 'Bulk packaging in PP/jute bags with food-grade inner lining. Container stuffing with moisture absorbers and ventilation.',
          duration: '1 day'
        }
      ],
      'Premium Products': [
        {
          step: 1,
          title: 'Harvesting',
          description: 'Selective hand-picking at optimal ripeness. Early morning harvest to maintain freshness and reduce field heat.',
          duration: '1-2 days'
        },
        {
          step: 2,
          title: 'Collection & Transport',
          description: 'Careful handling in ventilated crates. Refrigerated transport from farm to packing house within 4-6 hours.',
          duration: '1 day'
        },
        {
          step: 3,
          title: 'Washing & Sanitization',
          description: 'Gentle washing with potable water and food-grade sanitizers. Fungicide treatment for extended shelf life.',
          duration: '4-6 hours'
        },
        {
          step: 4,
          title: 'Grading & Sorting',
          description: 'Size, color, and quality grading as per international standards. Removal of blemished or undersized fruits.',
          duration: '1 day'
        },
        {
          step: 5,
          title: 'Ripening Control',
          description: 'Scientific ripening chambers with controlled temperature, humidity, and ethylene levels for uniform ripening.',
          duration: '2-4 days'
        },
        {
          step: 6,
          title: 'Export Packing',
          description: 'Individual fruit wrapping, cushioning, and placement in ventilated CFB boxes. Pre-cooling before container loading.',
          duration: '1 day'
        }
      ],
      'Nuts & Seeds': [
        {
          step: 1,
          title: 'Harvesting & Collection',
          description: 'Seasonal harvesting at peak maturity. Sun-drying in fields for initial moisture reduction.',
          duration: '3-5 days'
        },
        {
          step: 2,
          title: 'Shelling & Extraction',
          description: 'Mechanical shelling with minimal breakage. Hand sorting for premium whole grades.',
          duration: '1-2 days'
        },
        {
          step: 3,
          title: 'Roasting (if applicable)',
          description: 'Controlled temperature roasting for enhanced flavor. Oil roasting or dry roasting based on product requirements.',
          duration: '2-4 hours'
        },
        {
          step: 4,
          title: 'Grading by Size',
          description: 'Mechanical sieving for size classification (W180, W240, W320 for cashews). Color sorting for uniformity.',
          duration: '1 day'
        },
        {
          step: 5,
          title: 'Quality Assurance',
          description: 'Testing for aflatoxin, moisture, and oil content. Metal detection and x-ray scanning for foreign objects.',
          duration: '1 day'
        },
        {
          step: 6,
          title: 'Vacuum Packaging',
          description: 'Nitrogen-flushed vacuum packing for freshness. Tin packaging available for premium products.',
          duration: '1 day'
        }
      ],
      'Herbal Products': [
        {
          step: 1,
          title: 'Wild Harvesting/Cultivation',
          description: 'Sustainable wild collection or organic cultivation. Harvesting at optimal time for maximum active compounds.',
          duration: '5-7 days'
        },
        {
          step: 2,
          title: 'Initial Processing',
          description: 'Washing, cutting, and shade drying to preserve phytochemicals. Temperature not exceeding 40°C.',
          duration: '3-4 days'
        },
        {
          step: 3,
          title: 'Extraction (if applicable)',
          description: 'Solvent or water extraction for concentrated products. Standardization to specific active compound percentages.',
          duration: '2-3 days'
        },
        {
          step: 4,
          title: 'Micronization',
          description: 'Ultra-fine grinding to 80-100 mesh for better bioavailability. Cryogenic grinding for heat-sensitive herbs.',
          duration: '1 day'
        },
        {
          step: 5,
          title: 'Standardization & Testing',
          description: 'HPLC testing for active compounds. Heavy metals and microbiology testing as per pharmacopoeia standards.',
          duration: '2-3 days'
        },
        {
          step: 6,
          title: 'Encapsulation/Packaging',
          description: 'Capsulation or tablet making if required. Amber glass or aluminum packaging to protect from light.',
          duration: '1-2 days'
        }
      ]
    };

    return processes[category] || processes['Spices'];
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hello! I'm interested in ${product.name}. Please provide pricing and availability details.`);
    window.open(`https://wa.me/918976054993?text=${message}`, '_blank');
  };

  const handleEmailInquiry = (formData) => {
    // In production, this would send to your backend API
    const emailData = {
      to: 'export@indianharvest.com',
      subject: `Product Inquiry: ${product.name}`,
      productDetails: {
        name: product.name,
        category: product.category,
        specifications: product.specifications
      },
      customerDetails: formData,
      timestamp: new Date().toISOString()
    };

    // For now, we'll log it and show a success message
    console.log('Sending email:', emailData);
    
    // In production, you would:
    // fetch('/api/send-inquiry', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(emailData)
    // });

    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setShowInquiryModal(false);
  };

  // Update current image when selected image changes
  useEffect(() => {
    if (product) {
      const images = product.images || [product.image];
      setCurrentImage(images[selectedImage] || '/images/placeholder.jpg');
    }
  }, [selectedImage, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">Product not found</p>
          <Button asChild className="mt-4">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Header */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.svg';
                    e.target.onerror = null;
                  }}
                />
                <span className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                  Product Image {selectedImage + 1}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(product.images || [product.image]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 bg-gray-100 rounded border-2 ${
                      selectedImage === index ? 'border-orange-500' : 'border-transparent'
                    } hover:border-orange-300 transition-colors overflow-hidden`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.svg';
                        e.target.onerror = null;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Origin</p>
                    <p className="font-medium">{product.specifications?.origin || 'India'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Min. Order</p>
                    <p className="font-medium">{product.specifications?.minOrder || '500 kg'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Certification</p>
                    <p className="font-medium">{product.specifications?.certification || 'ISO, FSSAI'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Shelf Life</p>
                    <p className="font-medium">{product.specifications?.shelfLife || '12 months'}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-orange-600">{product.price}</p>
                <p className="text-sm text-gray-500 mt-2">Contact for bulk pricing and custom packaging</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => setShowInquiryModal(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Inquiry
                </Button>
                <Button 
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="sm:w-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {['overview', 'manufacturing', 'quality', 'export'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'manufacturing' ? 'Manufacturing Process' : tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Origin:</dt>
                            <dd className="font-medium">{product.specifications?.origin}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Packaging:</dt>
                            <dd className="font-medium">{product.specifications?.packaging}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Min. Order:</dt>
                            <dd className="font-medium">{product.specifications?.minOrder}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Certifications:</dt>
                            <dd className="font-medium">{product.specifications?.certification}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Packaging Options</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Consumer packs (100g, 250g, 500g, 1kg)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Bulk bags (25kg, 50kg)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Custom packaging with private labeling</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Vacuum sealed for extended shelf life</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Manufacturing Process Tab */}
            {activeTab === 'manufacturing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Manufacturing Process</h2>
                  <p className="text-gray-600 mb-6">
                    Our {product.category.toLowerCase()} undergo a rigorous manufacturing process to ensure the highest quality standards.
                  </p>
                </div>

                <div className="space-y-4">
                  {product.manufacturingProcess.map((process, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                            {process.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{process.title}</h3>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {process.duration}
                              </span>
                            </div>
                            <p className="text-gray-600">{process.description}</p>
                          </div>
                        </div>
                      </div>
                      {index < product.manufacturingProcess.length - 1 && (
                        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Total Processing Time</h3>
                        <p className="text-blue-800">
                          The complete manufacturing process takes approximately 10-15 days from sourcing to final packaging, 
                          ensuring thorough quality checks at each stage.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quality Tab */}
            {activeTab === 'quality' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h2>
                  <p className="text-gray-600 mb-6">
                    We maintain strict quality control measures throughout the supply chain to ensure our products meet international standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        Quality Checks
                      </h3>
                      <ul className="space-y-2">
                        {product.qualityChecks.map((check, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-gray-600 text-sm">{check}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Award className="w-5 h-5 text-orange-600 mr-2" />
                        Certifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">ISO 22000:2018</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">FSSAI Licensed</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">Organic Certified</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">APEDA Registered</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Leaf className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-2">Sustainability Commitment</h3>
                        <p className="text-green-800">
                          We work directly with farmers practicing sustainable agriculture. Our products are sourced 
                          ethically with fair trade practices, ensuring both quality and social responsibility.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Export Tab */}
            {activeTab === 'export' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Export Information</h2>
                  <p className="text-gray-600 mb-6">
                    We handle all aspects of international trade, from documentation to logistics, ensuring smooth delivery to your destination.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        Export Documents Provided
                      </h3>
                      <ul className="space-y-2">
                        {product.exportDocuments.map((doc, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="text-gray-600">{doc}</span>
                            <Download className="w-4 h-4 text-gray-400" />
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Truck className="w-5 h-5 text-orange-600 mr-2" />
                        Shipping Options
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Sea Freight</h4>
                          <p className="text-sm text-gray-600">FCL/LCL options, 15-45 days transit</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Air Freight</h4>
                          <p className="text-sm text-gray-600">Express delivery, 3-7 days transit</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Incoterms</h4>
                          <p className="text-sm text-gray-600">FOB, CIF, DDP available</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Payment Terms</h4>
                          <p className="text-sm text-gray-600">LC, TT, DP/DA accepted</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-orange-900 mb-2">Global Reach</h3>
                        <p className="text-orange-800">
                          Currently exporting to USA, Europe, Middle East, Southeast Asia, and Africa. 
                          We handle all customs documentation and can ship to any international port.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData.products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedProduct.description}</p>
                      <p className="text-orange-600 font-semibold">{relatedProduct.price}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Product Inquiry</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleEmailInquiry(Object.fromEntries(formData));
            }}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Required Quantity"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Additional Requirements"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <Button type="submit" className="flex-1">Send Inquiry</Button>
                <Button type="button" variant="outline" onClick={() => setShowInquiryModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
