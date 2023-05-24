import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token ; 
    // verify if token exist or not 
    if (!token) {
        return next(createError(401," you are not authentifcated "))
    }
    // verifyif our secret key exist and then seperate the user information from the key
    jwt.verify(token ,process.env.JWT , (err,user)=> {
        if(err) return next(402, "Token is not valid ")
        req.user = user ;  
        next()
    })

}
export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id==req.params.id || req.user.isAdmin){
            return next()
        }
        else {
            return  next(createError(403, "You are not authorized!"));
        }
    })
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };