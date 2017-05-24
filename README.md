# version-control
### Requirements
* nodejs: 7.10.0
* npm: 4.2.0

### Run server
* Git clone repo: `git clone git@github.com:oceanpad/nodejs-api-test.git`
* Install npm dependencies: `npm install`
* Start server: `node app.js`

### Api Documentation:

```
Endpoint: /object
Method: POST
Body: JSON: {key1 : value1}
Time: 6:00pm
```

```
Method: GET 
Endpoint: /object/key1
Response: {"key":"key1","value":"value1","timestamp":"1495607415"}
```

```
Method: POST
Endpoint: /object
Body: JSON: {key1 : value2}
Time: 6.05 pm
```

```
Method: GET 
Endpoint: /object/key1
Response: {"key":"key1","value":"value2","timestamp":"1495608891"}

```

```
Method: GET 
Endpoint: /object/key1?timestamp=1495608891 [6.03pm]
Response: {"key":"key1","value":"value1","timestamp":"1495607415"}
```

```
Post multiple data:
Endpoint: /object
Method: POST
Body: JSON: {key1 : value1, key2: value2, ....}
```
