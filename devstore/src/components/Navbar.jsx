import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { toggleCartDrawer } from '../features/cartSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-40 bg-darkCard/80 backdrop-blur-md border-b border-darkBorder">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white group-hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/30">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Dev<span className="text-indigo-400">Store</span></span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className={`text-sm font-medium transition hover:text-indigo-400 ${location.pathname === '/' ? 'text-indigo-400' : 'text-slate-300'}`}>Products</Link>
                    <Link to="/cart" className={`text-sm font-medium transition hover:text-indigo-400 ${location.pathname === '/cart' ? 'text-indigo-400' : 'text-slate-300'}`}>Cart</Link>
                </nav>

                <button
                    onClick={() => dispatch(toggleCartDrawer())}
                    className="relative p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition border border-darkBorder flex items-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                    {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}