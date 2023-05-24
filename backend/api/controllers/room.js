import Room from "../models/room.js"
import Hotel from "../models/hotel.js";

// create room 
export const createRoom = async (req,res,next)=> {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body) 
    try {
        const savedRoom = await newRoom.save();
        try {
          await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
          });
        } catch (err) {
          next(err);
        }
        res.status(200).json(savedRoom);
        
    } catch (error) {
        next(error);
        
    }
}
// update hotel
export const updateRoom = async (req,res,next)=> {
    
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id , { $set : req.body } , { new : true })
        res.status(200).json(updatedRoom) ; 
        
    } catch (error) {
        next(error);
        
    }
}
// delete room
export const deleteRoom = async (req,res,next)=> {
    // on va faire un 
    const hotelId = req.params.hotelid;
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params._id },
            });
          } catch (err) {
            next(err);
          }
        res.status(200).json("room has been deleted");
        
    } catch (error) {
        next(error);
        
    }
}
// get one room
export const getRoom = async (req,res,next)=> {
    
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room) ;
        
    } catch (error) {
        next(error);
        
    }
}
// get all rooms 
export const getAllRoom = async (req,res,next)=> {
    
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms) ;
        
    } catch (error) {
        next(error);
        
    }
}