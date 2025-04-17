
const express = require('express');
const router = express.Router();

const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 }
];

router.get('/products', (req, res) => {
    res.json(products);
});

module.exports = router;
