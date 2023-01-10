const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');



mongoose.connect('mongodb://127.0.0.1:27017/database', { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log('Error connecting to MongoDB server');
        } else {
            console.log('Successfully connected to MongoDB server');
        }
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }));


const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});

const Data = mongoose.model('Datas', dataSchema);


//post all data
app.post('/post', async(req, res) => {
    const data = new Data({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//get all data
app.get('/getAll', async(req, res) => {
    try {
        const data = await Data.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
app.get('/getOne/:id', async(req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
app.put('/update/:id', async(req, res) => {
    try {
        const id = req.params.id;
        // const id = "6373866be1901eb04032f2a6";
        const updatedData = req.body;
        const options = { new: true };

        const result = await Data.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
app.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Data.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.listen(5000, () => {

    console.log(`Server Started at ${5000}`)
})