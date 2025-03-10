import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Home from "./pages/home/Home";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import MenuPage from "./components/menu/menu";
import Header from "./components/header/header";
import AdminHeader from "./components/header/admimHeader";
import Footer from "./components/footer/footer";
import MenuDetails from "./components/menu/menuDetails";

import "react-toastify/dist/ReactToastify.css";
import FoodLogList from "./components/FoodLogList";
import "./App.css";
import QRCodePage from "./components/menu/QRCodePage";
import Realtimechat from "./pages/Realtimechat";
import AdminChat from "./pages/AdminChat"; // Import the AdminChat component
import VoucherList from "./pages/VoucherList";
import MenuList from "./components/admin/MenuList";
import MealList from "./components/admin/MealList";
import MealDetails from "./components/admin/MealDetails";
import MenuAdminDetails from "./components/admin/MenuAdminDetails";
import CreateMenu from "./components/admin/CreateMenu";
import CreateMeal from "./components/admin/CreateMeal";
import TransactionList from "./pages/user/TransactionList";
import TransactionListAdmin from "./components/admin/TransactionList";
import PaymentFailed from "./components/transaction_status/PaymentFailed";
import PaymentSuccess from "./components/transaction_status/PaymentSuccess";
import Profile from "./components/profile/Profile";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    // Check if user exists first
    return <Navigate to="/verify-email" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
// protect routes that require authentication
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user.isVerified || user.isAdmin === false) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    // Check if user exists first
    return <Navigate to="/verify-email" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && !user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? ( // Kiểm tra trạng thái đăng nhập
        <div className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center min-h-screen">
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route
              path="/"
              element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-grow">
                    <Home />
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Profile />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/qr/:transactionId"
            element={
              <ProtectedRoute>
                <QRCodePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-menu"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/food-logs"
            element={
              <ProtectedRoute>
                <FoodLogList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/failed"
            element={
              <ProtectedRoute>
                <PaymentFailed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menus"
            element={
              <ProtectedAdminRoute>
                <MenuList />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <ProtectedAdminRoute>
                <TransactionListAdmin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/meals"
            element={
              <ProtectedAdminRoute>
                <MealList />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/menus/create"
            element={
              <ProtectedAdminRoute>
                <CreateMenu />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/meals/create"
            element={
              <ProtectedAdminRoute>
                <CreateMeal />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/menus/:id"
            element={
              <ProtectedAdminRoute>
                <MenuAdminDetails />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/meals/:id"
            element={
              <ProtectedAdminRoute>
                <MealDetails />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/voucher-shop"
            element={
              <ProtectedRoute>
                <VoucherList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu-details"
            element={
              <ProtectedRoute>
                <MenuDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route
            path="/realtimechat"
            element={
              <ProtectedRoute>
                <Realtimechat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/chat"
            element={
              <ProtectedAdminRoute>
                <AdminChat />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      )}
      <Toaster />
    </div>
  );
}

export default App;
