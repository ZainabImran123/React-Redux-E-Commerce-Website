import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { addToCart } from '../features/cartSlice';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="bg-darkCard border border-darkBorder rounded-2xl overflow-hidden hover:border-indigo-500/55 transition-all duration-300 flex flex-col group shadow-xl">
            <div className="relative pt-[75%] bg-white p-6 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition duration-300" />
                <span className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg">
                    {product.category}
                </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    <h3 onClick={() => navigate(`/product/${product.id}`)} className="font-semibold text-white text-base line-clamp-1 hover:text-indigo-400 cursor-pointer transition">
                        {product.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-darkBorder">
                    <div>
                        <span className="text-xs text-slate-400 block">Price</span>
                        <span className="text-lg font-bold text-indigo-400">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}