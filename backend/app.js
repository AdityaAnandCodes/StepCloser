const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const Goal = require('./models/goal')

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const port = 4000;
app.get("/",(req,res)=>{
    res.send("Hello World");
    console.log("working")
})

app.get("/goals", async (req,res)=>{
    const Goals = await Goal.find();
    res.json(Goals);
})

app.post("/create", async (req,res)=>{
    const newGoal = new Goal({task,date,createdBy,completed,desc} = req.body);
    await newGoal.save();
    res.json(newGoal);
})


app.listen(4000);