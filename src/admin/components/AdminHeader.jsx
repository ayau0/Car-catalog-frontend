import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle } from 'lucide-react';

const AdminDashboard = () => (
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <ShieldCheck className="text-blue-500" />
      Админ панель
    </h2>
    <ul className="space-y-4">
      <li>
        <Link
          to="/admin/cars/add"
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
        >
          <PlusCircle size={20} />
          Машина қосу
        </Link>
      </li>
      <li>
        <Link
          to="/admin/brands/add"
          className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200"
        >
          <PlusCircle size={20} />
          Бренд қосу
        </Link>
      </li>
    </ul>
  </div>
);

export default AdminDashboard;
