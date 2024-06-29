const CustomErrorApi = require('../Error/CustomErrorApi');
const User = require('../model/Usermodel');

const postUserdetails = async(req,res,next)=>{
    console.log(req.body);
    try{
        const UserDetails = await User.create(req.body);
        res.status(200).json(UserDetails);
    }catch(error){
        next(new CustomErrorApi(error.message,500))
        console.log(error);
    }
}
module.exports = {postUserdetails};