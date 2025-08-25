import { FaTimes } from "react-icons/fa";

export const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-blue-100 mt-1">Product Details</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 text-lg mb-3">Basic Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <p className="text-gray-900 mt-1">{product.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Caffeine:</span>
                      <p className="text-gray-900 font-medium">{product.caffeine}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Type:</span>
                      <p className="text-gray-900 font-medium">{product.organic ? '🌿 Organic' : 'Regular'}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Stock:</span>
                    <p className={`font-bold text-lg ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                      {product.stock} units
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 text-lg mb-3">Steeping Instructions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Serving:</span>
                    <p className="text-gray-900 font-medium">{product.steepingInstructions.servingSize}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Temperature:</span>
                    <p className="text-gray-900 font-medium">{product.steepingInstructions.temperature}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Time:</span>
                    <p className="text-gray-900 font-medium">{product.steepingInstructions.time}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Color:</span>
                    <p className="text-gray-900 font-medium">{product.steepingInstructions.colorNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 text-lg mb-3">Product Variants</h4>
                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="font-medium text-gray-900">{variant.weight}</span>
                      <span className="font-bold text-lg text-green-600">${variant.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 text-lg mb-3">Attributes</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Collections:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.attributes.collections.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Origin:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.attributes.origin.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Flavor:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.attributes.flavor.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Qualities:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.attributes.qualities.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Allergens:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.attributes.allergens.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
