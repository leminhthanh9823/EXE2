import { Navigate, Route, Routes } from "react-router-dom";
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
import AdminMeals from "./components/admin/menu";
import MenuPage from "./components/menu/menu";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import MenuDetails from "./components/menu/menuDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodLogList from "./components/FoodLogList";
import { useState } from "react";
import "./App.css";
import QRCodePage from "./components/menu/QRCodePage";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(isAuthenticated, user);

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
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/admin/meals"
            element={
              <ProtectedRoute>
                <AdminMeals />
              </ProtectedRoute>
            }
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
              <RedirectAuthenticatedUser>
                <FoodLogList />
              </RedirectAuthenticatedUser>
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
        </Routes>
      )}
      <Toaster />
    </div>
  );
}

export default App;
