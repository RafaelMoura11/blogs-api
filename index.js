const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.userRouter);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));