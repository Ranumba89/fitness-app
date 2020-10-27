const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// db.Workout.create({ name: "fitness" })
//     .then(workoutdb => {
//         console.log(workoutdb);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });

app.get("/stats", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "./public/stats.html"));
  });

app.get("/exercise", (req, res) => {
    // If the user already has an account send them to the members page

    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(workoutdb => {
      res.json(workoutdb);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id
    console.log(id);
    res.send("hello api")
});

app.post("/api/workouts", (req, res) => {
    res.send("hello api")
});

app.get("/api/workouts/range", (req, res) => {
    res.send("hello api")
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});