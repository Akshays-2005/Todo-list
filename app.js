const express=require('express');
const bodyParser=require('body-parser');

var app=express();

app.use(express.static('public'));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

var items=[];
var example="Working";

app.get("/",function(req,res){
    res.render("list",{ejes:items});
})

app.post("/",function(req,res){
    var item=req.body.ele;
    items.push(item);
    res.redirect("/");
})






app.listen(8000,()=>{
    console.log('Server started');
    
})