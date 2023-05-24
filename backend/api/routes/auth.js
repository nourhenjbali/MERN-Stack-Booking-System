import express from "express"
import { register , login } from "../controllers/auth.js"

const authRoutes = express.Router()
authRoutes.get("/" , (req,res)=> {
    res.send("hello from auth end point !! ")
})
authRoutes.post("/register", register)
authRoutes.post("/login", login)


export default authRoutes 