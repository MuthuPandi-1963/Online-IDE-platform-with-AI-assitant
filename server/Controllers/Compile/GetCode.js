const GetCode = async(req,res)=>{
    try{

    }catch(err){
        res.status(500)
        .json({
            success:false,
            message : err.message,            
            data : {}
        })
    }
}