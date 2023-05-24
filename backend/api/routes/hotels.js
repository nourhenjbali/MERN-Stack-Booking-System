import express from "express";
import Hotel from "../models/hotel.js";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countCitiesHotels,findCitiesHotels,
} from "../controllers/hotel.js";
const hotelsRoutes = express.Router();
// add Hotel
hotelsRoutes.post("/", createHotel);
//update Hoetl
hotelsRoutes.put("/:id", updateHotel);
// Delete
hotelsRoutes.delete("/:id", deleteHotel);
// Get Hotel
hotelsRoutes.get("/find/:id", getHotel);
//get specific hotels :
hotelsRoutes.get("/findByCity", findCitiesHotels);
hotelsRoutes.get("/countByCity", countCitiesHotels);

// GetAll Hotels
hotelsRoutes.get("/", getAllHotel);

export default hotelsRoutes;
