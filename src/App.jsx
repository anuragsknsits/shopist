// src/App.js
import React from "react";
import AppRoutes from "./app/AppRoutes";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiErrorMessage, shopApi, useLogoutMutation } from "./api/shopApi";
import { selectIsAuthenticated } from "./components/selectors/authSelectors";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logout, { isLoading: loggingOut, error: logoutError }] = useLogoutMutation();

  const handleLogout = async () => {
    if (loggingOut) return;
    const result = await logout();
    if ('data' in result) {
      dispatch(shopApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="app-shell"><a href="#main-content" className="skip-link">Skip to content</a>
      {/* Sidebar - Visible only for authenticated users */}
      {isAuthenticated && <Sidebar />}

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} loggingOut={loggingOut} />
        {logoutError && <p role="alert">{apiErrorMessage(logoutError, "Logout failed. Try again.")}</p>}

        <main id="main-content" tabIndex={-1} className="page-content"><AppRoutes /></main>
      </div>
    </div>
  );
}

export default App;
