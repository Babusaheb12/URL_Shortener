
/// thi is use statefull token server on server
// const sessionIdToUserMap = new Map(); 


// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports ={
//     setUser,
//     getUser
// }


///////  this is use for stateless token save..


const jwt = require('jsonwebtoken'); /// this is a another methos h ise hi use karna h...
const secret = "60eac33415d85b7f33e11deddcf7e9180f137f619a11dd5cae8ef3bc0dd2c26a";

function setUser( user) {
    return jwt.sign(
        {
        _id : user._id,
        email :user.email,

        },
        secret
        );
        

}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch(error) {
        return null;
    }
}

module.exports ={
    setUser,
    getUser
}