const permition = (req,res,next)=>{
    if((req.url=='/login' || req.url=='/register') && req.session.isLoggedIn){
        return res.send({Location: process.env.DOMAIN_APP+'/home'})
    }else if(req.session.isLoggedIn==undefined && (req.url!='/login' && req.url!='/register')){
        return res.send({Location: process.env.DOMAIN_APP+'/login'})
    }else{
        next();
    }
}


module.exports ={
    permition,
}