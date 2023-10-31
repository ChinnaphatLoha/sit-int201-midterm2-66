const productManagement = () => {
  /**
   * @param {{id: Number, name: String, category: String, price: Number}[]} products
   * @param {{id: Number, name: String, category: String, price: Number}} product
   * @returns {{id: Number, name: String, category: String, price: Number}[]}
   */
  const addProduct = (products, product) => {
    products.push(product);
    return products;
  };

  /**
   * @param {{id: Number, name: String, category: String, price: Number}[]} products
   * @param {String} category
   * @returns {{id: Number, name: String, category: String, price: Number}[]}
   */
  const findProductByCategory = (products, category) => {
    return products.filter((product) => product.category === category);
  };

  /**
   * @param {{id: Number, name: String, category: String, price: Number}} products
   * @returns {number}
   */
  const sortedByCategory = (products) => {
    return products.sort((a, b) => {
      const aCate = a.category.toLowerCase(),
        bCate = b.category.toLowerCase();
      if (aCate < bCate) return -1;
      if (aCate > bCate) return 1;
      return 0;
    });
  };

  /**
   * @param {{id: Number, name: String, category: String, price: Number}} products
   * @param {Function} discountFunction
   * @callback discountFunction
   */
  const applyDiscount = (products, discountFunction) => {
    products.forEach((product) => {
      discountFunction(product);
    });
  };

  return {
    addProduct,
    findProductByCategory,
    sortedByCategory,
    applyDiscount,
  };
};

module.exports = productManagement;
