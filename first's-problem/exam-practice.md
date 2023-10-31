# Practical Exam: Product Management System in JavaScript
### Instructions
For this exam, you will be creating a simple Product Management system using JavaScript. You will be implementing various functions to manipulate and manage a list of products. Each product is represented as an object with the following schema:

javascript
{
  id: Number,
  name: String,
  category: String,
  price: Number
}

### Tasks
1. Implement addProduct
Implement a function called addProduct that takes in an array of products and a product object. It should add the product to the array and return the new array. Use Array Methods.

### Example:

javascript
const products = [
  {id: 1, name: "Laptop", category: "Electronics", price: 1000},
  {id: 2, name: "Phone", category: "Electronics", price: 500}
];

addProduct(products, {id: 3, name: "Table", category: "Furniture", price: 150});

---

2. Implement findProductsByCategory
Implement a function called findProductsByCategory that takes in an array of products and a category string. It should return a new array containing only products of the specified category. Use Array Methods.

### Example:

javascript
findProductsByCategory(products, "Electronics");

---

3. Implement sortByCategory
Implement a function called sortByCategory that takes in an array of products. This function should sort the array in-place by the category field. Use Array.sort().

### Example:

javascript
sortByCategory(products);

---

4. Implement applyDiscount
Implement a function called applyDiscount. This function should take in an array of products and a callback function. The callback function will take a product object and modify its price. applyDiscount should apply this callback to each product in the array. Use Higher-Order Functions.

### Example:

javascript
Copy code
const discountFunction = (product) => {
  if (product.category === 'Electronics') {
    product.price = product.price * 0.9;
  }
};

applyDiscount(products, discountFunction);