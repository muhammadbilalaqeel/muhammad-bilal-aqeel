"use client";

import { useState, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Edit, Trash } from "lucide-react";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "@/redux/api/categoryApi";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(20, "Category name cannot exceed 20 characters"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type Category = {
  _id: string;
  name: string;
};

export default function AllCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const { data: categories = [] } = useGetCategoriesQuery();
    const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

const onSubmit = async (data: CategoryFormValues) => {
  try {
    if (editCategory) {
      // Update category
      await updateCategory({ id: editCategory._id, name: data.name }).unwrap();
    } else {
      // Create category
      await createCategory({ name: data.name }).unwrap();
    }

    reset();
    setIsModalOpen(false);
    setEditCategory(null);
  } catch (err) {
    console.error("API Error:", err);
  }
};


 const handleEdit = (category: Category) => {
  setEditCategory(category);
  reset({ name: category.name });
  setIsModalOpen(true);
};



const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this category?")) return;
  try {
    await deleteCategory(id).unwrap();
  } catch (err) {
    console.error("Failed to delete:", err);
  }
};

  return (
    <div className="p-4">
      {/* Header & Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#232321] text-2xl font-semibold">All Categories</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="font-semibold text-black">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-black" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-black">All Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button
  onClick={() => {
    setEditCategory(null); // clear edit state
    reset({ name: "" });   // clear the form
    setIsModalOpen(true);  // open modal
  }}
  className="w-[212px] h-[48px] px-4 py-2 inline-flex gap-2 bg-[#232321] text-sm leading-[100%] tracking-[0.25px] uppercase font-medium"
>
  ADD NEW Category
</Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200 mb-6">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Category Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button onClick={() => handleEdit(cat)} className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded">
                      <Edit size={16} />
                    </Button>
                    {/* <Button onClick={() => handleDelete(cat._id)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded">
                      <Trash size={16} />
                    </Button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/20" onClick={() => setIsModalOpen(false)}></div>

          {/* Modal box */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative z-10 animate-in fade-in-80">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              {editCategory ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  id="category"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-all">
                {editCategory ? "Update" : "Add"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
