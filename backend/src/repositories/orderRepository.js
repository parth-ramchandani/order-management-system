const db = require('../config/db');

class OrderRepository {
    async create(order, client = db) {
        const { product_id, quantity, total_price } = order;
        const query = 'INSERT INTO orders (product_id, quantity, total_price) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await client.query(query, [product_id, quantity, total_price]);
        return rows[0];
    }

    async findAll() {
        const query = `
            SELECT o.*, p.name as product_name
            FROM orders o
            JOIN products p ON o.product_id = p.id
            ORDER BY o.created_at DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    }
}

module.exports = new OrderRepository();
