const errorController = (err,req,res,next)=>{
    console.log(err);
    if (err.code===11000) {
        err.message="Username is already Registered!!!";
        err.status=403;
    }
    res.status(err.status||500);
    res.send({success:false,msg:err.message})
    
}
export default errorController;