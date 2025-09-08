"use client";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { X } from "lucide-react"; // for cross icon
// import { useUpdateProductMutation } from "@/redux/api/productApi";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Category, useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from "@/redux/api/productApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

type Variant = {
  color: string;
  images: string[];
  sizes: string[];
};

type ProductFormValues = {
  name: string;
  description: string;
  category: Category;
  price: number;
  stock: number;
  type: "money" | "loyalty_points" | "hybrid";
  onSale: boolean;
  discountPercentage: number;
  loyaltyPoints: number;
  variants: Variant[];
};

type EditProductFormProps = {
  product?: ProductFormValues & { _id: string };
};

export default function EditProductForm({ product }: EditProductFormProps) {
  if(!product) return <>Loading</>  
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<ProductFormValues>({
      defaultValues: product,
    });
 const { user } = useAppSelector((state) => state.auth);
  const { fields, append, remove } = useFieldArray({ control, name: "variants" });
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [uploading, setUploading] = useState<Record<number, boolean>>({});
  const [currentUpload, setCurrentUpload] = useState<Record<number, string[]>>({});
  const watchVariants = watch("variants");
  const onSale = watch("onSale");
  const selectedType = watch("type");

  const { data: categories, isLoading: loading } = useGetCategoriesQuery();
  const [updateProduct, { isLoading : updateLoading, error }] = useUpdateProductMutation();
  const [deleteProduct,{isLoading : deleteLoading}] = useDeleteProductMutation()
  const {refetch} = useGetAllProductsQuery({})
  useEffect(() => {
    // Reset discount to 0 if onSale is unchecked
    if (!onSale) setValue("discountPercentage", 0);

    // Reset loyaltyPoints to 0 if type is money
    if (selectedType !== "hybrid" && selectedType !== "loyalty_points") {
      setValue("loyaltyPoints", 0);
    }
  }, [onSale, selectedType, setValue]);

  // Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const urls: string[] = [];

    setCurrentUpload((prev) => ({ ...prev, [index]: [] }));
    setUploading((prev) => ({ ...prev, [index]: true }));
    setUploadProgress((prev) => ({ ...prev, [index]: 0 }));

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "react_upload");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxmlebwrn/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress((prev) => ({ ...prev, [index]: percent }));
            }
          },
        }
      );

      urls.push(res.data.secure_url);
      setCurrentUpload((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), res.data.secure_url],
      }));
    }

    // Add uploaded URLs to form
    const previousImages = watchVariants[index]?.images || [];
    setValue(`variants.${index}.images`, [...previousImages, ...urls], {
      shouldValidate: true,
    });

    setUploading((prev) => ({ ...prev, [index]: false }));
  };

  // Remove image from variant
  const handleRemoveImage = (index: number, imgIndex: number) => {
    const images = watchVariants[index]?.images || [];
    const updated = images.filter((_, i) => i !== imgIndex);

    setValue(`variants.${index}.images`, updated, { shouldValidate: true });

    if (updated.length === 0) {
      setCurrentUpload((prev) => {
        const newUploads = { ...prev };
        newUploads[index] = [];
        return newUploads;
      });
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (data.variants.length === 0) {
      toast.error("You must add at least one variant!");
      return;
    }

    for (let i = 0; i < data.variants.length; i++) {
      if (data.variants[i].images.length === 0) {
        toast.error(`Variant ${i + 1} must have at least one image`);
        return;
      }
    }

    try {
     console.log(data)
     const res = await updateProduct({ id: product._id,  data }).unwrap();
      console.log(res)
      toast.success("Product updated successfully!")
      router.push("/dashboard/allproducts")
      // alert("Product updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };


  const handleDelete = async()=>{
      try {
     const res = await deleteProduct(product._id).unwrap();
      console.log(res)
      toast.success("Product deleted successfully!")
      // alert("Product updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  }

  return (
    <form className="w-full flex flex-col gap-10 bg-white rounded-2xl p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end">
        {!isEditing && (
          <Button type="button" onClick={() => setIsEditing(true)} className="bg-[#003F62] text-white h-12 w-32">
            Edit
          </Button>
        )}
      </div>

      <div className="flex gap-6 justify-between">
        <div className="w-full flex flex-col gap-6">
          {/* Product Inputs */}
          <div className="flex flex-col gap-4">
            <label className="text-[#232321] font-semibold text-xl">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              {...register("name", {
                required: "Product name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
              })}
              disabled={!isEditing}
              className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <label className="text-[#232321] font-semibold text-xl">Description</label>
            <textarea
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
                maxLength: { value: 300, message: "Maximum 300 characters" },
              })}
              disabled={!isEditing}
              className={`min-h-[180px] h-full py-[10px] px-4 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-4">
            <label className="text-[#232321] font-semibold text-xl">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              disabled={!isEditing}
              className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
            >
              {loading ? (
                <option value="">Loading categories...</option>
              ) : categories && categories.length > 0 ? (
                <>
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No categories found</option>
              )}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Stock & Type */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-4 flex-1">
              <label className="text-[#232321] font-semibold text-xl">Stock</label>
              <input
                type="number"
                placeholder="Enter product stock"
                {...register("stock", { valueAsNumber: true, required: "Stock is Required", min: { value: 1, message: "Stock must be greater than 0" } })}
                disabled={!isEditing}
                className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <label className="text-[#232321] font-semibold text-xl">Type</label>
              <select
                {...register("type", { required: "Type is required" })}
                disabled={!isEditing}
                className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
              >
                <option value="money">Money</option>
                <option value="loyalty_points">Loyalty Points</option>
                <option value="hybrid">Hybrid</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>
          </div>

          {/* Price & Loyalty Points */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#232321] font-semibold text-xl">Price</label>
              <input
                type="number"
                placeholder="Enter product price"
                {...register("price", { valueAsNumber: true, required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })}
                disabled={!isEditing}
                className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#232321] font-semibold text-xl">Loyalty Points</label>
              <input
                type="number"
                placeholder="Enter loyalty points"
                {...register("loyaltyPoints", {
                  valueAsNumber: true,
                  validate: (value) =>
                    (selectedType === "hybrid" || selectedType === "loyalty_points")
                      ? (value && value > 0) || "Loyalty points are required for this type"
                      : true,
                })}
                disabled={!isEditing || (selectedType !== "hybrid" && selectedType !== "loyalty_points")}
                className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing || (selectedType !== "hybrid" && selectedType !== "loyalty_points") ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
              />
              {errors.loyaltyPoints && <p className="text-red-500 text-sm">{errors.loyaltyPoints.message}</p>}
            </div>
          </div>

          {/* On Sale & Discount */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#232321] font-semibold text-xl flex items-center gap-2">
                <Controller
                  name="onSale"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => { if (isEditing) field.onChange(e.target.checked); if (!e.target.checked) setValue("discountPercentage", 0); }}
                      disabled={!isEditing}
                      className="w-5 h-5"
                    />
                  )}
                />
                On Sale
              </label>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#232321] font-semibold text-xl">Discount %</label>
              <input
  type="number"
  placeholder="Enter discount"
  {...register("discountPercentage", {
    valueAsNumber: true,
    validate: (value) =>
      onSale
        ? (value && value > 0) || "Discount must be greater than 0"
        : true,
  })}
  disabled={!isEditing || !onSale}
  className={`py-[10px] px-4 h-12 w-full border rounded-xl ${
    !isEditing || !onSale ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"
  }`}
/>
{errors.discountPercentage && (
  <p className="text-red-500 text-sm">{errors.discountPercentage.message}</p>
)}
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#232321]">Variant {index + 1}</h3>
                {isEditing && (
                  <button type="button" onClick={() => remove(index)} className="text-red-600 hover:underline">
                    Remove Variant
                  </button>
                )}
              </div>

              {/* Color & Sizes */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#232321] font-semibold text-xl">Color</label>
                <input
                  type="text"
                  placeholder="Enter Color"
                  {...register(`variants.${index}.color`, { required: true })}
                  disabled={!isEditing}
                  className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#232321] font-semibold text-xl">Sizes (comma separated)</label>
                <input
                  type="text"
                  placeholder="Enter sizes e.g. S,M,L"
                  {...register(`variants.${index}.sizes`, { required: true })}
                  onBlur={(e) => { const sizes = e.target.value.split(",").map((s) => s.trim()); setValue(`variants.${index}.sizes`, sizes); }}
                  disabled={!isEditing}
                  className={`py-[10px] px-4 h-12 w-full border rounded-xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "border-[#232321]"}`}
                />
              </div>

              {/* Uploaded Images */}
              {currentUpload[index]?.length > 0 && (
                <div className="flex gap-4 flex-wrap mb-4 relative">
                  {currentUpload[index].map((url, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#00000033] flex items-center justify-center">
                      <img src={url} alt="preview" className="w-full h-full object-cover" />
                      {uploading[index] && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="loader border-t-4 border-b-4 border-white w-6 h-6 rounded-full animate-spin"></div>
                      </div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Input */}
              {isEditing && (
                <div className="relative w-[457px] h-[164px] rounded-xl border border-dashed border-[#232321] p-4 flex flex-col gap-4 justify-center">
                  <input
                    type="file"
                    className="opacity-0 absolute w-full h-full top-0 left-0"
                    multiple
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                  <p className="text-center text-[#70706E] font-semibold">Drop your images here or click to browse</p>
                </div>
              )}

              {/* Uploaded List */}
              <ul className="flex flex-col gap-6 w-full">
                {watchVariants[index]?.images?.map((url, i) => (
                  <li key={i} className="w-full flex gap-4 p-4 rounded-xl bg-[#FAFAFA] relative">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#00000033] shrink-0">
                      <img src={url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center gap-2 w-full">
                      <p className="text-[#232321] font-semibold">{url.split("/").pop()}</p>
                      <div className="h-1 rounded-xl bg-[#4A69E2] w-full">
                        <div className="bg-[#003F62] h-full rounded-xl" style={{ width: `${uploadProgress[index] || 100}%` }} />
                      </div>
                    </div>
                    {isEditing && (
                      <button type="button" onClick={() => handleRemoveImage(index, i)} className="absolute top-2 right-2 text-red-600">
                        <X size={20} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {isEditing && (
            <Button type="button" onClick={() => append({ color: "", images: [], sizes: [] })} className="bg-[#003F62] h-12 rounded-xl mt-4">
              Add Variant
            </Button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4 mt-6 max-w-[300px]">
          <Button type="submit" className="bg-[#003F62] text-white h-12 w-full">Update</Button>
          <Button type="button" className="border border-[#232321] h-12 w-full" onClick={() => setIsEditing(false)}>Cancel</Button>
         {
          user?.role==='superadmin' &&  <Button type="button" className="h-12 w-full bg-red-600" onClick={handleDelete} >Delete</Button>
         }
        </div>
      )}
    </form>
  );
}
