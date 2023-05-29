var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const Categorie = require('../models/categorie');
const SCategorie = require('../models/scategorie');
router.get('/', async (req, res,) => {
    try {
        const cat = await Article.find();
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.post('/', async (req, res) => {
    const { designation, description, imagesart, scategorieID, prix } = req.body;
    const newArticle = new Article({
        designation: designation,
        description: description,
        prix: prix,
        imagesart: imagesart,
        scategorieID: scategorieID
    })
    try {
        await newArticle.save();
        res.status(200).json(newArticle);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.get('/item/:articleId', async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        res.status(200).json(article);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.get('/categorie/:categorie', async (req, res) => {
    try {
        const id = await Categorie.find({ nomcategorie: req.params.categorie }, { _id: 1 });
        const idString = id[0]._id;
        const scategories =await SCategorie.find({ categorieID: idString }, { _id: 1 })
        const scategoriestring = scategories.map(category => category._id)
        const articles = await Article.find({ scategorieID: { $in: scategoriestring } });
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.get('/categorie/:categorie/:scategorie', async (req, res) => {
    try {
        const id = await SCategorie.find({ nomscategorie: req.params.scategorie }, { _id: 1 });
        const articles = await Article.find({ scategorieID: id });
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.put('/:articleId', async (req, res) => {
    const { designation, description, imagesart, scategorieID, prix } = req.body;
    const id = req.params.articleId;
    try {
            art1 = {
            designation: designation,
            description: description,
            prix: prix,
            imagesart: imagesart,
            scategorieID: scategorieID
        };
        await Article.findByIdAndUpdate(id, art1);
        res.json(art1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.delete('/:articleId', async (req, res) => {
    const id = req.params.articleId;
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });
});
module.exports = router;
