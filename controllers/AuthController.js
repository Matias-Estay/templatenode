const {response} = require("express");
const db = require("../models");
const bcrypt = require("bcryptjs")
const User = db.User;

const Test = async (req, res = response)=>{
    console.log(req.body);
    res.sendStatus(200)
}

const logout= async(req,res=response)=>{
    req.session.destroy();
    res.status(200).send({
        Location: process.env.DOMAIN_APP+'/login'
    })
}

const login = async (req, res = response)=>{
    const {email, password} = req.body
    User.findOne({where:{email:email}}).then((user)=>{
        if(!user)
            res.redirect('/login').send({
                message:'Login error, check the user and password'
            })
        bcrypt.compare(password, user.password).then(result=>{
            if(result){
                req.session.isLoggedIn=true
                req.session.user=user.dataValues
                req.session.save((err) => console.log(err));
                res.status(200).send({
                    message: 'Logged in'
                })
            }else{
                res.status(400).send({
                    message:'Login error, check the user and password'
                })
            }
        })
    })
}

const create = async (req, res = response)=>{
    const {email, password, name  } = req.body
    checkemail(email).then((check)=>{
        if(check==404){
            bcrypt.hash(password,12).then(hashedpassword=>{
                User.create({email:email,name:name, password:hashedpassword, createAt:Date.now()}).then(data=>{
                    res.sendStatus(201)
                }).catch(err => {
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the User."
                    });
                });
            })
        }else{
            res.status(400).send({
                message: "User already exist"
            })
        }
    })
}

const loggedin = async (req, res = response)=>{
    if(req.session.isLoggedIn){
        res.status(200).send({
            message: 'Logged In'
        })
    }else{
        res.status(401).send({
            message: 'Unauthorized'
        })
    }
}

const checkemail = async (email)=>{
    return User.findOne({where: {email:email}}).then((data)=>{
        if(data.length>0){
            return 200
        }else{
            return 404
        }
    }).catch((error)=>{
        return error
    })
    
}

module.exports={
    create,
    login,
    logout,
    loggedin
}