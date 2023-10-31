const productManagement = require('./ProductManagement');

describe('Product Management', () => {
  let productManager;
  let products;

  beforeEach(() => {
    productManager = productManagement();
    products = [
      { id: 1, name: 'Product 1', category: 'Electronics', price: 100 },
      { id: 2, name: 'Product 2', category: 'Clothing', price: 50 },
      { id: 3, name: 'Product 3', category: 'Electronics', price: 120 },
    ];
  });

  test('Should add a product to the products list', () => {
    const newProduct = {
      id: 4,
      name: 'Product 4',
      category: 'Accessories',
      price: 30,
    };
    const updatedProducts = productManager.addProduct(products, newProduct);
    expect(updatedProducts).toHaveLength(4);
  });

  test('Should find products by category', () => {
    const foundProducts = productManager.findProductsByCategory(
      products,
      'Electronics'
    );
    expect(foundProducts).toHaveLength(2);
    expect(foundProducts[0].name).toBe('Product 1');
  });

  test('Should sort products by category', () => {
    const sortedProducts = productManager.sortByCategory(products);
    expect(sortedProducts[0].category).toBe('Clothing');
    expect(sortedProducts[1].category).toBe('Electronics');
    expect(sortedProducts[2].category).toBe('Electronics');
  });

  test('Should apply discount to products', () => {
    const discountFunction = (product) => {
      product.price -= 10;
    };
    productManager.applyDiscount(products, discountFunction);
    expect(products[0].price).toBe(90);
    expect(products[1].price).toBe(40);
    expect(products[2].price).toBe(110);
  });
});
