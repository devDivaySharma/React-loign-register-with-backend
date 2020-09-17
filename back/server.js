const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');

const secret = 'secret';
const audience = 'http://myapi/protected';
const issuer = 'http://issuer';

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const jwtMiddleWare = jwt({ secret: secret,algorithms: ['HS256']});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
 
  });

app.post('/login',(req,res) => {
    let data = JSON.parse(fs.readFileSync('./data'));
    if(req.body.email === data['email'] && req.body.password === data['password'])
    {
        const token = jsonwebtoken.sign(req.body.email,secret);
        res.status(200).json(token);
    }
    else
    {
        res.status(400).json('error');
    }
    
})

app.post('/register',(req,res) => {
    const user = {
        "email": req.body.email,
        "name":req.body.name,
        "password":req.body.password
    }
    fs.writeFileSync('./data',JSON.stringify(user));
    res.status(200).json('done');
})


app.get('/list',jwtMiddleWare,(req,res) => {
    res.status(200).json([{
		color: "red",
		value: "#f00"
	},
	{
		color: "green",
		value: "#0f0"
	},
	{
		color: "blue",
		value: "#00f"
	},
	{
		color: "cyan",
		value: "#0ff"
	},
	{
		color: "magenta",
		value: "#f0f"
	},
	{
		color: "yellow",
		value: "#ff0"
	},
	{
		color: "black",
		value: "#000"
	}])
})

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})