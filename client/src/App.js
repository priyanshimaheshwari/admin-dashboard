import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-900 to-purple-700 p-4 text-white shadow-md">
          <div className="container mx-auto flex justify-between">
            <Link
              to="/users"
              className="font-bold text-white hover:text-cyan-200 transition-colors"
            >
              User Management
            </Link>
            <Link
              to="/roles"
              className="font-bold text-white hover:text-cyan-200 transition-colors"
            >
              Role Management
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto p-6 bg-blue-50 rounded-lg shadow-sm">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

