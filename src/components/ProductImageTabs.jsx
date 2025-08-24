import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ZoomIn, Camera, Factory, Package, Sparkles } from 'lucide-react';

const ProductImageTabs = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Define image categories and their metadata
  const imageCategories = [
    {
      key: 'farming',
      label: 'Farming',
      icon: <Camera className="w-4 h-4" />,
      description: 'Raw cultivation and harvesting',
      filename: 'farming.jpg'
    },
    {
      key: 'processing',
      label: 'Processing',
      icon: <Factory className="w-4 h-4" />,
      description: 'Manufacturing and production',
      filename: 'processing.jpg'
    },
    {
      key: 'final',
      label: 'Final Product',
      icon: <Package className="w-4 h-4" />,
      description: 'Export-ready packaging',
      filename: 'final.jpg'
    },
    {
      key: 'extra',
      label: 'Premium',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Premium quality showcase',
      filename: 'extra.jpg'
    }
  ];

  // Generate image paths based on product ID
  const getImagePath = (category) => {
    try {
      // Try to import the specific image
      return `/src/assets/products/${product.id}/${category.filename}`;
    } catch {
      // Fallback to a placeholder or default image
      return getPlaceholderImage(category.key, product.category);
    }
  };

  // Generate appropriate placeholder images based on category
  const getPlaceholderImage = (categoryKey, productCategory) => {
    const placeholders = {
      farming: `https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&auto=format`,
      processing: `https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&h=600&fit=crop&auto=format`,
      final: product.image || `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop&auto=format`,
      extra: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format`
    };
    
    return placeholders[categoryKey] || placeholders.final;
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="farming" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {imageCategories.map((category) => (
            <TabsTrigger 
              key={category.key} 
              value={category.key}
              className="flex flex-col items-center gap-1 p-3 text-xs"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {imageCategories.map((category) => (
          <TabsContent key={category.key} value={category.key} className="mt-0">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="relative aspect-[4/3] overflow-hidden cursor-zoom-in group bg-gray-100"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={getImagePath(category)}
                    alt={`${product.name} - ${category.description}`}
                    className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${
                      isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
                    }`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                          }
                        : {}
                    }
                    onError={(e) => {
                      e.target.src = getPlaceholderImage(category.key, product.category);
                    }}
                  />
                  
                  {/* Zoom indicator */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  
                  {/* Image overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white">
                      <h3 className="font-semibold text-lg mb-1">{category.label}</h3>
                      <p className="text-sm text-gray-200">{category.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Additional image metadata */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Hover over the image to zoom in • Click tabs to view different stages</p>
      </div>
    </div>
  );
};

export default ProductImageTabs;