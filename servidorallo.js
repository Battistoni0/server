const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routes = require('./app/routes');

app.use(cors()); // Habilita CORS
app.use(routes); // Configura las rutas como middleware
app.use('/uploads', express.static('uploadsallo'));
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
