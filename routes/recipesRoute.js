const express = require('express');
const path = require('path');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const validateTokenMid = require('../middlewares/validateTokenMid');

const router = express.Router();

const recipeId = '/recipes/:id';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    },
  });
  
  const upload = multer({ storage });

router.post('/recipes', validateTokenMid, recipesController.recipesCreate);
router.get(recipeId, recipesController.getById);
router.get('/recipes', recipesController.getAll);
router.put(recipeId, validateTokenMid, recipesController.update);
router.delete(recipeId, validateTokenMid, recipesController.remove);
router.use(express.static(path.join(__dirname, 'uploads')));
router.put('/recipes/:id/image/',
  validateTokenMid, upload.single('image'), recipesController.addImage); 

module.exports = router;