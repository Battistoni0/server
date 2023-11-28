// app/routes/uploadallo.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/uploadallo');

// Ruta POST para subir archivos
router.post('/', controller.upload, controller.uploadFile);

// Ruta GET para obtener la lista de archivos subidos
router.get('/', controller.getUploadedFiles);


// Nueva ruta GET para obtener el contenido de un archivo específico
router.get('/:fileName', controller.getFileContent);

module.exports = router;


