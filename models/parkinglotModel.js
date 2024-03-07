const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const parkinglotSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  Cars: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const parkinglot = moongose.model("parkinglot", parkinglotSchema);

module.exports = parkinglot;
