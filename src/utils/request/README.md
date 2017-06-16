
# Promise compatible library based on `window.fetch`

### Usage

```js
// return a promise
const xhr = request(url, options, method);

xhr.then((response) => {
  // resoved response data...
}).catch(error => {
  console.log(error, error.stack);
});
```

### Configuration

```js
request.defaults.baseURL = 'https://api.example.com/';
```

### Suger

- `.get()`
- `.head()`
- `.options()`
- `.post()`
- `.put()`
- `.delete()` or `.del()`

```js
// simple `get` request
request.get(url);

// fetch resource by query paramaters
request.get(url, { params });

// post some data with `application/json` format
request.post(url, { json });

// post some data with `application/x-www-form-urlencoded` format
request.post(url, { form });

// post some data like `FormData`
request.post(url, { body: new FormData() });

// custom settings apply to the request
request.post(url, {
  headers: { ... },
  body: { ... }
  mode,
  credentials,
  ...
});
```
