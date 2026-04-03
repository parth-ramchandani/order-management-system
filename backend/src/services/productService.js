const productRepository = require('../repositories/productRepository');

class ProductService {
    async getAllProducts() {
        return await productRepository.findAll();
    }

    async createProduct(data) {
        return await productRepository.create(data);
    }
}

module.exports = new ProductService();
