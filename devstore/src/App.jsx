import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'; // <--- Changed from CartPage to Cart
import FolderStructure from './pages/FolderStructure';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* <--- Changed to <Cart /> */}
        <Route path="/structure" element={<FolderStructure />} />
      </Routes>
    </div>
  );
}