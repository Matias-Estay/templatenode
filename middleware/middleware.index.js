const permition = (req,res,next)=>{
    console.log(req.session)
    if(req.url=='/login' || req.url=='/register' && req.session.isLoggedIn){
        return res.send({Location: process.env.DOMAIN_APP+'/home'})
    }else if(req.session.isLoggedIn){
        return res.send({Location: process.env.DOMAIN_APP+'/login'})
    }else{
        next();
    }
}


module.exports ={
    permition,
}