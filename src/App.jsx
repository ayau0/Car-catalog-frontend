import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './user/components/Login';
import Register from './user/components/Register';
import BrandsModelsCars from './user/components/BrandsModelsCars';
import CarForm from './admin/components/AdminCarForm';
import PrivateRoute from './user/components/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import Header from './user/components/Header';
import CarDetailsPage from './user/pages/CarDetailsPage';
import AdminPanel from './admin/pages/AdminPanel';
import AdminCarList from './admin/components/AdminCarList';
import CarEditForm from './admin/components/CarEditForm';
import AdminBrandList from './admin/components/AdminBrandList';
import AboutPage from './user/pages/AboutPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/cars"
            element={
              <PrivateRoute>
                <BrandsModelsCars />
              </PrivateRoute>
            }
          />
<Route path="/admin/cars" element={<AdminCarList />} />
<Route path="/admin/brands" element={<AdminBrandList />} />
<Route path="/admin/cars/edit/:id" element={<CarEditForm />} />
<Route path="/about" element={<AboutPage />} />

          <Route
            path="/cars/:id"
            element={
              <PrivateRoute>
                <CarDetailsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/cars/add"
            element={
              <PrivateRoute>
                <CarForm />
              </PrivateRoute>
            }
          />
<Route
  path="/admin/*"
  element={
    <PrivateRoute>
      <AdminPanel />
    </PrivateRoute>
  }
/>

          <Route path="*" element={<Navigate to="/cars" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
