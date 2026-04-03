import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../store/orderSlice';
import { setProducts } from '../../store/productSlice';
import useApi from '../../hooks/useApi';
import apiClient from '../../api/apiClient';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { ShoppingBag, X, PlusCircle, MinusCircle, CheckCircle2 } from 'lucide-react';

const OrderForm = ({ product, onClose }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);
    const { call, loading, error, setError } = useApi();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await call(() => apiClient.post('/orders', {
                product_id: product.id,
                quantity,
            }));

            if (res.success) {
                dispatch(addOrder(res.data));
                const products = await apiClient.get('/products');
                dispatch(setProducts(products.data.data));

                setSuccess(true);
                setTimeout(() => onClose(), 1500);
            }
        } catch (err) { }
    };

    if (success) {
        return (
            <div className="card text-center p-12 bg-emerald-50 border-emerald-200 anim-up">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-800 tracking-tight">Order Placed!</h3>
            </div>
        );
    }

    return (
        <div className="card relative p-8 max-w-md w-full mx-auto anim-up shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full">
                <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
                <ShoppingBag />
                Place Order
            </h2>

            <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">{product.name}</span>
                    <span className="font-bold text-indigo-600 text-xl">${product.price}</span>
                </div>
            </div>

            <ErrorMessage message={error} onClear={() => setError(null)} />

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between items-center text-lg font-bold p-4 bg-indigo-50/50 rounded-xl">
                    <div className="flex items-center gap-3 bg-white rounded-lg p-1 px-2 border border-border">
                        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1"><MinusCircle/></button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button type="button" onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))} className="p-1"><PlusCircle/></button>
                    </div>
                    <span className="text-indigo-700 text-2xl">${(product.price * quantity).toFixed(2)}</span>
                </div>

                <button type="submit" disabled={loading} className="btn-main btn w-full py-4 text-lg">
                    {loading ? <Loading fullScreen={false} /> : 'Complete Purchase'}
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
