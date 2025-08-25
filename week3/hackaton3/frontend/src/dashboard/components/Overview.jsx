import { FaBox, FaShieldAlt, FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { useGetProductsSummaryQuery } from "../../redux/apiSlice";

export const Overview = ({
  products,
  users,
  getProductsLoading,
  getUsersLoading,
  userRole,
  admins
}) => {
  const adminList = Array.isArray(admins) ? admins : [];
  const { data, isLoading, isError } = useGetProductsSummaryQuery();
  const activeUsers = users.filter((user) => !user.isBlocked).length;
  const blockedUsers = users.filter((user) => user.isBlocked).length;
  const activeAdmins = adminList?.filter((user) => !user.isBlocked).length;
  const blockedAdmins = adminList?.filter((user) => user.isBlocked).length;
  // const lowStockProducts = products.filter(
  //   (product) => product.stock < 20
  // ).length;

  const stats = [
    {
      title: "Total Products",
      value: data?.data?.totalProducts,
      icon: FaBox,
      color: "from-blue-500 to-blue-600",
      change: "+12%",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: FaUsers,
      color: "from-green-500 to-green-600",
      change: "+8%",
    },
    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: FaShieldAlt,
      color: "from-red-500 to-red-600",
      change: "-2%",
    },
    {
      title: "Total Stock",
      value: data?.data?.totalStock,
      icon: FiPackage,
      color: "from-purple-500 to-purple-600",
      change: "+5%",
    },

    // userRole === "superAdmin" ? {title: "Active Admins",
    //   value: activeAdmins,
    //   icon: FaUsers,
    //   color: "from-green-500 to-green-600",
    //   change: "+2%",} : null,
    //  userRole === "superAdmin" ? {title: "Blocked Admins",
    //   value: blockedAdmins,
    //   icon: FaShieldAlt,
    //   color: "from-red-500 to-red-600",
    //   change: "-2%",} : null,
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {getProductsLoading || getUsersLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 mt-2">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
           

          </div>

          {/* {lowStockProducts > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">
                ⚠️ Low Stock Alert
              </h3>
              <p className="text-orange-700">
                {lowStockProducts} product{lowStockProducts > 1 ? "s" : ""}{" "}
                running low on stock (less than 20 units)
              </p>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};
