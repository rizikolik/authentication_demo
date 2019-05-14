const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose");
      
      

mongoose.connect("mongodb://localhost/authentication_demo");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs"); 


app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/secret",(req,res)=>{
     res.render("secret")
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Auth Server Has Started!");
});
      