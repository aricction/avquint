
import jwt from 'jsonwebtoken';

const authMiddleware = ( req , res , next)=> {
    
    try{const token = req.headers.authorization?.split(" ")[1]; //bearer token

    if(!token){
        if (process.env.NODE_ENV !== 'production') {
            req.user = { id: '000000000000000000000000' };
            return next();
        }
        return res.status(401).json({
            message: "No token provided",
        })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET); // verify token and get user id
    req.user  = { id: decoded.id};
    next();

} catch(error){
     return res.status(401).json({
        message: "Unauthorized , Invalid token",
     })
}
};

export default authMiddleware;