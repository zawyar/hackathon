const express = require('express');
const app = express();
const products = require('./data/products');

app.listen(5000, console.log('Sever running on port 5000'));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => req.params.id);
    req.json(products);
});

app.post('/signin',(req,res)=>{
    
})