import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header/page";
import Footer from "./components/layouts/Footer/page";
import Home from "./pages/home";
import PublicRoute from "./components/shared/common/PublicRoute";
import LoginForm from "./components/forms/loginForm";
import SignupForm from "./components/forms/signupForm";
import ProductsPage from "./pages/productsPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SingleProductPage from "./pages/singleProductPage";

import BagPage from "./pages/BagPage";
import ProtectedRoute from "./components/shared/common/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import AdminDashboard from "./dashboard/pages/AdminDashboard";
import RoleBasedRoute from "./components/shared/common/RoleBasedRoutes";
import RoleBasedRoutes from "./components/shared/common/RoleBasedRoutes";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;

function MainLayout() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<SingleProductPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <BagPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RoleBasedRoutes allowedRoles={["admin", "superAdmin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          }
        />
      </Routes>
      {!hideLayout && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
