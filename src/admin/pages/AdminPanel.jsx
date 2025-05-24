import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AdminCarForm from '../components/AdminCarForm';
import AdminBrandForm from '../components/AdminBrandForm';

const AdminPanel = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />} />
    <Route path="/cars/add" element={<AdminCarForm />} />
    <Route path="/brands/add" element={<AdminBrandForm />} />
  </Routes>
);

export default AdminPanel;
