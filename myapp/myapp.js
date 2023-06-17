import _ from 'lodash';
import express from "express";
import cors from "cors";



const app = express()
app.use(cors());
const port = 3001

const products = [{id: 1, title: "hello", desc: "hi hi hi :)"}, {id: 2, title: "helllooo", desc: "hi helo hi :("}];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', (req, res) => {
    return res.send(products)
})

app.get('/products/:id', (req, res) => {
    const requestedProductId = _.toInteger(req.params.id);
    const product = _.find(products, (product) => product.id === requestedProductId);
    return res.send(product);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})