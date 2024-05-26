const express = require('express');
const Auto = require('../models/Auto');
const Kolcsonzes = require('../models/Kolcsonzes');

const router = express.Router()

//Post Method
router.post('/rentals', async (req, res) => {
    if (Date.parse(req.body.fromDate) < Date.now()) {
        res.status(422).json("Hibás dátum")
    }
    else {
        const ujKolcsonzes = new Kolcsonzes({
            _id: req.body._id,
            carId: req.body.carId,
            customerName: req.body.customerName,
            fromDate: req.body.fromDate,
            days: req.body.days,
            pricePerDay: req.body.pricePerDay,
            abroad: req.body.abroad
        })
    
        try{
            const ujKolcsonzesMentes = await ujKolcsonzes.save();
            res.status(201).json({"_id": ujKolcsonzesMentes._id})
        }
        catch(error){
            res.status(400).json({message: error.message})
        }
    }
})

//Get all Method
router.get('/rentals', async (req, res) => {
    // console.log(req.query.select)
    try{
        const data = await Kolcsonzes.find().populate("carId").select(req.query.select);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// router.get('/getTelefonok', async (req, res) => {
//     try{
//         const data = await Telefon.find().populate('gyarto', '-_id');
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

//Get by ID Method
router.get('/rentals/:datum', async (req, res) => {
    // console.log(req.params.datum)
    const jo_datum = req.params.datum.split(".").join("-")
    console.log(jo_datum)
    try{
        const data = await Kolcsonzes.find({"fromDate": {$gt: new Date(jo_datum)}})
        if (data.length !== 0) {
            res.json(data)
        } else {
            res.status(404).json({message: 'Nincs olyan telefon az adatbázisban, amit ez a gyártó gyártott.'})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// //Update by ID Method
// router.patch('/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true, runValidators: true }; 
//         // hogy a frissítés utáni dokumentumot kapjuk vissza
//         const result = await Telefon.findByIdAndUpdate(
//             id, updatedData, options
//         )
//         if (result) {
//             res.send(result)
//         } else {
//             res.status(400).json({ message: `${id} azonosítóval nem létezik telefon!`  })
//         }
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// //Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Telefon.findByIdAndDelete(id)
//         res.send(`A ${data.nev} nevű telefon törölve lett.`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

module.exports = router;