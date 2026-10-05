import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { addToCart } from '../features/cartSlice';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.products.items);

    const product = items.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">Product not found</h2>
                <button onClick={() => navigate('/')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium">Back to Store</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition">
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-darkCard border border-darkBorder rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div className="bg-white p-10 rounded-2xl flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
                </div>

                <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase border border-indigo-500/30">{product.category}</span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{product.title}</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-indigo-400">${product.price.toFixed(2)}</span>
                            {product.rating && (
                                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-semibold border border-amber-500/20">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                                </div>
                            )}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}