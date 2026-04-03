import React from 'react';
import { Package, Tag, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onSelect }) => {
    const isOut = product.stock_quantity <= 0;

    return (
        <div className={`card fade-in h-64 flex flex-col justify-between transition-all hover:scale-105 ${isOut ? 'opacity-70 grayscale' : 'border-indigo-100 hover:border-indigo-300'}`}>
            <div className="flex justify-between items-start">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Package className="w-6 h-6" />
                </div>
                <span className={`badge ${isOut ? 'badge-out' : 'badge-in'}`}>
                    {isOut ? 'Out of Stock' : `${product.stock_quantity} left`}
                </span>
            </div>

            <div>
                <h3 className="text-xl font-bold line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-indigo-600 font-bold text-lg">
                    <Tag className="w-4 h-4" />
                    ${parseFloat(product.price).toFixed(2)}
                </div>
            </div>

            <button 
                onClick={() => onSelect(product)}
                disabled={isOut}
                className={`btn w-full ${isOut ? 'bg-gray-200 text-gray-500' : 'btn-main shadow-lg'}`}
            >
                <ShoppingCart className="w-4 h-4" />
                {isOut ? 'Out of Stock' : 'Order Now'}
            </button>
        </div>
    );
};

export default ProductCard;
