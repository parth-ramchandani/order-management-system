import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import ProductList from './components/products/ProductList';
import OrderList from './components/orders/OrderList';
import OrderForm from './components/orders/OrderForm';
import { LayoutDashboard, Receipt, Tag, PlusCircle, X } from 'lucide-react';

const AppContent = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('products');
    const { env, appName } = useConfig();

    return (
        <div className="max-w-7xl mx-auto">
            <nav className="glass-card mb-12 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl shadow-xl border-indigo-100">
                <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg transition-transform group-hover:rotate-12 duration-300">
                        <LayoutDashboard className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-800">{appName.split(' ')[0]}<span className="text-indigo-600">{appName.split(' ')[1]}</span></h1>
                        <p className="text-xs uppercase font-bold tracking-widest text-indigo-500 opacity-70">
                            {env} mode
                        </p>
                    </div>
                </div>

                        <div className="flex items-center gap-2 bg-indigo-50/50 p-2 rounded-2xl border border-indigo-100">
                            <button 
                                onClick={() => setActiveTab('products')}
                                className={`btn flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === 'products' ? 'btn-primary shadow-indigo-200' : 'text-gray-500 hover:text-indigo-600 hover:bg-white/50'}`}
                            >
                                <Tag className="w-5 h-5" />
                                Product Catalog
                            </button>
                            <button 
                                onClick={() => setActiveTab('orders')}
                                className={`btn flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${activeTab === 'orders' ? 'btn-primary shadow-indigo-200' : 'text-gray-500 hover:text-indigo-600 hover:bg-white/50'}`}
                            >
                                <Receipt className="w-5 h-5" />
                                Transaction Log
                            </button>
                        </div>
                    </nav>

                    <main>
                        {activeTab === 'products' ? (
                            <ProductList onSelectProduct={(p) => setSelectedProduct(p)} />
                        ) : (
                            <OrderList />
                        )}
                    </main>

                {/* Modal Overlay for Order Form */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md fade-in">
                        <OrderForm 
                          product={selectedProduct} 
                          onClose={() => setSelectedProduct(null)} 
                        />
                    </div>
                )}

                <footer className="mt-20 text-center text-gray-400 py-8 border-t border-gray-100 italic">
                    &copy; 2026 {appName} - Advanced Order Management System Demonstration. 
                </footer>
            </div>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <ConfigProvider>
                <AppContent />
            </ConfigProvider>
        </Provider>
    );
};

export default App;
