import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import ErrorBoundary from '../components/ui/ErrorBoundary';
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Client = lazy(() => import("../pages/Client"));
const ChangePassword = lazy(() => import("../features/auth/ChangePassword"));
const AboutUs = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const SignUp = lazy(() => import("../features/auth/SignUp"));
const Login = lazy(() => import("../features/auth/Login"));
const ForgetPassword = lazy(() => import("../features/auth/ForgetPassword"));
export default function AppRoutes() {
return <ErrorBoundary><Suspense fallback={<p role="status">Loading page…</p>}><Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* Protected Routes (Only for Authenticated Users) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* Client Routes (Only for Clients) */}
          <Route element={<ProtectedRoute allowedRoles={["CLIENT"]} />}>
            <Route path="/clients" element={<Client />} />
          </Route>
        <Route path="*" element={<section><h1 className="text-2xl">Page not found</h1><a href="/">Return home</a></section>} /></Routes></Suspense></ErrorBoundary>;
}
