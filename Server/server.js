const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');

// for authentication json web tokens use 

// const jwt = require('json-web-token');
const jwt = require('jsonwebtoken');

// for password encription
const bcrypt = require('bcryptjs');



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

// model for user details
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

//model for authentication
const dataSchema_auth = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    quote: {
        type: String
    }

});
const authModel = new mongoose.model('people', dataSchema_auth)

/* ---------------- CRUDS OPERATION ----------------*/
//post all data
app.post('/post', async (req, res) => {
    
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
app.get('/getAll', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
app.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
app.put('/update/:id', async (req, res) => {
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
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Data.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


/* ---------------- AUTHENTICATION OPERATION ----------------*/

// Register user
app.post('/auth/register', async (req, res) => {
    const enpass = await bcrypt.hash(req.body.password, 10)       
    const data = new authModel({
        name: req.body.name,
        email: req.body.email,
        password: enpass
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

});

app.post('/auth/login', async (req, res) => {

    const user = await authModel.findOne({
        email: req.body.email,
    });
    if (!user) {
        return res.json({status: 404, error: 'Not Found'})
    }
    const ispassValid = await bcrypt.compare(req.body.password, user.password)

    if (ispassValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,

        }, 'secret1224');
        // console.log(token);
        return res.json({ 'status': 200, 'user': token });
        // res.status(200).json(user)
        console.log("paisi bal tare");
    } else {
        res.status(400).json({ message: "bal", user: false })
    }

});



app.listen(5000, () => {

    console.log(`Server Started at ${5000}`)
})