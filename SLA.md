# SLA

## API
**Product API**
```
GET    /product
GET    /product/{id}
POST   /product
PUT    /product/{id}
PATCH  /product/{id}
DELETE /product/{id}
```
**Cart API**
```
GET    /cart
GET    /cart/{id}
POST   /cart
PUT    /cart/{id}
PATCH  /cart/{id}
DELETE /cart/{id}
```
**Routing in Webapp**

Defined in App.js

    <Switch>
	<Route  exact  path="/"  component={Home}/>
	<Route  path="/adminView"  component={AdminView}  />
	<Route  path="/cartView"  component={CartView}  />
	</Switch>

**Http request**

Defined in agent.js
const request is defined for easier implement other http request

    const  request  = {
    del:  url  =>
    superagent.del(`${API_ROOT}${url}`).then(responseBody),
    get:  url  =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
    put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).then(responseBody),
    post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
    };

Example to implement http request:

    const  Product  = {
    list:() =>  request.get('/product'),
    add:(product) =>  request.post('/product',product),
    update:(product) =>  request.put('/product/'+product.id,product)
    }

**Redux Action**

Redux action is defined in /action/action.js

Example action defined :

    export  const  APP_LOAD  =  'APP_LOAD';

**Reducer**
Child reducer is located in reducer folder.
All child reducer is declared and defined in reducer.js.

**Component**
Main component is located at component folder.
Child and more complicated component is located in folder name by it father component.

**Middleware**
This application use middleware.js to support dispatch async action and save information to localStorage.

**CSS**
CSS is defined index.html
Custom css is defined in index.css