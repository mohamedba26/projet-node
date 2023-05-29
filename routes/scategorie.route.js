var express = require('express');
var router = express.Router();
const SCategorie = require('../models/scategorie');
router.get('/', async (req, res,) => {
    try {
        const cat = await SCategorie.find();
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.post('/', async (req, res) => {
    const { nomscategorie, categorieID } = req.body;
    const newSCategorie = new SCategorie({
        nomscategorie: nomscategorie,
        categorieID: categorieID
    })
    try {
        await newSCategorie.save();
        res.status(200).json(newSCategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.get('/:scategorieId', async (req, res) => {
    try {
        const cat = await SCategorie.findById(req.params.scategorieId); res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.get('/categorie/:categorieId', async (req, res) => {
    try {
        const cat = await SCategorie.find({categorieID:req.params.categorieId});
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.put('/:scategorieId', async (req, res) => {
    const { nomscategorie, categorieID } = req.body;
    const id = req.params.categorieId;
    try {
        const cat1 = {
            nomscategorie: nomscategorie, categorieID: categorieID, _id: id
        };
        console.log(cat1)
        await SCategorie.findByIdAndUpdate(id, cat1);
        res.json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.delete('/:scategorieId', async (req, res) => {
    const id = req.params.scategorieId;
    await SCategorie.findByIdAndDelete(id);
    res.json({ message: "scategorie deleted successfully." });
});
module.exports = router;