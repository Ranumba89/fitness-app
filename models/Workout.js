const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: Schema.Types.Number,
  exercises: [
    {
      type: String,
      name: String,
      duration: Number
     
    
    }
  ]
  
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
