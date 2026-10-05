import React from 'react';
import { Folder, FileCode } from 'lucide-react';

export default function FolderStructure() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Project Folder Architecture</h1>
                <p className="text-slate-400 text-sm">Clean component & feature modular structure.</p>
            </div>
            <div className="bg-darkCard border border-darkBorder rounded-3xl p-6 sm:p-8 shadow-2xl font-mono text-sm space-y-3">
                <div className="flex items-center gap-2 text-amber-400"><Folder className="w-4 h-4" /> <span>src/app/store.js</span></div>
                <div className="flex items-center gap-2 text-amber-400"><Folder className="w-4 h-4" /> <span>src/features/productsSlice.js & cartSlice.js</span></div>
                <div className="flex items-center gap-2 text-indigo-400"><FileCode className="w-4 h-4" /> <span>src/components/Navbar.jsx, CartDrawer.jsx, ProductCard.jsx</span></div>
                <div className="flex items-center gap-2 text-indigo-400"><FileCode className="w-4 h-4" /> <span>src/pages/Home.jsx, ProductDetails.jsx, CartPage.jsx</span></div>
            </div>
        </div>
    );
}