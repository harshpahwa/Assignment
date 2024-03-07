const Car = require("../models/carModel");
const Parking = require("../models/parkinglotModel");

// Placeholder for parking lot slots
let parkingSlots = [];
let maxSlots = 1;

exports.ParkingLots = async (req, res) => {
  const { id,capacity } = req.body;
  if (typeof capacity !== "number" || capacity <= 0 || capacity > 2000) {
    return res.status(400).json({
      isSuccess: false,
      error: {  reason: "Capacity exceeds maximum limit" },
    });
  }
  maxSlots = capacity;
  for (let i = 0; i < capacity; i++) {
    parkingSlots.push({ registrationNumber: -1 });
  }
  const lot = new Parking({
    id: id,
    capacity:capacity,
    isActive:true,
  });
  try {
    await lot.save();
      res.json({
        isSuccess: true,
        response: {id:id,capacity:capacity,isActive:true},
      });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.Park = async (req, res) => {
  const {id, registrationNumber, color } = req.body;
  let slotNumber=-1;
  if (!registrationNumber) {
    return res.status(400).json({
      isSuccess: false,
      error: { reason: "invalid RegistrationNumber" },
    });
  }
  if (!color) {
    return res.status(400).json({
      isSuccess: false,
      error: { reason: "invalid Color" },
    });
  }
  if (!id) {
    return res.status(400).json({
      isSuccess: false,
      error: { reason: "invalid ID" },
    });
  }
  for (let i = 0; i < maxSlots; i++) {
  
    if(parkingSlots[i].registrationNumber==-1){
        slotNumber=i;
         break}
  }

  if (slotNumber == -1) {
    return res.status(400).json({ message: maxSlots + " slots are already filled." }); 
  }

  const car = new Car({
    registrationNumber,
    color,
    parkingLotId:id,
  });

  try {
    await car.save();
    parkingSlots[slotNumber]=car; // Mark the slot as filled
    res.json({
      isSuccess: true,
      response: {
        slotNumber: slotNumber+1,
        status: "PARKED",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unPark = async (req, res) => {
  const { parkingLotId ,registrationNumber } = req.body;
   if (!registrationNumber) {
     return res.status(400).json({
       isSuccess: false,
       error: { reason: "invalid registrationNumber" },
     });
   }
   if (!parkingLotId) {
     return res.status(400).json({
       isSuccess: false,
       error: { reason: "invalid ID" },
     });
   }
 for (let i = 0; i < maxSlots; i++) {
   if (parkingSlots[i].registrationNumber == registrationNumber) {
     slotNumber = i;
     break;
   }
 }

  const car = parkingSlots[slotNumber];
  if (car === null) {
    return res
      .status(404)
      .json({ message: "No car is parked at the given slot." });
  }

  try {
    parkingSlots[slotNumber] = { registrationNumber: -1 }; // Mark the slot as empty
    res.json({
      isSuccess: true,
      response: {
        slotNumber: slotNumber+1,
        registrationNumber: registrationNumber,
        status: "LEFT",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCarsByColor = async (req, res) => {
  const { color ,parkingLotId} = req.params;
 if (!color) {
   return res.status(400).json({
     isSuccess: false,
     error: { reason: "invalid Color" },
   });}
   if (!parkingLotId) {
   return res.status(400).json({
     isSuccess: false,
     error: { reason: "invalid ID" },
   });
 }
  try {
    const cars = await Car.find({ color: color });
    const registrationNumbers = cars.map((car) => car.registrationNumber);
    res.json({ registrationNumbers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
