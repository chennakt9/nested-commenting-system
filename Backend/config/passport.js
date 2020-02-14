const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

passport.serializeUser(function(user,done){
    // console.log(user);
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    // console.log("Deserialize ",id);
    User.findById(id,function(err,user){
        if (err) throw err;
        done(err,user);
    });
});


//For signup validation
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true


},(req,email,password,done) => {
    let errors = [];
    // console.log(req.body);
    if(req.body.password !==req.body.password2){
        errors.push('Passwords do not match');
        console.log(errors);
        return done(null,false,{error:errors});
    }

    User.findOne({email:email}).then(user => {
        if(user){
            errors.push('User with this email already exists');
            return done(null,false,{error:errors});
        }

        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });

        //Hash Password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;

                newUser.password=hash;
                newUser.save((err)=>{
                    if(err) throw err;
                    return done(null,newUser);
                })
            })
        })
    })

}));


//For login validation
passport.use('local.login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true


},(req,email,password,done) => {
    let errors = [];

//    console.log(req.body);
    User.findOne({email:email}).then(user => {
        // console.log(user);
        if(!user){
            errors.push('User with this email doesnot exists');
            console.log(errors);
            return done(null,false,{error:errors});
        }

        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                // console.log("I came here");
                return done(null,user);
            }else{
                errors.push('password is incorrect');
                console.log(errors);
                return done(null,false,{error:errors});
            }
        });

       
        
     
    });

    

}));