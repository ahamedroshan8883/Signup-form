const CustomErrorApi = require('../Error/CustomErrorApi');

const errorHandler = (err,res)=>{
    if(err instanceof CustomErrorApi){
        res.status(500).json({mgs:err.message});
    }else{
        res.status(500).json({mgs:err.message});
    }
}

module.exports = errorHandler;