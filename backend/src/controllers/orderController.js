const orderService = require('../services/orderService');
const { z } = require('zod');

// Schema for input validation
const orderSchema = z.object({
    product_id: z.number().int().positive('Product ID is required'),
    quantity: z.number().int().positive('Quantity must be at least 1'),
});

class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async createOrder(req, res) {
        try {
            const validatedData = orderSchema.parse(req.body);
            const order = await orderService.createOrder(validatedData);
            res.status(201).json({
                success: true,
                message: 'Order created successfully and stock updated',
                data: order,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.errors,
                });
            }
            
            if (error.message === 'Insufficient stock' || error.message === 'Product not found') {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new OrderController();
