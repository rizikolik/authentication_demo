const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      User                  = require("./models/user"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");
       
 mongoose.connect("mongodb://localhost/authentication_demo");    
const app= express();
app.use(require("express-session")({
    secret:"zeynobego",
    resave:false,
    saveUnitialized:false
}))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 /*=================
       ROUTES
 ===================*/
app.get("/",(req,res)=>{   
    res.render("home");
});

app.get("/secret",isLoggedIn,(req,res)=>{
    
     res.render("secret")
});

//auth routes

//show sign up form
app.get("/register",(req,res)=>{
    res.render("register");
});

//sign up process

app.post("/register",(req,res)=>{
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render("register")
        }passport.authenticate("local")(req,res,()=>{
            res.redirect("/secret")
        })
    })
});

// log in routes
app.get("/login",(req,res)=>{
    res.render("login")
});
app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),(req,res)=>{
    
    
});
/// log out route
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/")
});


/*================
Middleware
================*/
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
   res.redirect("/login") 
}

     /*===========
      SERVER LİSTEN
      ===========*/

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Auth Server Has Started!");
});
      