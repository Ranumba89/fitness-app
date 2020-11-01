const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Workout } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/exercise", (req, res) => {
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
    let id = req.params.id;
    const body = req.body;
   
    console.log(id);
    console.log(body);
    const tdur = body.duration;
    db.Workout.findOne(
        {
            _id: mongojs.ObjectId(id)
        },
    ).then((data) => {
        const totalDuration = data.totalDuration + tdur;
       
        db.Workout.update(
            {
                _id: mongojs.ObjectId(id)
            },
            { $push: {exercises:body} ,
             $set:{totalDuration: totalDuration} }

        ).then((dbWo) => {
            console.log("done");
            res.json(dbWo)
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
    const wo = {
        day: new Date(new Date().setDate(new Date().getDate())),
        exercises: [],
        totalDuration: 0
    };
    db.Workout.create(wo)
        .then(workoutdb => {
            console.log(workoutdb);

            res.json(workoutdb);
        }).catch(err => {
            console.log(err);
            res.json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(workoutdb => {
            res.json(workoutdb);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});