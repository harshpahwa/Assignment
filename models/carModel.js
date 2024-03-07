const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const carSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  parkingLotId: {
    type: String,
    required: true,
  }
});

const car = moongose.model("car", carSchema);

module.exports = car;
