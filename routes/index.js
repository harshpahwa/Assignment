const express = require("express");
const router = express.Router();


// Controller imports
const {
  ParkingLots, Park, unPark, getCarsByColor,
} = require("../controllers/parkingController");

router.post("/ParkingLots", ParkingLots);
router.post("/Parking", Park);
router.delete("/Parking", unPark);
router.get("/Parking", getCarsByColor);


module.exports = router;
