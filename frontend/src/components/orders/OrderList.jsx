import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setLoading, setError } from '../../store/orderSlice';
import useApi from '../../hooks/useApi';
import apiClient from '../../api/apiClient';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { Receipt, Calendar, Box, DollarSign } from 'lucide-react';

const OrderList = () => {
    const dispatch = useDispatch();
    const { items: orders, loading, error } = useSelector((state) => state.orders);
    const { call, loading: apiLoading, error: apiError } = useApi();

    const fetchOrders = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const res = await call(() => apiClient.get('/orders'));
            dispatch(setOrders(res.data));
        } catch (err) {
            dispatch(setError(err));
        } finally {
            dispatch(setLoading(false));
        }
    }, [call, dispatch]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const format = (d) => new Date(d).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    if (loading || apiLoading) return <Loading />;
    if (error || apiError) return <ErrorMessage message={error || apiError} />;

    return (
        <section className="anim-up">
            <header className="mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Receipt className="w-8 h-8 text-indigo-600" />
                    Order History
                </h2>
                <p className="text-gray-500 mt-1">Review your recent transaction activity</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.length === 0 ? (
                    <div className="card text-center p-12 col-span-full">No orders yet.</div>
                ) : (
                    orders.map(o => (
                        <div key={o.id} className="card p-6 flex flex-col gap-4 border-indigo-50 hover:border-indigo-200 transition-all">
                            <div className="flex justify-between items-center text-xs font-bold text-indigo-500 uppercase tracking-widest">
                                <span>Order #{o.id}</span>
                                <span>{format(o.created_at)}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <Box className="text-gray-300" />
                                <div>
                                    <p className="text-sm font-bold">{o.product_name || `Product: ${o.product_id}`}</p>
                                    <p className="text-xs text-gray-500">Quantity: {o.quantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <span className="text-sm font-semibold text-gray-400">Total Price</span>
                                <span className="text-xl font-black text-emerald-600">${parseFloat(o.total_price).toFixed(2)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default OrderList;
