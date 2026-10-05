import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { toggleCartDrawer, removeFromCart, updateQuantity } from '../features/cartSlice';

export default function CartDrawer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, isOpen } = useSelector((state) => state.cart);

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => dispatch(toggleCartDrawer())}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-darkCard border-l border-darkBorder flex flex-col shadow-2xl">
                    <div className="p-6 border-b border-darkBorder flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-lg font-bold text-white">Your Cart ({items.length})</h2>
                        </div>
                        <button onClick={() => dispatch(toggleCartDrawer())} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {items.length === 0 ? (
                            <div className="text-center py-16 space-y-4">
                                <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto" />
                                <p className="text-slate-400">Your cart is currently empty.</p>
                                <button
                                    onClick={() => { dispatch(toggleCartDrawer()); navigate('/'); }}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="flex gap-4 p-4 bg-slate-800/50 border border-darkBorder rounded-2xl items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white p-2 rounded-xl" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-white truncate">{item.title}</h4>
                                        <p className="text-sm font-bold text-indigo-400 mt-1">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="w-6 h-6 bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center justify-center text-xs">-</button>
                                            <span className="text-xs font-semibold px-2">{item.quantity}</span>
                                            <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="w-6 h-6 bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center justify-center text-xs">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-slate-500 hover:text-red-400 p-2 transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="p-6 border-t border-darkBorder bg-slate-900/50 space-y-4">
                            <div className="flex justify-between text-base font-semibold text-white">
                                <span>Subtotal</span>
                                <span className="text-indigo-400">${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => { dispatch(toggleCartDrawer()); navigate('/cart'); }}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition shadow-lg shadow-indigo-600/30 text-center"
                            >
                                View Full Cart & Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}