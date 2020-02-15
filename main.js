const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const {check,validationResult} = require('express-validator/check');


//Requiring passport file
require('./config/passport');

// const Test = require('./models/testingschema');

const Comment = require('./models/comments');
// const User = require('./models/User');

//MiddleWares

app.use(cors({origin: true, credentials: true}));



app.use(BodyParser.urlencoded({ extended: false }));

app.use(session({ //First this has to be called then passport.session has to be called...
    secret:'chenna',
    resave:true,
    saveUninitialized:true,
    
}));

//Middle Wares

app.use(passport.initialize());
app.use(passport.session());

app.use( BodyParser.json() ); //very important

var jsonParser = BodyParser.json();



//Connection with monodb
const uri = "mongodb+srv://chennakt9:1234@cluster0-ybkuk.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser:true});
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("connection established with mongoose");
});

function ensureAuthenticated(req,res,next){
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }

   
    // console.log("Error");
    res.redirect('/users/login');

}

//Routes Implementing
app.get('/comments',ensureAuthenticated,function(req,res){
    Comment.find(function(err,comments){
        if(err){
            console.log(err);
        }else{
            
                res.json(comments);
               
            
            
        }
    });
});



app.get('/comments/:id',ensureAuthenticated,function(req,res){
    let id = req.params.id;
    Comment.find({"parent_comment_id":id},function(err,comment){
        if(err){
            console.log(err);
        }else{
            res.json(comment);
        }
    });
});

app.post('/comments/add',jsonParser,function(req,res){
    console.log(req.body);
    let comment = new Comment(req.body);
    comment.save().then(comment => {
        res.json({'comment':'comment added Succesfully'});
    })
    .catch(err =>{
        res.send(err);
    });
});



// ####################################### USER ROUTES ##########################
//Register Get Route
app.get('/users/register',(req,res) => {
    res.json({ error : "Error registering" })
    // res.render('register',{ messages : req.flash('error') });
});


//Register Post route with validation
app.post('/users/register',[
        check('name').not().isEmpty().withMessage('Name cannot be empty'),
        check('email').not().isEmpty().withMessage('Email Field cannot be empty'),
        check('email').isEmail().withMessage('Email is Invalid'),
        check('password').not().isEmpty().withMessage('Password field cannot be empty'),
        check('password').isLength({min:4}).withMessage('Password should be min 6 characters')
    ],(req,res,next) => {
    
        authValidationResult(req,res,next);
})

//Login get route
app.get('/users/login',(req,res) => {
    res.json({ error : "Error logging in",message:"Registered Succesfully" })
    // success_message = req.flash('success');
    // res.render('login',{ success_messages : success_message, messages : req.flash('error')});
});

//Login post route
app.post('/users/login',(req,res,next) => {
    
    passport.authenticate('local.login',{
        successRedirect:'/comments',
        failureRedirect:'/users/login',
    })(req,res,next);
});

//Logout Route
app.get('/logout',(req,res)=>{
    req.logout();
    // req.flash('success','You are Logged out');
    res.redirect('/users/login');
})


//Express validation function
function authValidationResult(req,res,next){
    const errors = validationResult(req);
    
    if(errors.array().length > 0){
        const messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);

        });
        console.log(messages);
        // req.flash('error',messages);
        res.redirect('/users/register');
    }else{
        passport.authenticate('local.signup',{
            successRedirect:'/users/login',
            failureRedirect:'/users/register',
            failureFlash:true
        })(req,res,next);

        // req.flash('success','signup successful you  may now login');

        
    }
}



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./Frontend/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname + '/Frontend/build/index.html'));
    });
}



const PORT = process.env.PORT || 4000;
//Listening to port 4000
app.listen(process.env.PORT || 4000,function(){
    console.log(`Listening on port ${PORT}`);
});