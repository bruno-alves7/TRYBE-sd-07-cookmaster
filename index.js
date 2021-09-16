const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes.userRoute);
app.use(routes.loginRoute);
app.use(routes.recipesRoute);
app.use('/images', express.static(path.join(__dirname, 'uploads'))); // req. 10

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });