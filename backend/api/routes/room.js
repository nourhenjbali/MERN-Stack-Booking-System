import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
} from "../controllers/room.js";
import { verifyToken , verifyAdmin ,verifyUser } from "../utils/verifyToken.js"

const roomsRoutes = express.Router();
// add Room
roomsRoutes.post("/:hotelid",verifyUser, createRoom);
//update Room
roomsRoutes.put("/:id",verifyUser, updateRoom);
// Delete
roomsRoutes.delete("/:id/:hotelid",verifyUser, deleteRoom);
// Get Room
roomsRoutes.get("/:id", getRoom);
// GetAll Rooms
roomsRoutes.get("/", getAllRoom);

export default roomsRoutes;
