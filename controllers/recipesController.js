const recipesService = require('../services/recipesService');

const OK = 200;
const CREATE = 201;
const SUCCESS = 204;
const ERROR = 400;
const NOTFOUND = 404;
const CONFLICT = 409;

const recipesCreate = async (request, response) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const token = request.headers.authorization;
    const recipe = await recipesService.createRecipes(
      name, ingredients, preparation, token,
    );
    
    return response.status(CREATE).json({ recipe });
  } catch (error) {
      const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    return response.status(ERROR).json({ message: error.message });
  }
};

const getAll = async (request, response) => {
  try {
    const recipesAll = await recipesService.getAll();
    return response.status(OK).json(recipesAll);
  } catch (error) {
    return response.status(ERROR).json({ message: error.message });
  }
};

const getById = async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await recipesService.getById(id);
    return response.status(OK).json(recipe);
  } catch (error) {
    return response.status(NOTFOUND).json({ message: error.message });
  }
};

const update = async (request, response) => {
  try {
    const token = request.headers.authorization;
    const { id } = request.params;
    const { name, ingredients, preparation } = request.body;
    const data = { id, name, ingredients, preparation };
    const recipe = await recipesService.update(data, token);
    return response.status(OK).json(recipe);
  } catch (error) {
    return response.status(NOTFOUND).json({ message: error.message });
  }
};

const remove = async (request, response) => {
    const token = request.headers.authorization;
    const { id } = request.params;
  try {
    await recipesService.remove(id, token);
    return response.status(SUCCESS).json();
  } catch (error) {
    return response.status(ERROR).json({ message: error.message });
  }
};

const addImage = async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const data = { id, name, ingredients, preparation };
  const added = await recipesService.addImage(data);
  response.status(OK).json(added);
};

module.exports = {
    recipesCreate,
    getAll,
    getById,
    update,
    remove,
    addImage,
};
