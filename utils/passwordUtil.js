const {genSalt,compare,hash}=require("bcrypt");

const genPwdHash=async(pass)=>{
    const salt=await genSalt();
    // console.log(salt);
    const hashedPwd=await hash(pass,salt);
    return hashedPwd;
}

const verifyPass=(myPass,hashPass)=>{
    return compare(myPass,hashPass);
}
// genPwdHash("qwerty123").then(_=>console.log(_))

// const hashedPass = "$2b$10$pRCHjRuXA1Y.RQBLegiXgeTGRA0./WqnR4ZKnZ.sx6wCorjhFpyry";

// verifyPass("qwerty123",hashedPass).then(_=>console.log(_))

module.exports={genPwdHash,verifyPass}