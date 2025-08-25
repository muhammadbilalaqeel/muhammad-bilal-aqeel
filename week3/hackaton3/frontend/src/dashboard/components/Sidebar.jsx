import { FaBox, FaChartLine, FaUsers } from "react-icons/fa";
import { FiLogOut, FiPackage, FiMenu, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { logout } from "../../redux/authSlice";

export const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: FaChartLine, color: "text-blue-500" },
    { id: "products", label: "Products", icon: FaBox, color: "text-green-500" },
    { id: "users", label: "Users", icon: FaUsers, color: "text-purple-500" },
    userRole === "superAdmin"
      ? { id: "admins", label: "Admins", icon: FaUsers, color: "text-red-500" }
      : null,
    { id: "logout", label: "Logout", icon: FiLogOut, color: "text-red-500" },
  ].filter(Boolean);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
     
     {
      !isOpen &&  <button
        className="absolute top-4 left-4 z-30 mb-6  xl:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu className="w-7 h-7 text-gray-800 dark:text-white" />
      </button> 
     }

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20  z-20 xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-82 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl z-30 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        xl:translate-x-0 xl:static xl:block`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={'/'} className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <FiPackage className="w-5 h-5 text-white" />
            </Link>
            <div className="block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Tea Admin
              </h1>
              <p className="text-sm text-gray-400">{userRole}</p>
              <Link className="text-center mt-1 text-sm underline" to={"/"}>
                Go to Tea Website
              </Link>
            </div>
          </div>

      
          <button
            className="xl:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "logout") {
                    handleLogout();
                  } else {
                    setActiveTab(item.id);
                  }
                  setIsOpen(false); 
                }}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
                    : "hover:bg-gray-800"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${
                    activeTab === item.id ? "text-white" : item.color
                  }`}
                />
                <span
                  className={`font-medium ${
                    activeTab === item.id ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
