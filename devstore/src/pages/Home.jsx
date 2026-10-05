import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingBag, AlertCircle } from 'lucide-react';
import { fetchProducts, setCategory, setSearchQuery } from '../features/productsSlice';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const dispatch = useDispatch();
    const { items, status, selectedCategory, searchQuery } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const categories = ['all', ...new Set(items.map(item => item.category))];

    const filteredProducts = items.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="relative bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-darkCard border border-indigo-500/20 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
                <div className="relative z-10 max-w-2xl space-y-4">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/30">React Redux E-Commerce SPA</span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Discover Next-Gen Developer Gear & Style</h1>
                    <p className="text-slate-300 text-sm sm:text-base">Explore live products fetched from the Fake Store API, powered by Redux Toolkit state management and styled with Tailwind CSS.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => dispatch(setCategory(cat))}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition border ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-darkCard border-darkBorder text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        className="w-full pl-10 pr-4 py-2 bg-darkCard border border-darkBorder rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                </div>
            </div>

            {status === 'loading' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-darkCard border border-darkBorder rounded-2xl h-96 animate-pulse p-6"></div>
                    ))}
                </div>
            )}

            {status === 'failed' && (
                <div className="text-center py-20 bg-darkCard border border-red-500/20 rounded-3xl space-y-4">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Failed to load products</h3>
                </div>
            )}

            {status === 'succeeded' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}