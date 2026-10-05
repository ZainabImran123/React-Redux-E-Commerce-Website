import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // <--- 1. Import SweetAlert2

export default function Cart() {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? 10.00 : 0;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        // <--- 2. Replace browser alert with SweetAlert2
        Swal.fire({
            title: 'Order Placed Successfully! 🎉',
            text: 'Thank you for your purchase. Your developer gear is on the way!',
            icon: 'success',
            confirmButtonText: 'Awesome',
            background: '#0f172a', // Dark theme background matching your app
            color: '#f1f5f9',      // Light text color
            confirmButtonColor: '#6366f1' // Indigo accent button
        }).then(() => {
            dispatch(clearCart()); // Clear cart after successful checkout popup
        });
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Your Cart is Empty</h2>
                <p className="text-slate-400 mb-6">Looks like you haven't added any gear to your cart yet.</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-500 transition"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Store
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl bg-slate-800 p-1" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-200 line-clamp-1">{item.title}</h3>
                                <p className="text-indigo-400 font-bold">${item.price.toFixed(2)}</p>
                            </div>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                                <button
                                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-slate-200 font-medium w-6 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="text-red-400 hover:text-red-300 p-2"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={() => dispatch(clearCart())}
                        className="text-red-400 hover:text-red-300 text-sm font-medium pt-2"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl h-fit">
                    <h2 className="text-xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-4">Order Summary</h2>
                    <div className="space-y-3 text-slate-300 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-slate-100 pt-3 border-t border-slate-800">
                            <span>Total</span>
                            <span className="text-indigo-400">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/20"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}