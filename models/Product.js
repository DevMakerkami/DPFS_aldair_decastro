const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

class Product {
  static getAll() {
    try {
      const productsData = fs.readFileSync(productsFilePath, 'utf-8');
      return JSON.parse(productsData);
    } catch (error) {
      console.error('Error reading products file:', error);
      return [];
    }
  }

  static getById(id) {
    const products = this.getAll();
    return products.find(product => product.id === id);
  }

  static create(productData) {
    const products = this.getAll();
    const newProduct = {
      id: Date.now().toString(),
      ...productData
    };
    products.push(newProduct);
    this.saveAll(products);
    return newProduct;
  }

  static update(id, productData) {
    const products = this.getAll();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      this.saveAll(products);
      return products[index];
    }
    return null;
  }

  static delete(id) {
    const products = this.getAll();
    const filteredProducts = products.filter(product => product.id !== id);
    if (filteredProducts.length < products.length) {
      this.saveAll(filteredProducts);
      return true;
    }
    return false;
  }

  static saveAll(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  }
}

module.exports = Product;