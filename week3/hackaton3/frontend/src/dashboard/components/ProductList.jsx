import { useState } from "react";
import {
  FaBox,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/apiSlice"; 
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export const ProductList = ({
  userRole,
  onEdit,
  onDelete,
  onView,
  onAddProduct,
  deleteProductLoading,
  addProductLoading,
  updateProductLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetProductsQuery(currentPage);

  if (
    deleteProductLoading ||
    addProductLoading ||
    updateProductLoading ||
    isLoading
  ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 py-8 px-3 text-center">
        Something went wrong!
      </p>
    );
  }

  const filteredProducts = data.data.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "organic" && product.organic) ||
      (filterBy === "low-stock" && product.stock < 20);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Products</h2>
        <button
          onClick={onAddProduct}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          <FaPlus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <TableRow>
                <TableHeadCell >
                  Product
                </TableHeadCell>
                <TableHeadCell >
                  Category
                </TableHeadCell>
                <TableHeadCell >
                  Stock
                </TableHeadCell>
                <TableHeadCell >
                  Price Range
                </TableHeadCell>
                <TableHeadCell >
                  Status
                </TableHeadCell>
                <TableHeadCell >
                  Actions
                </TableHeadCell>
              </TableRow>
            </TableHead>
          <TableBody  className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors duration-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <div className="w-12 h-12 overflow-hidden rounded-xl">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="text-sm text-gray-900 font-medium">
                      {product.attributes.collections[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.caffeine}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div
                      className={`text-sm font-bold ${
                        product.stock < 20 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {product.stock} units
                    </div>
                    {product.stock < 20 && (
                      <div className="text-xs text-red-500">Low Stock</div>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="text-sm text-gray-900 font-medium">
                      ${Math.min(...product.variants.map((v) => v.price))} - $
                      {Math.max(...product.variants.map((v) => v.price))}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                        product.organic
                          ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.organic ? "🌿 Organic" : "Regular"}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap  text-gray-900 dark:text-white text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onView(product)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-100 rounded-lg transition-all duration-200"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(product)}
                        className="text-green-600 hover:text-green-900 p-2 hover:bg-green-100 rounded-lg transition-all duration-200"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      {
                        userRole === 'superAdmin' && <button
                        onClick={() => onDelete(product)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-100 rounded-lg transition-all duration-200"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                      }
                    </div>
                  </TableCell>
                </TableRow>
            
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center">
          <FaBox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
      {data.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(data.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === data.totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};


// export default React.memo(ProductList)