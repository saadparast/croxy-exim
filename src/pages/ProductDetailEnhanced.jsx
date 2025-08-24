import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Info,
  Clock,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';
import ProductImageTabs from '../components/ProductImageTabs';
import InquiryForm from '../components/InquiryForm';
import productsData from '../data/products.json';

const ProductDetailEnhanced = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundProduct = productsData.products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      // Add detailed manufacturing process to each product
      const enhancedProduct = {
        ...foundProduct,
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
        ],
        nutritionalInfo: getNutritionalInfo(foundProduct.category),
        uses: getProductUses(foundProduct.name, foundProduct.category),
        marketStats: {
          exportVolume: '2,500+ tons annually',
          countries: '15+ countries',
          satisfaction: '98%'
        }
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
          title: 'Quality Testing',
          description: 'Laboratory testing for moisture, protein content, and contamination. Third-party verification for export compliance.',
          duration: '1-2 days'
        },
        {
          step: 5,
          title: 'Final Packaging',
          description: 'Bulk packaging in PP/jute bags with food-grade inner lining. Container stuffing with moisture absorbers.',
          duration: '1 day'
        }
      ]
    };

    return processes[category] || processes['Agriculture'];
  };

  const getNutritionalInfo = (category) => {
    // Sample nutritional information based on category
    if (category === 'Spices') {
      return {
        'Calories': '354 per 100g',
        'Carbohydrates': '65g',
        'Protein': '8g',
        'Fat': '10g',
        'Fiber': '21g',
        'Vitamin C': '26mg',
        'Iron': '41mg'
      };
    }
    return {
      'Calories': '347 per 100g',
      'Carbohydrates': '63g',
      'Protein': '25g',
      'Fat': '1.5g',
      'Fiber': '25g',
      'Folate': '394mcg',
      'Magnesium': '160mg'
    };
  };

  const getProductUses = (productName, category) => {
    const commonUses = {
      'Turmeric': ['Culinary spice for curries and dishes', 'Natural food coloring', 'Traditional medicine', 'Cosmetic applications', 'Anti-inflammatory supplements'],
      'Cardamom': ['Flavoring agent in teas and desserts', 'Spice blend ingredient', 'Natural breath freshener', 'Perfume industry', 'Traditional medicine'],
      'Black Pepper': ['Universal spice and seasoning', 'Food preservation', 'Essential oil production', 'Pharmaceutical applications', 'Cosmetic industry']
    };

    const productKey = Object.keys(commonUses).find(key => productName.includes(key));
    return productKey ? commonUses[productKey] : [
      'Premium ingredient for food industry',
      'Export to international markets',
      'Bulk supply for manufacturers',
      'Retail packaging applications'
    ];
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="mt-4 inline-block">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/products" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
          <Button variant="outline" onClick={shareProduct} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <ProductImageTabs product={product} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {product.featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {product.premium && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <Award className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
              
              {/* Market Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                  <p className="text-sm font-medium">{product.marketStats.exportVolume}</p>
                  <p className="text-xs text-gray-500">Annual Export</p>
                </div>
                <div className="text-center">
                  <Globe className="w-5 h-5 mx-auto text-green-600 mb-1" />
                  <p className="text-sm font-medium">{product.marketStats.countries}</p>
                  <p className="text-xs text-gray-500">Countries Served</p>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                  <p className="text-sm font-medium">{product.marketStats.satisfaction}</p>
                  <p className="text-xs text-gray-500">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Product Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Origin</p>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {product.specifications.origin}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Min. Order</p>
                    <p className="font-medium flex items-center gap-1">
                      <Package className="w-4 h-4 text-gray-400" />
                      {product.specifications.minOrder}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Packaging</p>
                    <p className="font-medium flex items-center gap-1">
                      <Factory className="w-4 h-4 text-gray-400" />
                      {product.specifications.packaging}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Certifications</p>
                    <p className="font-medium flex items-center gap-1">
                      <Shield className="w-4 h-4 text-gray-400" />
                      {product.specifications.certification}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <InquiryForm 
                product={product}
                trigger={
                  <Button size="lg" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                }
              />
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Card className="mt-8">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="manufacturing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
                  Manufacturing
                </TabsTrigger>
                <TabsTrigger value="quality" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
                  Quality Control
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="export" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
                  Export Info
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="overview" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Product Uses & Applications</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.uses.map((use, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Why Choose Our {product.name}?</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <Leaf className="w-8 h-8 text-green-600 mb-2" />
                          <h4 className="font-semibold mb-2">100% Natural</h4>
                          <p className="text-sm text-gray-600">No artificial additives or preservatives</p>
                        </Card>
                        <Card className="p-4">
                          <Shield className="w-8 h-8 text-blue-600 mb-2" />
                          <h4 className="font-semibold mb-2">Certified Quality</h4>
                          <p className="text-sm text-gray-600">ISO, FSSAI, and organic certifications</p>
                        </Card>
                        <Card className="p-4">
                          <Truck className="w-8 h-8 text-purple-600 mb-2" />
                          <h4 className="font-semibold mb-2">Global Shipping</h4>
                          <p className="text-sm text-gray-600">Worldwide delivery with proper packaging</p>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manufacturing" className="mt-0">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Manufacturing Process</h3>
                    <div className="space-y-4">
                      {product.manufacturingProcess.map((step, index) => (
                        <div key={index} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                            {step.step}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-lg">{step.title}</h4>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {step.duration}
                              </div>
                            </div>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="quality" className="mt-0">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Quality Control Measures</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Quality Tests Performed
                        </h4>
                        <div className="space-y-3">
                          {product.qualityChecks.map((check, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{check}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-600" />
                          Certifications & Standards
                        </h4>
                        <div className="space-y-3">
                          {['ISO 9001:2015 Quality Management', 'FSSAI Food Safety License', 'APEDA Registration', 'Organic Certification (where applicable)', 'HACCP Compliance', 'GMP Certified Facility'].map((cert, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <Award className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-0">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Nutritional Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Nutritional Facts (Per 100g)</h4>
                        <div className="space-y-3">
                          {Object.entries(product.nutritionalInfo).map(([nutrient, value]) => (
                            <div key={nutrient} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                              <span className="font-medium">{nutrient}</span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                      
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Health Benefits</h4>
                        <div className="space-y-3">
                          {['Rich in antioxidants', 'Anti-inflammatory properties', 'Supports immune system', 'Natural source of minerals', 'Promotes digestive health', 'Heart-healthy compounds'].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="export" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Export Documentation</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.exportDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Shipping & Logistics</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-4 text-center">
                          <Package className="w-8 h-8 mx-auto text-green-600 mb-2" />
                          <h4 className="font-semibold mb-2">Safe Packaging</h4>
                          <p className="text-sm text-gray-600">Food-grade materials with moisture protection</p>
                        </Card>
                        <Card className="p-4 text-center">
                          <Truck className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                          <h4 className="font-semibold mb-2">Fast Shipping</h4>
                          <p className="text-sm text-gray-600">Express delivery to 50+ countries worldwide</p>
                        </Card>
                        <Card className="p-4 text-center">
                          <Shield className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                          <h4 className="font-semibold mb-2">Insured Transit</h4>
                          <p className="text-sm text-gray-600">Full insurance coverage for international shipments</p>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailEnhanced;