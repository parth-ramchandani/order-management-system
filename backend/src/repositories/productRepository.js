const db = require('../config/db');

class ProductRepository {
    async findAll() {
        const { rows } = await db.query('SELECT * FROM products ORDER BY id DESC');
        return rows;
    }

    async findById(id) {
        const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return rows[0];
    }

    async create(data) {
        const { name, price, stock_quantity } = data;
        const { rows } = await db.query(
            'INSERT INTO products (name, price, stock_quantity) VALUES ($1, $2, $3) RETURNING *',
            [name, price, stock_quantity]
        );
        return rows[0];
    }

    async findByIdForUpdate(id, client) {
        const { rows } = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [id]);
        return rows[0];
    }

    async updateStock(id, newStock, client) {
        await client.query('UPDATE products SET stock_quantity = $1 WHERE id = $2', [newStock, id]);
    }
}

module.exports = new ProductRepository();
