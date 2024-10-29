const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const dbconnection = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/happybirthday", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
dbconnection();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define the User schema with fields: name, day, and month
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  day: { type: Number, required: true },
  month: { type: String, required: true },
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Create a route to handle data insertion
app.post("/create", async (req, res) => {
  const { name, day, month } = req.body;

  // Create a new User instance with the request data
  const newUser = new User({
    name,
    day,
    month,
  });

  try {
    // Save the new user to the database
    const User = await newUser.save();
    // console.log("User saved:", User);
    res.status(201).send(User);
  } catch (error) {
    console.log("Error saving user:", error);
    res.status(500).send("Error creating user");
  }
});

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log("Server is running on port", 3001);
});
