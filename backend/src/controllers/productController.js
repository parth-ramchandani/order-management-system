const productService = require('../services/productService');
const { z } = require('zod');

// Schema for input validation
const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    price: z.number().positive('Price must be a positive number'),
    stock_quantity: z.number().int().nonnegative('Stock cannot be negative'),
});

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json({
                success: true,
                data: products,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async createProduct(req, res) {
        try {
            const validatedData = productSchema.parse(req.body);
            const product = await productService.createProduct(validatedData);
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.errors,
                });
            }
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new ProductController();
