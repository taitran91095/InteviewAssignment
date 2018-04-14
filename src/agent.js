import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent,global.Promise);

const API_ROOT = 'http://localhost:3000';

const responseBody = res => res.body;

const request = {
    del: url =>
      superagent.del(`${API_ROOT}${url}`).then(responseBody),
    get: url =>
      superagent.get(`${API_ROOT}${url}`).then(responseBody),
    put: (url, body) =>
      superagent.put(`${API_ROOT}${url}`, body).then(responseBody),
    post: (url, body) =>
      superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const Product = {
    list:() => request.get('/product'),
    add:(product) => request.post('/product',product),
    update:(product) => request.put('/product/'+product.id,product)
}

const Cart = {
  list:() => request.get('/cart'),
  get:(id) => request.get('/cart/'+id),
  add:(cart) => request.post('/cart',cart),
  update:(cart) => request.put('/cart/'+cart.id,cart)
}

export default {
    Cart,
    Product
};