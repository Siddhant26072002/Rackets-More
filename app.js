require('dotenv').config() ;

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var ejs = require('ejs');
const path = require('path');
const bodyParser=require('body-parser');
const Schema = mongoose.Schema;
const User = require("./models/user")
const Cart = require("./models/cart")




const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));






app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/trial")

app.use(express.json())
app.get('/',(req, res) => {
    res.render('login')
})
app.get('/in', (req,res)=>{
    res.render('index')
})
app.get('/reg', (req,res)=>{
    res.render('register')
})
app.get('/guide', (req,res)=>{
    res.render('guide')
})
app.get('/access', (req,res)=>{
    res.render('accessories')
})
app.get('/rackets', (req,res)=>{
    res.render('rackets')
})
app.get('/mp29', (req,res)=>{
    res.render('MP29')
})
app.get('/arcs11', (req,res)=>{
    res.render('ARCSAB11') 
})
app.get('/y88d', (req,res)=>{
    res.render('y88d') 
})
app.get('/yaero', (req,res)=>{
    res.render('yaero') 
})
app.get('/ybgtstring', (req,res)=>{
    res.render('ybgtstring') 
})
app.get('/oscishuttle', (req,res)=>{
    res.render('oscishuttle') 
})
app.get('/VoltZF2', (req,res)=>{
    res.render('VoltZF2') 
})
app.get('/perfly990', (req,res)=>{
    res.render('perfly') 
})
app.get('/ypshoes', (req,res)=>{
    res.render('ypshoes') 
})
app.get('/gfeather', (req,res)=>{
    res.render('gfeather') 
})
app.get('/yxbolt63', (req,res)=>{
    res.render('yxbolt63') 
})
app.get('/sn80', (req,res)=>{
    res.render('sn80') 
})



// Importing routes
const ProductRouter = require('./routes/products');
const AuthRouter = require('./routes/auth');
const CartRouter = require('./routes/carts');
const OrderRouter = require('./routes/orders');




// Using routes
app.use('/products',ProductRouter);
app.use('/auth',AuthRouter)

let em=""

app.post("/login",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const checkuser = await User.findOne({email}).lean()
    em= checkuser.email
    if(password==checkuser.password){
        res.redirect("/in")
    }
    else{
    console.log("invalid username/password")
    }
})

app.post("/add",async(req,res)=>{
    var cart = new Cart({
        email : em,
        slug : req.body.proname,
        price : req.body.price,
        
    })
    console.log(cart)
    cart.save((er)=>{
        if(er){
            console.log(er)
        }
        else{
            res.redirect("back")
        }
    })
})

app.post("/register",async(req,res)=>{
    var user = new User ({
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        email:req.body.email
    })
    em = req.body.email
    console.log(user)
    user.save((er)=>{
        if(er){
            console.log(er)
        }
        else{
            res.redirect("/in")
        }
    })
   

})


app.listen(80,()=>{
    console.log("started");
})