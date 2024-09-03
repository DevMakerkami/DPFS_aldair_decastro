const products = [
    { id: '1', name: 'Ensalada César', price: 9.99, image: '/images/ensalada-cesar.jpg' },
    { id: '2', name: 'Salmón al horno', price: 14.99, image: '/images/grilled-salmon.jpg' },
    { id: '3', name: 'Wrap de pollo', price: 7.99, image: '/images/chicken-wrap.jpg' },
    { id: '4', name: 'Bowl de quinoa', price: 10.99, image: '/images/quinoa.jpg' },
    { id: '5', name: 'Tacos al pastor', price: 13.99, image: '/images/tacos-pastor.jpg' },
    { id: '6', name: 'Paella', price: 13.99, image: '/images/paella.jpg' },
    { id: '7', name: 'Lasaña', price: 12.99, image: '/images/lasaña.jpg' },
    { id: '8', name: 'Pad Thai', price: 11.99, image: '/images/pad-thai.jpg' },
    { id: '9', name: 'Flan de la casa', price: 4.99, image: '/images/flan.jpg' },
    { id: '10', name: 'Cheesecake tradicional', price: 4.99, image: '/images/cheesecake.jpg' },
  ];
  
  class Product {
    static getAll() {
      return products;
    }
  
    static getById(id) {
      return products.find(product => product.id === id);
    }
  }
  
  module.exports = Product;