import { useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllAdminsQuery,
  useGetProductsQuery,
  useGetUsersQuery,
  useUpdateProductMutation,
} from "../../redux/apiSlice";
import { Overview } from "./../components/Overview";
import { ProductList } from "./../components/ProductList";
import { UserList } from "./../components/UserList";
import { Sidebar } from "./../components/Sidebar";
import { ProductModal } from "./../components/ProductModal";
import { ProductForm } from "../components/ProductForm";
import { toast } from "react-toastify";
import AdminList from "../components/AdminList";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [addProduct, { error: addError, isLoading, isError }] =
    useAddProductMutation();
  const [updateProduct,{error:updateError,isLoading:updateProductLoading}] = useUpdateProductMutation()
  const { data: prod,isLoading:getProductsLoading } = useGetProductsQuery();
  const { data: user,isLoading:getUsersLoading } = useGetUsersQuery();
  const {data:admins,isLoading:getAdminsLoading} = useGetAllAdminsQuery();
  const products = prod?.data?.[0].data || [];
  const users = user?.data || [];
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const [deleteProduct, { error,isLoading:deleteProductLoading }] = useDeleteProductMutation();
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        const result = await deleteProduct(product._id).unwrap();
        toast.success(result?.message || "Deleted Succesfully");
      } catch (err) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    setShowProductForm(true);
  };


 

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview products={products} users={users} admins={admins} userRole={userRole} getProductsLoading={getProductsLoading} getUsersLoading={getUsersLoading}/>;
      case "products":
        return (
          <ProductList
           userRole = {userRole}
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
            onAddProduct={handleAddProduct}
            deleteProductLoading = {deleteProductLoading}
            updateProductLoading = {updateProductLoading}
            addProductLoading = {isLoading}
            getProductsLoading={getProductsLoading}
          />
        );
      case "users":
        return <UserList users={users} getUsersLoading={getUsersLoading}  />;

      case "admins" :
        return <AdminList users={admins?.data} getAdminsLoading={getAdminsLoading} />;
      default:
        return <Overview products={products} users={users} admins={admins} userRole={userRole} getProductsLoading={getProductsLoading} getUsersLoading={getUsersLoading} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 min-w-[320px]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
      />

      <main className="w-full p-8 md:px-8 sm:px-6 px-2 md:mt-0 mt-4 ">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {showProductForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setShowProductForm(false);
            setSelectedProduct(null);
          }}
          onSubmit={async (productData) => {
            try {
              console.log(productData)
              if (!productData.name || !productData.name.trim()) {
    alert("Product name is required");
    return;
  }
              if (selectedProduct) {
               const result =  await updateProduct({
                  id: selectedProduct._id,
                  ...productData,
                }).unwrap();

                toast.success(result?.message || "Product Updated");
              } else {
               
                const result = await addProduct(productData).unwrap();

                toast.success(result?.message || "Product Added");
              }
              setShowProductForm(false);
              setSelectedProduct(null);
            } catch (err) {
              if(addError?.data?.message){
                toast.error(addError?.data?.message || "Something went wrong");
              }
              if(updateError?.data?.message){
                toast.error(updateError?.data?.message || "Something went wrong")
              }
              console.error("Error submitting product:", err);
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
