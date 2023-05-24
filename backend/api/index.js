import express from "express" 
import dotenv from "dotenv" 
import mongoose from "mongoose" 
import authRoutes from "./routes/auth.js"
import  usersRoutes from "./routes/users.js"
import  hotelsRoutes from "./routes/hotels.js"
import roomsRoutes from "./routes/room.js"
import cors from "cors";
import cookieParser from "cookie-parser"


const app = express() ; 
app.use(express.json()) 
app.use(cors())
app.use(cookieParser())
dotenv.config() 
mongoose.set('strictQuery', false) 
const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }

}
mongoose.connection.on("disctonnected" , ()=> {
    console.log("this is not connected ! ")
})
mongoose.connection.on("connected" , ()=> {
    console.log("this is connected ")
})

app.use("/api/auth" , authRoutes)
app.use("/api/users" , usersRoutes)
app.use("/api/hotels" , hotelsRoutes)
app.use("/api/rooms" , roomsRoutes)
// midelleware for handeling error 
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
    connect()
    console.log(" backend connected !")
})
