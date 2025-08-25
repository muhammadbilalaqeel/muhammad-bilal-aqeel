import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../cloudinary";
import { useUploadImageMutation } from "../../redux/cloudinarySlice";

export const ProductForm = ({ onClose, onSubmit, product }) => {
  const [uploadedImages, setUploadedImages] = useState(product?.images || []);
const [uploadImage, { isLoading, isError }] = useUploadImageMutation();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      stock: 0,
      slug: "",
      description: "",
      ingredients: "",
      caffeine: "",
      organic: false,
      steepingInstructions: {
        servingSize: "",
        temperature: "",
        time: "",
        colorNote: ""
      },
      variants: [{ weight: '', price: '' }],
      attributes: {
        collections: [''],
        origin: [''],
        flavor: [''],
        qualities: [''],
        allergens: ['']
      },
      images: []
    }
  });

  useEffect(() => {
  if (!product) return;

  reset({
    name: product.name || "",
    stock: product.stock ?? 0,
    slug: product.slug || "",
    description: product.description || "",
    ingredients: product.ingredients?.join(", ") || "",
    caffeine: product.caffeine || "",
    organic: product.organic ?? false,
    steepingInstructions: product.steepingInstructions || {
      servingSize: "",
      temperature: "",
      time: "",
      colorNote: ""
    },
    variants: product.variants?.length ? product.variants : [{ weight: '', price: '' }],
    attributes: {
      collections: product.attributes?.collections || [''],
      origin: product.attributes?.origin || [''],
      flavor: product.attributes?.flavor || [''],
      qualities: product.attributes?.qualities || [''],
      allergens: product.attributes?.allergens || ['']
    },
    images: product.images || []
  });
}, [product, reset]);


// useEffect(() => {
//   if (product) {
//     reset({
//       name: product.name || "",
//       stock: product.stock || 0,
//       slug: product.slug || "",
//       description: product.description || "",
//       ingredients: product.ingredients?.join(", ") || "",
//       caffeine: product.caffeine || "",
//       organic: product.organic || false,
//       steepingInstructions: product.steepingInstructions || {
//         servingSize: "",
//         temperature: "",
//         time: "",
//         colorNote: ""
//       },
//       variants: product.variants?.length ? product.variants : [{ weight: '', price: '' }],
//       attributes: product.attributes || {
//         collections: [''],
//         origin: [''],
//         flavor: [''],
//         qualities: [''],
//         allergens: ['']
//       },
//       images: product.images || []
//     });
//   }
// }, [product, reset])

  
  useEffect(() => {
    setValue("images", uploadedImages, { shouldValidate: true });
  }, [uploadedImages, setValue]);
const handleImageChange = async (e) => {
  const files = Array.from(e.target.files);

  const uploadedUrls = await Promise.all(
    files.map(async (file) => {
      const url = await uploadImage(file).unwrap(); 
      return url;
    })
  );

  setUploadedImages(prev => [...prev, ...uploadedUrls]);
};

  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data) => {
    if (uploadedImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const processedData = {
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      ingredients: data.ingredients.split(',').map(item => item.trim()),
      variants: data.variants.map(variant => ({
        ...variant,
        price: parseFloat(variant.price),
        weight: variant.weight.trim()
      })),
      attributes: {
        collections: data.attributes.collections.map(item => item.trim()),
        origin: data.attributes.origin.map(item => item.trim()),
        flavor: data.attributes.flavor.map(item => item.trim()),
        qualities: data.attributes.qualities.map(item => item.trim()),
        allergens: data.attributes.allergens.map(item => item.trim())
      },
        images: uploadedImages, 
      stock: parseInt(data.stock),
      organic: data.organic,
      caffeine: data.caffeine,
      steepingInstructions: {
        servingSize: data.steepingInstructions.servingSize,
        temperature: data.steepingInstructions.temperature,
        time: data.steepingInstructions.time,
        colorNote: data.steepingInstructions.colorNote
      }
    };
console.log("Processed Data Sent to Backend:", processedData);
    onSubmit(processedData);
  };

   


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">
              {product ? "Edit Product" : "Add New Product"}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                {...register("name", { required: "Product name is required", minLength: { value: 3, message: "Minimum 3 chars" } })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
              <input
                type="number"
                {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be >= 0" } })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Enter stock quantity"
              />
              {errors.stock && <p className="text-red-600 text-sm">{errors.stock.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full px-4 py-3 border rounded-lg"
                rows={3}
                placeholder="Enter product description"
              />
              {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
              <input
                {...register("ingredients", { required: "Ingredients required" })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Comma separated ingredients"
              />
              {errors.ingredients && <p className="text-red-600 text-sm">{errors.ingredients.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caffeine *</label>
              <select
                {...register("caffeine", { required: "Caffeine level required" })}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Select level</option>
                <option value="No Caffeine">No Caffeine</option>
                <option value="Low Caffeine">Low Caffeine</option>
                <option value="Medium Caffeine">Medium Caffeine</option>
                <option value="High Caffeine">High Caffeine</option>
              </select>
              {errors.caffeine && <p className="text-red-600 text-sm">{errors.caffeine.message}</p>}
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("organic")} />
                <span>Organic Product</span>
              </label>
            </div>
          </div>

          {/* Steeping Instructions */}
          <div className="bg-blue-50 p-6 rounded-xl space-y-4">
            <h4 className="font-semibold">Steeping Instructions</h4>
            {["servingSize","temperature","time","colorNote"].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{field} *</label>
                <input
                  {...register(`steepingInstructions.${field}`, { required: `${field} is required` })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder={`Enter ${field}`}
                />
                {errors.steepingInstructions?.[field] && <p className="text-red-600 text-sm">{errors.steepingInstructions[field].message}</p>}
              </div>
            ))}
          </div>

          {/* Variants (single default) */}
          <div className="bg-green-50 p-6 rounded-xl space-y-4">
            <h4 className="font-semibold">Variant</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Weight *</label>
                <input
                  {...register("variants.0.weight", { required: "Weight required" })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="e.g., 50g"
                />
                {errors.variants?.[0]?.weight && <p className="text-red-600 text-sm">{errors.variants[0].weight.message}</p>}
              </div>
              <div>
                <label>Price *</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("variants.0.price", { required: "Price required", min: { value: 0, message: "Price >= 0" } })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="0.00"
                />
                {errors.variants?.[0]?.price && <p className="text-red-600 text-sm">{errors.variants[0].price.message}</p>}
              </div>
            </div>
          </div>

          {/* Attributes (single default for each) */}
          <div className="bg-purple-50 p-6 rounded-xl space-y-4">
            <h4 className="font-semibold">Attributes</h4>
            {["collections","origin","flavor","qualities","allergens"].map(attr => (
              <div key={attr}>
                <label>{attr} *</label>
                <input
                  {...register(`attributes.${attr}.0`, { required: `${attr} required` })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder={`Enter ${attr}`}
                />
                {errors.attributes?.[attr]?.[0] && <p className="text-red-600 text-sm">{errors.attributes[attr][0].message}</p>}
              </div>
            ))}
          </div>

{isLoading ? <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>

      :   <div className="bg-yellow-50 p-6 rounded-xl space-y-4">
            <h4 className="font-semibold">Images *</h4>
            <input type="file" multiple onChange={handleImageChange} />
            {uploadedImages.length === 0 && <p className="text-red-600 text-sm">Please upload at least one image</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {uploadedImages.map((img, i) => (
                <div key={i} className="relative border p-2 rounded">
                  <span>{img}</span>
                  <button type="button" onClick={() => handleRemoveImage(i)} className="absolute -top-2 -right-2 text-red-600">
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
    
  }
         

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3 border rounded">Cancel</button>
            <button type="submit" className={`px-6 py-3 ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded`} disabled={isLoading}>
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
