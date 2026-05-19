const {errorCreator} =require("./responseHandler")

const {sign,verify}=require("jsonwebtoken");
const SECRET_CODE= process.env.SECRET_CODE;

const generateToken=(data)=>{
    const token=sign(data,SECRET_CODE,{expiresIn:"1h"})
    return token; 
}
const verifyToken=(token)=>{
    if(!token){
        errorCreator("Token Missing",403);
    }
    return verify(token,SECRET_CODE);
}
// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmlzaGFiaCIsImlhdCI6MTc3ODY1OTY1NiwiZXhwIjoxNzc4NjU5Njg2fQ.4q5-432fZPpzdea9RaySVlQmISS2F_LJ5QBQ4zX9fWE"
// console.log(genToken({name:"Rishabh"}));

// console.log(verifyToken(token));

module.exports={generateToken,verifyToken}
// export default {generateToken,verifyToken}
