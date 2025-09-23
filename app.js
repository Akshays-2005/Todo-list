const express = require('express');
const bodyParser = require('body-parser');
const port=process.env.PORT || 3000;        

var app=express();
app.set("view engine","ejs");
app.use(express.static("public"));  
app.use(express.urlencoded({extended:true}));

var items=[];

app.get("/",function(req,res){
    res.render("list" , { ejes: items,params:req.query});
});

app.post("/",function(req,res){
    var item=req.body.ele1.trim();
    if(item.length==0) return res.redirect("/?error=empty");
    items.push({task: item,completed: false});
    res.redirect("/");
});

app.post("/delete",function(req,res){
    const index=parseInt(req.body.index);
    if(index!=undefined){
        items.splice(index,1);
    }
    res.redirect("/");
});

app.post("/toggle",function(req,res){
    const index=parseInt(req.body.index);
    if(!isNaN(index) && items[index]){
        items[index].completed=!items[index].completed;
    }
    res.redirect("/");
});

app.post("/edit",function(req,res){
    const index=parseInt(req.body.index);
    const editedTask=req.body.editedTask.trim();
    if(!isNaN(index) && editedTask.length>0){    
        items[index].task=editedTask;
    }
    res.redirect("/");
});

app.listen(port,()=>{
    console.log("Server Started");
    
})