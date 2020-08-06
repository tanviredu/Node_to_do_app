const express  = require("express");
const mongoose = require("mongoose");
const config   = require("./config");
const TodoTask = require("./models/db");
const nunjucks  = require("nunjucks")
const app      = express();
const PORT     = 8000;

// setting the public filder for the css
app.use("/static",express.static("public"));
// setting up the ejs as a template language

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.urlencoded({extended:true}))



// this render the page
app.get("/",(req,res)=>{
    TodoTask.find({},(err,tasks)=>{
        if(err){
            console.log(err);
        }
        res.render("todo.html",{tasks:tasks});
    })
    
});

app.post("/", async (req,res)=>{
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try{
        await todoTask.save();
        res.redirect("/");
    }catch(err){
        console.log(err);
        res.redirect("/")
    }
})



// this is for edit
// edit contains a get and  a post
app.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    TodoTask.find({},(err,tasks)=>{
        res.render('todoedit.html',{tasks:tasks,id:id})
    })
})

app.post("/edit/:id",(req,res)=>{
    const id = req.param.id;
    TodoTask.findOneAndUpdate(id,{content:req.body.content},(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
})



// this is used for deleting
// remember this is a web app
// you can use get and post to doo all
app.get("/remove/:id",(req,res)=>{
    const id = req.params.id
    TodoTask.findByIdAndRemove(id,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})


const url     = config.mongourl;
const connect = mongoose.connect(url);
connect.then(()=>{
    console.log("[+] Connected with the Database");
    app.listen(PORT);
    console.log("[+] Server Started");

}) 