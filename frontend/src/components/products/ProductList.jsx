import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../../store/productSlice';
import useApi from '../../hooks/useApi';
import apiClient from '../../api/apiClient';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { PackageOpen } from 'lucide-react';

const ProductList = ({ onSelectProduct }) => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);
    const { call, loading: apiLoading, error: apiError } = useApi();

    const stats = useMemo(() => ({
        total: products.length,
        inStock: products.filter(p => p.stock_quantity > 0).length,
    }), [products]);

    useEffect(() => {
        const fetch = async () => {
            try {
                dispatch(setLoading(true));
                const res = await call(() => apiClient.get('/products'));
                dispatch(setProducts(res.data));
            } catch (err) {
                dispatch(setError(err));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetch();
    }, [call, dispatch]);

    if (loading || apiLoading) return <Loading />;
    if (error || apiError) return <ErrorMessage message={error || apiError} />;

    return (
        <section className="anim-up">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <PackageOpen className="w-8 h-8 text-indigo-600" />
                        Available Products
                    </h2>
                    <p className="text-gray-500 mt-1">Browse our premium selection</p>
                </div>
                
                <div className="flex gap-4">
                    <span className="card flex items-center gap-2 px-4 py-2 text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        {stats.total} Total
                    </span>
                    <span className="card flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {stats.inStock} In Stock
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.length === 0 ? (
                    <div className="card p-12 text-center text-gray-500 col-span-full">No products found.</div>
                ) : (
                    products.map(p => (
                        <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductList;
