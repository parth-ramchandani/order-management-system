const db = require('../config/db');
const productRepo = require('../repositories/productRepository');
const orderRepo = require('../repositories/orderRepository');

class OrderService {
    async getAllOrders() {
        return await orderRepo.findAll();
    }

    async createOrder({ product_id, quantity }) {
        const client = await db.getClient();

        try {
            await client.query('BEGIN');

            const p = await productRepo.findByIdForUpdate(product_id, client);
            if (!p) throw new Error('Product not found');
            if (p.stock_quantity < quantity) throw new Error('Insufficient stock');

            const total = p.price * quantity;
            const order = await orderRepo.create({ product_id, quantity, total_price: total }, client);

            await productRepo.updateStock(product_id, p.stock_quantity - quantity, client);
            await client.query('COMMIT');

            return order;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}

module.exports = new OrderService();
