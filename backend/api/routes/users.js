import express from "express"
import { createUser, deleteUser, getAllUsers , getUser, updateUser } from "../controllers/user.js"
import { verifyToken , verifyAdmin ,verifyUser } from "../utils/verifyToken.js"

const usersRoutes = express.Router()
// verif authetification 
usersRoutes.get("/verifyauth" , verifyToken , (req,res,next)=>{
    res.send("you are logged in finally ! ")
})
 // add Room 
 usersRoutes.post("/" , createUser)
//update Room
usersRoutes.put("/:id" ,verifyUser , updateUser)

// Delete 
usersRoutes.delete("/:id" , verifyUser , deleteUser)
// Get Room
usersRoutes.get("/:id" , getUser)
// GetAll users
usersRoutes.get("/" ,verifyAdmin , getAllUsers)



export default usersRoutes  