import express, { urlencoded } from "express";
import sessions from 'express-session';
import { MongoClient } from "mongodb";
import assert from 'assert';
import path from "path";
import dotenv from "dotenv";

dotenv.config();

var url = process.env.MONGODB_URL;

const server = express()

server.use(express.json())
server.use(urlencoded({ extended:true }))
server.set("trusty proxy", 1);
server.use(sessions({
    secret:"onlyFullStackstill11202021",
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge: 60000}
}))
server.use(express.static(path.join(path.resolve() + "/client/build/")));

server.get("/", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("server running!")
})

server.get("/smartphonesData", (req, res) => {
    var resultArray = []
    MongoClient.connect(url, function(err, client){
       assert.equal(null, err)
       var db = client.db("smartClick")
       var take = db.collection("smartphones").find()
       take.forEach( function(doc, err){
           assert.equal(null, err)
           resultArray.push(doc)
       }, function(){
           client.close()
           res.send(resultArray)
           console.log("res sent");
       })
    })
})

server.post("/signUpUser", (req, res) => {
    console.log(req.body);
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err)
        var db = client.db("smartClick")
        db.collection("users").findOne({email:req.body.email}, function(err, result){
            assert.equal( null, err)
            if(result){
                res.send("Email is already registered")
            }
            else{
               db.collection("users").insertOne({
                   firstName:req.body.firstName,
                   lastName:req.body.lastName,
                   email:req.body.email,
                   password:req.body.password,
                   orders:[]
               }, function(err,item){
                   assert.equal(null,err)
                   client.close()
               })
               res.send("Registered")
            }
        })
    })
})

server.post("/signIn", (req, res) => {
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err)
        var db = client.db("smartClick")
        db.collection("users").findOne({email:req.body.email},function(err,item){
            assert.equal(null, err)
            if(item){
                req.session.auth = true
                req.session.user = item
                console.log(req.session);
                res.send(item)
            }
            else{
                res.send("User not found")
            }
            client.close()
      })
      
    })
})

server.get("/authenticated", (req, res) => {
    if(req.session.auth){
        MongoClient.connect(url, function(err, client){
            assert.equal(null, err)
            var db = client.db("smartClick")
            db.collection("users").findOne({email:req.session.user.email}, function(err, result){
                assert.equal( null, err)
                if(result){
                    res.send(result)
                }
                else{
                    res.send("not signed")
                }
                client.close()
            })
            
        })
    }
    else{
        res.send(null)
    }
})

server.post("/order", (req,res) => {
    console.log(req.session);
    console.log(req.body);
    var order = {
        phone:req.body.phone,
        card:req.body.card,
        date:req.body.date,
        address:req.body.address,
        userEmail:req.session.user.email
    }
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err)
        var db = client.db("smartClick")
        db.collection("orders").insertOne(order)
        db.collection("users").findOne({email:req.session.user.email}, function(err, result){
            assert.equal(err,null)
            console.log(result);
            var userOrders = result.orders
            console.log(userOrders);
            userOrders.push(order)
            db.collection("users").updateOne({email:req.session.user.email},{$set:{orders:userOrders}},
                function(err, result){
                    assert.equal(err,null)
                    client.close()
                })
        })
        res.send("done")
    })
})

server.get("/signOut", (req,res) => {
    req.session.auth = false;
    req.session.user = {}
    res.send("signed out")
})

server.post("/markReceived", (req,res) => {
    var order = req.body.order
    console.log(order);
    MongoClient.connect(url, function(err, client){
        assert.equal(null, err)
        var db = client.db("smartClick")
        db.collection("orders").deleteOne({date:order.orderDate})
        db.collection("users").findOne({email:req.session.user.email},function(err ,result){
            assert.equal(err, null)
            var userOrders = result.orders
            var newOrders = userOrders.filter(elem => elem.date !== order.date)
            db.collection("users").updateOne({email:req.session.user.email}, 
                {$set: {orders: newOrders}},function (err, result) {
                    client.close()
                    res.send("done!")
                })
        })
   }) 
})

const port = process.env.PORT || 2000
server.listen(port, () => {
    console.log(`server running on port ${port}`);
})