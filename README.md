# User_Profile_Model
This is user profile model made using Node.JS and MongoDB.

# Requirements
* Node.JS http://nodejs.org
* MongoDB(mongoose) https://mongoosejs.com/

# Description
This is a basic User profile model made with `Node.JS`, `Express` and `Mongoose(MongoDB)` which has the following fields.

 * Name of the user
 * Image of the user
 * Contact number of the user (with node built-in validation)
 * ail of the user (with validation)
 * Address of the user

`Routes` used
1. `GET` Route(to fetch data)
```js:
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})
```
2.`POST` Route (to create data)
```js:
// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
```
3.`PATCH` Route (update data)
```js:
// POST method route
app.patch('/', function (req, res) {
  res.send('PATCH request to the homepage')
})
```
4.`DELETE` Route (delete data)
```js:
app.delete('/', function (req,res) {
  res.send('DELETE request to the homepage')
})
```


# Installations
You need to intall some packages for this project, but first you need to initialize npm.
```
npm init
```
after that intstall these dependencies.
```
npm install nodemon body-parser express mongoose ejs dotenv path
```
# Install Multer
For uploading files(images) you can use this package.
```
npm install multer
```
# Server setup
To set up the Server at `localhost:3000`
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

# Mongoose connetion
You need to connect your database(profileDB).
```
mongoose.connect("mongodb://localhost:27017/profileDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
```

# Test
You can run this in terminal using the follwing command and test it using `Postman` https://www.postman.com/
```
node app.js
//OR
nodemon app.js
```


