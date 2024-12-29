const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Goal = require('./models/goal');
const User = require('./models/user');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Middleware to verify JWT token and extract user info
const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is not valid" });
    req.user = decoded; // Store user info in request object
    next();
  });
};


app.get("/",(req,res)=>{
  res.send("Hello");
  res.sendStatus(200);
})
// Route to get goals (public and user-specific goals)
app.get("/goals", async (req, res) => {  // Remove authenticate middleware
  try {
    // Fetch all public goals
    const userGoals = await Goal.find({ visibility: true });  // Only get public goals
    res.json(userGoals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching goals" });
  }
});
app.put("/goals/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: id, createdBy: req.user.email },
      updates,
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found or unauthorized" });
    }

    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ message: "Error updating goal" });
  }
});
// Route to create a new goal
app.post("/create", authenticate, async (req, res) => {
  try {
    const { task, date, completed, desc, visibility } = req.body;
    const createdBy = req.user.email;

    // Create new goal with explicit visibility setting
    const newGoal = new Goal({
      task,
      date,
      createdBy,
      completed: completed || false,
      desc,
      visibility: visibility || false  // Default to private if not specified
    });

    await newGoal.save();
    res.json(newGoal);
  } catch (err) {
    res.status(500).json({ message: "Error creating goal" });
  }
});

// Route to get only the goals created by the logged-in user
app.get("/goals/myGoals", authenticate, async (req, res) => {
  try {
    const userGoals = await Goal.find({ createdBy: req.user.email });
    res.json(userGoals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user goals" });
  }
});


// Route to create a new user
app.post("/createUser", async (req, res) => {
  let { username, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      password = hash;
      await User.create({ username, email, password });
    });

    let token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  });
});

// Route to login a user
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.json({ message: "Something Went Wrong" });

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Something Went Wrong" });

  let token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

// Route to logout a user
app.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged Out" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
