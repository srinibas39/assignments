const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require('zod');


const user = zod.string().email();
const passw = zod.string().min(8);



function signJwt(username, password) {
    const name = user.safeParse(username);
    const pass = passw.safeParse(password);

    if(user.success && pass.success){
       const token =  jwt.sign({username},jwtPassword)
       return token;
    }

    return null;
}


function verifyJwt(token) {
    try{
        const decoded = jwt.verify({token,jwtPassword})
        return !!decoded
    }
    catch(err){
        return false
    }
}


function decodeJwt(token) {
    try{
        const decoded = jwt.decode(token,jwtPassword)
        return !!decoded
    }
    catch(err){
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
